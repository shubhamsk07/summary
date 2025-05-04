import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 5000;

// Middleware to allow all origins (Update this)
app.use((req, res, next) => {
  // Allow all origins (if that's okay for your use case)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins

  // Alternatively, you could allow a specific domain:
  // res.setHeader('Access-Control-Allow-Origin', 'https://medium-clone-latest.vercel.app');

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw',
});

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    // Ensure text is present in the request
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: 'Give the summary of the following text: ' + text,
    });

    const summary = result.data || 'No summary returned';
    console.log(summary);

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Error summarizing text' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
