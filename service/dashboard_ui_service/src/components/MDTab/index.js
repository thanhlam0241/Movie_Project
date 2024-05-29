import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: 1 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.length > 0 &&
            tabs.map((tab, index) => (
              <Tab
                sx={{
                  color: index === value ? "#fff !important" : "#000 !important",
                }}
                key={index}
                label={tab.label}
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
      </Box>
      {tabs.length > 0 &&
        tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.element}
          </CustomTabPanel>
        ))}
    </Box>
  );
}

BasicTabs.propTypes = {
  tabs: PropTypes.array,
};
