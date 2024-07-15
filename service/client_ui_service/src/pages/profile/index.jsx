import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

import "./style.scss";

import AccountSetting from "./AccountSetting";
import Header from "./Header";
import User from "./Profile";

export default function Profile() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="account-wrapper">
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", color: "#fff" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ fontSize: 15, color: "#fff" }}
                label="Thông tin cá nhân"
                value="1"
              />
              <Tab
                sx={{ fontSize: 15, color: "#fff" }}
                label="Đổi mật khẩu"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AccountSetting />
          </TabPanel>
          <TabPanel sx={{ width: "100%" }} value="2">
            <User />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
