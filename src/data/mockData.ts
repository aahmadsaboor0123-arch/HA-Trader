import {
  Course,
  TradeSignal,
  PatternScenario,
  MasterclassWebinar,
  JournalEntry,
  MarketSymbol,
  Candle,
} from '../types';

import heroFloorImg from '../assets/images/hero_trading_floor_1790438591876.jpg';
import instructorImg from '../assets/images/instructor_master_trader_1790438606005.jpg';
import priceActionImg from '../assets/images/course_price_action_1790438618617.jpg';
import smartMoneyImg from '../assets/images/course_smart_money_1790438631166.jpg';
import webinarImg from '../assets/images/student_community_webinar_1790438643200.jpg';

export const ASSETS = {
  heroFloor: heroFloorImg,
  instructor: instructorImg,
  priceAction: priceActionImg,
  smartMoney: smartMoneyImg,
  webinar: webinarImg,
};

export const INITIAL_MARKET_PRICES: Record<MarketSymbol, { base: number; spread: number; tickSize: number; digits: number }> = {
  'EUR/USD': { base: 1.0845, spread: 0.00012, tickSize: 0.0001, digits: 4 },
  'GBP/JPY': { base: 191.42, spread: 0.024, tickSize: 0.01, digits: 2 },
  'XAU/USD': { base: 2684.5, spread: 0.35, tickSize: 0.1, digits: 2 },
  'BTC/USDT': { base: 64280.0, spread: 2.5, tickSize: 0.5, digits: 1 },
  'US100': { base: 19840.0, spread: 1.2, tickSize: 0.25, digits: 1 },
  'ETH/USDT': { base: 2645.0, spread: 0.4, tickSize: 0.1, digits: 2 },
};

