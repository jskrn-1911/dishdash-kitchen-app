"use client"
import "@/css/satoshi.css";
import "@/css/style.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { AppProvider } from "@/contexts/AppContext";
import HeaderWrapper from "../../Header/HeaderWrapper";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import HeaderWrapper from "@/components/Header/HeaderWrapper";


const RootLayout = ({ children }) => {
    const [loading, setLoading] = useState(true);

    // const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
    return (
        <html lang="en">
            <body className="font-sans">
                <AppProvider>
                    <DefaultLayout>
                        {children}
                    </DefaultLayout>
                </AppProvider>
            </body>
        </html>
    );
};

export default RootLayout;
