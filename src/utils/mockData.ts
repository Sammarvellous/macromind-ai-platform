import type {
  MacroThesis,
  Evidence,
  HistoricalAnalogue,
  ProbabilityScenario,
  InvalidationCondition,
  HiddenRisk,
  DataSource,
  MacroMetric,
  MarketData,
} from '../types';

// Current Macro Thesis - Structured placeholders for API data
export const currentThesis: MacroThesis = {
  id: 'thesis-001',
  statement: 'The market may be underpricing persistent inflation and the risk of a delayed Fed easing cycle.',
  confidence_score: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  supporting_evidence: [],
  contradicting_evidence: [],
  historical_analogues: [],
  probability_scenarios: [],
  invalidation_conditions: [],
  hidden_risks: [],
};

// Evidence Templates - API Ready
export const supportingEvidenceTemplates: Omit<Evidence, 'id' | 'timestamp'>[] = [
  {
    title: 'Core Services Inflation Remains Elevated',
    description: 'Core services ex-housing CPI running at X% YoY, above the threshold consistent with 2% headline inflation.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: BLS Consumer Price Index Report',
    data_points: ['core_services_cpi_yoy', 'shelter_cpi_yoy', 'medical_care_cpi'],
  },
  {
    title: 'Wage Growth Exceeds Inflation Consistency',
    description: 'Average hourly earnings growth at X% YoY, maintaining positive real wage growth and consumption support.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: BLS Employment Situation Report',
    data_points: ['avg_hourly_earnings_yoy', 'employment_cost_index', 'real_wage_growth'],
  },
  {
    title: 'Services PMI Signals Price Pressures',
    description: 'Services PMI prices paid component at X, indicating ongoing pass-through of labor costs to consumer prices.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: ISM Services PMI Report',
    data_points: ['ism_services_prices_paid', 'ism_services Employment', 'new_orders'],
  },
  {
    title: 'Rent Inflation Persistence',
    description: 'Primary residence rent and OER inflation at X% YoY, with leading indicators suggesting persistence through Q.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: BLS CPI Report + Zillow Rent Index',
    data_points: ['primary_residence_rent', 'oer_inflation', 'zillow_rent_index_yoy'],
  },
];

export const contradictingEvidenceTemplates: Omit<Evidence, 'id' | 'timestamp'>[] = [
  {
    title: 'Disinflationary Trend in Core Goods',
    description: 'Core goods CPI at X% YoY, continuing the disinflationary trend from supply chain normalization.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: BLS Consumer Price Index Report',
    data_points: ['core_goods_cpi_yoy', 'used_car_prices', 'apparel_cpi'],
  },
  {
    title: 'Market-Based Inflation Expectations Declining',
    description: '5Y5Y forward inflation swap at X%, breakevens at X%, suggesting markets expect inflation convergence.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: Treasury Breakeven Inflation Rates',
    data_points: ['5y5y_forward_swap', '10y_breakeven', 'tips_spreads'],
  },
  {
    title: 'Housing Market Cooling',
    description: 'Leading housing indicators show X% decline in prices/permits, suggesting shelter inflation moderation ahead.',
    importance_score: 0,
    confidence_score: 0,
    source: 'API: FRED Housing Market Data',
    data_points: ['housing_starts', 'building_permits', 'case_shiller_index'],
  },
];

