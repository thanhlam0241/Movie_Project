import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MyTab({ listTab }) {
    const [value, setValue] = React.useState(listTab[0].value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', color: '#fff' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: '#fff' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        listTab.map((tab) => (
                            <Tab sx={{ color: '#fff' }} key={tab.value} label={tab.label} {...a11yProps(tab.value)} />
                        ))
                    }
                </Tabs>
            </Box>
            {
                listTab.map((tab) => (
                    <CustomTabPanel key={tab.value} value={value} index={tab.value}>
                        {tab.component}
                    </CustomTabPanel>
                ))
            }
        </Box>
    );
}