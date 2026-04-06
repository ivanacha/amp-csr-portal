/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Root application component that manages top-level view routing, customer state, and toast notifications for the CSR portal.
 */

import React, { useState, useCallback } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerList from './components/CustomerList';
import CustomerProfile from './components/CustomerProfile';
import Toast from './components/Toast';
import {
  customers as initialCustomers,
  vehicleData as initialVehicleData,
  transactionData,
} from './data/mockData';
import { STATUS_TOAST } from './constants';

export default function App() {
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);

  const [customers, setCustomers] = useState(initialCustomers);
  const [vehicleData, setVehicleData] = useState(initialVehicleData);
  const [extraTransactions, setExtraTransactions] = useState({});
  const [toast, setToast] = useState(null);

  /** Triggers a toast notification, using a timestamp key to re-mount it on repeated calls. */
  const showToast = useCallback((message) => {
    setToast({ message, key: Date.now() });
  }, []);

  const selectedCustomer = customers.find((c) => c.id === selectedId);

  const breadcrumbs =
    view === 'list'
      ? [{ label: 'Customers', view: 'list' }]
      : [
          { label: 'Customers', view: 'list' },
          { label: selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : '—', view: 'profile' },
        ];

  /** Navigates back to the list view when the Customers breadcrumb is clicked. */
  function handleCrumbClick(crumb) {
    if (crumb.view === 'list') {
      setView('list');
      setSelectedId(null);
    }
  }

  function handleSelectCustomer(id) {
    setSelectedId(id);
    setView('profile');
  }

  /** Merges field updates into the selected customer, syncing vehicle plans and showing a status/plan toast as needed. */
  function updateCustomer(fields) {
    setCustomers((prev) => prev.map((c) => (c.id === selectedId ? { ...c, ...fields } : c)));
    if ('plan' in fields) {
      setVehicleData((prev) => ({
        ...prev,
        [selectedId]: (prev[selectedId] || []).map((v) => ({ ...v, plan: fields.plan })),
      }));
    }
    if ('status' in fields) {
      showToast(STATUS_TOAST[fields.status] || `Account status changed to ${fields.status}`);
    } else if ('plan' in fields) {
      showToast(`Subscription plan updated to ${fields.plan}`);
    }
  }

  /** Replaces the selected customer's vehicle list and updates the vehicle count on the customer record. */
  function updateVehicles(newVehicles) {
    setVehicleData((prev) => ({ ...prev, [selectedId]: newVehicles }));
    setCustomers((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, vehicles: newVehicles.length } : c))
    );
  }

  /** Prepends a new transaction to the selected customer's extra transactions list. */
  function addTransaction(tx) {
    setExtraTransactions((prev) => ({
      ...prev,
      [selectedId]: [tx, ...(prev[selectedId] || [])],
    }));
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header breadcrumbs={breadcrumbs} onCrumbClick={handleCrumbClick} />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        {view === 'list' && (
          <CustomerList customers={customers} onSelectCustomer={handleSelectCustomer} />
        )}
        {view === 'profile' && selectedCustomer && (
          <CustomerProfile
            customer={selectedCustomer}
            vehicles={vehicleData[selectedId] || []}
            transactions={[...(extraTransactions[selectedId] || []), ...(transactionData[selectedId] || [])]}
            onUpdateCustomer={updateCustomer}
            onUpdateVehicles={updateVehicles}
            onAddTransaction={addTransaction}
            onBack={() => { setView('list'); setSelectedId(null); }}
          />
        )}
      </main>

      <Footer />

      {toast && (
        <Toast key={toast.key} message={toast.message} onDone={() => setToast(null)} />
      )}
    </div>
  );
}
