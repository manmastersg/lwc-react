import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Chart, 
  LineSeries, 
  CandlestickSeries,
  HistogramSeries,
  Pane, 
  PriceScale, 
  TimeScale 
} from 'lightweight-charts-react-components';

// Real-time chart with live data updates
const RealTimeChart = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(100);
  const intervalRef = useRef(null);
  const timeRef = useRef(Date.now());

  // Initialize with some historical data
  useEffect(() => {
    const initialData = [];
    const initialVolume = [];
    const startTime = Date.now() - (50 * 1000); // 50 seconds ago
    
    for (let i = 0; i < 50; i++) {
      const time = Math.floor((startTime + i * 1000) / 1000);
      const price = 100 + Math.sin(i * 0.1) * 5 + Math.random() * 2 - 1;
      
      if (chartType === 'line') {
        initialData.push({
          time: time,
          value: price
        });
      } else {
        // For candlestick, generate OHLC
        const open = i === 0 ? 100 : initialData[i-1]?.close || price;
        const high = Math.max(open, price) + Math.random() * 2;
        const low = Math.min(open, price) - Math.random() * 2;
        const close = price;
        
        initialData.push({
          time: time,
          open: open,
          high: high,
          low: low,
          close: close
        });
      }
      
      initialVolume.push({
        time: time,
        value: Math.floor(Math.random() * 1000) + 500,
        color: price > (initialData[i-1]?.close || initialData[i-1]?.value || 100) 
          ? 'rgba(0, 150, 136, 0.8)' 
          : 'rgba(255, 82, 82, 0.8)'
      });
    }
    
    setPriceData(initialData);
    setVolumeData(initialVolume);
    setCurrentPrice(initialData[initialData.length - 1]?.close || initialData[initialData.length - 1]?.value || 100);
    timeRef.current = Date.now();
  }, [chartType]);

  // Generate realistic price movement
  const generateNextPrice = useCallback((currentPrice) => {
    const volatility = 0.02; // 2% volatility
    const trend = 0.0001; // Slight upward trend
    const randomWalk = (Math.random() - 0.5) * volatility * currentPrice;
    const trendComponent = trend * currentPrice;
    
    return Math.max(0.01, currentPrice + randomWalk + trendComponent);
  }, []);

  // Start/stop real-time updates
  const toggleRealTime = useCallback(() => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const newPrice = generateNextPrice(currentPrice);
        
        setPriceData(prevData => {
          const newData = [...prevData];
          
          if (chartType === 'line') {
            newData.push({
              time: now,
              value: newPrice
            });
          } else {
            // For candlestick, update or add new candle
            const lastCandle = newData[newData.length - 1];
            const lastTime = lastCandle?.time || 0;
            
            // If more than 5 seconds passed, create new candle
            if (now - lastTime >= 5) {
              newData.push({
                time: now,
                open: currentPrice,
                high: Math.max(currentPrice, newPrice),
                low: Math.min(currentPrice, newPrice),
                close: newPrice
              });
            } else {
              // Update current candle
              if (lastCandle) {
                lastCandle.high = Math.max(lastCandle.high, newPrice);
                lastCandle.low = Math.min(lastCandle.low, newPrice);
                lastCandle.close = newPrice;
              }
            }
          }
          
          // Keep only last 100 data points
          return newData.slice(-100);
        });
        
        setVolumeData(prevVolume => {
          const newVolume = [...prevVolume];
          const volume = Math.floor(Math.random() * 800) + 200;
          const color = newPrice > currentPrice 
            ? 'rgba(0, 150, 136, 0.8)' 
            : 'rgba(255, 82, 82, 0.8)';
          
          newVolume.push({
            time: now,
            value: volume,
            color: color
          });
          
          return newVolume.slice(-100);
        });
        
        setCurrentPrice(newPrice);
      }, 1000); // Update every second
    }
  }, [isRunning, currentPrice, generateNextPrice, chartType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset data when chart type changes
  const handleChartTypeChange = (newType) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setChartType(newType);
  };

  const chartOptions = {
    width: 900,
    height: 600,
    layout: {
      background: { color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    crosshair: {
      mode: 1,
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
      rightOffset: 12,
    },
  };

  const renderMainSeries = () => {
    if (chartType === 'line') {
      return (
        <LineSeries 
          data={priceData}
          options={{
            color: isRunning ? '#4CAF50' : '#2196F3',
            lineWidth: 2,
            title: `Price: $${currentPrice.toFixed(2)}`,
            lastValueVisible: true,
            priceLineVisible: true,
          }}
        />
      );
    } else {
      return (
        <CandlestickSeries 
          data={priceData}
          options={{
            upColor: '#4CAF50',
            downColor: '#F44336',
            borderVisible: false,
            wickUpColor: '#4CAF50',
            wickDownColor: '#F44336',
          }}
        />
      );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>⚡ Real-Time Chart Simulation</h3>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', alignItems: 'center' }}>
          <div>
            <label style={{ marginRight: '10px' }}>Chart Type:</label>
            <select 
              value={chartType} 
              onChange={(e) => handleChartTypeChange(e.target.value)}
              style={{ padding: '5px' }}
              disabled={isRunning}
            >
              <option value="line">Line</option>
              <option value="candlestick">Candlestick</option>
            </select>
          </div>
          
          <button 
            onClick={toggleRealTime}
            style={{
              padding: '8px 16px',
              backgroundColor: isRunning ? '#f44336' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isRunning ? '⏸️ Stop' : '▶️ Start'} Real-Time
          </button>
          
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: isRunning ? '#e8f5e8' : '#f5f5f5',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: isRunning ? '#2e7d32' : '#666'
          }}>
            Status: {isRunning ? '🟢 Live' : '🔴 Stopped'}
          </div>
          
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            Current: ${currentPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <Chart options={chartOptions}>
        {/* Price Pane */}
        <Pane stretchFactor={3}>
          {renderMainSeries()}
          <PriceScale id="right" />
        </Pane>

        {/* Volume Pane */}
        <Pane stretchFactor={1}>
          <HistogramSeries 
            data={volumeData}
            options={{
              base: 0,
              priceFormat: {
                type: 'volume',
              },
              title: 'Volume',
            }}
          />
          <PriceScale id="right" />
        </Pane>

        <TimeScale />
      </Chart>

      {/* Info Panel */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>🔄 Real-Time Features:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>✅ Live data updates every second</li>
          <li>✅ Automatic chart scrolling and scaling</li>
          <li>✅ Dynamic price movement simulation</li>
          <li>✅ Real-time volume updates with color coding</li>
          <li>✅ Efficient data management (keeps last 100 points)</li>
          <li>✅ Seamless switching between chart types</li>
        </ul>
        
        <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>
          💡 This demonstrates how React Components handle real-time data updates automatically!
        </p>
      </div>
    </div>
  );
};

export default RealTimeChart;