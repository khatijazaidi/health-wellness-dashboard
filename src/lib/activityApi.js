export async function fetchActivitySuggestion(options = {}) {
    const focus = options?.focus ? `&focus=${encodeURIComponent(options.focus)}` : "";

    const response = await fetch(`/api/activity?t=${Date.now()}${focus}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Could not fetch activity suggestion right now.");
    }

    const data = await response.json();

    return {
        activity: data?.activity || "Take a short mindful walk.",
        type: data?.type || "wellness",
        participants: data?.participants ?? 1,
        price: data?.price ?? 0,
        accessibility: data?.accessibility ?? 0.2,
        link: data?.link || "",
        source: data?.source || "api",
    };
}