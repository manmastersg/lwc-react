import React, { useEffect, useRef } from 'react';

const TradingChart = () => {
  const candlestickChartRef = useRef();
  const reactComponentChartRef = useRef();

  useEffect(() => {
    const createCharts = async () => {
      try {
        // Method 1: Using base lightweight-charts with CandlestickSeries
        const { createChart, CandlestickSeries } = await import('lightweight-charts');
        
        if (candlestickChartRef.current) {
          const candlestickChart = createChart(candlestickChartRef.current, {
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
          });

          const candlestickSeries = candlestickChart.addSeries(CandlestickSeries, {
            upColor: '#4CAF50',
            downColor: '#F44336',
            borderVisible: false,
            wickUpColor: '#4CAF50',
            wickDownColor: '#F44336',
          });

          // Sample candlestick data (OHLC format)
          const candlestickData = [
            { time: '2023-01-01', open: 100, high: 108, low: 98, close: 105 },
            { time: '2023-01-02', open: 105, high: 112, low: 103, close: 110 },
            { time: '2023-01-03', open: 110, high: 115, low: 107, close: 108 },
            { time: '2023-01-04', open: 108, high: 118, low: 106, close: 115 },
            { time: '2023-01-05', open: 115, high: 120, low: 112, close: 118 },
            { time: '2023-01-06', open: 118, high: 122, low: 115, close: 116 },
            { time: '2023-01-07', open: 116, high: 125, low: 114, close: 122 },
          ];

          candlestickSeries.setData(candlestickData);
          candlestickChartRef.current.chartInstance = candlestickChart;
          console.log('✅ Candlestick chart (base library) created successfully!');
        }

        // Method 2: Test lightweight-charts-react-components
        try {
          console.log('🔍 Testing lightweight-charts-react-components...');
          const ReactComponents = await import('lightweight-charts-react-components');
          console.log('✅ React components loaded:', ReactComponents);
          console.log('Available components:', Object.keys(ReactComponents));
          
          // We'll implement this in a separate component since it uses JSX differently
          console.log('📝 React components are available - see separate component test');
          
        } catch (componentError) {
          console.log('❌ lightweight-charts-react-components not working:', componentError.message);
        }

      } catch (error) {
        console.error('❌ Error creating charts:', error);
      }
    };

    createCharts();

    // Cleanup
    return () => {
      if (candlestickChartRef.current?.chartInstance) {
        candlestickChartRef.current.chartInstance.remove();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🕯️ Candlestick Chart Demo</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>📈 Candlestick Chart (Base Library)</h3>
        <div ref={candlestickChartRef} style={{ minHeight: '400px' }} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>🧪 React Components Test</h3>
        <p>Check console for react-components availability...</p>
      </div>
    </div>
  );
};

export default TradingChart;
