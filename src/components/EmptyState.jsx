import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";

export default function EmptyState() {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1.5px dashed rgba(31,111,95,0.22)",
                background: "linear-gradient(135deg, rgba(31,111,95,0.04) 0%, rgba(111,207,151,0.06) 100%)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Decorative background circle */}
            <Box sx={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(47,160,132,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <CardContent sx={{ position: "relative" }}>
                <Stack spacing={2} alignItems="center" textAlign="center" py={4}>
                    <Box sx={{
                        width: 72, height: 72, borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(31,111,95,0.12) 0%, rgba(111,207,151,0.18) 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1.5px solid rgba(31,111,95,0.14)",
                    }}>
                        <MonitorHeartOutlinedIcon sx={{ fontSize: 36, color: "primary.main", opacity: 0.7 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Start with your daily health input
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480, lineHeight: 1.7 }}>
                        Open the Input tab from the sidebar and enter steps + water first. Once submitted,
                        this section will automatically show your dashboard summary and analysis.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
