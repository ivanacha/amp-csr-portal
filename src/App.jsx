import React, { useState } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerList from './components/CustomerList';
import CustomerProfile from './components/CustomerProfile';
import {
  customers as initialCustomers,
  vehicleData as initialVehicleData,
  transactionData,
} from './data/mockData';

export default function App() {
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);

  const [customers, setCustomers] = useState(initialCustomers);
  const [vehicleData, setVehicleData] = useState(initialVehicleData);

  const selectedCustomer = customers.find((c) => c.id === selectedId);

  const breadcrumbs =
    view === 'list'
      ? [{ label: 'Customers', view: 'list' }]
      : [
          { label: 'Customers', view: 'list' },
          { label: selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : '—', view: 'profile' },
        ];

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

  function updateCustomer(fields) {
    setCustomers((prev) => prev.map((c) => (c.id === selectedId ? { ...c, ...fields } : c)));
    if ('plan' in fields) {
      setVehicleData((prev) => ({
        ...prev,
        [selectedId]: (prev[selectedId] || []).map((v) => ({ ...v, plan: fields.plan })),
      }));
    }
  }

  function updateVehicles(newVehicles) {
    setVehicleData((prev) => ({ ...prev, [selectedId]: newVehicles }));
    setCustomers((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, vehicles: newVehicles.length } : c))
    );
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
            transactions={transactionData[selectedId] || []}
            onUpdateCustomer={updateCustomer}
            onUpdateVehicles={updateVehicles}
            onBack={() => { setView('list'); setSelectedId(null); }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
