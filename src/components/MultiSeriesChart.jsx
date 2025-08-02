import React, { useState, useRef } from 'react';
import { 
  Chart, 
  LineSeries, 
  AreaSeries,
  HistogramSeries,
  Pane, 
  PriceScale, 
  TimeScale,
  PriceLine
} from 'lightweight-charts-react-components';

// Multi-series chart with different indicators
const MultiSeriesChart = () => {
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);
  const chartRef = useRef();

  // Price data
  const priceData = [
    { time: '2023-01-01', value: 100 },
    { time: '2023-01-02', value: 102 },
    { time: '2023-01-03', value: 98 },
    { time: '2023-01-04', value: 105 },
    { time: '2023-01-05', value: 110 },
    { time: '2023-01-06', value: 108 },
    { time: '2023-01-07', value: 115 },
    { time: '2023-01-08', value: 112 },
    { time: '2023-01-09', value: 118 },
    { time: '2023-01-10', value: 120 },
  ];

  // EMA data
  const emaData = [
    { time: '2023-01-02', value: 101 },
    { time: '2023-01-03', value: 100.5 },
    { time: '2023-01-04', value: 101.8 },
    { time: '2023-01-05', value: 104.2 },
    { time: '2023-01-06', value: 105.8 },
    { time: '2023-01-07', value: 108.9 },
    { time: '2023-01-08', value: 109.8 },
    { time: '2023-01-09', value: 112.4 },
    { time: '2023-01-10', value: 115.2 },
  ];

  // RSI data (0-100 range)
  const rsiData = [
    { time: '2023-01-03', value: 45 },
    { time: '2023-01-04', value: 65 },
    { time: '2023-01-05', value: 75 },
    { time: '2023-01-06', value: 68 },
    { time: '2023-01-07', value: 82 },
    { time: '2023-01-08', value: 72 },
    { time: '2023-01-09', value: 85 },
    { time: '2023-01-10', value: 88 },
  ];

  // MACD data
  const macdData = [
    { time: '2023-01-03', value: -0.5 },
    { time: '2023-01-04', value: 0.2 },
    { time: '2023-01-05', value: 1.1 },
    { time: '2023-01-06', value: 0.8 },
    { time: '2023-01-07', value: 1.8 },
    { time: '2023-01-08', value: 1.2 },
    { time: '2023-01-09', value: 2.1 },
    { time: '2023-01-10', value: 2.5 },
  ];

  const macdSignalData = [
    { time: '2023-01-03', value: -0.3 },
    { time: '2023-01-04', value: -0.1 },
    { time: '2023-01-05', value: 0.4 },
    { time: '2023-01-06', value: 0.6 },
    { time: '2023-01-07', value: 1.1 },
    { time: '2023-01-08', value: 1.15 },
    { time: '2023-01-09', value: 1.5 },
    { time: '2023-01-10', value: 1.8 },
  ];

  const macdHistogramData = [
    { time: '2023-01-03', value: -0.2, color: 'rgba(255, 82, 82, 0.8)' },
    { time: '2023-01-04', value: 0.3, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-05', value: 0.7, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-06', value: 0.2, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-07', value: 0.7, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-08', value: 0.05, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-09', value: 0.6, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2023-01-10', value: 0.7, color: 'rgba(0, 150, 136, 0.8)' },
  ];

  const chartOptions = {
    width: 900,
    height: 700,
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
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Multi-Series Technical Analysis Chart</h3>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              checked={showRSI} 
              onChange={(e) => setShowRSI(e.target.checked)} 
            />
            Show RSI
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              checked={showMACD} 
              onChange={(e) => setShowMACD(e.target.checked)} 
            />
            Show MACD
          </label>
        </div>
      </div>

      <Chart ref={chartRef} options={chartOptions}>
        {/* Main Price Pane */}
        <Pane stretchFactor={3}>
          {/* Price Line */}
          <LineSeries 
            data={priceData}
            options={{
              color: '#2196F3',
              lineWidth: 2,
              title: 'Price',
            }}
          />
          
          {/* EMA Overlay */}
          <LineSeries 
            data={emaData}
            options={{
              color: '#FF9800',
              lineWidth: 2,
              title: 'EMA(9)',
              lastValueVisible: false,
              priceLineVisible: false,
            }}
          />

          {/* Support/Resistance Lines */}
          <PriceLine 
            price={115}
            options={{
              color: '#f44336',
              lineWidth: 2,
              lineStyle: 2, // Dashed
              axisLabelVisible: true,
              title: 'Resistance',
            }}
          />
          
          <PriceLine 
            price={95}
            options={{
              color: '#4caf50',
              lineWidth: 2,
              lineStyle: 2, // Dashed
              axisLabelVisible: true,
              title: 'Support',
            }}
          />
          
          <PriceScale id="right" />
        </Pane>

        {/* RSI Pane */}
        {showRSI && (
          <Pane stretchFactor={1}>
            <AreaSeries 
              data={rsiData}
              options={{
                topColor: 'rgba(156, 39, 176, 0.3)',
                bottomColor: 'rgba(156, 39, 176, 0.1)',
                lineColor: '#9C27B0',
                lineWidth: 2,
                title: 'RSI(14)',
              }}
            />
            
            {/* RSI Overbought/Oversold Lines */}
            <PriceLine 
              price={70}
              options={{
                color: '#f44336',
                lineWidth: 1,
                lineStyle: 3, // Dotted
                axisLabelVisible: false,
                title: 'Overbought',
              }}
            />
            
            <PriceLine 
              price={30}
              options={{
                color: '#4caf50',
                lineWidth: 1,
                lineStyle: 3, // Dotted
                axisLabelVisible: false,
                title: 'Oversold',
              }}
            />
            
            <PriceScale 
              id="right" 
              options={{
                scaleMargins: { top: 0.1, bottom: 0.1 },
              }}
            />
          </Pane>
        )}

        {/* MACD Pane */}
        {showMACD && (
          <Pane stretchFactor={1}>
            {/* MACD Histogram */}
            <HistogramSeries 
              data={macdHistogramData}
              options={{
                base: 0,
                title: 'MACD Histogram',
              }}
            />
            
            {/* MACD Line */}
            <LineSeries 
              data={macdData}
              options={{
                color: '#2196F3',
                lineWidth: 2,
                title: 'MACD',
              }}
            />
            
            {/* Signal Line */}
            <LineSeries 
              data={macdSignalData}
              options={{
                color: '#FF9800',
                lineWidth: 2,
                title: 'Signal',
              }}
            />
            
            {/* Zero Line */}
            <PriceLine 
              price={0}
              options={{
                color: '#666',
                lineWidth: 1,
                lineStyle: 1, // Solid
                axisLabelVisible: false,
              }}
            />
            
            <PriceScale id="right" />
          </Pane>
        )}

        {/* Shared Time Scale */}
        <TimeScale />
      </Chart>

      {/* Legend */}
      <div style={{ 
        marginTop: '15px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '15px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: '#2196F3' }}></div>
          <span>Price</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: '#FF9800' }}></div>
          <span>EMA(9)</span>
        </div>
        {showRSI && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: '#9C27B0' }}></div>
            <span>RSI(14)</span>
          </div>
        )}
        {showMACD && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#2196F3' }}></div>
              <span>MACD</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#FF9800' }}></div>
              <span>Signal</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiSeriesChart;