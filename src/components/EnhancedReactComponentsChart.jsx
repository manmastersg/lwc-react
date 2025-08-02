import React, { useState } from 'react';
import { 
  Chart, 
  CandlestickSeries, 
  LineSeries, 
  HistogramSeries,
  AreaSeries,
  Pane, 
  PriceScale, 
  TimeScale 
} from 'lightweight-charts-react-components';

// Enhanced React Components implementation
const EnhancedReactComponentsChart = () => {
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [showMA, setShowMA] = useState(true);

  try {
    // Sample OHLC data
    const candlestickData = [
      { time: '2023-01-01', open: 100, high: 108, low: 98, close: 105 },
      { time: '2023-01-02', open: 105, high: 112, low: 103, close: 110 },
      { time: '2023-01-03', open: 110, high: 115, low: 107, close: 108 },
      { time: '2023-01-04', open: 108, high: 118, low: 106, close: 115 },
      { time: '2023-01-05', open: 115, high: 120, low: 112, close: 118 },
      { time: '2023-01-06', open: 118, high: 122, low: 115, close: 116 },
      { time: '2023-01-07', open: 116, high: 125, low: 114, close: 122 },
      { time: '2023-01-08', open: 122, high: 127, low: 119, close: 124 },
    ];

    // Line data (closing prices)
    const lineData = candlestickData.map(item => ({
      time: item.time,
      value: item.close
    }));

    // Area data (same as line)
    const areaData = lineData;

    // Volume data
    const volumeData = [
      { time: '2023-01-01', value: 1000, color: 'rgba(0, 150, 136, 0.5)' },
      { time: '2023-01-02', value: 1100, color: 'rgba(0, 150, 136, 0.5)' },
      { time: '2023-01-03', value: 900, color: 'rgba(255, 82, 82, 0.5)' },
      { time: '2023-01-04', value: 1300, color: 'rgba(0, 150, 136, 0.5)' },
      { time: '2023-01-05', value: 1200, color: 'rgba(0, 150, 136, 0.5)' },
      { time: '2023-01-06', value: 800, color: 'rgba(255, 82, 82, 0.5)' },
      { time: '2023-01-07', value: 1400, color: 'rgba(0, 150, 136, 0.5)' },
      { time: '2023-01-08', value: 1250, color: 'rgba(0, 150, 136, 0.5)' },
    ];

    // Moving Average data (simple 3-period MA)
    const maData = [
      { time: '2023-01-03', value: 107.67 },
      { time: '2023-01-04', value: 111 },
      { time: '2023-01-05', value: 114.33 },
      { time: '2023-01-06', value: 116.33 },
      { time: '2023-01-07', value: 118.67 },
      { time: '2023-01-08', value: 120.67 },
    ];

    const chartOptions = {
      width: 900,
      height: showVolume ? 600 : 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1, // Normal crosshair
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    const renderMainSeries = () => {
      switch (chartType) {
        case 'candlestick':
          return (
            <CandlestickSeries 
              data={candlestickData}
              options={{
                upColor: '#4CAF50',
                downColor: '#F44336',
                borderVisible: false,
                wickUpColor: '#4CAF50',
                wickDownColor: '#F44336',
              }}
            />
          );
        case 'line':
          return (
            <LineSeries 
              data={lineData}
              options={{
                color: '#2196F3',
                lineWidth: 2,
                title: 'Close Price',
              }}
            />
          );
        case 'area':
          return (
            <AreaSeries 
              data={areaData}
              options={{
                topColor: 'rgba(33, 150, 243, 0.56)',
                bottomColor: 'rgba(33, 150, 243, 0.04)',
                lineColor: '#2196F3',
                lineWidth: 2,
                title: 'Close Price',
              }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3>🚀 React Components Chart (Enhanced)</h3>
          
          {/* Controls */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ marginRight: '10px' }}>Chart Type:</label>
              <select 
                value={chartType} 
                onChange={(e) => setChartType(e.target.value)}
                style={{ padding: '5px' }}
              >
                <option value="candlestick">Candlestick</option>
                <option value="line">Line</option>
                <option value="area">Area</option>
              </select>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input 
                type="checkbox" 
                checked={showVolume} 
                onChange={(e) => setShowVolume(e.target.checked)} 
              />
              Show Volume
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input 
                type="checkbox" 
                checked={showMA} 
                onChange={(e) => setShowMA(e.target.checked)} 
              />
              Show Moving Average
            </label>
          </div>
        </div>

        <Chart key={`chart-${showVolume}-${chartType}`} options={chartOptions}>
          {/* Main Price Pane */}
          <Pane stretchFactor={3}>
            {renderMainSeries()}
            
            {/* Moving Average Overlay */}
            {showMA && (
              <LineSeries 
                data={maData}
                options={{
                  color: '#FF9800',
                  lineWidth: 2,
                  title: 'MA(3)',
                  lastValueVisible: false,
                  priceLineVisible: false,
                }}
              />
            )}
            
            <PriceScale id="right" />
          </Pane>

          {/* Volume Pane */}
          {showVolume && (
            <Pane key="volume-pane" stretchFactor={1}>
              <HistogramSeries 
                key="volume-series"
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
          )}

          {/* Shared Time Scale */}
          <TimeScale />
        </Chart>

        
        
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <h3>❌ React Components Error</h3>
        <p><strong>Error:</strong> {error.message}</p>
        <p>Check console for more details.</p>
        <details>
          <summary>Error Stack</summary>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>{error.stack}</pre>
        </details>
      </div>
    );
  }
};

export default EnhancedReactComponentsChart;