export const COURSES: Course[] = [
  {
    id: 'course-price-action',
    title: 'Pure Price Action & Candlestick Anatomy',
    tagline: 'Master naked chart reading without lagging indicators',
    level: 'Foundations',
    duration: '14 Hours',
    lessonCount: 22,
    enrolledStudents: 3420,
    rating: 4.9,
    image: priceActionImg,
    description:
      'Learn how institutional capital leaves indelible footprints on naked candlestick charts. You will decipher buying and selling pressure, key structure breaks, and high-probability multi-timeframe swing levels.',
    learningOutcomes: [
      'Recognize institutional wick rejections versus retail fakeouts',
      'Construct pristine support and resistance liquidity zones',
      'Align higher-timeframe order flow with lower-timeframe execution triggers',
      'Calculate dynamic risk-to-reward ratios before placing capital at risk',
    ],
    lessons: [
      {
        id: 'pa-1',
        title: 'Anatomy of the Candlestick & True Market Sentiment',
        duration: '28 min',
        description: 'Deconstruct open, high, low, and close to read who is winning the struggle between buyers and sellers.',
        content: [
          'Candlestick wicks represent price rejection; long lower wicks denote institutional absorption of sell orders.',
          'Candle bodies represent conviction; high-volume Marubozu candles reveal genuine continuation momentum.',
          'Never trade single-candle signals in isolation without context of the governing market structure.',
        ],
        keyRules: [
          'Rule 1: Context dictates candle meaning—a hammer at resistance is invalid; at support it is high probability.',
          'Rule 2: Measure relative volume on the rejection candle compared to the 20-period moving average.',
          'Rule 3: Wait for candle close confirmation before executing an entry order.',
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What does a long lower wick at an established daily support level indicate?',
            options: [
              'Sellers are aggressively maintaining dominance',
              'Buyers absorbed incoming sell volume and pushed price back up',
              'Market volatility has collapsed permanently',
              'An immediate short order must be placed',
            ],
            correctIndex: 1,
            explanation:
              'A long lower wick signifies that while bears attempted to push price lower, strong buyer demand absorbed the liquidity and closed the session back near the top.',
          },
        ],
      },
      {
        id: 'pa-2',
        title: 'Market Structure: Swing Highs, Lows & Trend Identification',
        duration: '35 min',
        description: 'Learn the strict mechanical criteria for valid Higher Highs, Higher Lows, and Market Structure Shifts (MSS).',
        content: [
          'Bullish trend definition: Sequential creation of Higher Highs (HH) and Higher Lows (HL).',
          'Break of Structure (BOS) vs Change of Character (CHoCH): BOS confirms continuation, CHoCH warns of early reversal.',
          'Handling complex pullbacks without being shaken out by minor internal noise.',
        ],
        keyRules: [
          'Rule 1: A swing point is only validated once price takes out the opposite fractal candle.',
          'Rule 2: A Change of Character must close past the previous swing low with body displacement, not just a wick sweep.',
        ],
      },
      {
        id: 'pa-3',
        title: 'Liquidity Pools & Stop Hunt Dynamics',
        duration: '42 min',
        description: 'Identify where retail stop losses accumulate and how institutional algorithms sweep these levels.',
        content: [
          'Retail books typically place stops just above equal highs (EQH) and beneath equal lows (EQL).',
          'Smart money requires counter-party liquidity to fill 8-figure and 9-figure institutional orders.',
          'Executing after the liquidity run (Turtle Soup pattern) drastically improves reward-to-risk ratio.',
        ],
        keyRules: [
          'Rule 1: Never place stops at obvious round numbers or flat horizontal levels.',
          'Rule 2: Treat equal highs as magnets for price rather than walls of resistance.',
        ],
      },
    ],
  },
  {
    id: 'course-smart-money',
    title: 'Institutional Smart Money Concepts & ICT Framework',
    tagline: 'Trade alongside bank order flow using Fair Value Gaps & Order Blocks',
    level: 'Advanced Institutional',
    duration: '26 Hours',
    lessonCount: 36,
    enrolledStudents: 4890,
    rating: 5.0,
    image: smartMoneyImg,
    description:
      'The flagship HA Trader institutional masterclass. Dive into algorithms, Fair Value Gaps (FVG), breaker blocks, premium vs discount pricing, time-and-price theory, and precision entry timing.',
    learningOutcomes: [
      'Pinpoint 3-candle Fair Value Gaps (imbalances) and institutional mitigation',
      'Identify valid bullish and bearish Order Blocks with displacement confirmation',
      'Utilize the London Open and New York Killzones for surgical intraday execution',
      'Scale prop firm accounts using rigorous mathematical drawdown boundaries',
    ],
    lessons: [
      {
        id: 'smc-1',
        title: 'Displacement & The 3-Candle Fair Value Gap (FVG)',
        duration: '45 min',
        description: 'Understand algorithmic pricing inefficiency and how market makers return to balance liquidity imbalances.',
        content: [
          'A Fair Value Gap exists when candle 1 high and candle 3 low do not overlap, leaving candle 2 with unfilled orders.',
          'Displacement is mandatory: if the candle lacks speed, the gap is fragile and unlikely to respect price.',
          'Consequent Encroachment (CE) represents the 50% midpoint of the FVG, offering the most optimal entry level.',
        ],
        keyRules: [
          'Rule 1: FVGs formed in the direction of Higher Timeframe order flow have a >75% respect rate.',
          'Rule 2: Stop loss must be placed safely beyond the origin of displacement, not inside the gap itself.',
        ],
        quiz: [
          {
            id: 'q-smc-1',
            question: 'What is Consequent Encroachment (CE) in Smart Money Concepts?',
            options: [
              'The highest wick of the daily session',
              'The exact 50% equilibrium midpoint of a Fair Value Gap',
              'The moving average crossover point',
              'The maximum slippage allowed on a broker terminal',
            ],
            correctIndex: 1,
            explanation:
              'Consequent Encroachment (CE) is the precise 50% mathematical midpoint of an imbalance or Fair Value Gap, where institutional limit orders frequently trigger.',
          },
        ],
      },
      {
        id: 'smc-2',
        title: 'Institutional Order Blocks: Valid vs Invalid Criteria',
        duration: '50 min',
        description: 'Distinguish between standard candles and true institutional order blocks where smart money accumulated volume.',
        content: [
          'A Bullish Order Block is the last down-close candle prior to an aggressive upward displacement breaking structure.',
          'Validation test: Did the candle sweep previous liquidity before moving? If yes, probability surges.',
          'Mitigation: Once price revisits the order block open or mean threshold, the unfilled orders are satisfied.',
        ],
        keyRules: [
          'Rule 1: Discard any order block that did not cause a subsequent Break of Structure.',
          'Rule 2: The mean threshold (50% of the OB body) should not be violated on a closing candle basis.',
        ],
      },
      {
        id: 'smc-3',
        title: 'Time & Price: London Open & New York Killzones',
        duration: '38 min',
        description: 'Why timing matters as much as price level. Exploiting Judas Swings during session overlaps.',
        content: [
          'London Killzone (02:00 - 05:00 EST): Often manufactures the high or low of the day through an early fakeout.',
          'New York Killzone (07:00 - 10:00 EST): Institutional release of high-impact macroeconomic data and trend continuation.',
          'Never enter positions during dead low-volume periods between 17:00 and 19:00 EST.',
        ],
        keyRules: [
          'Rule 1: Align setups strictly inside recognized Killzone windows.',
        ],
      },
    ],
  },
  {
    id: 'course-risk-mastery',
    title: 'Prop Firm Passing Protocol & Capital Risk Architecture',
    tagline: 'The mathematical framework for protecting capital and scaling to 7 figures',
    level: 'Intermediate',
    duration: '11 Hours',
    lessonCount: 16,
    enrolledStudents: 2750,
    rating: 4.8,
    image: heroFloorImg,
    description:
      '95% of aspiring traders fail prop firm evaluations not because of technical strategy, but because of emotional over-leveraging. Master strict 1% risk per trade math, dynamic position sizing, and maximum drawdown mitigation.',
    learningOutcomes: [
      'Calculate precise contract lots based on dollar stop-loss distance',
      'Implement tiered risk models to conquer FTMO, FundedNext, and MFF challenges',
      'Eliminate revenge trading through mechanical daily loss circuit breakers',
      'Maintain an institutional trading journal that exposes personal edge leakage',
    ],
    lessons: [
      {
        id: 'rm-1',
        title: 'The 1% Invariant: Position Sizing Mathematics',
        duration: '32 min',
        description: 'Convert variable pip distances into fixed mathematical risk limits.',
        content: [
          'Never trade fixed lot sizes across varying setups. A 10-pip stop and a 40-pip stop require completely different lots.',
          'Formula: Lot Size = (Account Balance * Risk %) / (Stop Distance * Tick Value).',
          'Consistent risk sizing allows probability and positive expectancy to work over hundreds of trades.',
        ],
        keyRules: [
          'Rule 1: Maximum risk per trade during evaluation phases: 0.50% to 1.0%.',
          'Rule 2: If 2 consecutive losses occur in a single day, cease all trading until the next morning.',
        ],
      },
    ],
  },
];

