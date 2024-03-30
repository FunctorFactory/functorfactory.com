import './globals.css';

import {
  Box,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import React from 'react';

import AppFooter from '@/components/AppFooter';
import { AppHeader } from '@/components/AppHeader';
import Banner from '@/components/Banner';
import { theme } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Functor Factory',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

/**
 *
 * @param root0
 * @param root0.children
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppHeader />
            <Banner alt="" style={{ width: '100%', height: 'auto' }} />
            {children}
            <AppFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
