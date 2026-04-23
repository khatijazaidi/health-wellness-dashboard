export async function fetchWellnessTip() {
    const response = await fetch(`/api/advice?t=${Date.now()}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Could not fetch wellness tip right now.");
    }

    const data = await response.json();

    if (!data?.tip) {
        throw new Error("Advice API returned an unexpected response.");
    }

    return {
        id: data.id,
        tip: data.tip,
        source: data.source || "api",
    };
}