const https = require('https');

/**
 * Weather Service
 * Fetches real-time temperature and humidity using built-in https.
 */
async function getRealTimeWeather(lat = 18.5204, lon = 73.8567) {
    const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;

    return new Promise((resolve) => {
        if (!API_KEY || API_KEY === 'your_key_here' || !API_KEY) {
            console.warn('[WeatherService] No valid API key, using fallback');
            return resolve({ temperature: 25, humidity: 65, source: "fallback" });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.main) {
                        resolve({
                            temperature: Math.round(parsed.main.temp),
                            humidity: parsed.main.humidity,
                            source: "live",
                            location: parsed.name
                        });
                    } else {
                        throw new Error('Invalid response');
                    }
                } catch (e) {
                    resolve({ temperature: 25, humidity: 65, source: "fallback" });
                }
            });
        }).on('error', (err) => {
            console.warn(`[WeatherService] Request failed: ${err.message}`);
            resolve({ temperature: 25, humidity: 65, source: "fallback" });
        });
    });
}

module.exports = { getRealTimeWeather };
