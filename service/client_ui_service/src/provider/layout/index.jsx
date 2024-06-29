import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

import parseToken from "@/utils/parseToken";
import { login } from "@/store/authSlice";

export default function Layout() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dataUser = parseToken(token);
      if (dataUser) {
        console.log(dataUser);
        dispatch(login({ ...dataUser, accessToken: token }));
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  useEffect(() => {}, [auth.isLogin]);

  return (
    <>
      {!loading ? (
        <>
          <Header />
          <Sidebar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
