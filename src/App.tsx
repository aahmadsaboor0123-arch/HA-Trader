import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AcademyCatalog } from './components/AcademyCatalog';
import { LiveMarketSimulator } from './components/LiveMarketSimulator';
import { SignalsHub } from './components/SignalsHub';
import { PatternSandbox } from './components/PatternSandbox';
import { WebinarSchedule } from './components/WebinarSchedule';
import { StudentJournal } from './components/StudentJournal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { Footer } from './components/Footer';
import { TradeOrder, MarketSymbol } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('academy');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(50000.0);
  const [activeTrades, setActiveTrades] = useState<TradeOrder[]>([
    {
      id: 'trade-init-1',
      symbol: 'XAU/USD',
      type: 'BUY',
      entryPrice: 2678.5,
      lotSize: 1.0,
      stopLoss: 2669.0,
      takeProfit: 2708.0,
      pnl: 600.0,
      status: 'OPEN',
      openTime: Date.now() - 3600000,
    },
  ]);
  const [closedTrades, setClosedTrades] = useState<TradeOrder[]>([]);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [prefillSignal, setPrefillSignal] = useState<{
    pair: MarketSymbol;
    direction: 'BUY' | 'SELL';
    entry: number;
    stopLoss: number;
    takeProfit: number;
  } | null>(null);

  // Sync dark class on document html tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleResetBalance = () => {
    if (confirm('Reset paper trading balance back to $50,000.00?')) {
      setBalance(50000.0);
      setActiveTrades([]);
    }
  };

  const handleSendSignalToSimulator = (signal: {
    pair: MarketSymbol;
    direction: 'BUY' | 'SELL';
    entry: number;
    stopLoss: number;
    takeProfit: number;
  }) => {
    setPrefillSignal(signal);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const equity =
    balance + activeTrades.reduce((acc, t) => acc + (t.status === 'OPEN' ? t.pnl : 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        balance={balance}
        equity={equity}
        onResetBalance={handleResetBalance}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'academy' && (
          <AcademyCatalog
            onStartTrading={() => {
              setActiveTab('simulator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSignals={() => {
              setActiveTab('signals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'simulator' && (
          <LiveMarketSimulator
            balance={balance}
            setBalance={setBalance}
            activeTrades={activeTrades}
            setActiveTrades={setActiveTrades}
            closedTrades={closedTrades}
            setClosedTrades={setClosedTrades}
            prefillSignal={prefillSignal}
          />
        )}

        {activeTab === 'signals' && (
          <SignalsHub onSendToSimulator={handleSendSignalToSimulator} />
        )}

        {activeTab === 'sandbox' && <PatternSandbox />}

        {activeTab === 'masterclasses' && <WebinarSchedule />}

        {activeTab === 'journal' && <StudentJournal />}
      </main>

      {/* Student Portal & Credentials Modal */}
      <StudentPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        balance={balance}
      />

      {/* Unified Brand Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} isDark={isDark} />
    </div>
  );
}
