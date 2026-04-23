"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const BAR_COLORS = ["#2e7d32", "#0288d1", "#f57c00"];

export default function HealthChart({ healthData }) {
    const chartData = [
        { metric: "Steps", value: healthData.steps },
        { metric: "Water (L)", value: healthData.water },
        { metric: "Calories", value: healthData.calories ?? 0 },
    ];

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
            <Box sx={{ height: 4, background: "linear-gradient(90deg, #0288d1 0%, #2fa084 50%, #6fcf97 100%)" }} />
            <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Health Metrics Chart
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A quick visual comparison of your latest daily values.
                    </Typography>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
                            <CartesianGrid strokeDasharray="4 4" stroke="rgba(71, 95, 89, 0.14)" vertical={false} />
                            <XAxis dataKey="metric" tick={{ fill: "#42685d", fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#42685d", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 14,
                                    border: "1px solid rgba(31,111,95,0.12)",
                                    boxShadow: "0 12px 28px rgba(23, 56, 47, 0.12)",
                                    background: "rgba(255,255,255,0.96)",
                                }}
                                cursor={{ fill: "rgba(31,111,95,0.05)" }}
                            />
                            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={entry.metric} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            </CardContent>
        </Card>
    );
}
