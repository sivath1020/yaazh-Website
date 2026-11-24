import vibhuBusAccounts from '../assets/Work/clients/vibhu-travel-bus-ledger-dashboard.webp';
import vibhuLorryAccounts from '../assets/Work/clients/vibhu-travel-lorry-accounts.webp';

export const VIBHU_SOFTWARE_PATH = '/work/vibhu-travel';
export const VIBHU_WEBSITE_URL = 'https://vibhutravelhub.com/';

export const vibhuSoftware = [
  {
    id: 'bus-accounts',
    src: vibhuBusAccounts,
    alt: 'Bus Ledger dashboard showing revenue, fleet status and recent bookings',
    title: 'Bus Accounts Software',
    description: 'Track bus trips, record income and expenses, and review fuel usage and mileage from the fleet dashboard.',
  },
  {
    id: 'lorry-accounts',
    src: vibhuLorryAccounts,
    alt: 'Lorry accounts dashboard showing fleet statistics, recent bookings and trip records',
    title: 'Lorry Accounts Software',
    description: 'Record freight income and trip expenses, manage vehicle and driver records, and review fleet performance.',
  },
];
