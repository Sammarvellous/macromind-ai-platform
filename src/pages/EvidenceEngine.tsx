import { useState } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  RefreshCw,
  Info,
  Shield,
  Target,
  BarChart3,
} from 'lucide-react';
import {
  currentThesis,
  supportingEvidenceTemplates,
  contradictingEvidenceTemplates,
  historicalAnalogueTemplates,
  probabilityScenarioTemplates,
  invalidationConditionTemplates,
  hiddenRiskTemplates,
  dataSources,
} from '../utils/mockData';
import type {
  Evidence,
  HistoricalAnalogue,
  ProbabilityScenario,
  InvalidationCondition,
  HiddenRisk,
} from '../types';

// Evidence Card Component
function EvidenceCard({ evidence, type }: { evidence: Omit<Evidence, 'id' | 'timestamp'>; type: 'supporting' | 'contradicting' }) {
  const borderColor = type === 'supporting' ? 'border-data-positive/20' : 'border-data-negative/20';
  const iconBg = type === 'supporting' ? 'bg-data-positive/10' : 'bg-data-negative/10';
  const iconColor = type === 'supporting' ? 'text-data-positive' : 'text-data-negative';
  const Icon = type === 'supporting' ? CheckCircle : XCircle;

  return (
    <div className={`evidence-card ${borderColor}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-bloomberg-100">{evidence.title}</h4>
          <p className="text-sm text-bloomberg-400 mt-1">{evidence.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-bloomberg-500 mb-1">Importance</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-bloomberg-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-orange rounded-full"
                style={{ width: `${evidence.importance_score}%` }}
              />
            </div>
            <span className="text-xs font-mono text-bloomberg-300">{evidence.importance_score}%</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-bloomberg-500 mb-1">Confidence</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-bloomberg-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-blue rounded-full"
                style={{ width: `${evidence.confidence_score}%` }}
              />
            </div>
            <span className="text-xs font-mono text-bloomberg-300">{evidence.confidence_score}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-bloomberg-700">
        <span className="text-xs text-bloomberg-500 flex items-center gap-1">
          <Database size={12} />
          {evidence.source}
        </span>
        {evidence.data_points && (
          <div className="flex gap-1">
            {evidence.data_points.slice(0, 2).map((dp, i) => (
              <span key={i} className="badge badge-neutral text-2xs">{dp}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Historical Analogue Card
function AnalogueCard({ analogue }: { analogue: Omit<HistoricalAnalogue, 'id'> }) {
  return (
    <div className="analogue-card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-accent-blue">{analogue.year}</span>
            <span className="badge badge-neutral">{analogue.period_name}</span>
          </div>
          <p className="text-sm text-bloomberg-400">{analogue.description}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-bloomberg-500">Similarity</p>
          <p className="text-xl font-mono font-bold text-accent-orange">{analogue.similarity_score}%</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-bloomberg-500 mb-1">Outcome</p>
        <p className="text-sm text-bloomberg-300">{analogue.outcome}</p>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {analogue.key_events.map((event, i) => (
          <span key={i} className="text-xs px-2 py-0.5 bg-bloomberg-800 rounded text-bloomberg-400">
            {event}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-bloomberg-700">
        <span className="text-xs text-bloomberg-500 flex items-center gap-1">
          <Database size={10} />
          {analogue.data_source}
        </span>
      </div>
    </div>
  );
}

// Probability Bar
function ProbabilityBar({ scenario }: { scenario: Omit<ProbabilityScenario, 'id'> }) {
  const colors = {
    bullish: 'bg-data-positive',
    bearish: 'bg-data-negative',
    neutral: 'bg-accent-yellow',
  };

  const icons = {
    bullish: TrendingUp,
    bearish: TrendingDown,
    neutral: Minus,
  };

  const Icon = icons[scenario.label];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={18} className={`${
            scenario.label === 'bullish' ? 'text-data-positive' :
            scenario.label === 'bearish' ? 'text-data-negative' : 'text-accent-yellow'
          }`} />
          <span className="font-medium text-bloomberg-100 capitalize">{scenario.label}</span>
        </div>
        <span className="text-2xl font-mono font-bold text-accent-orange">{scenario.probability}%</span>
      </div>
      <div className="w-full h-3 bg-bloomberg-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[scenario.label]} rounded-full transition-all duration-500`}
          style={{ width: `${scenario.probability}%` }}
        />
      </div>
      <p className="text-sm text-bloomberg-400">{scenario.description}</p>
    </div>
  );
}

