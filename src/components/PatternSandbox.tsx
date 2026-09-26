import React, { useState } from 'react';
import { PatternScenario, Candle } from '../types';
import { PATTERN_SCENARIOS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Play,
  RotateCcw,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  Flame,
} from 'lucide-react';

export const PatternSandbox: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [userPrediction, setUserPrediction] = useState<'LONG' | 'SHORT' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const scenario = PATTERN_SCENARIOS[activeScenarioIndex];

  // Combined candles up to revealed count
  const displayedCandles: Candle[] = [
    ...scenario.initialCandles,
    ...scenario.revealedCandles.slice(0, revealedCount),
  ];

  const handleMakePrediction = (prediction: 'LONG' | 'SHORT') => {
    setUserPrediction(prediction);
    // Reveal all remaining candles with simulated reveal
    setRevealedCount(scenario.revealedCandles.length);

    if (prediction === scenario.correctPrediction) {
      setScore((s) => s + 100);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleResetScenario = () => {
    setUserPrediction(null);
    setRevealedCount(0);
  };

  const handleNextScenario = () => {
    setActiveScenarioIndex((prev) => (prev + 1) % PATTERN_SCENARIOS.length);
    handleResetScenario();
  };

  // Simple clean SVG rendering of the candlestick scenario
  const minPrice = Math.min(...displayedCandles.map((c) => c.low)) * 0.999;
  const maxPrice = Math.max(...displayedCandles.map((c) => c.high)) * 1.001;
  const range = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 280;
  const candleSlotWidth = svgWidth / displayedCandles.length;

  const getY = (val: number) =>
    svgHeight - 30 - ((val - minPrice) / range) * (svgHeight - 60);

  return (
    <div className="space-y-8">
      {/* Title & Score Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Interactive Chart Pattern Laboratory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Institutional Pattern Backtester
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Test your price action instincts on actual market scenarios before risking real capital.
          </p>
        </div>

        {/* Gamified Score Tracker */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-current" />
            <div>
              <span className="block text-[10px] text-slate-400 font-sans uppercase">Streak</span>
              <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{streak} Correct</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <span className="block text-[10px] text-blue-500 dark:text-blue-400 font-sans uppercase">Score</span>
              <span className="text-base font-bold text-blue-700 dark:text-blue-300 tabular-nums">{score} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Zone: Candlestick Visualization Canvas */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#090D16] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400">
              Scenario {activeScenarioIndex + 1} of {PATTERN_SCENARIOS.length}:{' '}
              <strong className="text-white">{scenario.title}</strong>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-950 text-blue-400 border border-blue-900">
              {scenario.difficulty}
            </span>
          </div>

          {/* SVG Candlestick Arena */}
          <div className="relative w-full h-[300px] flex items-center justify-center my-4 overflow-hidden">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full select-none"
            >
              {/* Background gridlines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                const y = svgHeight * ratio;
                return (
                  <line
                    key={idx}
                    x1="0"
                    y1={y}
                    x2={svgWidth}
                    y2={y}
                    stroke="#1E293B"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Candles rendering */}
              {displayedCandles.map((c, i) => {
                const cx = i * candleSlotWidth + candleSlotWidth / 2;
                const isBull = c.close >= c.open;
                const color = isBull ? '#10B981' : '#F43F5E';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const bodyTop = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));
                const barWidth = Math.max(4, candleSlotWidth * 0.62);

                const isRevealed = i >= scenario.initialCandles.length;

                return (
                  <g key={i} className={isRevealed ? 'animate-fadeIn' : ''}>
                    {/* Wick */}
                    <line
                      x1={cx}
                      y1={yHigh}
                      x2={cx}
                      y2={yLow}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    {/* Body */}
                    <rect
                      x={cx - barWidth / 2}
                      y={bodyTop}
                      width={barWidth}
                      height={bodyHeight}
                      fill={color}
                      rx="1"
                    />
                  </g>
                );
              })}

              {/* Split separator between setup and outcome */}
              <line
                x1={scenario.initialCandles.length * candleSlotWidth}
                y1="0"
                x2={scenario.initialCandles.length * candleSlotWidth}
                y2={svgHeight}
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={scenario.initialCandles.length * candleSlotWidth + 6}
                y="20"
                fill="#60A5FA"
                fontSize="10"
                fontFamily="JetBrains Mono"
              >
                Prediction Point →
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-3 border-t border-slate-800">
            <span>Candle Bars: {displayedCandles.length}</span>
            <span>Blue line indicates execution split</span>
          </div>
        </div>

        {/* Right Zone: Interactive Control Deck & Masterclass Feedback */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                {scenario.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {scenario.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                {scenario.description}
              </p>
            </div>

            {/* Context Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Rule to consider:</strong> {scenario.ruleContext}
            </div>

            {/* Decision Prompt / Feedback */}
            {userPrediction === null ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Where will price expand next?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleMakePrediction('LONG')}
                    className="py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>LONG (BUY ↗)</span>
                  </button>
                  <button
                    onClick={() => handleMakePrediction('SHORT')}
                    className="py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-md shadow-rose-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <TrendingDown className="w-4 h-4" />
                    <span>SHORT (SELL ↘)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`p-4 rounded-xl border text-xs space-y-3 ${
                  userPrediction === scenario.correctPrediction
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/40 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {userPrediction === scenario.correctPrediction ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span>Bullseye! Prediction Confirmed (+100 PTS)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500" />
                      <span>Trap Triggered: Incorrect Direction</span>
                    </>
                  )}
                </div>

                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {scenario.explanation}
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                  <strong>Key Confirmation:</strong> {scenario.keyConfirmation}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handleResetScenario}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Scenario</span>
            </button>

            <button
              onClick={handleNextScenario}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Challenge</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
