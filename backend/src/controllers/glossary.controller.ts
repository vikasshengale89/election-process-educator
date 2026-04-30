import { Request, Response, NextFunction } from 'express';

const glossaryTerms = [
  { term: 'Absentee Ballot', definition: 'A ballot cast before Election Day by mail or in person, used by voters who cannot or choose not to vote at their assigned polling place on Election Day.', category: 'voting', emoji: '📬' },
  { term: 'Ballot Initiative', definition: 'A process by which citizens can propose legislation or constitutional amendments directly to voters, bypassing the legislature.', category: 'process', emoji: '📜' },
  { term: 'Caucus', definition: 'A local meeting where registered members of a political party gather to select candidates or delegates, using public discussion and grouping rather than secret ballots.', category: 'process', emoji: '🤝' },
  { term: 'Delegates', definition: 'Representatives chosen by voters during primaries or caucuses to attend national conventions and cast votes for presidential candidates.', category: 'process', emoji: '👥' },
  { term: 'Electoral College', definition: 'A group of 538 electors who formally elect the President and Vice President. Each state gets electoral votes equal to its Congressional representation.', category: 'government', emoji: '🏛️' },
  { term: 'Gerrymandering', definition: 'The manipulation of electoral district boundaries to favor a particular political party or group. Named after Governor Elbridge Gerry whose district resembled a salamander.', category: 'process', emoji: '🗺️' },
  { term: 'Incumbent', definition: 'The current holder of a political office who is running for re-election in the same position.', category: 'government', emoji: '🪑' },
  { term: 'Polling Place', definition: 'A designated location where registered voters go to cast their ballots on Election Day. Locations are assigned based on a voter\'s registered address.', category: 'voting', emoji: '📍' },
  { term: 'Primary Election', definition: 'A preliminary election where voters choose candidates to represent a political party in the general election.', category: 'process', emoji: '🥇' },
  { term: 'Provisional Ballot', definition: 'A ballot cast when there are questions about a voter\'s eligibility. It is set aside and only counted after election officials verify the voter\'s registration.', category: 'voting', emoji: '⚠️' },
  { term: 'Redistricting', definition: 'The redrawing of electoral district boundaries, typically following each census, to reflect population changes.', category: 'process', emoji: '✏️' },
  { term: 'Run-off Election', definition: 'A second election held when no candidate receives the required majority of votes in the first election.', category: 'process', emoji: '🔁' },
  { term: 'Voter Registration', definition: 'The process of signing up to vote. Most states require citizens to register before Election Day, though some offer same-day registration.', category: 'registration', emoji: '📝' },
  { term: 'Write-in Candidate', definition: 'A candidate whose name does not appear on the ballot but may be voted for by writing their name in on the ballot.', category: 'voting', emoji: '✍️' },
  { term: 'Filibuster', definition: 'A legislative tactic where a senator or group of senators delay or prevent a vote on a bill by prolonging debate indefinitely.', category: 'government', emoji: '🎙️' },
  { term: 'Recall Election', definition: 'A special election that allows voters to remove an elected official from office before their term expires.', category: 'process', emoji: '🔴' },
];

export const getGlossary = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: glossaryTerms });
  } catch (error: unknown) {
    next(error);
  }
};
