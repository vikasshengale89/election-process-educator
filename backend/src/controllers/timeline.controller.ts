import { Request, Response, NextFunction } from 'express';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'registration' | 'voting' | 'result' | 'deadline';
  daysOut: number;
  location: string;
}

const timelineEvents: TimelineEvent[] = [
  { date: 'Oct 7, 2025', title: 'Voter Registration Opens', description: 'Online and mail-in voter registration portals open for the upcoming election cycle.', type: 'registration', daysOut: -90, location: 'all' },
  { date: 'Oct 15, 2025', title: 'Early Voting Begins', description: 'Early voting locations open. Check your local election office for specific sites and hours.', type: 'voting', daysOut: -82, location: 'all' },
  { date: 'Oct 22, 2025', title: 'Absentee Ballot Request Deadline', description: 'Last day to request an absentee or mail-in ballot for the upcoming election.', type: 'deadline', daysOut: -75, location: 'all' },
  { date: 'Nov 1, 2025', title: 'Voter Registration Deadline', description: 'Last day to register to vote (most states). Some states allow same-day registration.', type: 'registration', daysOut: -65, location: 'all' },
  { date: 'Nov 4, 2025', title: 'Mail Ballots Must Be Postmarked', description: 'For mail-in voters, your ballot must be postmarked by this date to be counted.', type: 'deadline', daysOut: -62, location: 'all' },
  { date: 'Nov 5, 2025', title: 'Election Day', description: 'Cast your ballot at your designated polling location between 6 AM and 8 PM local time. Bring your ID!', type: 'voting', daysOut: -61, location: 'all' },
  { date: 'Nov 6, 2025', title: 'Provisional Ballot Verification', description: 'Election officials begin verifying provisional and mail-in ballots.', type: 'result', daysOut: -60, location: 'all' },
  { date: 'Nov 19, 2025', title: 'Results Certified', description: 'All votes counted and results certified by the state election board.', type: 'result', daysOut: -47, location: 'all' },
  { date: 'Oct 10, 2025', title: 'Illinois Early Registration Deadline', description: 'Illinois residents must register online by this date for early voting eligibility.', type: 'registration', daysOut: -87, location: 'illinois' },
  { date: 'Oct 20, 2025', title: 'California Mail Ballot Dispatch', description: 'California begins mailing ballots to all registered voters.', type: 'voting', daysOut: -77, location: 'california' },
  { date: 'Oct 25, 2025', title: 'New York Absentee Deadline', description: 'Last day to apply for absentee ballot in New York state.', type: 'deadline', daysOut: -72, location: 'new york' },
];

export const getTimeline = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const location = (req.query.location as string | undefined)?.toLowerCase();
    const filtered = location
      ? timelineEvents.filter(e => e.location === 'all' || e.location === location)
      : timelineEvents.filter(e => e.location === 'all');

    res.json({ success: true, data: filtered, location: location ?? 'all' });
  } catch (error) {
    next(error);
  }
};
