/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Async service layer that abstracts all customer data operations, currently backed by mock data with drop-in HTTP replacement points.
 */

/**
 * customerService — async API layer for customer data operations.
 *
 * Currently wraps the in-memory mock data. Replace each function body
 * with real HTTP calls (e.g. axios) when a backend is available.
 */

import {
  customers as mockCustomers,
  vehicleData as mockVehicleData,
  transactionData as mockTransactionData,
} from '../data/mockData';

// Simulate network latency for realistic async behavior during development. 
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// In production: GET /api/customers e.g. axios.get('/api/customers') 
export async function fetchCustomers() {
  await delay();
  return [...mockCustomers];
}

// In production: GET /api/customers/:id
export async function fetchCustomerById(id) {
  await delay();
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) throw new Error(`Customer ${id} not found`);
  return { ...customer };
}

// In production: GET /api/customers/:id/vehicles e.g. axios.get(`/api/customers/${id}/vehicles`)
export async function fetchVehicles(customerId) {
  await delay();
  return [...(mockVehicleData[customerId] || [])];
}

// In production: GET /api/customers/:id/transactions
export async function fetchTransactions(customerId) {
  await delay();
  return [...(mockTransactionData[customerId] || [])];
}

// In production: PATCH /api/customers/:id 
export async function updateCustomer(id, fields) {
  await delay();
  return { id, ...fields };
}

// In production: POST /api/customers
export async function createCustomer(data) {
  await delay();
  return { id: `AMP-${Date.now()}`, ...data };
}

// In production: DELETE /api/customers/:id e.g. axios.delete(`/api/customers/${id}`)
export async function deleteCustomer(id) {
  await delay();
  return { id };
}

// In production: PUT /api/customers/:id/vehicles 
export async function updateVehicles(customerId, vehicles) {
  await delay();
  return vehicles;
}

// In production: POST /api/customers/:id/transactions 
export async function createTransaction(customerId, transaction) {
  await delay();
  return transaction;
}
