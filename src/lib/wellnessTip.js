import { HEALTH_RULES, STATUS_LABELS } from "@/lib/healthRules";

export function getContextualWellnessTip(healthData, status) {
    if (!healthData) {
        return {
            badge: "Start here",
            severity: "info",
            headline: "Enter today's steps and water to unlock a personalized wellness tip.",
            details:
                "Once you save your metrics, the dashboard can tailor guidance around hydration, movement, and recovery.",
        };
    }

    const { steps = 0, water = 0, calories } = healthData;

    if (water < HEALTH_RULES.poor.water && steps < HEALTH_RULES.poor.steps) {
        return {
            badge: "Recovery focus",
            severity: "warning",
            headline: "Hydration and movement both need attention today.",
            details:
                "Drink water sooner and take a short walk after your next meal to improve how the rest of the day feels.",
        };
    }

    if (water < HEALTH_RULES.poor.water) {
        return {
            badge: "Hydration first",
            severity: "warning",
            headline: "Hydration is the easiest win on today's dashboard.",
            details:
                "Keep a bottle nearby and aim for small, consistent sips instead of waiting until you feel thirsty.",
        };
    }

    if (steps < HEALTH_RULES.poor.steps) {
        return {
            badge: "Movement boost",
            severity: "info",
            headline: "A short activity break would improve today's movement score.",
            details:
                "A 10-minute walk, light stretch, or a quick standing break can nudge your step count in the right direction.",
        };
    }

    if (typeof calories === "number" && calories > HEALTH_RULES.caloriesHigh) {
        return {
            badge: "Balanced recovery",
            severity: "info",
            headline: "Calories are higher today, so aim for balance in the next meal.",
            details:
                "Choose a lighter, fiber-rich option and pair it with a walk to keep the day feeling steady.",
        };
    }

    if (status === STATUS_LABELS.good) {
        return {
            badge: "Maintain momentum",
            severity: "success",
            headline: "You're in a strong routine today.",
            details:
                "Keep hydration consistent and protect the momentum with one more active break before the day ends.",
        };
    }

    return {
        badge: "Steady progress",
        severity: "success",
        headline: "You're on a balanced track.",
        details:
            "Keep your meals, hydration, and movement evenly spaced to finish the day with a calm, consistent routine.",
    };
}