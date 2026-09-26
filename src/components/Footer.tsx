import React from 'react';
import { HaTraderLogo } from './HaTraderLogo';
import { ShieldCheck, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDark }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <HaTraderLogo size="md" theme={isDark ? 'dark' : 'light'} />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              HA Trader Trading Academy is an institutional market education community founded by Haris Ahmad. We specialize in Price Action, ICT Smart Money Concepts, and Prop Firm Passing protocols.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Verified Educational Provider
              </span>
              <span>• Founded 2020</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Academy Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('academy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Price Action & SMC Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Live Market Simulator Room
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('signals')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Institutional Trade Signals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sandbox')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Pattern Recognition Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Trader Psychology & Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Mentorship */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Mentorship & Community
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('masterclasses')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Live London & NY War Rooms
                </button>
              </li>
              <li>
                <span className="text-slate-400">Haris Ahmad Mentorship Desk</span>
              </li>
              <li>
                <span className="text-slate-400">Prop Firm Passing Blueprint</span>
              </li>
              <li>
                <span className="text-slate-400">VIP Discord & Telegram Hub</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclaimer (Standard for Trading Academies) */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Risk Warning:</strong> Trading foreign exchange (Forex), commodities, indices, and cryptocurrencies involves significant risk of capital loss and is not suitable for all investors. HA Trader Trading Academy provides educational and analytical training materials only and does not provide individualized financial or investment advice. Simulated trading performance does not guarantee future results.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-slate-500 font-mono text-[10px]">
            <span>© 2026 HA Trader Trading Academy. All Rights Reserved.</span>
            <span>Designed for Disciplined Market Operators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
