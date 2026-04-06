/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Custom hook that manages modal visibility and renewal eligibility state for the customer profile view.
 */

import { useState } from 'react';

/** Manages status/renew modal open state and derives whether the customer is eligible for renewal. */
export function useCustomerProfile(customer) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  const isRenewable =
    customer.status === 'overdue' || customer.status === 'canceled';

  return {
    showStatusModal,
    openStatusModal: () => setShowStatusModal(true),
    closeStatusModal: () => setShowStatusModal(false),
    showRenewModal,
    openRenewModal: () => setShowRenewModal(true),
    closeRenewModal: () => setShowRenewModal(false),
    isRenewable,
  };
}
