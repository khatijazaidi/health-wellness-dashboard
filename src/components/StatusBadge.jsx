import { Box, Stack, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

const STATUS_CONFIG = {
    Good: {
        label: "Good",
        gradient: "linear-gradient(135deg, #1a5c4e 0%, #2fa084 100%)",
        glow: "rgba(47,160,132,0.35)",
        Icon: CheckCircleOutlinedIcon,
        dot: "#6fcf97",
    },
    Warning: {
        label: "Warning",
        gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
        glow: "rgba(245,158,11,0.30)",
        Icon: WarningAmberOutlinedIcon,
        dot: "#fbbf24",
    },
    Poor: {
        label: "Poor",
        gradient: "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)",
        glow: "rgba(239,68,68,0.30)",
        Icon: ErrorOutlinedIcon,
        dot: "#f87171",
    },
};

export default function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.Warning;
    const { label, gradient, glow, Icon, dot } = config;

    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 2.5,
                py: 1.25,
                borderRadius: 999,
                background: gradient,
                boxShadow: `0 8px 24px ${glow}, 0 2px 8px rgba(0,0,0,0.10)`,
                width: "fit-content",
                animation: status === "Good" ? "pulseRing 2.4s ease-out infinite" : "none",
            }}
        >
            {/* Live dot */}
            <Box sx={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
                <Box sx={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    bgcolor: dot, opacity: 0.5,
                    animation: "pulseRing 1.8s ease-out infinite",
                }} />
                <Box sx={{ position: "absolute", inset: 2, borderRadius: "50%", bgcolor: "white" }} />
            </Box>
            <Icon sx={{ color: "white", fontSize: 20 }} />
            <Stack spacing={0}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", lineHeight: 1 }}>
                    Health Status
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 800, lineHeight: 1.2 }}>
                    {label}
                </Typography>
            </Stack>
        </Box>
    );
}
