import './globals.css';

import type { Metadata } from 'next';
import React from 'react';

import { MontserratRegular, MontserratBlack } from '../lib/theme';
import Logo from '../components/Logo';
import Link from 'next/link';
import { Flowbite, Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink } from 'flowbite-react';
import { Theme } from '../lib/theme';

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
      <Flowbite theme={{ theme: Theme }}>
        <body className={MontserratRegular.className}>
          <Navbar fluid rounded className={MontserratBlack.className}>
            <NavbarBrand as={Link} href="/">
              <Logo width={250} alt='Functor Factory'></Logo>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
              <NavbarLink as={Link} href="/learn">Learning Resources</NavbarLink>
              <NavbarLink as={Link} href="/about">About</NavbarLink>
              <NavbarLink as={Link} href="/contact">Contact</NavbarLink>
            </NavbarCollapse>
          </Navbar>
          {children}
        </body>
      </Flowbite>
    </html>
  );
}
