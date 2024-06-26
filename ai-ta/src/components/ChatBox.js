import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/ChatBox.module.css';  // Ensure CSS module exists

const ChatBox = ({ onUpdateAgents }) => {
    const [message, setMessage] = useState('Start your conversation here...');
    const [conversation, setConversation] = useState([
        { text: "Welcome to Minerva AI! How can I help you today?", sender: 'ai' }
    ]);

    const sendMessage = async () => {       // I will have to eventually be sure that the user interaction has it's own "thread", meaning that context isn't lost for the Manager Agent.
        if (message.trim() !== '') {
            const response = await axios.post('http://localhost:3001/chat', { message });
            setConversation([...conversation, { text: message, sender: 'user' }, { text: response.data.message, sender: 'ai' }]);
            onUpdateAgents(response.data.message);
            setMessage('');
        }
    };

    const handleFocus = (e) => {
        if (e.target.value === 'Start your conversation here...') {
            setMessage('');
        }
    };

    return (
        <div className={styles["chat-box"]}>
            <div className={styles["message-area"]}>
                {conversation.map((msg, index) => (
                    <p key={index} className={msg.sender === 'user' ? styles["user-message"] : styles["ai-message"]}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <textarea  /* Changed from <input> to <textarea> */
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}  /* Prevent sending on Shift+Enter */
                className={styles["input-box"]}
                rows={1}
                onFocus={handleFocus}
            />
        </div>
    );
};

export default ChatBox;
