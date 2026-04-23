import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

const CARD_CONFIG = {
    "Steps Walked": {
        Icon: DirectionsWalkOutlinedIcon,
        gradient: "linear-gradient(135deg, #1f6f5f 0%, #2fa084 100%)",
        bg: "rgba(31,111,95,0.08)",
        accent: "rgba(31,111,95,0.15)",
    },
    "Water Intake": {
        Icon: WaterDropOutlinedIcon,
        gradient: "linear-gradient(135deg, #0288d1 0%, #4fc3f7 100%)",
        bg: "rgba(2,136,209,0.08)",
        accent: "rgba(2,136,209,0.12)",
    },
    Calories: {
        Icon: LocalFireDepartmentOutlinedIcon,
        gradient: "linear-gradient(135deg, #e65100 0%, #ff9800 100%)",
        bg: "rgba(230,81,0,0.08)",
        accent: "rgba(230,81,0,0.10)",
    },
};

export default function SummaryCard({ title, value, unit }) {
    const config = CARD_CONFIG[title] || CARD_CONFIG["Steps Walked"];
    const { Icon, gradient, bg, accent } = config;

    return (
        <Card
            elevation={0}
            className="fade-up"
            sx={{
                borderRadius: 4,
                minHeight: 148,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(31,111,95,0.10)",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(23,56,47,0.10), 0 1px 4px rgba(31,111,95,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 40px rgba(23,56,47,0.14)",
                },
            }}
        >
            {/* Top accent bar */}
            <Box sx={{ height: 4, background: gradient }} />
            {/* Background circle decoration */}
            <Box sx={{
                position: "absolute", bottom: -28, right: -28,
                width: 110, height: 110, borderRadius: "50%",
                background: accent, pointerEvents: "none",
            }} />
            <CardContent sx={{ p: 2.5, position: "relative" }}>
                <Stack spacing={1.5}>
                    <Avatar sx={{ width: 44, height: 44, background: gradient, boxShadow: "0 6px 16px rgba(31,111,95,0.22)" }}>
                        <Icon fontSize="small" sx={{ color: "white" }} />
                    </Avatar>
                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.05, color: "text.primary" }}>
                            {value}
                            {unit ? <Typography component="span" variant="body1" sx={{ fontWeight: 600, ml: 0.5, color: "text.secondary" }}>{unit}</Typography> : ""}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
