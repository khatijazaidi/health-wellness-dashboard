"use client";

import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Chip,
    Container,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import HealthForm from "@/components/HealthForm";
import EmptyState from "@/components/EmptyState";
import DashboardSummary from "@/components/DashboardSummary";
import AdviceTipCard from "@/components/AdviceTipCard";
import ActivitySuggestionCard from "@/components/ActivitySuggestionCard";
import InsightsList from "@/components/InsightsList";
import RulesCard from "@/components/RulesCard";
import { getHealthInsights, getHealthStatus } from "@/lib/healthLogic";
import { clearHealthData, loadHealthData, saveHealthData } from "@/lib/storage";

const DASHBOARD_TABS = [
    { value: "input", label: "Input", icon: <CreateOutlinedIcon fontSize="small" /> },
    {
        value: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlinedIcon fontSize="small" />,
    },
    {
        value: "insights",
        label: "Insights",
        icon: <LightbulbOutlinedIcon fontSize="small" />,
    },
    {
        value: "wellness",
        label: "Wellness Tip",
        icon: <TipsAndUpdatesOutlinedIcon fontSize="small" />,
    },
    {
        value: "activity",
        label: "Activity",
        icon: <DirectionsRunOutlinedIcon fontSize="small" />,
    },
];

export default function HomePage() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [healthData, setHealthData] = useState(() => loadHealthData());
    const [activeTab, setActiveTab] = useState("input");

    const status = useMemo(() => getHealthStatus(healthData), [healthData]);
    const insights = useMemo(() => getHealthInsights(healthData), [healthData]);

    const handleSubmit = (submittedData) => {
        if (!submittedData) return;

        setHealthData(submittedData);
        saveHealthData(submittedData);
        setActiveTab("dashboard");
    };

    const handleReset = () => {
        setHealthData(null);
        clearHealthData();
        setActiveTab("input");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: { xs: 2.5, md: 5 },
                position: 'relative',
            }}
        >
            {/* Background decorative layers */}
            <div className="bg-orb-bl" />
            <div className="bg-orb-mid" />
            <div className="dashboard-bg-geo" />
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Stack spacing={3.25}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2.5, md: 4 },
                            borderRadius: 5,
                            background:
                                "linear-gradient(135deg, #0b2e26 0%, #1a5c4e 30%, #1f7a66 58%, #2fa084 80%, #6fcf97 100%)",
                            color: "common.white",
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 32px 80px rgba(11, 46, 38, 0.38), 0 8px 24px rgba(31,111,95,0.22)",
                        }}
                    >
                        {/* Layered radial glows */}
                        <Box sx={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: "radial-gradient(ellipse 60% 80% at 95% 10%, rgba(111,207,151,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 5% 90%, rgba(255,255,255,0.10) 0%, transparent 50%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)"
                        }} />
                        {/* Decorative dot grid on header */}
                        <Box sx={{
                            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12,
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                            backgroundSize: "22px 22px"
                        }} />
                        {/* Decorative rings */}
                        <Box sx={{ position: "absolute", top: "-80px", right: "-80px", width: 320, height: 320, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.12)", pointerEvents: "none" }} />
                        <Box sx={{ position: "absolute", top: "-40px", right: "-40px", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                        <Box sx={{ position: "absolute", bottom: "-60px", left: "30%", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />

                        <Box
                            sx={{
                                position: "relative",
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
                                gap: { xs: 3, md: 4 },
                                alignItems: "center",
                            }}
                        >
                            <Stack spacing={2}>
                                <Chip
                                    label="Health & Wellness Dashboard"
                                    sx={{
                                        alignSelf: "flex-start",
                                        bgcolor: "rgba(255,255,255,0.16)",
                                        color: "white",
                                        border: "1px solid rgba(255,255,255,0.26)",
                                        fontWeight: 700,
                                        backdropFilter: "blur(8px)",
                                    }}
                                />
                                <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 30, md: 42 }, lineHeight: 1.05 }}>
                                    Build healthy momentum with clear daily tracking.
                                </Typography>
                                <Typography variant="body1" sx={{ maxWidth: 760, opacity: 0.96 }}>
                                    Add your daily numbers, check your status, and explore practical tips
                                    and activities to stay on track.
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                    <Chip label="1. Enter metrics" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }} />
                                    <Chip label="2. Check dashboard" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }} />
                                    <Chip label="3. Act on tips" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }} />
                                </Stack>
                            </Stack>

                            <Box
                                sx={{
                                    position: "relative",
                                    display: { xs: "none", lg: "flex" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    minHeight: 260,
                                }}
                            >
                                {/* Soft glow behind image */}
                                <Box sx={{
                                    position: "absolute",
                                    width: 300, height: 300,
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
                                    filter: "blur(8px)",
                                    pointerEvents: "none",
                                }} />
                                <Box
                                    component="img"
                                    src="/health-hero.svg"
                                    alt="Health dashboard illustration"
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        maxWidth: 360,
                                        maxHeight: 260,
                                        objectFit: "contain",
                                        borderRadius: 3,
                                        filter: "drop-shadow(0 16px 40px rgba(7,28,24,0.32))",
                                    }}
                                />

                            </Box>
                        </Box>
                    </Paper>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
                            gap: 3,
                            alignItems: "start",
                        }}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                position: { md: "sticky" },
                                top: { md: 20 },
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    mb: 1.5,
                                    borderRadius: 3,
                                    background:
                                        "linear-gradient(135deg, rgba(31,111,95,0.12) 0%, rgba(111,207,151,0.16) 100%)",
                                    border: "1px solid rgba(31,111,95,0.12)",
                                }}
                            >
                                <Typography variant="caption" sx={{ letterSpacing: 1.1, fontWeight: 800, textTransform: "uppercase" }}>
                                    Navigation
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.75, lineHeight: 1.1 }}>
                                    Your dashboard sections
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.6 }}>
                                    Move through the workflow in order: input, check status, review insights, then open tips.
                                </Typography>
                            </Box>

                            <Tabs
                                value={activeTab}
                                onChange={(event, value) => setActiveTab(value)}
                                orientation={isDesktop ? "vertical" : "horizontal"}
                                variant="scrollable"
                                allowScrollButtonsMobile
                                sx={{
                                    gap: 0.5,
                                    "& .MuiTabs-flexContainer": {
                                        gap: 0.5,
                                    },
                                }}
                            >
                                {DASHBOARD_TABS.map((tab) => (
                                    <Tab key={tab.value} value={tab.value} icon={tab.icon} iconPosition="start" label={tab.label} />
                                ))}
                            </Tabs>

                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor: "rgba(31,111,95,0.06)",
                                    border: "1px solid rgba(31,111,95,0.08)",
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                                    Rule-based system
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    Status, insights, and activity guidance are based on the same visible rules shown in the input section.
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper sx={{ p: { xs: 2.25, md: 3.25 }, borderRadius: 4, position: 'relative', overflow: 'visible' }}>
                            {/* Animated themed background for API tabs */}
                            {(activeTab === "wellness" || activeTab === "activity") && (
                                <>
                                    <div className="dashboard-bg-blob api" />
                                    <div className="dashboard-bg-blob api2" />
                                </>
                            )}

                            {activeTab === "input" && (
                                <Stack spacing={2.5}>
                                    <Alert severity="info" variant="outlined">
                                        Fill in today's numbers. Steps and water are required, calories are optional.
                                        Example: Steps = 7500, Water = 2.1, Calories = 2100.
                                    </Alert>
                                    <HealthForm
                                        key={JSON.stringify(healthData ?? {})}
                                        onSubmit={handleSubmit}
                                        onReset={handleReset}
                                        initialData={healthData}
                                    />
                                    <RulesCard />
                                </Stack>
                            )}

                            {activeTab === "dashboard" &&
                                (healthData ? (
                                    <Stack spacing={2.5}>
                                        <DashboardSummary healthData={healthData} status={status} />
                                    </Stack>
                                ) : (
                                    <EmptyState />
                                ))}

                            {activeTab === "insights" &&
                                (healthData ? (
                                    <Stack spacing={2}>
                                        <Typography variant="h5">Insights Center</Typography>
                                        <Typography color="text.secondary">
                                            These suggestions are generated by your current metrics and status logic.
                                        </Typography>
                                        <InsightsList insights={insights} />
                                    </Stack>
                                ) : (
                                    <EmptyState />
                                ))}

                            {activeTab === "wellness" && <AdviceTipCard />}

                            {activeTab === "activity" && <ActivitySuggestionCard />}
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}