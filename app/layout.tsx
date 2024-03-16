import './globals.css';

import type { Metadata } from 'next';
import React from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';

import { AppHeader } from '@/components/AppHeader';
import { Box, Container, CssBaseline, List, Paper, Stack, Typography, Divider, ListItem, ListItemText } from '@mui/material';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
  title: 'Functor Factory',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  }
};

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
            {children}
            <AppFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
