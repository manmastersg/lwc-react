import React from 'react';
import { Chart, CandlestickSeries } from 'lightweight-charts-react-components';

// Fixed React Components implementation
const ReactComponentsChart = () => {
  try {
    const candlestickData = [
      { time: '2023-01-01', open: 100, high: 108, low: 98, close: 105 },
      { time: '2023-01-02', open: 105, high: 112, low: 103, close: 110 },
      { time: '2023-01-03', open: 110, high: 115, low: 107, close: 108 },
      { time: '2023-01-04', open: 108, high: 118, low: 106, close: 115 },
      { time: '2023-01-05', open: 115, high: 120, low: 112, close: 118 },
    ];

    // ✅ FIX 1: Chart options as object
    const chartOptions = {
      width: 800,
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
    };

    // ✅ FIX 2: Series options as object
    const seriesOptions = {
      upColor: '#4CAF50',
      downColor: '#F44336',
      borderVisible: false,
      wickUpColor: '#4CAF50',
      wickDownColor: '#F44336',
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>🚀 React Components Candlestick (Fixed)</h3>
        <Chart options={chartOptions}>
          <CandlestickSeries 
            data={candlestickData}
            options={seriesOptions}
          />
        </Chart>
        
        {/* Debug info */}
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>✅ Fixes Applied:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>✅ Chart dimensions moved to options object</li>
            <li>✅ Series colors moved to options object</li>
            <li>✅ Proper props structure for React Components</li>
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '20px', border: '1px solid #f44336', backgroundColor: '#ffebee' }}>
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

export default ReactComponentsChart;