const EXTERNAL_ACTIVITY_ENDPOINTS = [
    "https://bored-api.appbrewery.com/random",
    "https://www.boredapi.com/api/activity",
];

const HEALTH_ACTIVITY_TYPES = ["recreational", "education", "busywork"];

const HEALTH_ACTIVITY_KEYWORDS = [
    "walk",
    "stretch",
    "exercise",
    "workout",
    "yoga",
    "run",
    "jog",
    "cycle",
    "hike",
    "swim",
    "breathing",
    "meditation",
    "mindful",
    "mobility",
    "dance",
    "outdoor",
];

const FALLBACK_ACTIVITIES = [
    {
        activity: "Take a 12-minute brisk walk and focus on steady breathing.",
        type: "recreational",
        participants: 1,
        price: 0,
        accessibility: 0.2,
        link: "",
    },
    {
        activity: "Do a 10-minute mobility routine for hips, shoulders, and back.",
        type: "education",
        participants: 1,
        price: 0,
        accessibility: 0.25,
        link: "",
    },
    {
        activity: "Take a standing break and complete 3 rounds of light stretching.",
        type: "busywork",
        participants: 1,
        price: 0,
        accessibility: 0.15,
        link: "",
    },
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

function normalize(payload) {
    return {
        activity: payload?.activity || "Take a short mindful walk.",
        type: payload?.type || "wellness",
        participants: payload?.participants ?? 1,
        price: payload?.price ?? 0,
        accessibility: payload?.accessibility ?? payload?.availability ?? 0.2,
        link: payload?.link || "",
    };
}

function getFallbackActivity() {
    const index = Math.floor(Math.random() * FALLBACK_ACTIVITIES.length);
    return FALLBACK_ACTIVITIES[index];
}

function buildBoredApiUrl(focus) {
    const baseUrl = "https://www.boredapi.com/api/activity";

    if (focus === "movement") {
        return `${baseUrl}?participants=1&price=0.4&type=recreational`;
    }

    if (focus === "hydration") {
        return `${baseUrl}?participants=1&price=0.4&type=busywork`;
    }

    return `${baseUrl}?participants=1&price=0.5`;
}

function isHealthRelevantActivity(activity) {
    if (!activity?.activity) {
        return false;
    }

    const normalizedText = String(activity.activity).toLowerCase();
    const hasKeyword = HEALTH_ACTIVITY_KEYWORDS.some((keyword) =>
        normalizedText.includes(keyword),
    );

    const allowedType = HEALTH_ACTIVITY_TYPES.includes(
        String(activity.type || "").toLowerCase(),
    );

    const lowParticipants = Number(activity.participants ?? 1) <= 2;
    const lowCost = Number(activity.price ?? 0) <= 0.6;

    return hasKeyword || (allowedType && lowParticipants && lowCost);
}

export async function GET(request) {
    const requestUrl = new URL(request.url);
    const focus = requestUrl.searchParams.get("focus") || "general";

    const endpoints = [
        buildBoredApiUrl(focus),
        ...EXTERNAL_ACTIVITY_ENDPOINTS,
    ];

    for (const endpoint of endpoints) {
        try {
            const separator = endpoint.includes("?") ? "&" : "?";
            const response = await fetchWithTimeout(`${endpoint}${separator}t=${Date.now()}`);

            if (!response.ok) {
                continue;
            }

            const data = await response.json();
            const normalized = normalize(data);

            if (!isHealthRelevantActivity(normalized)) {
                continue;
            }

            return Response.json({
                ...normalized,
                source: "api",
            });
        } catch {
            // Try next endpoint and finally fallback.
        }
    }

    return Response.json({
        ...normalize(getFallbackActivity()),
        source: "fallback",
    });
}