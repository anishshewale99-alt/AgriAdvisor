const express = require('express');
const router = express.Router();

// This route acts as a secure proxy to an external TTS API
router.post('/', async (req, res) => {
    const { text, lang } = req.body;
    const apiKey = process.env.TTS_API_KEY;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (!apiKey) {
        console.error('TTS_API_KEY is missing in environment variables');
        return res.status(500).json({ error: 'TTS configuration error' });
    }

    try {
        // We use Google Cloud Text-to-Speech API as a robust default for multiple languages including Marathi
        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: { text },
                voice: {
                    languageCode: lang === 'mr' ? 'mr-IN' : 'en-US',
                    // Using standard voices, can be switched to Wavenet for better quality if desired
                    name: lang === 'mr' ? 'mr-IN-Standard-A' : 'en-US-Standard-C'
                },
                audioConfig: {
                    audioEncoding: 'MP3'
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('External TTS API Error:', errorData);
            return res.status(response.status).json({
                error: 'External TTS service failed',
                details: errorData.error?.message
            });
        }

        const data = await response.json();

        // Google TTS returns base64 encoded audio content
        if (data.audioContent) {
            const audioBuffer = Buffer.from(data.audioContent, 'base64');

            // Set correct headers for audio playback
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.length,
                'Cache-Control': 'no-cache'
            });

            return res.send(audioBuffer);
        } else {
            throw new Error('No audio content received from TTS API');
        }

    } catch (error) {
        console.error('Internal TTS Route Error:', error);
        res.status(500).json({ error: 'Failed to process Text-to-Speech' });
    }
});

module.exports = router;
