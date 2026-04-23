"use client";

import { Alert, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import { getStatusGuideRows } from "@/lib/healthRules";

export default function RulesCard() {
    const guideRows = getStatusGuideRows();

    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,248,246,0.98) 100%)",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Box
                sx={{
                    height: 10,
                    background:
                        "linear-gradient(90deg, #1F6F5F 0%, #3A8F78 48%, #7FD4B4 100%)",
                }}
            />

            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Stack spacing={3}>
                    <Box
                        sx={{
                            p: { xs: 2, md: 2.5 },
                            borderRadius: 3,
                            background:
                                "linear-gradient(135deg, rgba(31,111,95,0.08) 0%, rgba(127,212,180,0.18) 100%)",
                            border: "1px solid rgba(31,111,95,0.14)",
                        }}
                    >
                        <Stack spacing={1.25}>
                            <Chip
                                label="Simple status guide"
                                color="success"
                                variant="outlined"
                                sx={{ alignSelf: "flex-start", fontWeight: 700 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                                What each status means
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
                                Your dashboard uses a simple status system so you can quickly understand how your day is going without reading any technical details.
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                            gap: 2,
                        }}
                    >
                        {guideRows.map((row) => {
                            const iconMap = {
                                good: <CheckCircleIcon />,
                                warning: <WarningAmberIcon />,
                                poor: <ErrorIcon />,
                            };

                            return (
                                <Alert
                                    key={row.key}
                                    icon={iconMap[row.key]}
                                    severity={row.severity}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 3,
                                        alignItems: "flex-start",
                                        minHeight: "100%",
                                        backgroundColor:
                                            row.severity === "success"
                                                ? "rgba(237, 247, 237, 0.7)"
                                                : row.severity === "warning"
                                                    ? "rgba(255, 244, 229, 0.8)"
                                                    : "rgba(253, 237, 237, 0.8)",
                                    }}
                                >
                                    <Stack spacing={0.75}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                                            {row.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                                            {row.summary}
                                        </Typography>
                                    </Stack>
                                </Alert>
                            );
                        })}
                    </Box>

                    <Box
                        sx={{
                            p: { xs: 2, md: 2.5 },
                            borderRadius: 3,
                            bgcolor: "rgba(31,111,95,0.06)",
                            border: "1px solid rgba(31,111,95,0.12)",
                        }}
                    >
                        <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                            <strong>How to use this:</strong> enter your daily numbers, then look at the status and short explanation. The goal is simply to show whether you are doing well, okay, or need attention today.
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
