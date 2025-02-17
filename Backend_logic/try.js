require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
const apiKey = "";
app.post("/chat", async (req, res) => {
  try {
     const { message } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
        },
      }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing your request" });
  }
});

console.log("API Key:", apiKey); // Debugging: Check if the API key is being retrieved correctly


app.listen(5000, () => console.log("Server running on port 5000"));
