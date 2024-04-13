import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

export default function Layout() {
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    if (!auth.isLogin) {
        navigate("/authenticate");
        return <></>
    }

    return (
        <>
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
}