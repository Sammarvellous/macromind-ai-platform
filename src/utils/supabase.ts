import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Data will use placeholders until API connected.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Fetch macro thesis with all related data
export async function fetchMacroThesis(thesisId: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('macro_thesis')
    .select(`
      *,
      supporting_evidence:evidence(supporting, id, title, description, importance_score, confidence_score, source, timestamp),
      contradicting_evidence:evidence(contradicting, id, title, description, importance_score, confidence_score, source, timestamp),
      historical_analogues(id, year, period_name, similarity_score, description, outcome, key_events, data_source),
      probability_scenarios(id, label, probability, description, triggers),
      invalidation_conditions(id, condition, threshold, probability_of_occurring, impact_if_occurs, timeframe),
      hidden_risks(id, title, description, probability, severity, category, indicators, mitigation)
    `)
    .eq('id', thesisId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching macro thesis:', error);
    return null;
  }

  return data;
}

// Fetch evidence by type
export async function fetchEvidence(thesisId: string, type: 'supporting' | 'contradicting') {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('evidence')
    .select('*')
    .eq('thesis_id', thesisId)
    .eq('type', type)
    .order('importance_score', { ascending: false });

  if (error) {
    console.error('Error fetching evidence:', error);
    return null;
  }

  return data;
}

// Fetch historical analogues
export async function fetchHistoricalAnalogues(thesisId: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('historical_analogues')
    .select('*')
    .eq('thesis_id', thesisId)
    .order('similarity_score', { ascending: false });

  if (error) {
    console.error('Error fetching analogues:', error);
    return null;
  }

  return data;
}

// Upsert evidence data from external APIs
export async function upsertEvidence(evidence: {
  thesis_id: string;
  title: string;
  description: string;
  importance_score: number;
  confidence_score: number;
  source: string;
  type: 'supporting' | 'contradicting';
  data_points?: string[];
}) {
  if (!supabase) return false;

  const { error } = await supabase
    .from('evidence')
    .upsert(evidence, { onConflict: 'thesis_id,title,type' });

  if (error) {
    console.error('Error upserting evidence:', error);
    return false;
  }

  return true;
}
