import React from "react";
import "../styles/globals.css"
import { AppProvider } from "@/contexts/AppContext";

export const metadata = {
    title: "Kitchen App- SWADSEVA",
    description:
        "will write later.",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="font-sans">
                <AppProvider >
                    {children}
                </AppProvider>
            </body>
        </html>
    );
};

export default RootLayout;
