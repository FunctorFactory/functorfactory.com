'use client';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemButton, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import * as React from 'react';

import Logo from '@/components/Logo';

const pages = [
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

export const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [top, setTop] = React.useState<number>(0);
  const ref = React.useRef<HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const updateHeaderPosition = () => {
    if (ref.current) {
      const height = ref.current.clientHeight;
      if (
        document.body.scrollTop > height ||
        document.documentElement.scrollTop > height
      ) {
        setTop(0);
      } else {
        setTop(-height);
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', updateHeaderPosition);
  }, []);

  React.useEffect(() => {
    updateHeaderPosition();
  }, [ref.current]);

  return (
    <MuiAppBar
      ref={ref}
      position="fixed"
      style={{ top: `${top}px`, transition: 'top 0.3s' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/" passHref>
              <Logo alt="Functor Factory" height={50} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                >
                  <ListItemText primary={page.name} />
                </ListItemButton>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Link href="/" passHref>
              <Logo alt="Functor Factory" height={50} />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'row-reverse',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.toReversed().map((page, idx) => (
              <Link key={idx} href={page.href} passHref>
                <Button sx={{ my: 2, color: 'white' }}>{page.name}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
export default AppHeader;
