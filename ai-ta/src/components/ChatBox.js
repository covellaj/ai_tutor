import React, { useState } from 'react';
import '../styles/ChatBox.module.css';  // Ensure to create this CSS module for styling

const ChatBox = () => {
    const [messages, setMessages] = useState([]);  // To store messages
    const [inputText, setInputText] = useState('');  // To handle the text input

    // Function to handle input changes
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // Function to handle sending messages
    const handleSendMessage = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (inputText.trim()) {
                setMessages([...messages, inputText]);
                setInputText('');
            }
        }
    };

    return (
        <div className="chat-box">
            <div className="message-area">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <textarea
                className="input-box"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleSendMessage}
                placeholder="Type your message here..."
            />
        </div>
    );
};

export default ChatBox;
