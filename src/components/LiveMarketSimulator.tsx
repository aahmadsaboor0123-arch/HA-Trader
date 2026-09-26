import React, { useState, useEffect, useRef } from 'react';
import { MarketSymbol, Timeframe, Candle, TradeOrder } from '../types';
import { INITIAL_MARKET_PRICES } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Sliders,
  DollarSign,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface LiveMarketSimulatorProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  activeTrades: TradeOrder[];
  setActiveTrades: React.Dispatch<React.SetStateAction<TradeOrder[]>>;
  closedTrades: TradeOrder[];
  setClosedTrades: React.Dispatch<React.SetStateAction<TradeOrder[]>>;
  prefillSignal?: {
    pair: MarketSymbol;
    direction: 'BUY' | 'SELL';
    entry: number;
    stopLoss: number;
    takeProfit: number;
  } | null;
}

export const LiveMarketSimulator: React.FC<LiveMarketSimulatorProps> = ({
  balance,
  setBalance,
  activeTrades,
  setActiveTrades,
  closedTrades,
  setClosedTrades,
  prefillSignal,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<MarketSymbol>('XAU/USD');
  const [timeframe, setTimeframe] = useState<Timeframe>('15m');
  const [currentPrice, setCurrentPrice] = useState<number>(2684.5);
  const [priceChange24h, setPriceChange24h] = useState<number>(1.24);

  // Indicators toggle
  const [showEma20, setShowEma20] = useState<boolean>(true);
  const [showEma50, setShowEma50] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showRsi, setShowRsi] = useState<boolean>(true);

  // Order ticket state
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [lotSize, setLotSize] = useState<number>(1.0);
  const [stopLoss, setStopLoss] = useState<number>(2672.0);
  const [takeProfit, setTakeProfit] = useState<number>(2708.0);
  const [notification, setNotification] = useState<string | null>(null);

  // Candle history
  const [candles, setCandles] = useState<Candle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle prefill signal if triggered from Signal Hub
  useEffect(() => {
    if (prefillSignal) {
      setSelectedSymbol(prefillSignal.pair);
      setOrderType(prefillSignal.direction);
      setStopLoss(prefillSignal.stopLoss);
      setTakeProfit(prefillSignal.takeProfit);
      setNotification(`Loaded signal for ${prefillSignal.pair} into order terminal`);
      setTimeout(() => setNotification(null), 4000);
    }
  }, [prefillSignal]);

  // Initialize market candles when symbol changes
  useEffect(() => {
    const config = INITIAL_MARKET_PRICES[selectedSymbol];
    let price = config.base;
    setCurrentPrice(price);

    const initialCandleList: Candle[] = [];
    const count = 48;
    const now = Date.now();
    const intervalMs = 60 * 1000 * 15; // 15m default

    for (let i = count; i >= 0; i--) {
      const volatility = config.base * 0.0025;
      const change = (Math.random() - 0.49) * volatility;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * (volatility * 0.7);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.7);
      const volume = Math.floor(100 + Math.random() * 500);

      initialCandleList.push({
        timestamp: now - i * intervalMs,
        open,
        high,
        low,
        close,
        volume,
      });

      price = close;
    }

    setCandles(initialCandleList);
    setCurrentPrice(price);

    // Set intelligent default SL & TP
    const slOffset = config.base * 0.004;
    const tpOffset = config.base * 0.008;
    if (orderType === 'BUY') {
      setStopLoss(parseFloat((price - slOffset).toFixed(config.digits)));
      setTakeProfit(parseFloat((price + tpOffset).toFixed(config.digits)));
    } else {
      setStopLoss(parseFloat((price + slOffset).toFixed(config.digits)));
      setTakeProfit(parseFloat((price - tpOffset).toFixed(config.digits)));
    }
  }, [selectedSymbol]);

  // Real-time market tick engine
  useEffect(() => {
    const config = INITIAL_MARKET_PRICES[selectedSymbol];
    const tickInterval = setInterval(() => {
      setCandles((prevCandles) => {
        if (prevCandles.length === 0) return prevCandles;

        const lastCandle = { ...prevCandles[prevCandles.length - 1] };
        const tickDelta = (Math.random() - 0.495) * (config.base * 0.0006);
        const newClose = parseFloat((lastCandle.close + tickDelta).toFixed(config.digits));
        const newHigh = Math.max(lastCandle.high, newClose);
        const newLow = Math.min(lastCandle.low, newClose);

        lastCandle.close = newClose;
        lastCandle.high = newHigh;
        lastCandle.low = newLow;
        lastCandle.volume += Math.floor(Math.random() * 4);

        setCurrentPrice(newClose);

        // Update unrealized PnL of active trades
        setActiveTrades((currentTrades) =>
          currentTrades.map((t) => {
            if (t.symbol !== selectedSymbol || t.status !== 'OPEN') return t;
            const diff = t.type === 'BUY' ? newClose - t.entryPrice : t.entryPrice - newClose;
            const lotMultiplier = selectedSymbol === 'BTC/USDT' ? 1 : selectedSymbol === 'XAU/USD' ? 100 : 100000;
            const pnl = parseFloat((diff * t.lotSize * lotMultiplier).toFixed(2));

            // Check if hit SL or TP
            if (t.type === 'BUY' && newClose <= t.stopLoss) {
              handleAutoClose(t, newClose, 'Stopped Out (SL Hit)');
            } else if (t.type === 'BUY' && newClose >= t.takeProfit) {
              handleAutoClose(t, newClose, 'Target Reached (TP Hit)');
            } else if (t.type === 'SELL' && newClose >= t.stopLoss) {
              handleAutoClose(t, newClose, 'Stopped Out (SL Hit)');
            } else if (t.type === 'SELL' && newClose <= t.takeProfit) {
              handleAutoClose(t, newClose, 'Target Reached (TP Hit)');
            }

            return { ...t, pnl };
          })
        );

        return [...prevCandles.slice(0, -1), lastCandle];
      });
    }, 1100);

    return () => clearInterval(tickInterval);
  }, [selectedSymbol, setActiveTrades]);

  const handleAutoClose = (trade: TradeOrder, closePrice: number, reason: string) => {
    setActiveTrades((prev) => prev.filter((t) => t.id !== trade.id));
    const closedOrder: TradeOrder = {
      ...trade,
      status: 'CLOSED',
      closePrice,
      closeTime: Date.now(),
    };
    setClosedTrades((prev) => [closedOrder, ...prev]);
    setBalance((prev) => prev + trade.pnl);
    setNotification(`${reason}: ${trade.symbol} ${trade.type} PnL: ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`);
  };

  // Canvas Candlestick Chart Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 420;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Dark canvas background
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, width, height);

    // Padding parameters
    const padTop = 20;
    const padBottom = showRsi ? 80 : 30;
    const padRight = 75;
    const chartHeight = height - padTop - padBottom;
    const chartWidth = width - padRight;

    // Compute price range
    const visibleCandles = candles.slice(-42);
    const highs = visibleCandles.map((c) => c.high);
    const lows = visibleCandles.map((c) => c.low);
    const minPrice = Math.min(...lows) * 0.9992;
    const maxPrice = Math.max(...highs) * 1.0008;
    const priceRange = maxPrice - minPrice || 1;

    const getY = (val: number) => padTop + chartHeight - ((val - minPrice) / priceRange) * chartHeight;

    // Draw horizontal grid lines & price labels
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';

    const gridSteps = 5;
    for (let i = 0; i <= gridSteps; i++) {
      const p = minPrice + (priceRange / gridSteps) * i;
      const y = getY(p);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      const digits = INITIAL_MARKET_PRICES[selectedSymbol].digits;
      ctx.fillText(p.toFixed(digits), chartWidth + 8, y + 3);
    }

    // Draw Support & Resistance zones if enabled
    if (showZones) {
      // Resistance Zone
      const resPrice = maxPrice * 0.9996;
      const resY = getY(resPrice);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.fillRect(0, resY - 10, chartWidth, 20);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.strokeRect(0, resY - 10, chartWidth, 20);
      ctx.fillStyle = '#F87171';
      ctx.fillText('LIQUIDITY SWEEP RESISTANCE', 12, resY - 14);

      // Support Zone
      const supPrice = minPrice * 1.0004;
      const supY = getY(supPrice);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.fillRect(0, supY - 10, chartWidth, 20);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.strokeRect(0, supY - 10, chartWidth, 20);
      ctx.fillStyle = '#34D399';
      ctx.fillText('DEMAND / ORDER BLOCK ZONE', 12, supY + 22);
    }

    // Calculate EMA values
    const candleWidth = chartWidth / visibleCandles.length;
    const ema20Points: { x: number; y: number }[] = [];
    const ema50Points: { x: number; y: number }[] = [];

    // Helper EMA calculator
    let ema20 = visibleCandles[0].close;
    let ema50 = visibleCandles[0].close;
    const k20 = 2 / (20 + 1);
    const k50 = 2 / (50 + 1);

    // Draw Candlesticks & Volumes
    visibleCandles.forEach((c, index) => {
      const x = index * candleWidth + candleWidth / 2;
      const isBullish = c.close >= c.open;
      const candleColor = isBullish ? '#10B981' : '#F43F5E';

      // Update EMA
      ema20 = c.close * k20 + ema20 * (1 - k20);
      ema50 = c.close * k50 + ema50 * (1 - k50);
      ema20Points.push({ x, y: getY(ema20) });
      ema50Points.push({ x, y: getY(ema50) });

      // Wick
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, getY(c.high));
      ctx.lineTo(x, getY(c.low));
      ctx.stroke();

      // Body
      const bodyTop = getY(Math.max(c.open, c.close));
      const bodyBottom = getY(Math.min(c.open, c.close));
      const bodyHeight = Math.max(2, bodyBottom - bodyTop);
      const barWidth = Math.max(3, candleWidth * 0.68);

      ctx.fillStyle = candleColor;
      ctx.fillRect(x - barWidth / 2, bodyTop, barWidth, bodyHeight);

      // Volume bar at base
      const maxVol = 1200;
      const volHeight = Math.min(30, (c.volume / maxVol) * 30);
      ctx.fillStyle = isBullish ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
      ctx.fillRect(x - barWidth / 2, padTop + chartHeight - volHeight, barWidth, volHeight);
    });

    // Draw EMA 20
    if (showEma20 && ema20Points.length > 1) {
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ema20Points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }

    // Draw EMA 50
    if (showEma50 && ema50Points.length > 1) {
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ema50Points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }

    // Current Price Pulse Line
    const curY = getY(currentPrice);
    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, curY);
    ctx.lineTo(chartWidth, curY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price badge on axis
    ctx.fillStyle = '#0066FF';
    ctx.fillRect(chartWidth, curY - 9, padRight - 6, 18);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(currentPrice.toFixed(INITIAL_MARKET_PRICES[selectedSymbol].digits), chartWidth + 6, curY + 4);

    // RSI Pane if enabled
    if (showRsi) {
      const rsiTop = height - 65;
      const rsiHeight = 50;

      ctx.fillStyle = '#06090F';
      ctx.fillRect(0, rsiTop, chartWidth, rsiHeight);

      // Overbought 70 and Oversold 30 lines
      ctx.strokeStyle = '#334155';
      ctx.setLineDash([2, 2]);

      const y70 = rsiTop + (1 - 0.7) * rsiHeight;
      const y30 = rsiTop + (1 - 0.3) * rsiHeight;

      ctx.beginPath();
      ctx.moveTo(0, y70);
      ctx.lineTo(chartWidth, y70);
      ctx.moveTo(0, y30);
      ctx.lineTo(chartWidth, y30);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#64748B';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText('RSI (14)', 8, rsiTop + 14);
      ctx.fillText('70', chartWidth + 8, y70 + 3);
      ctx.fillText('30', chartWidth + 8, y30 + 3);

      // Simulated smooth RSI curve
      ctx.strokeStyle = '#818CF8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      visibleCandles.forEach((c, idx) => {
        const x = idx * candleWidth + candleWidth / 2;
        // Approximation of oscillator
        const rsiVal = 40 + Math.sin(idx * 0.35) * 22 + (c.close > c.open ? 6 : -6);
        const clamped = Math.max(15, Math.min(85, rsiVal));
        const yVal = rsiTop + (1 - clamped / 100) * rsiHeight;
        if (idx === 0) ctx.moveTo(x, yVal);
        else ctx.lineTo(x, yVal);
      });
      ctx.stroke();
    }
  }, [candles, currentPrice, selectedSymbol, showEma20, showEma50, showZones, showRsi]);

  // Order Placement
  const handleExecuteOrder = () => {
    const config = INITIAL_MARKET_PRICES[selectedSymbol];
    const newOrder: TradeOrder = {
      id: `ord-${Date.now()}`,
      symbol: selectedSymbol,
      type: orderType,
      entryPrice: currentPrice,
      lotSize,
      stopLoss,
      takeProfit,
      pnl: 0,
      status: 'OPEN',
      openTime: Date.now(),
    };

    setActiveTrades([newOrder, ...activeTrades]);
    setNotification(
      `Market Order Executed: ${orderType} ${lotSize} Lots ${selectedSymbol} @ ${currentPrice.toFixed(config.digits)}`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  // Close trade manually
  const handleCloseTrade = (tradeId: string) => {
    const trade = activeTrades.find((t) => t.id === tradeId);
    if (!trade) return;

    setActiveTrades(activeTrades.filter((t) => t.id !== tradeId));
    const closedOrder: TradeOrder = {
      ...trade,
      status: 'CLOSED',
      closePrice: currentPrice,
      closeTime: Date.now(),
    };

    setClosedTrades([closedOrder, ...closedTrades]);
    setBalance((prev) => prev + trade.pnl);
    setNotification(
      `Position Closed: ${trade.symbol} PnL: ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const symbols: MarketSymbol[] = ['EUR/USD', 'GBP/JPY', 'XAU/USD', 'BTC/USDT', 'US100', 'ETH/USDT'];
  const timeframes: Timeframe[] = ['1m', '5m', '15m', '1h', '1D'];

  const digits = INITIAL_MARKET_PRICES[selectedSymbol].digits;
  const riskAmount = Math.abs(currentPrice - stopLoss) * lotSize * (selectedSymbol === 'BTC/USDT' ? 1 : selectedSymbol === 'XAU/USD' ? 100 : 100000);
  const rewardAmount = Math.abs(takeProfit - currentPrice) * lotSize * (selectedSymbol === 'BTC/USDT' ? 1 : selectedSymbol === 'XAU/USD' ? 100 : 100000);
  const rrRatio = riskAmount > 0 ? (rewardAmount / riskAmount).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Top Asset & Bar Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        {/* Symbol Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {symbols.map((sym) => {
            const isActive = selectedSymbol === sym;
            return (
              <button
                key={sym}
                onClick={() => setSelectedSymbol(sym)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sym}
              </button>
            );
          })}
        </div>

        {/* Live Price Tag & Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-sans uppercase">Bid / Ask:</span>
            <span className="text-base font-bold tabular-nums text-slate-900 dark:text-slate-100">
              {currentPrice.toFixed(digits)}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 font-semibold ${
              priceChange24h >= 0 ? 'text-emerald-500' : 'text-rose-500'
            }`}
          >
            {priceChange24h >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>+{priceChange24h}% (24h)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-sans">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Market Live</span>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-blue-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Chart Viewport (Left 65%) + Order Execution Console (Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Candlestick Chart */}
        <div className="lg:col-span-8 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-[#090D16] overflow-hidden shadow-sm">
          {/* Chart Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-[#0B101B]">
            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                    timeframe === tf ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Indicator Toggles */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowEma20(!showEma20)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  showEma20
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                EMA 20
              </button>
              <button
                onClick={() => setShowEma50(!showEma50)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  showEma50
                    ? 'border-sky-500/50 bg-sky-500/10 text-sky-400'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                EMA 50
              </button>
              <button
                onClick={() => setShowZones(!showZones)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  showZones
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                S/R Zones
              </button>
              <button
                onClick={() => setShowRsi(!showRsi)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  showRsi
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                RSI (14)
              </button>
            </div>
          </div>

          {/* Canvas Rendering Arena */}
          <div className="relative w-full overflow-hidden flex-1 min-h-[420px]">
            <canvas ref={canvasRef} className="block w-full h-[420px]" />
          </div>

          {/* Chart Subline Explanations */}
          <div className="px-4 py-2 border-t border-slate-800 bg-[#0B101B] flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> EMA 20
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> EMA 50
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Institutional Demand
              </span>
            </div>
            <span className="font-mono text-slate-500">HA Trader Algorithmic Feed</span>
          </div>
        </div>

        {/* Right Column: Order Ticket & Risk Terminal */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Order Ticket
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                100:1 Leverage
              </span>
            </div>

            {/* Order Direction Toggle (Buy vs Sell) */}
            <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setOrderType('BUY')}
                className={`py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderType === 'BUY'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>BUY / LONG</span>
              </button>
              <button
                onClick={() => setOrderType('SELL')}
                className={`py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderType === 'SELL'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                <span>SELL / SHORT</span>
              </button>
            </div>

            {/* Lot Size Control */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                <span>Position Lot Size:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{lotSize} Lots</span>
              </div>
              <div className="flex items-center gap-2">
                {[0.1, 0.5, 1.0, 2.5, 5.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => setLotSize(val)}
                    className={`flex-1 py-1 text-xs font-mono font-semibold rounded border transition-colors cursor-pointer ${
                      lotSize === val
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Stop Loss & Take Profit Fields */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase mb-1">
                  Stop Loss (SL)
                </label>
                <input
                  type="number"
                  step="any"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase mb-1">
                  Take Profit (TP)
                </label>
                <input
                  type="number"
                  step="any"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Risk / Reward Metrics Box */}
            <div className="mt-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="font-sans">Projected Risk:</span>
                <span className="text-rose-500 font-bold tabular-nums">-${riskAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="font-sans">Projected Profit:</span>
                <span className="text-emerald-500 font-bold tabular-nums">+${rewardAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="font-sans">Risk to Reward (R:R):</span>
                <span className="text-blue-600 dark:text-blue-400">1 : {rrRatio}</span>
              </div>
            </div>
          </div>

          {/* Place Market Order Button */}
          <div className="mt-5 pt-3">
            <button
              onClick={handleExecuteOrder}
              className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all cursor-pointer ${
                orderType === 'BUY'
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-emerald-500/25'
                  : 'bg-rose-600 hover:bg-rose-700 active:scale-[0.99] shadow-rose-500/25'
              }`}
            >
              Execute Instant {orderType} ({selectedSymbol})
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Virtual paper trade · Zero slippage execution guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Active Positions & Trade Ledger */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Open Positions ({activeTrades.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Unrealized Total:{' '}
            <span
              className={`font-bold tabular-nums ${
                activeTrades.reduce((acc, t) => acc + t.pnl, 0) >= 0 ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              ${activeTrades.reduce((acc, t) => acc + t.pnl, 0).toFixed(2)}
            </span>
          </span>
        </div>

        {activeTrades.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <Activity className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">No Open Positions</p>
            <p className="text-slate-400 text-[11px] mt-1">
              Select an asset above and click 'Execute Instant Order' or load a signal from the Trade Signals tab.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Symbol</th>
                  <th className="py-2.5 px-4 font-semibold">Type</th>
                  <th className="py-2.5 px-4 font-semibold">Lots</th>
                  <th className="py-2.5 px-4 font-semibold">Entry Price</th>
                  <th className="py-2.5 px-4 font-semibold">Current</th>
                  <th className="py-2.5 px-4 font-semibold">SL / TP</th>
                  <th className="py-2.5 px-4 font-semibold text-right">PnL (USD)</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeTrades.map((trade) => {
                  const isProfit = trade.pnl >= 0;
                  return (
                    <tr key={trade.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{trade.symbol}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            trade.type === 'BUY'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                          }`}
                        >
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 tabular-nums text-slate-700 dark:text-slate-300">{trade.lotSize}</td>
                      <td className="py-3 px-4 tabular-nums text-slate-700 dark:text-slate-300">
                        {trade.entryPrice.toFixed(INITIAL_MARKET_PRICES[trade.symbol].digits)}
                      </td>
                      <td className="py-3 px-4 tabular-nums font-semibold text-slate-900 dark:text-white">
                        {currentPrice.toFixed(INITIAL_MARKET_PRICES[trade.symbol].digits)}
                      </td>
                      <td className="py-3 px-4 tabular-nums text-[11px] text-slate-500">
                        {trade.stopLoss} / {trade.takeProfit}
                      </td>
                      <td
                        className={`py-3 px-4 tabular-nums font-bold text-right ${
                          isProfit ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {isProfit ? '+' : ''}${trade.pnl.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleCloseTrade(trade.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900 rounded transition-colors cursor-pointer"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
