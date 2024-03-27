import Button from '@mui/material/Button';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import Link from 'next/link';

import * as Links from '@/lib/Links';
import { Container } from '@mui/material';

const ScheduleButton = () => {
  return (
    <Link href={Links.Calendarly} target='_blank' passHref>
      <Button startIcon={<CalendarIcon />} variant='contained' color='primary'>
        Schedule a Call
      </Button>
    </Link>
  )
}

/**
 *
 */
export default function Home() {
  return (
    <main>
      <Container>
        <ScheduleButton />
      </Container>
      <h1>Why Choose Us!</h1>
      <h1>Our Services</h1>
      <h1>Our Process</h1>
      <Container>
        <ScheduleButton />
      </Container>
    </main>
  );
}
