import ArrowDownward from '@mui/icons-material/ArrowDownward';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import { CardHeader, Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import Image from 'next/image'

import * as Links from '@/lib/Links';
import { ServiceDescription, ServiceDescriptions } from '@/lib/Services';

const ScheduleButton = () => {
  return (
    <Card>
      <CardHeader title="Ready to Work Together?" />
      <CardContent>
        <Stack spacing={2}>
          <Container>
            <Typography>Reach out today and tell us how we can help your project!</Typography>
          </Container>
          <Stack direction='row' justifyContent='space-around'>
            <Link href={Links.Calendarly} target="_blank" passHref>
              <Button startIcon={<CalendarIcon />} variant="contained" color="primary">
                Schedule a Call
              </Button>
            </Link>
            <Link href={Links.Email} passHref>
              <Button startIcon={<EmailIcon />} variant="contained" color="primary">
                Email
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const WhatSetsUsAppart = () => {
  return (
    <Grid
      container
      columns={{ xs: 1, sm: 2 }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Grid item xs={1}>
        <Typography variant="h2">What Sets Us Appart?</Typography>
      </Grid>
      <Grid item xs={1}>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            Fixed Prices, No Surprises
          </AccordionSummary>
          <AccordionDetails>
            When you bring a project to us, you aren't buying hours of
            development time; you're buying a result. Unexpected hurdles, time
            in the planning stage, and any other setbacks will not affect your
            final bill. During our first consultations, we will work with you to
            create a list of deliverables and a roadmap of clearly defined,
            short-term milestones with fixed prices. Even as business priorities
            change and technical plans evolve, we remain committed to the price
            we quote for each milestone.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            Designed Around Your Domain
          </AccordionSummary>
          <AccordionDetails>
            Our design process always begins with a thorough understanding of
            the context around your project. Great software comes from an
            engineering team with the conceptual knowledge to speak the same
            language as your stakeholders and the familiarity of your goals to
            make technical decisions aligned with your business priorities.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            Robust Data Integrity
          </AccordionSummary>
          <AccordionDetails>
            Using ideas rooted in rigorous mathematics, we specialize in
            techniques that can be formally proven to enforce data integrity. In
            the past, the physical limitations of computer hardware dictated
            decisions about software architecture. As a result, many traditional
            paradigms give as much attention to problems that no longer exist as
            to driving value for your business. Instead, we bring an approach
            designed to make all decisions in the context of stakeholders'
            needs.
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

const OurServices = () => {
  const serviceDescriptionToCard = (desc: ServiceDescription, key: string) => (
    <Link href={desc.href} target="_blank" passHref style={{ textDecoration: 'none' }}>
      <Card key={key} >
        <CardActionArea>
          <CardMedia>
            <Image
              src={desc.image}
              width={200}
              height={200}
              objectFit='contain'
              alt=''
            />
          </CardMedia>
          <CardContent>
            <Typography variant='h6' component='h6'>{desc.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
  return (
    <Stack>
      <Typography variant="h2">Services</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="left"
        useFlexGap
        flexWrap="wrap"
      >
        {ServiceDescriptions.map((desc, idx) => serviceDescriptionToCard(desc, `${idx}`))}
      </Stack>
    </Stack>
  );
};

/**
 *
 */
export default function Home() {
  return (
    <Container>
      <Container>
        <ScheduleButton />
      </Container>
      <Card>
        <CardContent>
          <WhatSetsUsAppart />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <OurServices />
        </CardContent>
      </Card>
    </Container>
  );
}
