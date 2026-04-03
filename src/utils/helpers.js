import { PLAN_PRICE } from '../constants';

export function initials(customer) {
  return (customer.firstName[0] + customer.lastName[0]).toUpperCase();
}

export function sortCustomers(list, key, dir) {
  return [...list].sort((a, b) => {
    let av, bv;
    if (key === 'name') { av = a.firstName; bv = b.firstName; }
    else if (key === 'vehicles') { av = a.vehicles; bv = b.vehicles; }
    else { av = a[key] ?? ''; bv = b[key] ?? ''; }
    const cmp = typeof av === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv));
    return dir === 'asc' ? cmp : -cmp;
  });
}

// Returns { diff, total, isUpgrade, isDowngrade } for a plan change across N vehicles
export function calculateProration(currentPlan, newPlan, vehicleCount) {
  const currentPrice = PLAN_PRICE[currentPlan] || 0;
  const newPrice = PLAN_PRICE[newPlan] || 0;
  const diff = newPrice - currentPrice;
  const total = diff * vehicleCount;
  return {
    diff,
    total,
    isUpgrade: total > 0,
    isDowngrade: total < 0,
  };
}
