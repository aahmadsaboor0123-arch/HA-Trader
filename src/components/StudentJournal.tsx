import React, { useState } from 'react';
import { JournalEntry, MarketSymbol } from '../types';
import { INITIAL_JOURNAL_ENTRIES } from '../data/mockData';
import {
  FileText,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
  Award,
  Sparkles,
  Trash2,
} from 'lucide-react';

export const StudentJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [filterSetup, setFilterSetup] = useState<string>('All');
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);

  // Form states for new entry
  const [formSymbol, setFormSymbol] = useState<MarketSymbol>('XAU/USD');
  const [formAction, setFormAction] = useState<'BUY' | 'SELL'>('BUY');
  const [formEntry, setFormEntry] = useState<number>(2680.0);
  const [formExit, setFormExit] = useState<number>(2695.5);
  const [formProfit, setFormProfit] = useState<number>(620.0);
  const [formRR, setFormRR] = useState<string>('1 : 3.2');
  const [formSession, setFormSession] = useState<
    'London Open' | 'New York Open' | 'Asia Range' | 'Post-NY'
  >('New York Open');
  const [formSetup, setFormSetup] = useState<
    'Fair Value Gap' | 'Order Block Mitigation' | 'Liquidity Sweep' | 'Break & Retest'
  >('Fair Value Gap');
  const [formEmotion, setFormEmotion] = useState<
    'Disciplined' | 'Confident' | 'Hesitant' | 'FOMO / Impulsive'
  >('Disciplined');
  const [formNotes, setFormNotes] = useState<string>('');

  const filteredEntries =
    filterSetup === 'All'
      ? entries
      : entries.filter((e) => e.setupType === filterSetup);

  // Performance calculations
  const totalProfit = entries.reduce((acc, e) => acc + e.profit, 0);
  const winningTrades = entries.filter((e) => e.profit > 0);
  const winRate =
    entries.length > 0
      ? ((winningTrades.length / entries.length) * 100).toFixed(1)
      : '0.0';
  const grossProfit = winningTrades.reduce((acc, e) => acc + e.profit, 0);
  const grossLoss = Math.abs(
    entries.filter((e) => e.profit < 0).reduce((acc, e) => acc + e.profit, 0)
  );
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : '3.80';

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      symbol: formSymbol,
      action: formAction,
      entryPrice: formEntry,
      exitPrice: formExit,
      profit: formProfit,
      riskReward: formRR,
      session: formSession,
      setupType: formSetup,
      emotion: formEmotion,
      notes: formNotes || 'Executed per HA Trader mechanical criteria.',
      tags: [formSetup, formSession],
    };

    setEntries([newEntry, ...entries]);
    setIsLogModalOpen(false);
    setFormNotes('');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Summary Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Trader Psychology & Execution Audit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Personal Trading Journal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track metrics, manage drawdown leaks, and analyze psychological discipline trade-by-trade.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Trade</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Net Realized PnL
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`text-2xl font-black font-mono tabular-nums ${
                totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans mt-1 block">Across {entries.length} logged trades</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Win Rate
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono tabular-nums text-blue-600 dark:text-blue-400">
              {winRate}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans mt-1 block">
            {winningTrades.length} Wins / {entries.length - winningTrades.length} Losses
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Profit Factor
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {profitFactor}
            </span>
          </div>
          <span className="text-[11px] text-emerald-500 font-sans mt-1 block">Above 2.0 benchmark (Institutional)</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Disciplined Rule Adherence
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono tabular-nums text-emerald-500">
              {entries.length > 0
                ? (
                    (entries.filter((e) => e.emotion === 'Disciplined' || e.emotion === 'Confident').length /
                      entries.length) *
                    100
                  ).toFixed(0)
                : 100}
              %
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans mt-1 block">Zero revenge trading episodes</span>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Setup Filter:
            </h3>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {['All', 'Fair Value Gap', 'Liquidity Sweep', 'Break & Retest', 'Order Block Mitigation'].map(
              (setup) => (
                <button
                  key={setup}
                  onClick={() => setFilterSetup(setup)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    filterSetup === setup
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {setup}
                </button>
              )
            )}
          </div>
        </div>

        {/* Ledger */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Pair</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Setup / Session</th>
                <th className="py-3 px-4 font-semibold">Entry / Exit</th>
                <th className="py-3 px-4 font-semibold">R:R</th>
                <th className="py-3 px-4 font-semibold">Psychology</th>
                <th className="py-3 px-4 font-semibold text-right">Net Profit</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEntries.map((entry) => {
                const isWin = entry.profit > 0;
                return (
                  <tr key={entry.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{entry.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {entry.symbol}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          entry.action === 'BUY'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {entry.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-sans font-semibold text-slate-900 dark:text-white">
                        {entry.setupType}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{entry.session}</div>
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {entry.entryPrice} → {entry.exitPrice}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {entry.riskReward}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-sans ${
                          entry.emotion === 'Disciplined'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                            : entry.emotion === 'Confident'
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {entry.emotion}
                      </span>
                    </td>
                    <td
                      className={`py-3.5 px-4 tabular-nums font-bold text-right whitespace-nowrap ${
                        isWin ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isWin ? '+' : ''}${entry.profit.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Trade Entry Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log New Journal Trade
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Symbol</label>
                  <select
                    value={formSymbol}
                    onChange={(e) => setFormSymbol(e.target.value as MarketSymbol)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="XAU/USD">XAU/USD (Gold)</option>
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/JPY">GBP/JPY</option>
                    <option value="BTC/USDT">BTC/USDT</option>
                    <option value="US100">US100 (Nasdaq)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Action</label>
                  <select
                    value={formAction}
                    onChange={(e) => setFormAction(e.target.value as 'BUY' | 'SELL')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="BUY">BUY / LONG</option>
                    <option value="SELL">SELL / SHORT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="any"
                    value={formEntry}
                    onChange={(e) => setFormEntry(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Exit Price</label>
                  <input
                    type="number"
                    step="any"
                    value={formExit}
                    onChange={(e) => setFormExit(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Profit ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={formProfit}
                    onChange={(e) => setFormProfit(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Setup Type</label>
                  <select
                    value={formSetup}
                    onChange={(e) => setFormSetup(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Fair Value Gap">Fair Value Gap</option>
                    <option value="Liquidity Sweep">Liquidity Sweep</option>
                    <option value="Order Block Mitigation">Order Block Mitigation</option>
                    <option value="Break & Retest">Break & Retest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Trading Session</label>
                  <select
                    value={formSession}
                    onChange={(e) => setFormSession(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="London Open">London Open</option>
                    <option value="New York Open">New York Open</option>
                    <option value="Asia Range">Asia Range</option>
                    <option value="Post-NY">Post-NY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Psychological State</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Disciplined', 'Confident', 'Hesitant', 'FOMO / Impulsive'].map((emo) => (
                    <button
                      type="button"
                      key={emo}
                      onClick={() => setFormEmotion(emo as any)}
                      className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                        formEmotion === emo
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Notes & Rationale</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Why did you enter? Did you wait for candle close?"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-sm"
                >
                  Save to Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
