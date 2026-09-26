import React, { useState } from 'react';
import { MasterclassWebinar } from '../types';
import { WEBINARS, ASSETS } from '../data/mockData';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  MessageSquare,
  CheckCircle,
  Radio,
  Send,
  Sparkles,
} from 'lucide-react';

export const WebinarSchedule: React.FC = () => {
  const [activeWebinar, setActiveWebinar] = useState<MasterclassWebinar | null>(null);
  const [isLiveRoomOpen, setIsLiveRoomOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string }[]
  >([
    { sender: 'David M. (UK)', text: 'Can you explain the EUR/USD 15m displacement?', time: '08:02' },
    { sender: 'Omar S. (Dubai)', text: 'Waiting for London open high sweep!', time: '08:04' },
    { sender: 'Marcus T. (USA)', text: 'Haris, what is your take on Gold today?', time: '08:05' },
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'You (Student)',
        text: inputMsg.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="space-y-10">
      {/* Featured Live Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-md">
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
          <img
            src={ASSETS.webinar}
            alt="HA Trader Masterclass Studio"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>LIVE BROADCAST · LONDON SESSION WAR ROOM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Live London Session Breakdown & Scalping Execution
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Watch Haris Ahmad trade the live market open in real-time. Full algorithmic analysis on EUR/USD, GBP/USD, and Gold with interactive voice commentary.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                842 Traders In Room
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Live Now (Ends in 1h 15m)
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLiveRoomOpen(true)}
            className="px-6 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>Enter Live Room</span>
          </button>
        </div>
      </div>

      {/* Masterclass Schedule Grid */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Upcoming Masterclasses & On-Demand Replays
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Reserve your seat for interactive video workshops hosted by our proprietary fund managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEBINARS.map((webinar) => (
            <div
              key={webinar.id}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-blue-500/40 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${
                      webinar.status === 'LIVE NOW'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : webinar.status === 'UPCOMING'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {webinar.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{webinar.date} · {webinar.time}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {webinar.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Mentor: <strong className="text-slate-700 dark:text-slate-200">{webinar.mentorName}</strong> ({webinar.mentorRole})
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Key Topics:
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {webinar.topics.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="line-clamp-1">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsLiveRoomOpen(true)}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{webinar.status === 'LIVE NOW' ? 'Join Live Stream' : 'Watch Replay'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Trader Founder Spotlight */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 shadow-xs">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-500/30 bg-slate-950">
          <img
            src={ASSETS.instructor}
            alt="Haris Ahmad, Founder of HA Trader Academy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
              Founder & Chief Trading Mentor
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Haris Ahmad
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            "At HA Trader Academy, our mandate is single-minded: strip away deceptive retail gimmicks and train traders to execute with mathematical institutional discipline. Every strategy we teach is backed by algorithmic order flow data and battle-tested across multi-million dollar prop accounts."
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-500 pt-1">
            <span>• 11+ Years Market Experience</span>
            <span>• $14M+ Student Funded Capital</span>
            <span>• Verified 68% Lifetime Win Rate</span>
          </div>
        </div>
      </div>

      {/* Live Stream Room Modal */}
      {isLiveRoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-white shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    HA Trader Live War Room: London Open Session
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Host: Haris Ahmad · 842 Active Participants
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLiveRoomOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Split: Video Stream Area (Left 70%) + Student Live Chat (Right 30%) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[440px]">
              {/* Video Player Mockup */}
              <div className="lg:col-span-8 bg-black relative flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
                <img
                  src={ASSETS.webinar}
                  alt="Live Stream"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center space-y-3 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm max-w-md">
                  <Radio className="w-8 h-8 text-rose-500 mx-auto animate-pulse" />
                  <h4 className="text-base font-bold text-white">
                    Live Stream Audio & Candlestick Feed Connected
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Haris Ahmad is currently breaking down the 15m Fair Value Gap on EUR/USD. Headphone audio enabled.
                  </p>
                  <div className="pt-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      ● 1080p 60FPS Low-Latency Feed
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Student Chat */}
              <div className="lg:col-span-4 flex flex-col bg-slate-950/90 h-[440px]">
                <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span>Live Trader Chat</span>
                  </span>
                  <span>Active</span>
                </div>

                {/* Messages Box */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs font-mono">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <strong className="text-blue-400 font-sans">{msg.sender}</strong>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-200 font-sans text-[11px] leading-snug">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask Haris a question..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