// Historical Analogues - API Ready
export const historicalAnalogueTemplates: Omit<HistoricalAnalogue, 'id'>[] = [
  {
    year: 1994,
    period_name: '1994 Fed Tightening Cycle',
    similarity_score: 0,
    description: 'Fed raised rates by X bps over Y months, achieving a soft landing without recession.',
    outcome: 'Soft landing achieved. S&P 500 fell X% during tightening, then rallied Y% in following year.',
    key_events: ['Fed hike cycle', 'Bond market selloff', 'Orange County bankruptcy'],
    data_source: 'API: Federal Reserve Economic Data (FRED)',
  },
  {
    year: 2004,
    period_name: '2004-2006 Greenspan Hiking Cycle',
    similarity_score: 0,
    description: 'Measured pace tightening of X bps per meeting over Y years.',
    outcome: 'Housing bubble expanded during tightening. Recession followed 18 months after terminal rate.',
    key_events: ['17 consecutive 25bp hikes', 'Housing price acceleration', 'Subprime expansion'],
    data_source: 'API: Federal Reserve Economic Data (FRED)',
  },
  {
    year: 1979,
    period_name: 'Volcker Disinflation',
    similarity_score: 0,
    description: 'Fed Chairman Volcker raised rates to X%, inducing recession to break inflation psychology.',
    outcome: 'Double dip recession. Inflation fell from X% to Y% over Z years.',
    key_events: ['Weekend credit controls', 'Fed funds to 20%', 'Recession 1980, 1981-82'],
    data_source: 'API: Federal Reserve Economic Data (FRED)',
  },
  {
    year: 2015,
    period_name: '2015-2018 Normalization Cycle',
    similarity_score: 0,
    description: 'Post-crisis normalization with balance sheet runoff beginning 2017.',
    outcome: 'Slow growth despite hikes. QT triggered 2018 market selloff. Policy pivot in 2019.',
    key_events: ['First post-crisis hike', 'Balance sheet normalization', '2018 market correction'],
    data_source: 'API: Federal Reserve Economic Data (FRED)',
  },
];

// Probability Scenarios - API Ready
export const probabilityScenarioTemplates: Omit<ProbabilityScenario, 'id'>[] = [
  {
    label: 'bullish',
    probability: 0,
    description: 'Inflation converges to 2% within X quarters, Fed achieves soft landing, risk assets rally.',
    triggers: ['Core PCE falls below 2.5%', 'Unemployment remains stable', 'Credit spreads tighten'],
  },
  {
    label: 'bearish',
    probability: 0,
    description: 'Persistent inflation forces Fed to maintain restrictive policy, recession by Q.',
    triggers: ['Core PCE remains above 3%', 'Wage growth accelerates', 'Services inflation persists'],
  },
  {
    label: 'neutral',
    probability: 0,
    description: 'Bumpy disinflation with growth slowdown. Fed pauses but does not cut significantly.',
    triggers: ['Mixed data signals', 'Sector divergence in inflation', 'Labor market gradual cooling'],
  },
];

// Invalidation Conditions - API Ready
export const invalidationConditionTemplates: Omit<InvalidationCondition, 'id'>[] = [
  {
    condition: 'Core CPI below consensus for X consecutive months',
    threshold: 'Core CPI < X% MoM for 3+ months',
    probability_of_occurring: 0,
    impact_if_occurs: 'high',
    timeframe: 'Next 6 months',
  },
  {
    condition: 'Payrolls sharply weaken',
    threshold: 'NFP < X for 2+ consecutive months',
    probability_of_occurring: 0,
    impact_if_occurs: 'high',
    timeframe: 'Next 3 months',
  },
  {
    condition: 'Treasury yields fall rapidly',
    threshold: '10Y yield declines X bps in 1 month',
    probability_of_occurring: 0,
    impact_if_occurs: 'medium',
    timeframe: 'Any time',
  },
  {
    condition: 'Financial conditions ease significantly',
    threshold: 'Financial conditions index declines by X points',
    probability_of_occurring: 0,
    impact_if_occurs: 'medium',
    timeframe: 'Next 3 months',
  },
];

