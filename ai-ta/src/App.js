import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import SystemBox from './components/SystemBox';
import AgentBox from './components/AgentBox';
import './App.css';

const App = () => {
  const [agentMessages, setAgentMessages] = useState([]);

  const handleUpdateAgents = (message) => {
      setAgentMessages([...agentMessages, message]);
  };

  return (
    <div className="App">
      <header className="App-header">
        AI Tutor
      </header>
      <main className="main-layout">
        <div className="left-panel">
          <ChatBox onUpdateAgents={handleUpdateAgents}/>
        </div>
        <div className="right-panel">
          <SystemBox />
          <AgentBox agentMessages={agentMessages}/>
        </div>
      </main>
    </div>
  );
}

export default App;