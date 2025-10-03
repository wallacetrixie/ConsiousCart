import "../styles/response.css";
import React, { useState } from "react";
import axios from "axios";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setResponse("Thinking...");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error fetching response. Try again later.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chat</h2>
      <div className="input-section">
        <textarea
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt here..."
          disabled={loading}
        ></textarea>
        <button className="send-btn" onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {response && <div className="response-box">{response}</div>}
    </div>
  );
};

export default AIChat;
