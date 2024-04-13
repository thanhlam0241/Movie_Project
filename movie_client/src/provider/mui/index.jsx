import { useMemo } from 'react';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
    const memoizedValue = useMemo(
        () => ({}),
        []
    );

    const theme = createTheme(memoizedValue);

    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    );
}