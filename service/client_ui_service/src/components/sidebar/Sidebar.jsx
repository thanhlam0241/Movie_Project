import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/appSlice.js";

// import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import StarIcon from "@mui/icons-material/Star";
import HistoryIcon from "@mui/icons-material/History";
import RecommendIcon from "@mui/icons-material/Recommend";
import HomeIcon from "@mui/icons-material/Home";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const movieComponent = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: <MovieFilterIcon />,
  },
  {
    name: "Favourite",
    path: "/favourite",
    icon: <StarIcon />,
  },
  {
    name: "History",
    path: "/history",
    icon: <HistoryIcon />,
  },
  {
    name: "Recommendation",
    path: "/recommendation",
    icon: <RecommendIcon />,
  },
];

const otherComponent = [
  {
    name: "Profile",
    path: "/profile",
    icon: <AccountBoxIcon />,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: <LogoutIcon />,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const { sidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const onNavigate = (item) => {
    if (item.name === "Logout") {
      dispatch(logout());
      navigate("/authenticate");
    } else {
      navigate(item.path);
    }
    onToggleSidebar();
  };

  return (
    <Drawer open={sidebar} onClose={onToggleSidebar}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {movieComponent.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => onNavigate(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {otherComponent.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => onNavigate(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
