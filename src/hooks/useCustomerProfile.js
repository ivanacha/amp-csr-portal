/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Custom hook that manages modal visibility and renewal eligibility state for the customer profile view.
 */

import { useState } from 'react';

/** Manages status/renew modal open state and derives whether the customer is eligible for renewal. */
export function useCustomerProfile(customer) {
  // Modal visibility state variables and handlers
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  // Eligibility variable - only overdue and canceled customers can be renewed, paused customers cannot.
  const isRenewable =
    customer.status === 'overdue' || customer.status === 'canceled';

  // Return all state and handlers and the derived eligibility variable for use in the profile view component.
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
