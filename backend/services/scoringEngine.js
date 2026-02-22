const fs = require('fs');
const path = require('path');

/**
 * Scoring Engine
 * Ranks crops from the dataset based on farm info and real-time weather.
 */
async function generateRecommendations(farmInfo, weather) {
    try {
        const datasetPath = path.join(__dirname, '../../maharashtra_full_crop_dataset_15.json');
        const rawData = fs.readFileSync(datasetPath, 'utf8');
        const allCrops = JSON.parse(rawData);

        const { soilType, plantingSeason } = farmInfo;
        const { temperature, humidity } = weather;

        const scoredCrops = allCrops.map(crop => {
            let score = 50; // Base score

            // 1. Season Match (Weight: 25)
            if (plantingSeason && crop.season.toLowerCase().includes(plantingSeason.toLowerCase())) {
                score += 25;
            }

            // 2. Soil Match (Weight: 15)
            if (soilType && crop.suitable_soils.toLowerCase().includes(soilType.toLowerCase())) {
                score += 15;
            }

            // 3. Weather Optimization (Weight: 10)
            // If current weather is within ideal range, boost score
            if (temperature >= crop.temperature_min_c && temperature <= crop.temperature_max_c) {
                score += 5;
            }
            if (humidity >= crop.humidity_min_percent && humidity <= crop.humidity_max_percent) {
                score += 5;
            }

            return {
                id: crop.crop_name_english.toLowerCase(),
                nameEn: crop.crop_name_english,
                nameMr: crop.crop_name_marathi,
                matchScore: Math.min(score, 100),
                season: crop.season,
                duration: crop.duration_days,
                waterReq: crop.water_requirement,
                tags: [crop.season.split(',')[0], crop.water_requirement + ' Water'],
                image: getCropImage(crop.crop_name_english)
            };
        });

        // Sort by score descending and return top 5
        const topCrops = scoredCrops
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);

        return {
            recommendations: topCrops,
            count: topCrops.length
        };

    } catch (err) {
        console.error('[ScoringEngine] Error:', err.message);
        return { recommendations: [], error: err.message };
    }
}

// Fallback helper for crop images
function getCropImage(name) {
    const images = {
        'Onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400',
        'Tomato': 'https://images.unsplash.com/photo-1591857172839-acdec0406fe0?auto=format&fit=crop&q=80&w=400',
        'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f02bad67b?auto=format&fit=crop&q=80&w=400',
        'Cotton': 'https://images.unsplash.com/photo-1594903323955-442d87e148e4?auto=format&fit=crop&q=80&w=400',
        'Soybean': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
        'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400'
    };
    return images[name] || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400';
}

module.exports = { generateRecommendations };
