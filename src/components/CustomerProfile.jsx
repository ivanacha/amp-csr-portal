/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Container component that wires the useCustomerProfile hook to CustomerProfileView, passing modal state and renewal eligibility as props.
 */

import { useCustomerProfile } from '../hooks/useCustomerProfile';
import CustomerProfileView from './ui/CustomerProfileView';

export default function CustomerProfile({ customer, vehicles, transactions, onUpdateCustomer, onUpdateVehicles, onAddTransaction, onBack }) {
  const profile = useCustomerProfile(customer);

  return (
    <CustomerProfileView
      customer={customer}
      vehicles={vehicles}
      transactions={transactions}
      onUpdateCustomer={onUpdateCustomer}
      onUpdateVehicles={onUpdateVehicles}
      onAddTransaction={onAddTransaction}
      onBack={onBack}
      isRenewable={profile.isRenewable}
      showStatusModal={profile.showStatusModal}
      openStatusModal={profile.openStatusModal}
      closeStatusModal={profile.closeStatusModal}
      showRenewModal={profile.showRenewModal}
      openRenewModal={profile.openRenewModal}
      closeRenewModal={profile.closeRenewModal}
    />
  );
}
