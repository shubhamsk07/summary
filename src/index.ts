import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
    origin: 'https://medium-clone-latest.vercel.app'
  }));


import {
    GoogleGenAI,
  } from '@google/genai';

  const ai = new GoogleGenAI({apiKey: 'AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw'});
app.post('/summarize', async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: 'Give the summary of the following text: ' + req.body.text,
          });
          console.log(response.text);
        res.json(response.text);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error summarizing text',);
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
