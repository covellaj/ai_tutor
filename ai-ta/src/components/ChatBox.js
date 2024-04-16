import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChatBox.module.css';  // Ensure to create this CSS module for styling

const ChatBox = ({ onUpdateAgents }) => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const sendMessage = async () => {
        if (message.trim() !== '') {
            setConversation([...conversation, { text: message, sender: 'user' }]);
            const response = await axios.post('http://localhost:3001/chat', { message });
            setConversation([...conversation, { text: message, sender: 'user' }, { text: response.data.message, sender: 'ai' }]);
            onUpdateAgents(response.data.message); // Update AgentBox
            setMessage('');
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {conversation.map((msg, index) => (
                    <p key={index} className={msg.sender === 'user' ? 'user-message' : 'ai-message'}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
        </div>
    );
};

export default ChatBox;