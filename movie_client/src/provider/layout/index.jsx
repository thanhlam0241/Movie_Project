import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
            <Outlet />
            <Footer />
        </>
    );
}