export const LIVE_SIGNALS: TradeSignal[] = [
  {
    id: 'sig-xau-1',
    pair: 'XAU/USD',
    direction: 'BUY',
    timeframe: '15m / 1h',
    entry: 2678.5,
    stopLoss: 2669.0,
    tp1: 2692.0,
    tp2: 2708.0,
    riskReward: '1 : 3.1',
    status: 'ACTIVE',
    publishedTime: '18 mins ago',
    mentor: 'Haris Ahmad (Founder)',
    technicalThesis:
      'Gold swept Asian session low at 2674.20 into 4H Bullish Order Block. Displaced aggressively upward creating a 15m Fair Value Gap between 2677.8 and 2680.1. Entering on FVG retest targeting external liquidity at 2692 and previous weekly high at 2708.',
    chartPoints: [2674.2, 2678.5, 2692.0, 2708.0],
  },
  {
    id: 'sig-eur-2',
    pair: 'EUR/USD',
    direction: 'SELL',
    timeframe: '5m / 15m',
    entry: 1.0872,
    stopLoss: 1.0895,
    tp1: 1.0835,
    tp2: 1.0805,
    riskReward: '1 : 2.9',
    status: 'HIT TP1',
    publishedTime: '2 hours ago',
    mentor: 'Elena Vance (Chief Macro Analyst)',
    technicalThesis:
      'London Open Judas Swing cleared yesterday high by 4 pips before sharp rejection with massive selling volume. Change of Character on 5m chart confirmed. First target reached (+37 pips), runners adjusted to Breakeven.',
    chartPoints: [1.0894, 1.0872, 1.0835, 1.0805],
  },
  {
    id: 'sig-btc-3',
    pair: 'BTC/USDT',
    direction: 'BUY',
    timeframe: '1h / 4h',
    entry: 63800.0,
    stopLoss: 62900.0,
    tp1: 65400.0,
    tp2: 67200.0,
    riskReward: '1 : 3.8',
    status: 'ACTIVE',
    publishedTime: '45 mins ago',
    mentor: 'Tariq Malik (Crypto Lead)',
    technicalThesis:
      'Bitcoin formed a textbook bullish continuation flag directly above the 200 EMA on the 4H timeframe. Massive funding rate reset indicates leveraged longs were flushed out. Clean runway toward 65.4k liquidity sweep.',
    chartPoints: [63200.0, 63800.0, 65400.0, 67200.0],
  },
  {
    id: 'sig-us100-4',
    pair: 'US100',
    direction: 'SELL',
    timeframe: '15m',
    entry: 19910.0,
    stopLoss: 19995.0,
    tp1: 19780.0,
    tp2: 19650.0,
    riskReward: '1 : 2.6',
    status: 'HIT TP2',
    publishedTime: '5 hours ago',
    mentor: 'Haris Ahmad (Founder)',
    technicalThesis:
      'Nasdaq met weekly premium pricing zone at 20,000 psychological handle. Clear triple tap divergence on 15m RSI followed by displacement candle through key support. Both profit targets smashed flawlessly (+260 pts).',
    chartPoints: [19990.0, 19910.0, 19780.0, 19650.0],
  },
  {
    id: 'sig-gbpjpy-5',
    pair: 'GBP/JPY',
    direction: 'BUY',
    timeframe: '30m',
    entry: 190.85,
    stopLoss: 190.35,
    tp1: 191.80,
    tp2: 192.60,
    riskReward: '1 : 3.5',
    status: 'PENDING',
    publishedTime: '1 hour ago',
    mentor: 'Haris Ahmad (Founder)',
    technicalThesis:
      'Waiting for price to pull back into the 30m Consequent Encroachment at 190.85 after BoJ rate announcement reaction. High volatility expected—strictly limit order execution only.',
    chartPoints: [190.35, 190.85, 191.8, 192.6],
  },
];

