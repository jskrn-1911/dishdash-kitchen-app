"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const HeaderWrapper = ({ children }) => {
    const pathname = usePathname();
    const hideHeaderRoutes = ["/login", "/signup"]; // Add more routes if needed

    return (
        <>
            {!hideHeaderRoutes.includes(pathname) && <Header />}
            {children}
        </>
    );
};

export default HeaderWrapper;
