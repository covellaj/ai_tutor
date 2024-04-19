import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import SystemBox from './components/SystemBox';
import AgentBox from './components/AgentBox';
import './App.css';

const App = () => {
  const [agentMessages, setAgentMessages] = useState([]);
  const [systemMessages, setSystemMessage] = useState([]);

  const handleUpdateAgents = (message) => {
    setAgentMessages([...agentMessages, message]);
  };

  const handleSystemMessage = (sysMessage) => {
    setSystemMessage([...systemMessages, sysMessage]);
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src="/AI_Logo1.png" alt='logo' className='logo'/>
        MINERVA AI
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