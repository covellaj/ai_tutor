import React, { useState, useEffect } from 'react';
import '../styles/AgentBox.module.css'; // Make sure to create this CSS module

const AgentBox = () => {
    const [agentMessages, setAgentMessages] = useState([]);

    // Simulate agent interactions
    useEffect(() => {
        const interval = setInterval(() => {
            setAgentMessages(prevMessages => [...prevMessages, "Agent response at " + new Date().toLocaleTimeString()]);
        }, 7000); // Updates every 7 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="agent-box">
            {agentMessages.map((msg, index) => (
                <div key={index} className="agent-message">{msg}</div>
            ))}
        </div>
    );
};

export default AgentBox;
