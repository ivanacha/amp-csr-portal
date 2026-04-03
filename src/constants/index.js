export const PLANS = ['Basic', 'Premium', 'Unlimited Pro'];

export const PLAN_PRICE = {
  Basic: 14.99,
  Premium: 29.99,
  'Unlimited Pro': 49.99,
};

export const STATUS_LABELS = {
  active: 'Active',
  paused: 'Paused',
  canceled: 'Canceled',
  overdue: 'Overdue',
};

export const STATUS_OPTIONS = [
  { value: 'active',    label: 'Active',    color: 'var(--green)',  bg: 'var(--green-bg)' },
  { value: 'paused',    label: 'Paused',    color: 'var(--yellow)', bg: 'var(--yellow-bg)' },
  { value: 'canceled', label: 'Canceled', color: 'var(--red)',    bg: 'var(--red-bg)' },
];

export const STATUS_FILTERS = [
  { value: 'all',       label: 'All Customers' },
  { value: 'active',    label: 'Active' },
  { value: 'paused',    label: 'Paused' },
  { value: 'overdue',   label: 'Overdue' },
  { value: 'canceled', label: 'Canceled' },
];

export const PAGE_SIZE = 10;

export const LIST_COLUMNS = [
  { key: 'name',     label: 'Customer' },
  { key: 'id',       label: 'Account ID' },
  { key: 'status',   label: 'Status' },
  { key: 'plan',     label: 'Plan' },
  { key: 'vehicles', label: 'Vehicles' },
];
