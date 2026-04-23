"use client";
import { useState } from "react";
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

function normalizeInitialValues(initialData) {
    return {
        steps: initialData?.steps !== undefined && initialData?.steps !== null ? String(initialData.steps) : "",
        water: initialData?.water !== undefined && initialData?.water !== null ? String(initialData.water) : "",
        calories:
            initialData?.calories !== undefined && initialData?.calories !== null
                ? String(initialData.calories)
                : "",
    };
}

function validateHealthData(values) {
    const errors = {};

    if (values.steps === "") {
        errors.steps = "Steps are required.";
    } else if (Number.isNaN(Number(values.steps)) || Number(values.steps) < 0) {
        errors.steps = "Steps must be a number greater than or equal to 0.";
    }

    if (values.water === "") {
        errors.water = "Water intake is required.";
    } else if (Number.isNaN(Number(values.water)) || Number(values.water) < 0) {
        errors.water = "Water must be a number greater than or equal to 0.";
    }

    if (values.calories !== "" && (Number.isNaN(Number(values.calories)) || Number(values.calories) < 0)) {
        errors.calories = "Calories must be a number greater than or equal to 0.";
    }

    return errors;
}

export default function HealthForm({ onSubmit, onReset, initialData }) {
    const [values, setValues] = useState(normalizeInitialValues(initialData));
    const [errors, setErrors] = useState({});

    const handleChange = (fieldName) => (event) => {
        const nextValue = event.target.value;

        setValues((previousValues) => ({
            ...previousValues,
            [fieldName]: nextValue,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [fieldName]: undefined,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateHealthData(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        onSubmit({
            steps: Number(values.steps),
            water: Number(values.water),
            calories: values.calories === "" ? null : Number(values.calories),
        });
    };

    const handleReset = () => {
        setValues({ steps: "", water: "", calories: "" });
        setErrors({});
        onReset();
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(31,111,95,0.10)",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Top accent bar */}
            <Box sx={{ height: 4, background: "linear-gradient(90deg, #1f6f5f 0%, #2fa084 60%, #6fcf97 100%)" }} />
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Daily Health Input
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Enter today&apos;s values only. Use numbers only, no units in the input boxes.
                    </Typography>

                    <TextField
                        label="Steps Walked"
                        type="number"
                        required
                        value={values.steps}
                        onChange={handleChange("steps")}
                        error={Boolean(errors.steps)}
                        helperText={errors.steps || "Required: total steps today. Example: 8500"}
                        placeholder="e.g. 8500"
                        slotProps={{ htmlInput: { min: 0 } }}
                        fullWidth
                    />

                    <TextField
                        label="Water Intake (Liters)"
                        type="number"
                        required
                        value={values.water}
                        onChange={handleChange("water")}
                        error={Boolean(errors.water)}
                        helperText={errors.water || "Required: liters of water. Example: 2.3"}
                        placeholder="e.g. 2.3"
                        slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
                        fullWidth
                    />

                    <TextField
                        label="Calories Consumed (Optional)"
                        type="number"
                        value={values.calories}
                        onChange={handleChange("calories")}
                        error={Boolean(errors.calories)}
                        helperText={errors.calories || "Optional: calories consumed. Example: 2100"}
                        placeholder="e.g. 2100"
                        slotProps={{ htmlInput: { min: 0 } }}
                        fullWidth
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <Button type="submit" variant="contained" size="large" disableElevation sx={{ px: 2.5 }}>
                            Submit Metrics
                        </Button>
                        <Button type="button" variant="outlined" size="large" onClick={handleReset} sx={{ px: 2.5 }}>
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
