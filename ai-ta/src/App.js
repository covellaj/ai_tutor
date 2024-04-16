import React from 'react';
import ChatBox from './components/ChatBox';
import SystemBox from './components/SystemBox';
import AgentBox from './components/AgentBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        AI Tutor
      </header>
      <main className="main-layout">
        <div className="left-panel">
          <ChatBox />
        </div>
        <div className="right-panel">
          <SystemBox />
          <AgentBox />
        </div>
      </main>
    </div>
  );
}

export default App;