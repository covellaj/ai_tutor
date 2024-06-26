import React, { useState, useEffect } from 'react';
import styles from '../styles/SystemBox.module.css'; // Make sure to create this CSS module

const SystemBox = () => {
    const [systemMessages, setSystemMessages] = useState([]);

    // Simulate system updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemMessages(prevMessages => [...prevMessages, "System update at " + new Date().toLocaleTimeString()]);
        }, 5000); // Updates every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles["system-box"]}>
            {systemMessages.map((msg, index) => (
                <div key={index} className={styles["system-message"]}>{msg}</div>
            ))}
        </div>
    );
};

export default SystemBox;
