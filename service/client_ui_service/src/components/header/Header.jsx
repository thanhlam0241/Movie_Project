import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/appSlice.js";
import { logout } from "@/store/authSlice.js";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { Box } from "@mui/material";

import Button from "@mui/material/Button";

import Autocomplete from "@/components/autocomplete/index";

import movieApi from "@/api/movie/movieApi";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [openSearchInput, setOpenSearchInput] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const loadAutocomplete = async (str) => {
    return await movieApi.search(str);
  };

  const onClickAutocomplete = (id) => {
    setOpenSearchInput(false);
    navigate("/movie/" + id);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setOpenSearchInput(true);
  };

  const onEnterAutocomplete = (query) => {
    navigate(`/search/${query}`);
    setOpenSearchInput(false);
  };

  // const openMobileMenu = () => {
  //     setMobileMenu(true);
  //     setShowSearch(false);
  // };

  const navigationHandler = (path) => {
    navigate(`/${path}`);
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      {isLogin ? (
        <div className="header-left">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleSidebar}
            edge="start"
          >
            <MenuIcon style={{ color: "#fff", fontSize: 30 }} />
          </IconButton>
          <ul className="menuItems">
            <li
              className="menuItem"
              onClick={() => navigationHandler("explore")}
            >
              Explore
            </li>
            <li
              className="menuItem"
              onClick={() => navigationHandler("recommendation")}
            >
              Recommend
            </li>
            <li
              className="menuItem"
              onClick={() => navigationHandler("favourite")}
            >
              Favorite
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
            {openSearchInput && (
              <Autocomplete
                keyId="id"
                loadAutocomplete={loadAutocomplete}
                onClickAutocomplete={onClickAutocomplete}
                onEnter={onEnterAutocomplete}
              />
            )}
          </ul>

          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
          </div>
        </div>
      ) : (
        <div className="header-left"></div>
      )}
      {isLogin ? (
        <div className="header-right">
          <div className="div-center">
            <NotificationsNoneIcon style={{ color: "#fff", fontSize: 30 }} />
          </div>
          <Avatar
            onClick={handleClick}
            aria-describedby={id}
            sx={{ bgcolor: "secondary.main", cursor: "pointer" }}
          >
            <img className="avatar small" src={avatar} alt="avatar" />
          </Avatar>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ top: 2, width: 300 }}
          >
            <Box sx={{ p: 2 }}>
              <div
                onClick={() => navigationHandler("profile")}
                className="menu-item"
              >
                Profile
              </div>
              <div
                onClick={() => navigationHandler("help")}
                className="menu-item"
              >
                Help
              </div>
              <div onClick={onLogout} className="menu-item">
                Logout
              </div>
            </Box>
          </Popover>
        </div>
      ) : (
        <div className="header-right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/authenticate")}
          >
            Login
          </Button>
        </div>
      )}

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
