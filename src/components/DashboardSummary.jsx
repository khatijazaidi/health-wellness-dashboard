import { Alert, Box, Stack, Typography } from "@mui/material";
import SummaryCard from "@/components/SummaryCard";
import StatusBadge from "@/components/StatusBadge";
import HealthChart from "@/components/HealthChart";
import { getHealthStatusReason } from "@/lib/healthLogic";

export default function DashboardSummary({ healthData, status }) {
    if (!healthData) return null;

    const statusReason = getHealthStatusReason(healthData);

    return (
        <Stack spacing={3}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Dashboard Summary
            </Typography>
            <Typography color="text.secondary">
                Quick snapshot of your latest daily health inputs and overall status.
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 2,
                }}
            >
                <SummaryCard title="Steps Walked" value={healthData.steps} />
                <SummaryCard
                    title="Water Intake"
                    value={Number(healthData.water).toFixed(1)}
                    unit="L"
                />
                <SummaryCard
                    title="Calories"
                    value={healthData.calories !== null ? healthData.calories : "Not entered"}
                />
            </Box>

            <StatusBadge status={status} />

            <Alert severity={status === "Good" ? "success" : status === "Poor" ? "error" : "warning"} variant="outlined">
                {statusReason}
            </Alert>

            <HealthChart healthData={healthData} />
        </Stack>
    );
}