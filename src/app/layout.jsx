import AppThemeProvider from "@/components/AppThemeProvider";
import "./globals.css";

export const metadata = {
    title: "Health & Wellness Dashboard",
    description:
        "Track daily health metrics, view smart insights, and get wellness recommendations.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppThemeProvider>{children}</AppThemeProvider>
            </body>
        </html>
    );
}
