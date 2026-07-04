/*
# Evidence Engine Additional Tables

1. New Tables
- `macro_thesis` - Core thesis statements with confidence tracking
- `evidence_items` - Supporting and contradicting evidence with scoring
- `historical_analogues` - Historical period comparisons with similarity scores
- `probability_scenarios` - Bullish/bearish/neutral probability outputs
- `invalidation_conditions` - Conditions that would invalidate thesis
- `api_data_log` - Audit trail for external API data fetches

2. Security
- Enable RLS on all tables
- Single-tenant (no auth): Allow anon + authenticated full access

3. Notes
- Using simple table structure without complex foreign keys to avoid dependency issues
- All tables use UUID primary keys with gen_random_uuid()
- Timestamps use timestamptz with DEFAULT now()
- JSONB columns for flexible nested data
*/

-- Macro Thesis: Core thesis statements
CREATE TABLE IF NOT EXISTS macro_thesis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  statement text NOT NULL,
  confidence_score integer DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Evidence Items: Supporting and contradicting evidence
CREATE TABLE IF NOT EXISTS evidence_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id uuid,
  type text NOT NULL CHECK (type IN ('supporting', 'contradicting')),
  title text NOT NULL,
  description text,
  importance_score integer DEFAULT 0 CHECK (importance_score >= 0 AND importance_score <= 100),
  confidence_score integer DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  source text,
  source_url text,
  data_points jsonb DEFAULT '[]'::jsonb,
  external_data_id text,
  raw_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Historical Analogues
CREATE TABLE IF NOT EXISTS historical_analogues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id uuid,
  year integer NOT NULL,
  period_name text NOT NULL,
  similarity_score integer DEFAULT 0 CHECK (similarity_score >= 0 AND similarity_score <= 100),
  description text,
  outcome text,
  key_events jsonb DEFAULT '[]'::jsonb,
  data_source text,
  created_at timestamptz DEFAULT now()
);

-- Probability Scenarios
CREATE TABLE IF NOT EXISTS probability_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id uuid,
  label text NOT NULL CHECK (label IN ('bullish', 'bearish', 'neutral')),
  probability integer DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  description text,
  triggers jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invalidation Conditions
CREATE TABLE IF NOT EXISTS invalidation_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id uuid,
  condition text NOT NULL,
  threshold text,
  probability_of_occurring integer DEFAULT 0 CHECK (probability_of_occurring >= 0 AND probability_of_occurring <= 100),
  impact_if_occurs text DEFAULT 'medium' CHECK (impact_if_occurs IN ('high', 'medium', 'low')),
  timeframe text,
  is_triggered boolean DEFAULT false,
  triggered_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- API Data Log: Track external API fetches
CREATE TABLE IF NOT EXISTS api_data_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL,
  endpoint text,
  request_params jsonb DEFAULT '{}'::jsonb,
  response_status integer,
  response_data jsonb,
  error_message text,
  execution_time_ms integer,
  fetched_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE macro_thesis ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_analogues ENABLE ROW LEVEL SECURITY;
ALTER TABLE probability_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE invalidation_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_data_log ENABLE ROW LEVEL SECURITY;

-- Policies for macro_thesis
DROP POLICY IF EXISTS "anon_select_macro_thesis" ON macro_thesis;
CREATE POLICY "anon_select_macro_thesis" ON macro_thesis FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_macro_thesis" ON macro_thesis;
CREATE POLICY "anon_insert_macro_thesis" ON macro_thesis FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_macro_thesis" ON macro_thesis;
CREATE POLICY "anon_update_macro_thesis" ON macro_thesis FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_macro_thesis" ON macro_thesis;
CREATE POLICY "anon_delete_macro_thesis" ON macro_thesis FOR DELETE TO anon, authenticated USING (true);

