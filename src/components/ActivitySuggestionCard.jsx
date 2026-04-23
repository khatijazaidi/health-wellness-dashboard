"use client";

import { useEffect, useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchActivitySuggestion } from "@/lib/activityApi";

function getHealthCategoryLabel(type) {
    const normalized = String(type || "").toLowerCase();

    if (normalized === "recreational") {
        return "Movement";
    }

    if (normalized === "education") {
        return "Healthy learning";
    }

    if (normalized === "busywork") {
        return "Healthy routine";
    }

    if (normalized === "social") {
        return "Social wellbeing";
    }

    return "Wellness";
}

function getParticipantsLabel(participants) {
    const count = Number(participants);

    if (Number.isNaN(count) || count <= 1) {
        return "Solo";
    }

    return `${count} people`;
}

export default function ActivitySuggestionCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [apiActivity, setApiActivity] = useState(null);

    const loadActivity = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetchActivitySuggestion();
            setApiActivity(response);
        } catch (requestError) {
            setError(
                requestError?.message ||
                "Unable to load activity suggestion right now.",
            );
            setApiActivity(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            loadActivity();
        }, 0);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                flex: 1,
                overflow: "hidden",
                border: "1px solid rgba(31,111,95,0.10)",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(12px)",
                position: "relative",
            }}
        >
            {/* Top gradient bar */}
            <Box sx={{ height: 4, background: "linear-gradient(90deg, #1a5c4e 0%, #2fa084 60%, #6fcf97 100%)" }} />
            {/* Decorative background circle */}
            <Box sx={{
                position: "absolute", bottom: -40, right: -40,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(47,160,132,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <CardContent sx={{ p: { xs: 2.25, md: 2.75 }, position: "relative" }}>
                <Stack spacing={2.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Avatar
                                sx={{
                                    bgcolor: "rgba(31,111,95,0.12)",
                                    color: "primary.main",
                                    width: 46,
                                    height: 46,
                                    mt: 0.5,
                                }}
                            >
                                <DirectionsRunIcon fontSize="small" />
                            </Avatar>
                            <Stack spacing={0.5} flex={1}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    Suggested Activity for Today
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    A fresh activity idea for today.
                                </Typography>
                            </Stack>
                        </Stack>

                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={loadActivity}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                    </Stack>

                    {isLoading && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={20} />
                            <Typography variant="body2" color="text.secondary">
                                Loading activity suggestion...
                            </Typography>
                        </Stack>
                    )}

                    {!isLoading && error && (
                        <Alert severity="warning" variant="outlined">
                            Could not refresh activity suggestion right now. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && apiActivity && (
                        <Alert severity="info" variant="outlined" sx={{ borderRadius: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                Suggested Activity
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                                {apiActivity.activity}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                <Chip
                                    label={`Category: ${getHealthCategoryLabel(apiActivity.type)}`}
                                    variant="outlined"
                                    size="small"
                                />
                                {apiActivity.participants !== undefined && (
                                    <Chip
                                        label={`Participants: ${getParticipantsLabel(apiActivity.participants)}`}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                            </Stack>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                                A fresh activity idea for today.
                            </Typography>
                        </Alert>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}