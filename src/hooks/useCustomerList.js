/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Custom hook that manages search, filter, sort, pagination, and hover state for the customer list view.
 */

import { useState, useMemo, useEffect } from 'react';
import { PAGE_SIZE } from '../constants';
import { sortCustomers } from '../utils/helpers';

/** Encapsulates all state and derived data for the searchable, sortable, paginated customer list. */
export function useCustomerList(customers) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => { setCurrentPage(1); }, [query, activeFilter, sortKey, sortDir]);

  /** Toggles sort direction if the same key is clicked, otherwise switches to the new key ascending. */
  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  /** Filters customers by query text and active status filter, then applies the current sort. */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const base = customers.filter((c) => {
      const matchesQuery = [c.firstName, c.lastName, c.email, c.id]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesStatus = activeFilter === 'all' || c.status === activeFilter;
      return matchesQuery && matchesStatus;
    });
    return sortCustomers(base, sortKey, sortDir);
  }, [query, activeFilter, customers, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Build page numbers with ellipsis gaps
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return {
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    hoveredRow,
    setHoveredRow,
    currentPage,
    setCurrentPage,
    sortKey,
    sortDir,
    handleSort,
    filtered,
    paginated,
    totalPages,
    pages,
  };
}
