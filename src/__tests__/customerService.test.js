/**
 * Example unit tests for src/services/customerService.js
 *
 * Run with: npx vitest  (install vitest: npm install -D vitest)
 */

import {
  fetchCustomers,
  fetchCustomerById,
  updateCustomer,
  createCustomer,
  deleteCustomer,
} from '../services/customerService';

describe('fetchCustomers', () => {
  it('returns an array of customer objects', async () => {
    const customers = await fetchCustomers();
    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
  });

  it('each customer has required fields', async () => {
    const [first] = await fetchCustomers();
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('firstName');
    expect(first).toHaveProperty('status');
  });
});

describe('fetchCustomerById', () => {
  it('resolves with the matching customer', async () => {
    const all = await fetchCustomers();
    const target = all[0];
    const result = await fetchCustomerById(target.id);
    expect(result.id).toBe(target.id);
  });

  it('rejects when the ID is not found', async () => {
    await expect(fetchCustomerById('AMP-XXXXX')).rejects.toThrow('not found');
  });
});

describe('updateCustomer', () => {
  it('resolves with the merged fields', async () => {
    const result = await updateCustomer('AMP-00123', { status: 'paused' });
    expect(result.id).toBe('AMP-00123');
    expect(result.status).toBe('paused');
  });
});

describe('createCustomer', () => {
  it('resolves with a generated ID and supplied data', async () => {
    const data = { firstName: 'Test', lastName: 'User', status: 'active' };
    const result = await createCustomer(data);
    expect(result.id).toMatch(/^AMP-/);
    expect(result.firstName).toBe('Test');
  });
});

describe('deleteCustomer', () => {
  it('resolves with the deleted customer id', async () => {
    const result = await deleteCustomer('AMP-00123');
    expect(result.id).toBe('AMP-00123');
  });
});
