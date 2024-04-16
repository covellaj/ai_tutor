import React from 'react';
import '../styles/AgentBox.module.css'; // Make sure to create this CSS module

const AgentBox = ({ agentMessages }) => {
    return (
        <div className="agent-box">
            {agentMessages.map((msg, index) => (
                <p key={index} className="agent-message">{msg}</p>
            ))}
        </div>
    );
};

export default AgentBox;
