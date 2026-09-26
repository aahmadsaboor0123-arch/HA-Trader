import React, { useState } from 'react';
import { TradeSignal, MarketSymbol } from '../types';
import { LIVE_SIGNALS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Target,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Send,
  Zap,
} from 'lucide-react';

interface SignalsHubProps {
  onSendToSimulator: (signal: {
    pair: MarketSymbol;
    direction: 'BUY' | 'SELL';
    entry: number;
    stopLoss: number;
    takeProfit: number;
  }) => void;
}

export const SignalsHub: React.FC<SignalsHubProps> = ({ onSendToSimulator }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSignal, setSelectedSignal] = useState<TradeSignal | null>(null);

  const categories = ['All', 'Forex', 'Crypto', 'Indices'];

  const filteredSignals = LIVE_SIGNALS.filter((sig) => {
    // Category filter
    let matchCat = true;
    if (filterCategory === 'Forex') {
      matchCat = sig.pair === 'EUR/USD' || sig.pair === 'GBP/JPY' || sig.pair === 'XAU/USD';
    } else if (filterCategory === 'Crypto') {
      matchCat = sig.pair === 'BTC/USDT' || sig.pair === 'ETH/USDT';
    } else if (filterCategory === 'Indices') {
      matchCat = sig.pair === 'US100';
    }

    // Status filter
    let matchStatus = true;
    if (statusFilter === 'Active') {
      matchStatus = sig.status === 'ACTIVE' || sig.status === 'PENDING';
    } else if (statusFilter === 'Completed') {
      matchStatus = sig.status === 'HIT TP1' || sig.status === 'HIT TP2';
    }

    return matchCat && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Institutional Order Flow Signals</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Real-Time Market Setups
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            SMC & Price Action swing setups published directly by Haris Ahmad and senior academy analysts.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {['All', 'Active', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSignals.map((signal) => {
          const isBuy = signal.direction === 'BUY';
          const isHit = signal.status.includes('HIT');
          return (
            <div
              key={signal.id}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-xs hover:border-blue-500/40 transition-all"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isBuy
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}
                  >
                    {isBuy ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {signal.pair}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          isBuy
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {signal.direction}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      TF: {signal.timeframe} · {signal.publishedTime}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      signal.status === 'ACTIVE'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 animate-pulse'
                        : isHit
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {isHit && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{signal.status}</span>
                  </span>
                  <div className="text-[11px] font-mono font-bold text-slate-500 mt-1">
                    R:R {signal.riskReward}
                  </div>
                </div>
              </div>

              {/* Price Targets Spectrum */}
              <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-center font-mono">
                <div>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold">
                    Stop Loss
                  </span>
                  <span className="text-xs font-bold tabular-nums text-rose-500">
                    {signal.stopLoss}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold">
                    Entry Zone
                  </span>
                  <span className="text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                    {signal.entry}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold">
                    Target 1
                  </span>
                  <span className="text-xs font-bold tabular-nums text-emerald-500">
                    {signal.tp1}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold">
                    Target 2
                  </span>
                  <span className="text-xs font-bold tabular-nums text-emerald-400">
                    {signal.tp2}
                  </span>
                </div>
              </div>

              {/* Technical Thesis Explanation */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Institutional Thesis
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80">
                  {signal.technicalThesis}
                </p>
              </div>

              {/* Analyst & Action */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Analyst: <strong className="text-slate-700 dark:text-slate-200">{signal.mentor}</strong>
                </span>

                <button
                  onClick={() =>
                    onSendToSimulator({
                      pair: signal.pair,
                      direction: signal.direction,
                      entry: signal.entry,
                      stopLoss: signal.stopLoss,
                      takeProfit: signal.tp2,
                    })
                  }
                  className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Test in Simulator</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
