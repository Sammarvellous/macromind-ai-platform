// Evidence Engine Types
export interface Evidence {
  id: string;
  title: string;
  description: string;
  importance_score: number; // 0-100
  confidence_score: number; // 0-100
  source: string;
  source_url?: string;
  timestamp: string;
  data_points?: string[];
}

export interface HistoricalAnalogue {
  id: string;
  year: number;
  period_name: string;
  similarity_score: number; // 0-100
  description: string;
  outcome: string;
  key_events: string[];
  data_source: string;
}

export interface ProbabilityScenario {
  id: string;
  label: 'bullish' | 'bearish' | 'neutral';
  probability: number; // 0-100
  description: string;
  triggers: string[];
}

export interface InvalidationCondition {
  id: string;
  condition: string;
  threshold: string;
  probability_of_occurring: number; // 0-100
  impact_if_occurs: 'high' | 'medium' | 'low';
  timeframe: string;
}

export interface HiddenRisk {
  id: string;
  title: string;
  description: string;
  probability: number; // 0-100
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  indicators: string[];
  mitigation: string;
}

export interface MacroThesis {
  id: string;
  statement: string;
  confidence_score: number; // 0-100
  created_at: string;
  updated_at: string;
  supporting_evidence: Evidence[];
  contradicting_evidence: Evidence[];
  historical_analogues: HistoricalAnalogue[];
  probability_scenarios: ProbabilityScenario[];
  invalidation_conditions: InvalidationCondition[];
  hidden_risks: HiddenRisk[];
}

// API Data Types
export interface MacroMetric {
  id: string;
  name: string;
  value: number;
  previous_value: number;
  change: number;
  change_percent: number;
  unit: string;
  source: string;
  last_updated: string;
  trend: 'up' | 'down' | 'neutral';
  importance: 'high' | 'medium' | 'low';
}

export interface EconomicEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  country: string;
  impact: 'high' | 'medium' | 'low';
  actual?: number;
  forecast?: number;
  previous?: number;
  category: string;
  description?: string;
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  volume?: number;
  high_52w?: number;
  low_52w?: number;
  market_cap?: number;
}

export interface DataSource {
  id: string;
  name: string;
  provider: string;
  endpoint: string;
  is_active: boolean;
  last_fetch: string | null;
  data_available: boolean;
}
