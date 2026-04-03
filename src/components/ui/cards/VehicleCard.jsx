import React, { useState } from 'react';
import Card from '../Card';
import { Btn, IconBtn } from '../Btn';
import VehicleModal from '../modals/VehicleModal';

export default function VehicleCard({ vehicles, onUpdateVehicles, customerPlan, isCancelled }) {
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  function handleSaveEdit(form) {
    onUpdateVehicles(vehicles.map((v) => (v.id === editingVehicle.id ? { ...v, ...form } : v)));
    setEditingVehicle(null);
  }

  function handleAdd(form) {
    onUpdateVehicles([...vehicles, { id: `v_${Date.now()}`, plan: customerPlan, ...form }]);
    setShowAddModal(false);
  }

  function handleConfirmDelete() {
    onUpdateVehicles(vehicles.filter((x) => x.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  }

  const vehicleToDelete = vehicles.find((x) => x.id === confirmDeleteId);

  return (
    <>
      <Card
        title={`Vehicle Subscriptions (${vehicles.length})`}
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
        actions={
          !isCancelled && (
            <Btn variant="secondary" onClick={() => setShowAddModal(true)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add Vehicle
            </Btn>
          )
        }
      >
        {vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-3)', fontSize: 13.5 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 10, opacity: 0.4, display: 'block', margin: '0 auto 10px' }}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            No active vehicle subscriptions
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {vehicles.map((v) => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--amp-light-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amp-cobalt)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 500, letterSpacing: 1, color: 'var(--amp-navy)' }}>{v.plate}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{v.year} {v.make} {v.model} · {v.color}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: v.isPaused ? 'var(--yellow)' : 'var(--green)' }}>{v.plan}</div>
                  {v.isPaused && (
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>⏸ Paused</div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <IconBtn title="Edit vehicle" onClick={() => setEditingVehicle(v)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </IconBtn>
                  <IconBtn title="Remove vehicle" danger onClick={() => setConfirmDeleteId(v.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                  </IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {editingVehicle && (
        <VehicleModal vehicle={editingVehicle} onSave={handleSaveEdit} onClose={() => setEditingVehicle(null)} />
      )}
      {showAddModal && (
        <VehicleModal vehicle={null} onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      )}
      {confirmDeleteId && vehicleToDelete && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,36,71,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: 28, width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 13.5, color: 'var(--text)' }}>
              Remove <strong>{vehicleToDelete.plate}</strong> ({vehicleToDelete.year} {vehicleToDelete.make} {vehicleToDelete.model}) from this account?
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--red)' }}>This action cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Btn variant="ghost" onClick={() => setConfirmDeleteId(null)}>Cancel</Btn>
              <Btn variant="danger" onClick={handleConfirmDelete} style={{ background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }}>Remove Vehicle</Btn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
