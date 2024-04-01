import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import * as Links from '@/lib/Links';
import { ServiceDescriptions } from '@/lib/Services';

export const AppFooter = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Services
          </Typography>
          {ServiceDescriptions.map((desc, idx) => (
            <Link key={idx} color="text.secondary" href={desc.href}>
              {desc.title}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <Link color="text.secondary" href="/about">
            About us
          </Link>
          <Link color="text.secondary" href="/process">
            Our Process
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Contact
          </Typography>
          <Link color="text.secondary" href={Links.Email}>
            Email
          </Link>
          <Link
            color="text.secondary"
            href={Links.Calendarly}
          >
            Book a Call
          </Link>
        </Box>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href={Links.Github}
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GithubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href={Links.Twitter}
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href={Links.LinkedIn}
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href={Links.YouTube}
            aria-label="Youtube"
            sx={{ alignSelf: 'center' }}
          >
            <YouTubeIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default AppFooter;
