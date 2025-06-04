import './globals.css';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Functor Factory',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
