"use client";

import { useEffect, useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchWellnessTip } from "@/lib/adviceApi";

export default function AdviceTipCard() {
    const [lastRefreshTime, setLastRefreshTime] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [apiTip, setApiTip] = useState("");

    const loadTip = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetchWellnessTip();
            setApiTip(response.tip || "");
            setLastRefreshTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        } catch (requestError) {
            setError(requestError.message || "Unable to load tip. Please try again.");
            setApiTip("");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            loadTip();
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
            <Box sx={{ height: 4, background: "linear-gradient(90deg, #1f6f5f 0%, #2fa084 60%, #a2e4ba 100%)" }} />
            {/* Decorative background circle */}
            <Box sx={{
                position: "absolute", bottom: -40, right: -40,
                width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(47,160,132,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <CardContent sx={{ p: { xs: 2.25, md: 2.75 }, position: "relative" }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar
                                sx={{
                                    bgcolor: "rgba(31,111,95,0.12)",
                                    color: "primary.main",
                                    width: 46,
                                    height: 46,
                                }}
                            >
                                <AutoAwesomeIcon fontSize="small" />
                            </Avatar>
                            <Stack spacing={0.25}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    Daily Wellness Tip
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    A fresh tip for today.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={loadTip}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                    </Stack>

                    {!isLoading && !error && apiTip && (
                        <Alert severity="info" variant="outlined" sx={{ borderRadius: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                Daily Tip
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{apiTip}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                                Latest tip for today.
                            </Typography>
                        </Alert>
                    )}

                    {isLoading && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={20} />
                            <Typography variant="body2" color="text.secondary">
                                Refreshing wellness source...
                            </Typography>
                        </Stack>
                    )}

                    {!isLoading && error && (
                        <Alert severity="warning" variant="outlined">
                            Could not refresh the tip right now. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && <Divider />}

                    {!isLoading && !error && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Updated at {lastRefreshTime}.
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}