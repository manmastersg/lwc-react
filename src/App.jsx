import React, { useState } from 'react';
import CandlestickChart from './components/CandlestickChart'; // Your existing base library component
import ReactComponentsChart from './components/ReactComponentsChart'; // Your existing react components
import EnhancedReactComponentsChart from './components/EnhancedReactComponentsChart'; // New enhanced version
import MultiSeriesChart from './components/MultiSeriesChart'; // New multi-series chart
import RealTimeChart from './components/RealTimeChart'; // New real-time chart
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('comparison');

  const tabs = [
    { id: 'comparison', label: '📊 Base vs React Components', icon: '⚖️' },
    { id: 'enhanced', label: '🚀 Enhanced Features', icon: '✨' },
    { id: 'multiseries', label: '📈 Technical Analysis', icon: '🔍' },
    { id: 'realtime', label: '⚡ Real-Time Data', icon: '🔄' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'comparison':
        return (
          <div>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2>📊 Implementation Comparison</h2>
              <p>Side-by-side comparison of Base Library vs React Components approach</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
              <div style={{ padding: '20px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                <h3 style={{ color: '#1976d2', marginTop: 0 }}>⚙️ Base Library (Current)</h3>
                <CandlestickChart />
              </div>
              
              <div style={{ padding: '20px', border: '2px solid #4caf50', borderRadius: '8px' }}>
                <h3 style={{ color: '#4caf50', marginTop: 0 }}>🚀 React Components (New)</h3>
                <ReactComponentsChart />
              </div>
            </div>

            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3>🎯 Key Differences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ color: '#1976d2' }}>⚙️ Base Library</h4>
                  <ul>
                    <li>Imperative API: <code>chart.addSeries()</code></li>
                    <li>Manual lifecycle management</li>
                    <li>More boilerplate code</li>
                    <li>Direct access to all features</li>
                    <li>Requires useEffect and refs</li>
                    <li>Manual cleanup needed</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: '#4caf50' }}>🚀 React Components</h4>
                  <ul>
                    <li>Declarative JSX: <code>&lt;CandlestickSeries /&gt;</code></li>
                    <li>Automatic lifecycle management</li>
                    <li>Clean, readable code</li>
                    <li>Type-safe props with IntelliSense</li>
                    <li>React-native patterns</li>
                    <li>Automatic cleanup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'enhanced':
        return (
          <div>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2>🚀 Enhanced React Components</h2>
              <p>Interactive controls, multiple chart types, and advanced features</p>
            </div>
            <EnhancedReactComponentsChart />
          </div>
        );

      case 'multiseries':
        return (
          <div>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2>📈 Technical Analysis Dashboard</h2>
              <p>Multi-pane charts with indicators, overlays, and price lines</p>
            </div>
            <MultiSeriesChart />
          </div>
        );

      case 'realtime':
        return (
          <div>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2>⚡ Real-Time Data Simulation</h2>
              <p>Live updating charts with dynamic data feeds</p>
            </div>
            <RealTimeChart />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
          📈 Lightweight Charts React Components
        </h1>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
          Complete Implementation Guide & Demo
        </p>
      </header>
      
      {/* Navigation Tabs */}
      <nav style={{ 
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #e0e0e0',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '15px 25px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#667eea' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              borderRadius: '8px 8px 0 0',
              margin: '0 2px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '20px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ 
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '80vh'
      }}>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#f8f9fa',
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>🎯 Implementation Summary</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>✅ Ready to Use</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Your JavaScript + SWC setup is perfectly compatible. No TypeScript required!
              </p>
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2196f3' }}>🚀 Easy Migration</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Gradually replace base library components with React components as needed.
              </p>
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#ff9800' }}>⚡ Better DX</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                IntelliSense, automatic cleanup, and declarative syntax improve development experience.
              </p>
            </div>
          </div>
          
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#666',
            fontStyle: 'italic'
          }}>
            💡 Copy the component files to your project's src/components/ directory and start using them!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;