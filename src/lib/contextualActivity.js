import { HEALTH_RULES, STATUS_LABELS } from "@/lib/healthRules";

// Rule-based activity suggestions tied directly to health metrics
export function getContextualActivity(healthData) {
    if (!healthData) {
        return {
            activity: "Start by entering your daily metrics",
            type: "info",
            reason: "Once you log steps and water, personalized activity suggestions will appear here.",
            source: "rule-based",
        };
    }

    const { steps = 0, water = 0, calories } = healthData;

    // Both steps and water are critically low
    if (steps < HEALTH_RULES.poor.steps && water < HEALTH_RULES.poor.water) {
        return {
            activity: "Start with a 10-minute walk while drinking water. Focus on movement and hydration together.",
            type: "movement",
            reason: "Your step count and hydration are both low. A simple walk with water breaks helps both.",
            source: "rule-based",
        };
    }

    // Steps are very low - prioritize movement
    if (steps < HEALTH_RULES.poor.steps) {
        return {
            activity: "Take a 15-minute walk outdoors or do 3 sets of 5-minute active breaks (stretching, light cardio).",
            type: "movement",
            reason: "Your steps are below 4000. Regular movement breaks will improve your daily activity.",
            source: "rule-based",
        };
    }

    // Water is low - prioritize hydration
    if (water < HEALTH_RULES.poor.water) {
        return {
            activity: "Drink 500ml of water within the next 30 minutes, then set a reminder to drink every hour.",
            type: "hydration",
            reason: "Your water intake is below 1.5L. Stay hydrated throughout the day.",
            source: "rule-based",
        };
    }

    // Calories are high - balance with activity
    if (typeof calories === "number" && calories > HEALTH_RULES.caloriesHigh) {
        return {
            activity: "Take a 20-minute walk after your next meal to help with digestion and movement.",
            type: "movement",
            reason: "Your calorie intake is higher today. A walk after eating helps balance the day.",
            source: "rule-based",
        };
    }

    // Status is good - maintain momentum
    if (steps > HEALTH_RULES.good.steps && water >= HEALTH_RULES.good.water) {
        return {
            activity: "Keep your momentum with a light evening activity: a walk, yoga session, or light sport.",
            type: "wellness",
            reason: "You're on track! Maintain this great routine with consistent daily movement.",
            source: "rule-based",
        };
    }

    // In the middle zone (warning) - suggest balance
    return {
        activity: "Aim for a 30-minute activity session today: brisk walk, cycling, swimming, or gym session.",
        type: "general",
        reason: "You're making progress. One focused activity session will push you toward a Good status.",
        source: "rule-based",
    };
}
