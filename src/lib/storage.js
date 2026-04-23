const STORAGE_KEY = "health-wellness-dashboard:data";

export function saveHealthData(healthData) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(healthData));
    } catch (error) {
        console.error("Could not save health data to localStorage", error);
    }
}

export function loadHealthData() {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);

        if (!rawValue) {
            return null;
        }

        const parsedValue = JSON.parse(rawValue);

        // Basic sanitization protects the UI from malformed localStorage values.
        if (
            typeof parsedValue?.steps !== "number" ||
            typeof parsedValue?.water !== "number" ||
            parsedValue.steps < 0 ||
            parsedValue.water < 0
        ) {
            return null;
        }

        if (
            parsedValue.calories !== null &&
            parsedValue.calories !== undefined &&
            (typeof parsedValue.calories !== "number" || parsedValue.calories < 0)
        ) {
            return null;
        }

        return {
            steps: parsedValue.steps,
            water: parsedValue.water,
            calories:
                parsedValue.calories === undefined || parsedValue.calories === ""
                    ? null
                    : parsedValue.calories,
        };
    } catch (error) {
        console.error("Could not load health data from localStorage", error);
        return null;
    }
}

export function clearHealthData() {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Could not clear health data from localStorage", error);
    }
}