export const PATTERN_SCENARIOS: PatternScenario[] = [
  {
    id: 'pat-1',
    title: 'The Liquidity Purge & Institutional Reversal',
    category: 'Smart Money Concepts',
    difficulty: 'Intermediate',
    description:
      'Examine this 15-minute EUR/USD setup. Price has consolidated below a visible double top. Notice the quick spike through the high on low candle volume, followed by a heavy bearish candle closing back inside the range.',
    ruleContext:
      'When price sweeps clean highs and immediately closes below the previous swing structure with displacement, this is a Turtle Soup / Liquidity Purge, NOT a breakout.',
    initialCandles: [
      { timestamp: 1, open: 1.082, high: 1.0835, low: 1.0818, close: 1.0832, volume: 140 },
      { timestamp: 2, open: 1.0832, high: 1.084, low: 1.0825, close: 1.0838, volume: 160 },
      { timestamp: 3, open: 1.0838, high: 1.0841, low: 1.083, close: 1.0839, volume: 120 },
      { timestamp: 4, open: 1.0839, high: 1.0862, low: 1.0836, close: 1.0845, volume: 290 },
      { timestamp: 5, open: 1.0845, high: 1.0848, low: 1.0815, close: 1.0819, volume: 480 },
    ],
    revealedCandles: [
      { timestamp: 6, open: 1.0819, high: 1.0824, low: 1.0805, close: 1.0808, volume: 380 },
      { timestamp: 7, open: 1.0808, high: 1.0812, low: 1.0792, close: 1.0795, volume: 410 },
      { timestamp: 8, open: 1.0795, high: 1.0802, low: 1.0778, close: 1.0782, volume: 520 },
    ],
    correctPrediction: 'SHORT',
    explanation:
      'The long upper wick above 1.0860 trapped breakout buyers and triggered stop losses, generating sell-side liquidity for institutions to open massive short orders. The subsequent displacement candle confirms bearish intent.',
    keyConfirmation: 'Displacement body close back under the 1.0838 swing high.',
  },
  {
    id: 'pat-2',
    title: 'Fair Value Gap Mitigation & Trend Continuation',
    category: 'Price Action',
    difficulty: 'Master',
    description:
      'Gold (XAU/USD) experienced a massive upward surge on high volume, leaving an unfilled 3-candle imbalance. Price has slowly retraced into the 50% Consequent Encroachment (CE) level with waning selling momentum.',
    ruleContext:
      'Institutional algorithms reprice back to imbalances to fill unfilled limit orders before resuming the dominant trend direction.',
    initialCandles: [
      { timestamp: 1, open: 2650, high: 2654, low: 2648, close: 2653, volume: 210 },
      { timestamp: 2, open: 2653, high: 2675, low: 2652, close: 2673, volume: 950 },
      { timestamp: 3, open: 2673, high: 2682, low: 2670, close: 2680, volume: 420 },
      { timestamp: 4, open: 2680, high: 2681, low: 2668, close: 2670, volume: 180 },
      { timestamp: 5, open: 2670, high: 2671, low: 2663, close: 2664, volume: 130 },
    ],
    revealedCandles: [
      { timestamp: 6, open: 2664, high: 2678, low: 2663, close: 2676, volume: 680 },
      { timestamp: 7, open: 2676, high: 2690, low: 2674, close: 2688, volume: 820 },
      { timestamp: 8, open: 2688, high: 2704, low: 2686, close: 2702, volume: 910 },
    ],
    correctPrediction: 'LONG',
    explanation:
      'The 2663 level met the 50% Consequent Encroachment of the FVG. The diminishing volume on the pullback proved that sellers were merely liquidating profit rather than building new short positions. The explosive bounce resumed the trend toward 2700.',
    keyConfirmation: 'Bullish hammer wick reaction at exactly 2663 Consequent Encroachment.',
  },
  {
    id: 'pat-3',
    title: 'Bear Flag Breakdown at Daily Supply',
    category: 'Harmonic & Chart Formations',
    difficulty: 'Beginner',
    description:
      'Bitcoin dropped violently, consolidated upward in an ascending parallel channel with declining buy volume, and is now testing the lower channel boundary under heavy overhead supply.',
    ruleContext:
      'Upward slanting consolidation following an impulse drop is a classic Bear Flag pattern. Probability favors downside continuation.',
    initialCandles: [
      { timestamp: 1, open: 66000, high: 66100, low: 63500, close: 63800, volume: 1200 },
      { timestamp: 2, open: 63800, high: 64200, low: 63700, close: 64100, volume: 340 },
      { timestamp: 3, open: 64100, high: 64600, low: 64000, close: 64450, volume: 290 },
      { timestamp: 4, open: 64450, high: 64900, low: 64300, close: 64750, volume: 220 },
      { timestamp: 5, open: 64750, high: 64800, low: 64150, close: 64200, volume: 460 },
    ],
    revealedCandles: [
      { timestamp: 6, open: 64200, high: 64300, low: 63200, close: 63400, volume: 890 },
      { timestamp: 7, open: 63400, high: 63600, low: 62400, close: 62600, volume: 1040 },
      { timestamp: 8, open: 62600, high: 62800, low: 61500, close: 61800, volume: 1120 },
    ],
    correctPrediction: 'SHORT',
    explanation:
      'The ascending wedge had decreasing volume, displaying clear buyer exhaustion. Once candle 5 broke below the lower channel boundary, institutional sell stops triggered a cascade to 61.8k.',
    keyConfirmation: 'Candle close outside the upward slanting channel with volume surge.',
  },
];

