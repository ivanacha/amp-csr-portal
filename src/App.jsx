import React, { useState } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerList from './components/CustomerList';
import CustomerProfile from './components/CustomerProfile';
import { customers } from './data/mockData';

export default function App() {
  // view: 'list' | 'profile'
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);

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

  function handleSaveAccount(updatedFields) {
    // In a real app, dispatch to your state management / API here.
    // The mock data is read-only, so this is a no-op placeholder.
    console.log('Saving account fields:', updatedFields);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header breadcrumbs={breadcrumbs} onCrumbClick={handleCrumbClick} />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        {view === 'list' && (
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        )}
        {view === 'profile' && selectedId && (
          <CustomerProfile customerId={selectedId} onSaveAccount={handleSaveAccount} />
        )}
      </main>

      <Footer />
    </div>
  );
}
