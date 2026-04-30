import { Request, Response, NextFunction } from 'express';

interface PollingLocation {
  readonly name: string;
  readonly address: string;
  readonly hours: string;
  readonly distance: string;
  readonly accessibility: readonly string[];
}

interface IdRequirement {
  readonly state: string;
  readonly documents: readonly string[];
}

const stateIdRequirements: Record<string, IdRequirement> = {
  default: {
    state: 'General',
    documents: [
      'Valid state-issued photo ID (Driver\'s License or State ID)',
      'US Passport or Passport Card',
      'Military ID',
      'Utility bill, bank statement, or government document showing name and address (within 30 days)'
    ]
  },
  illinois: {
    state: 'Illinois',
    documents: [
      'Valid state-issued photo ID (Driver\'s License or State ID)',
      'US Passport or Passport Card',
      'Military ID',
      'Student ID from an Illinois university',
      'Utility bill, bank statement, or government document showing name and address (within 30 days)'
    ]
  },
  california: {
    state: 'California',
    documents: [
      'No photo ID required at polls for most voters',
      'First-time voters who did not provide ID when registering may need: Driver\'s License, State ID, or last 4 of SSN',
      'Acceptable alternatives: utility bill, bank statement, government document, voter notification card'
    ]
  },
  'new york': {
    state: 'New York',
    documents: [
      'No photo ID required at polls',
      'First-time voters who registered by mail: provide valid photo ID, utility bill, bank statement, paycheck, or government document',
      'If no ID available: sign an affidavit and cast an affidavit ballot'
    ]
  }
};

const mockLocations: PollingLocation[] = [
  {
    name: 'Community Center - Precinct 42',
    address: '123 Democracy Lane, Springfield, IL 62701',
    hours: '6:00 AM - 7:00 PM',
    distance: '0.8 miles',
    accessibility: ['Wheelchair accessible', 'Curbside voting available', 'ASL interpreter on request']
  },
  {
    name: 'Lincoln Elementary School - Gym',
    address: '456 Liberty Ave, Springfield, IL 62702',
    hours: '6:00 AM - 7:00 PM',
    distance: '1.2 miles',
    accessibility: ['Wheelchair accessible', 'Parking available']
  },
  {
    name: 'First Baptist Church - Fellowship Hall',
    address: '789 Freedom Blvd, Springfield, IL 62703',
    hours: '6:00 AM - 8:00 PM',
    distance: '2.1 miles',
    accessibility: ['Wheelchair accessible', 'Audio assistance available']
  }
];

function detectState(zip: string): string {
  const prefix = parseInt(zip.substring(0, 3), 10);
  if (prefix >= 600 && prefix <= 629) return 'illinois';
  if (prefix >= 900 && prefix <= 961) return 'california';
  if (prefix >= 100 && prefix <= 149) return 'new york';
  return 'default';
}

export const getPollingLocation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const zip = req.query.zip as string;
    const state = detectState(zip);
    const idReqs = stateIdRequirements[state] ?? stateIdRequirements['default'];

    res.json({
      success: true,
      data: {
        locations: mockLocations,
        idRequirements: idReqs,
        state: idReqs.state,
        zip
      }
    });
  } catch (error: unknown) {
    next(error);
  }
};
