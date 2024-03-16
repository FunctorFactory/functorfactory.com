'use client';
import { Montserrat } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ["300", "900"],
});

export const theme = createTheme({
    typography: {
        fontFamily: montserrat.style.fontFamily,
        fontWeightRegular: 300,
        fontWeightBold: 900,
    },
    palette: {
        primary: {
            main: '#253B79',
            light: '#4169B1',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF6F0D',
            light: '#FFA539',
            contrastText: '#000000',
        }
    }
});

export default theme;