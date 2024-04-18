import React from 'react';
import styles from '../styles/AgentBox.module.css'; // Make sure to create this CSS module

const AgentBox = ({ agentMessages }) => {
    return (
        <div className={styles["agent-box"]}>
            {agentMessages.map((msg, index) => (
                <p key={index} className={styles["agent-message"]}>{msg}</p>
            ))}
        </div>
    );
};

export default AgentBox;
