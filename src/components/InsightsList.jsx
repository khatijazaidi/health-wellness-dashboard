import { Alert, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

function getSeverityForInsight(message) {
    if (message.includes("Great job") || message.includes("Nice consistency")) {
        return "success";
    }

    if (message.includes("higher side")) {
        return "info";
    }

    return "warning";
}

export default function InsightsList({ insights }) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(31,111,95,0.10)",
                background: "rgba(255,255,255,0.80)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Top accent bar */}
            <Box sx={{ height: 4, background: "linear-gradient(90deg, #1f6f5f 0%, #2fa084 50%, #6fcf97 100%)" }} />
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{
                            width: 40, height: 40, borderRadius: 2,
                            background: "linear-gradient(135deg, rgba(31,111,95,0.12) 0%, rgba(111,207,151,0.18) 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "1px solid rgba(31,111,95,0.12)",
                        }}>
                            <LightbulbOutlinedIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Smart Insights
                        </Typography>
                    </Stack>
                    {insights.map((insight) => (
                        <Alert
                            key={insight}
                            severity={getSeverityForInsight(insight)}
                            variant="outlined"
                            sx={{ borderRadius: 3, backdropFilter: "blur(4px)" }}
                        >
                            {insight}
                        </Alert>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}