// Invalidation Condition Card
function InvalidationCard({ condition }: { condition: Omit<InvalidationCondition, 'id'> }) {
  const severityColors = {
    high: 'bg-data-negative/10 text-data-negative border-data-negative/20',
    medium: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
    low: 'bg-bloomberg-700 text-bloomberg-300 border-bloomberg-600',
  };

  return (
    <div className="evidence-card">
      <div className="flex items-start justify-between mb-2">
        <p className="font-medium text-bloomberg-100">{condition.condition}</p>
        <span className={`badge ${severityColors[condition.impact_if_occurs]}`}>
          {condition.impact_if_occurs.toUpperCase()} IMPACT
        </span>
      </div>
      <p className="text-sm text-bloomberg-400 mb-3">{condition.threshold}</p>
      <div className="flex items-center justify-between text-xs text-bloomberg-500">
        <span>Timeframe: {condition.timeframe}</span>
        <span>Probability: <span className="font-mono text-bloomberg-300">{condition.probability_of_occurring}%</span></span>
      </div>
    </div>
  );
}

// Hidden Risk Card
function RiskCard({ risk }: { risk: Omit<HiddenRisk, 'id'> }) {
  const severityColors = {
    critical: 'border-data-negative/30 bg-data-negative/5',
    high: 'border-accent-yellow/30 bg-accent-yellow/5',
    medium: 'border-accent-blue/30 bg-accent-blue/5',
    low: 'border-bloomberg-600 bg-bloomberg-850',
  };

  const severityBadges = {
    critical: 'badge-negative',
    high: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
    medium: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    low: 'badge-neutral',
  };

  return (
    <div className={`evidence-card ${severityColors[risk.severity]}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-bloomberg-100">{risk.title}</h4>
        <span className={`badge ${severityBadges[risk.severity]}`}>
          {risk.severity.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-bloomberg-400 mb-3">{risk.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-bloomberg-500">Probability</span>
          <span className="text-xs font-mono text-bloomberg-300">{risk.probability}%</span>
        </div>
        <div className="w-full h-1.5 bg-bloomberg-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              risk.probability > 60 ? 'bg-data-negative' :
              risk.probability > 30 ? 'bg-accent-yellow' : 'bg-data-positive'
            }`}
            style={{ width: `${risk.probability}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {risk.indicators.map((indicator, i) => (
          <span key={i} className="text-2xs px-2 py-0.5 bg-bloomberg-800 rounded text-bloomberg-500 font-mono">
            {indicator}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-bloomberg-700">
        <p className="text-xs text-bloomberg-500">
          <Shield size={12} className="inline mr-1" />
          {risk.mitigation}
        </p>
      </div>
    </div>
  );
}

// Confidence Meter Component
function ConfidenceMeter({ score }: { score: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? '#00c853' : score >= 40 ? '#ffd600' : '#ff1744';

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="transform -rotate-90" width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#374151"
          strokeWidth="8"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-mono font-bold text-bloomberg-100">{score}</span>
        <span className="text-xs text-bloomberg-400">CONFIDENCE</span>
      </div>
    </div>
  );
}

export function EvidenceEngine() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-bloomberg-900">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-bloomberg-850 border-b border-bloomberg-700 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Brain className="w-8 h-8 text-accent-orange" />
          <div>
            <h1 className="text-xl font-semibold text-bloomberg-100">Evidence Engine</h1>
            <p className="text-sm text-bloomberg-400">AI-Powered Macro Research</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-bloomberg-400">
            <Clock size={14} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg hover:bg-bloomberg-700 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={18} className="text-bloomberg-300" />
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Thesis Statement */}
        <section className="thesis-card">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-lg bg-accent-orange/10">
              <Target size={32} className="text-accent-orange" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-semibold text-bloomberg-400 uppercase tracking-wider">Macro Thesis</h2>
                <Info size={14} className="text-bloomberg-500" />
              </div>
              <p className="text-xl font-medium text-bloomberg-100 leading-relaxed">
                {currentThesis.statement}
              </p>
            </div>
          </div>
        </section>

        {/* Main Grid: Evidence + Confidence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supporting Evidence */}
          <div className="lg:col-span-2 space-y-6">
            {/* Supporting Evidence Section */}
            <section>
              <h3 className="section-title">
                <CheckCircle size={20} className="text-data-positive" />
                Supporting Evidence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportingEvidenceTemplates.map((evidence, i) => (
                  <EvidenceCard key={i} evidence={evidence} type="supporting" />
                ))}
              </div>
            </section>

            {/* Contradicting Evidence Section */}
            <section>
              <h3 className="section-title">
                <XCircle size={20} className="text-data-negative" />
                Contradicting Evidence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contradictingEvidenceTemplates.map((evidence, i) => (
                  <EvidenceCard key={i} evidence={evidence} type="contradicting" />
                ))}
              </div>
            </section>
          </div>

          {/* Confidence Meter & Probability */}
          <div className="space-y-6">
            {/* Confidence Meter */}
            <div className="card text-center">
              <h3 className="section-title justify-center">
                <BarChart3 size={18} className="text-accent-orange" />
                Confidence Meter
              </h3>
              <ConfidenceMeter score={currentThesis.confidence_score} />
              <p className="text-sm text-bloomberg-500 mt-4">
                Based on evidence strength and data quality
              </p>
            </div>

            {/* Probability Engine */}
            <div className="card">
              <h3 className="section-title">
                <Target size={18} className="text-accent-orange" />
                Probability Engine
              </h3>
              <div className="space-y-6">
                {probabilityScenarioTemplates.map((scenario, i) => (
                  <ProbabilityBar key={i} scenario={scenario} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Historical Analogues */}
        <section>
          <h3 className="section-title">
            <Clock size={20} className="text-accent-orange" />
            Historical Analogues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {historicalAnalogueTemplates.map((analogue, i) => (
              <AnalogueCard key={i} analogue={analogue} />
            ))}
          </div>
        </section>

        {/* Invalidation Conditions */}
        <section>
          <h3 className="section-title">
            <AlertTriangle size={20} className="text-accent-yellow" />
            Invalidation Conditions
          </h3>
          <p className="text-sm text-bloomberg-500 mb-4">
            Future data events that would invalidate this thesis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invalidationConditionTemplates.map((condition, i) => (
              <InvalidationCard key={i} condition={condition} />
            ))}
          </div>
        </section>

        {/* Hidden Risks */}
        <section>
          <h3 className="section-title">
            <AlertTriangle size={20} className="text-data-negative" />
            Hidden Macro Risks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenRiskTemplates.map((risk, i) => (
              <RiskCard key={i} risk={risk} />
            ))}
          </div>
        </section>

        {/* Data Sources Footer */}
        <section className="card">
          <h3 className="section-title">
            <Database size={18} className="text-accent-orange" />
            Connected Data Sources
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {dataSources.map((source) => (
              <div
                key={source.id}
                className={`p-3 rounded-lg border ${
                  source.is_active && source.data_available
                    ? 'border-data-positive/30 bg-data-positive/5'
                    : 'border-bloomberg-700 bg-bloomberg-850'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    source.is_active ? 'bg-data-positive' : 'bg-bloomberg-500'
                  }`} />
                  <span className="text-sm font-medium text-bloomberg-200 truncate">{source.name}</span>
                </div>
                <p className="text-xs text-bloomberg-500">{source.provider}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
