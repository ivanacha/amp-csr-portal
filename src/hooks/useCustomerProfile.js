import { useState } from 'react';

export function useCustomerProfile(customer) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  const isRenewable =
    customer.status === 'overdue' || customer.status === 'cancelled';

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
