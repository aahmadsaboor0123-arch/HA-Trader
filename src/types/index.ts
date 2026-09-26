export type MarketSymbol = 'EUR/USD' | 'GBP/JPY' | 'XAU/USD' | 'BTC/USDT' | 'US100' | 'ETH/USDT';

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '1D';

export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradeOrder {
  id: string;
  symbol: MarketSymbol;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  lotSize: number;
  stopLoss: number;
  takeProfit: number;
  pnl: number;
  status: 'OPEN' | 'CLOSED';
  openTime: number;
  closeTime?: number;
  closePrice?: number;
}

export interface AccountState {
  balance: number;
  equity: number;
  marginUsed: number;
  freeMargin: number;
  totalPnl: number;
  winRate: number;
  tradesClosed: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string[];
  keyRules: string[];
  quiz?: QuizQuestion[];
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  level: 'Foundations' | 'Intermediate' | 'Advanced Institutional';
  duration: string;
  lessonCount: number;
  enrolledStudents: number;
  rating: number;
  image: string;
  description: string;
  learningOutcomes: string[];
  lessons: Lesson[];
}

export interface TradeSignal {
  id: string;
  pair: MarketSymbol;
  direction: 'BUY' | 'SELL';
  timeframe: string;
  entry: number;
  stopLoss: number;
  tp1: number;
  tp2: number;
  riskReward: string;
  status: 'ACTIVE' | 'HIT TP1' | 'HIT TP2' | 'STOPPED' | 'PENDING';
  publishedTime: string;
  mentor: string;
  technicalThesis: string;
  chartPoints?: number[];
}

export interface PatternScenario {
  id: string;
  title: string;
  category: 'Price Action' | 'Smart Money Concepts' | 'Harmonic & Chart Formations';
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  description: string;
  ruleContext: string;
  initialCandles: Candle[];
  revealedCandles: Candle[];
  correctPrediction: 'LONG' | 'SHORT';
  explanation: string;
  keyConfirmation: string;
}

export interface MasterclassWebinar {
  id: string;
  title: string;
  mentorName: string;
  mentorRole: string;
  date: string;
  time: string;
  status: 'LIVE NOW' | 'UPCOMING' | 'RECORDING';
  registeredCount: number;
  topics: string[];
  thumbnail: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  symbol: MarketSymbol;
  action: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  profit: number;
  riskReward: string;
  session: 'London Open' | 'New York Open' | 'Asia Range' | 'Post-NY';
  setupType: 'Fair Value Gap' | 'Order Block Mitigation' | 'Liquidity Sweep' | 'Break & Retest';
  emotion: 'Disciplined' | 'Confident' | 'Hesitant' | 'FOMO / Impulsive';
  notes: string;
  tags: string[];
}