export const WEBINARS: MasterclassWebinar[] = [
  {
    id: 'web-1',
    title: 'Live London Session Breakdown & Scalping Execution',
    mentorName: 'Haris Ahmad',
    mentorRole: 'Founder & Head Trader, HA Trader Academy',
    date: 'Today',
    time: '08:00 AM GMT (Live in 45m)',
    status: 'LIVE NOW',
    registeredCount: 842,
    topics: ['EUR/USD & GBP/USD Live Order Flow', 'London Open Judas Swing Strategy', 'Instant Q&A Trade Review'],
    thumbnail: webinarImg,
  },
  {
    id: 'web-2',
    title: 'Advanced Order Block Mechanics & Liquidity Voids',
    mentorName: 'Elena Vance',
    mentorRole: 'Macro Economist & Senior Mentor',
    date: 'Tomorrow, Oct 14',
    time: '02:00 PM EST',
    status: 'UPCOMING',
    registeredCount: 1420,
    topics: ['Breaker Blocks vs Mitigation Blocks', 'High-Probability Stop Placement', 'Prop Firm Risk Calibration'],
    thumbnail: smartMoneyImg,
  },
  {
    id: 'web-3',
    title: 'Mastering Gold (XAU/USD) Intraday Volatility',
    mentorName: 'Haris Ahmad',
    mentorRole: 'Founder & Head Trader, HA Trader Academy',
    date: 'Recorded Masterclass',
    time: '2h 15m Full Session',
    status: 'RECORDING',
    registeredCount: 3180,
    topics: ['Gold London Fix Analysis', 'DXY Correlation Mechanics', 'SMC Execution on 1-Minute Chart'],
    thumbnail: priceActionImg,
  },
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-1',
    date: '2026-09-25',
    symbol: 'EUR/USD',
    action: 'BUY',
    entryPrice: 1.0835,
    exitPrice: 1.0882,
    profit: 470.0,
    riskReward: '1 : 3.4',
    session: 'London Open',
    setupType: 'Fair Value Gap',
    emotion: 'Disciplined',
    notes: 'Waited patiently for 15m FVG mitigation after previous day low sweep. Clean 1% risk executed with zero hesitation.',
    tags: ['SMC', 'FVG', 'London Session'],
  },
  {
    id: 'j-2',
    date: '2026-09-24',
    symbol: 'XAU/USD',
    action: 'BUY',
    entryPrice: 2665.4,
    exitPrice: 2684.1,
    profit: 935.0,
    riskReward: '1 : 4.1',
    session: 'New York Open',
    setupType: 'Liquidity Sweep',
    emotion: 'Confident',
    notes: 'Entered on 5m displacement after Asian low was purged. Took partials at TP1 (+100 pips) and let runner tag 2684.',
    tags: ['Gold', 'Turtle Soup', 'Prop Challenge'],
  },
  {
    id: 'j-3',
    date: '2026-09-22',
    symbol: 'BTC/USDT',
    action: 'SELL',
    entryPrice: 64200.0,
    exitPrice: 64450.0,
    profit: -250.0,
    riskReward: '1 : 2.5',
    session: 'Asia Range',
    setupType: 'Break & Retest',
    emotion: 'Hesitant',
    notes: 'Took trade too early before hourly candle close. Stopped out with standard controlled 0.5% risk as planned.',
    tags: ['Crypto', 'Controlled Loss'],
  },
];
