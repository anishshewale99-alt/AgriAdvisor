const express = require('express');
const router = express.Router();
const { SarvamAIClient } = require("sarvamai");

router.post('/', async (req, res) => {
    const { text, lang } = req.body;
    console.log(`TTS Request: lang=${lang}, text="${text?.substring(0, 50)}..."`);
    const apiKey = process.env.SARVAM_API_KEY;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (!apiKey) {
        console.error('SARVAM_API_KEY is missing');
        return res.status(500).json({ error: 'TTS configuration error' });
    }

    try {
        const client = new SarvamAIClient({
            apiSubscriptionKey: apiKey
        });

        const langCode = lang === 'mr' ? 'mr-IN' : 'en-IN';

        const response = await client.textToSpeech.convert({
            text: text,
            target_language_code: langCode,
            speaker: "shubh",
            pace: 1.1,
            speech_sample_rate: 22050,
            enable_preprocessing: true,
            model: "bulbul:v3"
        });

        // Sarvam AI returns base64 in an array called 'audios'
        if (response && response.audios && response.audios.length > 0) {
            const audioBuffer = Buffer.from(response.audios[0], 'base64');
            res.set({
                'Content-Type': 'audio/wav',
                'Content-Length': audioBuffer.length,
                'Cache-Control': 'no-cache'
            });
            return res.send(audioBuffer);
        } else {
            console.error('No audio content in Sarvam response:', response);
            return res.status(500).json({ error: 'No audio content received from Sarvam AI' });
        }
    } catch (error) {
        console.error('Sarvam TTS Route Error:', error);
        res.status(500).json({ error: 'Failed to process Text-to-Speech' });
    }
});

module.exports = router;