// Hidden Risks - API Ready
export const hiddenRiskTemplates: Omit<HiddenRisk, 'id'>[] = [
  {
    title: 'Treasury Issuance Dynamics',
    description: 'Increased Treasury issuance at X-year highs following debt ceiling deal. Potential yield pressure and crowding out effects.',
    probability: 0,
    severity: 'high',
    category: 'Fiscal Policy',
    indicators: ['Treasury auction sizes', 'Primary dealer positioning', 'Foreign holder demand'],
    mitigation: 'Monitor auction demand metrics, indirect bidder participation, and yield curve dynamics.',
  },
  {
    title: 'Liquidity Stress',
    description: 'Fed reverse repo facility at X, excess liquidity declining. Potential market vulnerability to shocks.',
    probability: 0,
    severity: 'high',
    category: 'Financial Stability',
    indicators: ['RRP facility usage', 'Bank reserves', 'M2 money supply growth'],
    mitigation: 'Track Fed balance sheet, repo rates, and banking sector stress indicators.',
  },
  {
    title: 'Commercial Real Estate Exposure',
    description: 'Regional banks hold X% CRE exposure. Property valuations declining, refinancing wall approaching.',
    probability: 0,
    severity: 'critical',
    category: 'Financial Stability',
    indicators: ['CRE price indices', 'Bank NPL ratios', 'CMBS spreads'],
    mitigation: 'Monitor regional bank CDX spreads, specific bank CRE exposure, REIT pricing.',
  },
  {
    title: 'Bank Reserves',
    description: 'Bank reserves declining toward X threshold. Bank lending survey showing tightening standards.',
    probability: 0,
    severity: 'medium',
    category: 'Monetary Policy',
    indicators: ['Bank reserves level', 'Fed balance sheet', 'Senior Loan Officer Survey'],
    mitigation: 'Track Fed operations, bank earnings, and credit creation metrics.',
  },
  {
    title: 'Political Risk',
    description: 'Election uncertainty and fiscal policy risks. Potential government shutdown and spending decisions.',
    probability: 0,
    severity: 'medium',
    category: 'Political',
    indicators: ['Congressional calendar', 'Approval ratings', 'Polling averages'],
    mitigation: 'Monitor legislative calendar, key policy deadlines, and election developments.',
  },
];

// Key Macro Metrics - API Ready
export const macroMetricsTemplate: Omit<MacroMetric, 'id'>[] = [
  {
    name: 'US Federal Funds Rate',
    value: 0,
    previous_value: 0,
    change: 0,
    change_percent: 0,
    unit: '%',
    source: 'API: Federal Reserve',
    last_updated: '',
    trend: 'neutral',
    importance: 'high',
  },
  {
    name: 'Core PCE Inflation',
    value: 0,
    previous_value: 0,
    change: 0,
    change_percent: 0,
    unit: '%',
    source: 'API: BEA',
    last_updated: '',
    trend: 'neutral',
    importance: 'high',
  },
  {
    name: 'US Unemployment Rate',
    value: 0,
    previous_value: 0,
    change: 0,
    change_percent: 0,
    unit: '%',
    source: 'API: BLS',
    last_updated: '',
    trend: 'neutral',
    importance: 'high',
  },
];

// Market Data - API Ready
export const marketDataTemplate: Omit<MarketData, 'symbol'>[] = [
  { name: '10Y Treasury Yield', price: 0, change: 0, change_percent: 0 },
  { name: 'DXY Dollar Index', price: 0, change: 0, change_percent: 0 },
  { name: 'S&P 500', price: 0, change: 0, change_percent: 0 },
  { name: 'VIX Index', price: 0, change: 0, change_percent: 0 },
];

// Data Sources Configuration
export const dataSources: DataSource[] = [
  {
    id: 'fred',
    name: 'Federal Reserve Economic Data',
    provider: 'St. Louis Fed',
    endpoint: 'https://api.stlouisfed.org/fred/series/observations',
    is_active: true,
    last_fetch: null,
    data_available: false,
  },
  {
    id: 'bls',
    name: 'Bureau of Labor Statistics',
    provider: 'US Department of Labor',
    endpoint: 'https://api.bls.gov/publicAPI/v2/timeseries/data/',
    is_active: true,
    last_fetch: null,
    data_available: false,
  },
  {
    id: 'bea',
    name: 'Bureau of Economic Analysis',
    provider: 'US Department of Commerce',
    endpoint: 'https://apps.bea.gov/api/data/',
    is_active: true,
    last_fetch: null,
    data_available: false,
  },
  {
    id: 'fed',
    name: 'Federal Reserve Board',
    provider: 'Board of Governors',
    endpoint: 'https://www.federalreserve.gov/releases/',
    is_active: true,
    last_fetch: null,
    data_available: false,
  },
  {
    id: 'market_data',
    name: 'Market Data Provider',
    provider: 'Placeholder for market data API',
    endpoint: 'TBD',
    is_active: false,
    last_fetch: null,
    data_available: false,
  },
];
