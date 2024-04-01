'use client';
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';
import NextLink from 'next/link';
import { ComponentProps, ComponentRef, forwardRef } from 'react';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '900'],
});

const DefaultLinkComponent = forwardRef<ComponentRef<typeof NextLink>, ComponentProps<typeof NextLink>>((props, ref) => (
  <NextLink ref={ref} {...props} />
));

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: DefaultLinkComponent
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: DefaultLinkComponent
      }
    }
  },
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
    },
  },
});

export default theme;
