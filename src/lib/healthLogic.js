import { HEALTH_RULES, STATUS_SUMMARIES, STATUS_LABELS } from "@/lib/healthRules";

export function getHealthStatus(healthData) {
    if (!healthData) {
        return STATUS_LABELS.warning;
    }

    const { steps = 0, water = 0 } = healthData;

    // Order matters: strongest positive condition first, then critical negatives.
    if (steps > HEALTH_RULES.good.steps && water >= HEALTH_RULES.good.water) {
        return STATUS_LABELS.good;
    }

    if (water < HEALTH_RULES.poor.water || steps < HEALTH_RULES.poor.steps) {
        return STATUS_LABELS.poor;
    }

    return STATUS_LABELS.warning;
}

export function getHealthStatusReason(healthData) {
    if (!healthData) {
        return "Add your daily metrics to see your status.";
    }

    const { steps = 0, water = 0 } = healthData;

    if (steps > HEALTH_RULES.good.steps && water >= HEALTH_RULES.good.water) {
        return "Good: your activity and hydration are both in a strong range today.";
    }

    if (steps < HEALTH_RULES.poor.steps && water < HEALTH_RULES.poor.water) {
        return "Poor: both your movement and hydration need more attention today.";
    }

    if (steps < HEALTH_RULES.poor.steps) {
        return "Poor: your movement is low today, so a little more activity would help.";
    }

    if (water < HEALTH_RULES.poor.water) {
        return "Poor: your hydration is low today, so water should be the focus.";
    }

    return `Warning: you're in the middle range today, so there is room to improve.`;
}

export function getHealthInsights(healthData) {
    if (!healthData) {
        return [];
    }

    const { steps = 0, water = 0, calories } = healthData;
    const insights = [];

    if (steps > HEALTH_RULES.good.steps && water >= HEALTH_RULES.good.water) {
        insights.push("Great job! You are maintaining a healthy routine.");
    }

    if (water < HEALTH_RULES.poor.water) {
        insights.push("Drink more water to stay hydrated.");
    }

    if (steps < HEALTH_RULES.poor.steps) {
        insights.push("Increase activity to improve your daily movement.");
    }

    if (typeof calories === "number" && calories > HEALTH_RULES.caloriesHigh) {
        insights.push("Your calories are on the higher side today. Consider a lighter next meal.");
    }

    if (insights.length === 0) {
        insights.push("Nice consistency! Keep following your wellness habits.");
    }

    return insights;
}
