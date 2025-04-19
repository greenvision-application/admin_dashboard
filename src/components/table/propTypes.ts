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
}

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

export interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
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
