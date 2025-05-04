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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://medium-clone-latest.vercel.app'
}));
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: 'AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw' });
app.post('/summarize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: 'Give the summary of the following text: ' + req.body.text,
        });
        console.log(response.text);
        res.json(response.text);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error summarizing text');
    }
}));
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
