// components/table/propTypes.ts
import React from 'react';

export type SortDirection = 'asc' | 'desc' | null;
export type SelectedRows = Record<string, boolean>;

export interface TableState<T> {
  sortColumn: keyof T | null;
  sortDirection: SortDirection;
  selectedRows: SelectedRows;
  currentPage: number;
  filterValue: string;
  pageSizeAll?: boolean;
}

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

export interface Action<T> {
  label?: string;
  id: string | number;
  onClick: (item: T) => void;
  className?: string;
  icon?: React.ReactNode;
}

export interface ActionColumn<T> {
  title: string;
  actions: Action<T>[];
}

export interface TableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  actionColumn?: ActionColumn<T>;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  onDeleteSelected?: (indices: number[]) => void;
  onMoveRow?: (index: number, direction: 'up' | 'down') => void;
}
