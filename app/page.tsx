import ArrowDownward from '@mui/icons-material/ArrowDownward';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import { Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import * as Links from '@/lib/Links';

const ScheduleButton = () => {
  return (
    <Link href={Links.Calendarly} target="_blank" passHref>
      <Button startIcon={<CalendarIcon />} variant="contained" color="primary">
        Schedule a Call
      </Button>
    </Link>
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
        <Typography variant="h2">What we offer</Typography>
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
  return (
    <Stack>
      <Typography variant="h2">Services</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>API Development</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>API Integration</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>MVP Development</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>Technical Project Planning</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>DevOps</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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
      <h1>Languages, Frameworks, and Platforms</h1>
      <ul>
        <li>TypeScript</li>
        <li>Python</li>
        <li>Java</li>
        <li>C#</li>
        <li>Terraform</li>
        <li>Serverless</li>
        <li>AWS</li>
        <li>Express</li>
        <li>Koa</li>
        <li>React</li>
        <li>Next.js</li>
      </ul>
      <Container>
        <ScheduleButton />
      </Container>
    </Container>
  );
}
