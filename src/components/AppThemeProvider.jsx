"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1F6F5F",
            dark: "#184f45",
            light: "#2FA084",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#2FA084",
            dark: "#1f7e67",
            light: "#6FCF97",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#6FCF97",
            dark: "#4fae75",
            light: "#a2e4ba",
            contrastText: "#133124",
        },
        background: {
            default: "#edf7f3",
            paper: "rgba(255,255,255,0.9)",
        },
        text: {
            primary: "#17382f",
            secondary: "#42685d",
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: "'Segoe UI', Arial, sans-serif",
        h1: {
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(247,252,249,0.88) 100%)",
                    border: "1px solid rgba(31,111,95,0.10)",
                    boxShadow: "0 8px 32px rgba(23, 56, 47, 0.10), 0 1px 4px rgba(31,111,95,0.06)",
                    backdropFilter: "blur(12px)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(247,252,249,0.88) 100%)",
                    backdropFilter: "blur(10px)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 14,
                    paddingInline: 16,
                    letterSpacing: 0.2,
                },
                contained: {
                    boxShadow: "0 12px 24px rgba(31,111,95,0.22)",
                    backgroundImage:
                        "linear-gradient(135deg, #1F6F5F 0%, #2FA084 100%)",
                    "&:hover": {
                        boxShadow: "0 14px 28px rgba(31,111,95,0.26)",
                        backgroundImage:
                            "linear-gradient(135deg, #1b6053 0%, #278b73 100%)",
                    },
                },
                outlined: {
                    borderColor: "rgba(31,111,95,0.38)",
                    color: "#1F6F5F",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    "&:hover": {
                        borderColor: "rgba(31,111,95,0.56)",
                        backgroundColor: "rgba(31,111,95,0.06)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    borderRadius: 999,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                },
                standardInfo: {
                    backgroundColor: "rgba(47,160,132,0.08)",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255,255,255,0.78)",
                    borderRadius: 14,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    width: 4,
                    borderRadius: 10,
                    backgroundColor: "#2FA084",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    borderRadius: 16,
                    marginBottom: 6,
                    paddingInline: 14,
                    minHeight: 52,
                    textTransform: "none",
                    transition: "all 180ms ease",
                    "&.Mui-selected": {
                        backgroundColor: "rgba(31,111,95,0.10)",
                        color: "#1f6f5f",
                        fontWeight: 800,
                    },
                },
            },
        },
    },
});

export default function AppThemeProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