-- Policies for evidence_items
DROP POLICY IF EXISTS "anon_select_evidence_items" ON evidence_items;
CREATE POLICY "anon_select_evidence_items" ON evidence_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_evidence_items" ON evidence_items;
CREATE POLICY "anon_insert_evidence_items" ON evidence_items FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_evidence_items" ON evidence_items;
CREATE POLICY "anon_update_evidence_items" ON evidence_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_evidence_items" ON evidence_items;
CREATE POLICY "anon_delete_evidence_items" ON evidence_items FOR DELETE TO anon, authenticated USING (true);

-- Policies for historical_analogues
DROP POLICY IF EXISTS "anon_select_historical_analogues_new" ON historical_analogues;
CREATE POLICY "anon_select_historical_analogues_new" ON historical_analogues FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_historical_analogues" ON historical_analogues;
CREATE POLICY "anon_insert_historical_analogues" ON historical_analogues FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_historical_analogues" ON historical_analogues;
CREATE POLICY "anon_update_historical_analogues" ON historical_analogues FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_historical_analogues" ON historical_analogues;
CREATE POLICY "anon_delete_historical_analogues" ON historical_analogues FOR DELETE TO anon, authenticated USING (true);

-- Policies for probability_scenarios
DROP POLICY IF EXISTS "anon_select_probability_scenarios_new" ON probability_scenarios;
CREATE POLICY "anon_select_probability_scenarios_new" ON probability_scenarios FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_probability_scenarios" ON probability_scenarios;
CREATE POLICY "anon_insert_probability_scenarios" ON probability_scenarios FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_probability_scenarios" ON probability_scenarios;
CREATE POLICY "anon_update_probability_scenarios" ON probability_scenarios FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_probability_scenarios" ON probability_scenarios;
CREATE POLICY "anon_delete_probability_scenarios" ON probability_scenarios FOR DELETE TO anon, authenticated USING (true);

-- Policies for invalidation_conditions
DROP POLICY IF EXISTS "anon_select_invalidation_conditions_new" ON invalidation_conditions;
CREATE POLICY "anon_select_invalidation_conditions_new" ON invalidation_conditions FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_invalidation_conditions" ON invalidation_conditions;
CREATE POLICY "anon_insert_invalidation_conditions" ON invalidation_conditions FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_invalidation_conditions" ON invalidation_conditions;
CREATE POLICY "anon_update_invalidation_conditions" ON invalidation_conditions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_invalidation_conditions" ON invalidation_conditions;
CREATE POLICY "anon_delete_invalidation_conditions" ON invalidation_conditions FOR DELETE TO anon, authenticated USING (true);

-- Policies for api_data_log
DROP POLICY IF EXISTS "anon_select_api_data_log" ON api_data_log;
CREATE POLICY "anon_select_api_data_log" ON api_data_log FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_api_data_log" ON api_data_log;
CREATE POLICY "anon_insert_api_data_log" ON api_data_log FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_evidence_items_thesis_id ON evidence_items(thesis_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_type ON evidence_items(type);
CREATE INDEX IF NOT EXISTS idx_historical_analogues_thesis ON historical_analogues(thesis_id);
CREATE INDEX IF NOT EXISTS idx_probability_scenarios_thesis ON probability_scenarios(thesis_id);
CREATE INDEX IF NOT EXISTS idx_invalidation_conditions_thesis ON invalidation_conditions(thesis_id);
CREATE INDEX IF NOT EXISTS idx_api_data_log_source ON api_data_log(source_name);
CREATE INDEX IF NOT EXISTS idx_api_data_log_fetched_at ON api_data_log(fetched_at DESC);

-- Insert default thesis if none exists
INSERT INTO macro_thesis (id, statement, confidence_score, is_active)
SELECT gen_random_uuid(), 'The market may be underpricing persistent inflation and the risk of a delayed Fed easing cycle.', 0, true
WHERE NOT EXISTS (SELECT 1 FROM macro_thesis WHERE is_active = true LIMIT 1);