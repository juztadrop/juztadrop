export const LOCATIONS = ['Kolkata', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'] as const;

export interface Opportunity {
  id: number;
  title: string;
  organisation: string;
  location: string;
  dateRange: string;
  timeRange: string;
  category: string;
  icon: string;
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    title: 'Lets feed the stray-dogs',
    organisation: 'Calcutta, Dog Community',
    location: 'New Town, Kolkata',
    dateRange: '29th → 31st Dec',
    timeRange: '8:30pm → 9:30pm',
    category: 'animal-care',
    icon: '🐕',
  },
  {
    id: 2,
    title: 'Beach cleanup drive',
    organisation: 'Ocean Guardians',
    location: 'Marine Drive, Mumbai',
    dateRange: '15th → 16th Feb',
    timeRange: '6:00am → 10:00am',
    category: 'environment',
    icon: '🌊',
  },
  {
    id: 3,
    title: 'Teach basic literacy',
    organisation: 'Siksha Foundation',
    location: 'Salt Lake, Kolkata',
    dateRange: 'Every Saturday',
    timeRange: '10:00am → 12:00pm',
    category: 'education',
    icon: '📚',
  },
  {
    id: 4,
    title: 'Community kitchen volunteer',
    organisation: 'Annapurna Trust',
    location: 'Park Street, Kolkata',
    dateRange: 'Daily',
    timeRange: '11:00am → 2:00pm',
    category: 'community',
    icon: '🍲',
  },
];
