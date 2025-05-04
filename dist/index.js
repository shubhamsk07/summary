"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genai_1 = require("@google/genai");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware to allow all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
app.use(express_1.default.json());
// Gemini setup
const ai = new genai_1.GoogleGenAI({
    apiKey: 'AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw',
});
app.post('/summarize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const result = yield ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: 'Give the summary of the following text: ' + text,
        });
        const summary = result.data || 'No summary returned';
        console.log(summary);
        res.json({ summary });
    }
    catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).json({ error: 'Error summarizing text' });
    }
}));
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
