const ADVICE_API_URL = "https://api.adviceslip.com/advice";

const FALLBACK_ADVICE = [
    { id: 101, tip: "Small healthy actions done daily create long-term results." },
    { id: 102, tip: "Hydration, sleep, and movement are your strongest daily fundamentals." },
    { id: 103, tip: "Consistency beats intensity when building a sustainable routine." },
    { id: 104, tip: "A short walk and a glass of water can reset your energy quickly." },
    { id: 105, tip: "Build health habits around your schedule, not the other way around." },
];

const WELLNESS_KEYWORDS = [
    "health",
    "hydration",
    "water",
    "sleep",
    "rest",
    "exercise",
    "walk",
    "movement",
    "routine",
    "habit",
    "stress",
    "energy",
    "mind",
    "balance",
    "wellness",
    "body",
    "fitness",
];

async function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, {
            cache: "no-store",
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeoutId);
    }
}

function getFallbackAdvice() {
    const index = Math.floor(Math.random() * FALLBACK_ADVICE.length);
    return FALLBACK_ADVICE[index];
}

function isWellnessRelevantAdvice(tip) {
    if (!tip || typeof tip !== "string") {
        return false;
    }

    const normalized = tip.toLowerCase();
    return WELLNESS_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export async function GET() {
    try {
        const response = await fetchWithTimeout(`${ADVICE_API_URL}?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Advice API failed");
        }

        const data = await response.json();
        const tip = data?.slip?.advice;
        const id = data?.slip?.slip_id ?? data?.slip?.id;

        if (!tip) {
            throw new Error("Invalid advice payload");
        }

        if (!isWellnessRelevantAdvice(tip)) {
            const fallback = getFallbackAdvice();
            return Response.json({ ...fallback, source: "api-refined" });
        }

        return Response.json({ id: id ?? Date.now(), tip, source: "api" });
    } catch {
        const fallback = getFallbackAdvice();
        return Response.json({ ...fallback, source: "fallback" });
    }
}