/**
 * Author: Ivan Acha
 * Created: April 2026
 * Purpose: Container component that wires the useCustomerList hook to the CustomerListView, bridging state logic and presentation.
 */

import { useCustomerList } from '../hooks/useCustomerList';
import CustomerListView from './ui/CustomerListView';

export default function CustomerList({ customers, onSelectCustomer }) {
  const list = useCustomerList(customers);

  return (
    <CustomerListView
      paginated={list.paginated}
      filteredCount={list.filtered.length}
      query={list.query}
      onQueryChange={list.setQuery}
      activeFilter={list.activeFilter}
      onFilterChange={list.setActiveFilter}
      sortKey={list.sortKey}
      sortDir={list.sortDir}
      onSort={list.handleSort}
      hoveredRow={list.hoveredRow}
      onHoverRow={list.setHoveredRow}
      onUnhoverRow={() => list.setHoveredRow(null)}
      currentPage={list.currentPage}
      totalPages={list.totalPages}
      pages={list.pages}
      onPageChange={list.setCurrentPage}
      onSelectCustomer={onSelectCustomer}
    />
  );
}
