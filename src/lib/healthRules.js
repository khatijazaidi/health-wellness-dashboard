export const HEALTH_RULES = {
    good: {
        steps: 8000,
        water: 2.0,
    },
    poor: {
        steps: 4000,
        water: 1.5,
    },
    caloriesHigh: 2800,
};

export const STATUS_LABELS = {
    good: "Good",
    warning: "Warning",
    poor: "Poor",
};

export const STATUS_SUMMARIES = {
    good: "Your activity and hydration are both in a strong range today.",
    warning: "You're in the middle range today, so there is room to improve.",
    poor: "One or more key areas need attention today, especially movement or hydration.",
};

export function getStatusGuideRows() {
    return [
        {
            key: "good",
            label: "Good",
            severity: "success",
            summary: "Your activity and hydration look strong today.",
        },
        {
            key: "warning",
            label: "Warning",
            severity: "warning",
            summary: "You are doing okay, but one or more areas could use a bit more attention.",
        },
        {
            key: "poor",
            label: "Poor",
            severity: "error",
            summary: "One or more key areas need attention today, especially movement or hydration.",
        },
    ];
}