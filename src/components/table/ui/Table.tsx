// components/table/Table.tsx
import React, { useState, useMemo } from 'react';
import {
  Trash,
  MoveUp,
  MoveDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowDownAZ,
  ArrowUpZA
} from 'lucide-react';
import {
  TableProps,
  SortDirection,
  SelectedRows,
  TableState
} from '../propTypes';
import { Button } from '../../button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({
  data,
  columns,
  actionColumn,
  enableRowSelection = false,
  enableSorting = true,
  enablePagination = true,
  pageSize = 10,
  onDeleteSelected,
  onMoveRow
}: TableProps<T>): JSX.Element => {
  const [tableState, setTableState] = useState<TableState<T>>({
    sortColumn: null,
    sortDirection: null,
    selectedRows: {},
    currentPage: 1,
    filterValue: ''
  });

  const toggleSort = (columnKey: keyof T) => {
    setTableState(prev => {
      const isSameColumn = prev.sortColumn === columnKey;
      let newDirection: SortDirection = 'asc';

      if (isSameColumn) {
        if (prev.sortDirection === 'asc') newDirection = 'desc';
        else if (prev.sortDirection === 'desc') newDirection = null;
      }

      return {
        ...prev,
        sortColumn: newDirection ? columnKey : null,
        sortDirection: newDirection
      };
    });
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    setTableState(prev => ({
      ...prev,
      selectedRows: {
        ...prev.selectedRows,
        [id]: checked
      }
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = {} as SelectedRows;

    if (checked) {
      displayData.forEach((_item, index) => {
        newSelectedRows[`row-${index}`] = true;
      });
    }

    setTableState(prev => ({
      ...prev,
      selectedRows: newSelectedRows
    }));
  };

  const handleDeleteSelected = () => {
    if (onDeleteSelected) {
      const selectedIndices = Object.keys(tableState.selectedRows)
        .filter(key => tableState.selectedRows[key])
        .map(key => parseInt(key.split('-')[1]));

      onDeleteSelected(selectedIndices);

      // Clear selection after deletion
      setTableState(prev => ({
        ...prev,
        selectedRows: {}
      }));
    }
  };

  const handleMoveRow = (index: number, direction: 'up' | 'down') => {
    if (onMoveRow) {
      onMoveRow(index, direction);
    }
  };

  const handlePageChange = (page: number) => {
    setTableState(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableState(prev => ({
      ...prev,
      filterValue: e.target.value,
      currentPage: 1 // Reset to first page when filtering
    }));
  };

  // Apply sorting, filtering, and pagination
  const displayData = useMemo(() => {
    let processedData = [...data];

    // Apply filtering
    if (tableState.filterValue) {
      const filterLower = tableState.filterValue.toLowerCase();
      processedData = processedData.filter(item => {
        return columns.some(col => {
          const value = item[col.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(filterLower);
        });
      });
    }

    // Apply sorting
    if (tableState.sortColumn && tableState.sortDirection) {
      processedData.sort((a, b) => {
        const aValue = a[tableState.sortColumn as keyof T];
        const bValue = b[tableState.sortColumn as keyof T];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return tableState.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Return all data if pagination is disabled
    if (!enablePagination) return processedData;

    // Apply pagination
    const startIndex = (tableState.currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [data, columns, tableState, pageSize, enablePagination]);

  const totalPages = useMemo(() => {
    if (!enablePagination) return 1;

    let filteredData = [...data];
    if (tableState.filterValue) {
      const filterLower = tableState.filterValue.toLowerCase();
      filteredData = filteredData.filter(item => {
        return columns.some(col => {
          const value = item[col.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(filterLower);
        });
      });
    }

    return Math.ceil(filteredData.length / pageSize);
  }, [data, enablePagination, pageSize, tableState.filterValue, columns]);

  const hasSelectedRows = Object.values(tableState.selectedRows).some(Boolean);

  return (
    <div className="overflow-x-auto">
      <div className="m-3 flex items-center justify-between">
        {/* Delete Selected Button */}
        <div className="flex items-center">
          {enableRowSelection && hasSelectedRows && (
            <Button
              onClick={handleDeleteSelected}
              className="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              <Trash size={16} className="mr-2" />
              Xóa đã chọn
            </Button>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={tableState.filterValue}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-green-300 focus:ring-0 focus:ring-green-300 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-green-200 overflow-hidden rounded-lg border border-green-200">
        <thead className="bg-green-700">
          <tr>
            {enableRowSelection && (
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  onChange={e => handleSelectAll(e.target.checked)}
                  checked={
                    displayData.length > 0 &&
                    displayData.every(
                      (_, index) => tableState.selectedRows[`row-${index}`]
                    )
                  }
                  className="rounded"
                />
              </th>
            )}

            {columns.map(col => (
              <th
                key={col.key as string}
                className={`p-3 text-left ${enableSorting ? 'cursor-pointer' : ''}`}
                onClick={() => enableSorting && toggleSort(col.key)}
              >
                <div className="flex items-center">
                  {col.title}
                  {enableSorting && tableState.sortColumn === col.key && (
                    <span className="ml-1">
                      {tableState.sortDirection === 'asc' ? (
                        <ArrowDownAZ size={16} />
                      ) : tableState.sortDirection === 'desc' ? (
                        <ArrowUpZA size={16} />
                      ) : null}
                    </span>
                  )}
                </div>
              </th>
            ))}

            {actionColumn && (
              <th className="p-3 text-left">{actionColumn.title}</th>
            )}

            {onMoveRow && <th className="p-3 text-left">Thao tác</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {displayData.length === 0 ? (
            <tr>
              <td
                colSpan={
                  columns.length +
                  (enableRowSelection ? 1 : 0) +
                  (actionColumn ? 1 : 0) +
                  (onMoveRow ? 1 : 0)
                }
                className="py-4 text-center text-gray-500"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            displayData.map((item, index) => {
              const rowId = `row-${index}`;
              const isSelected = !!tableState.selectedRows[rowId];

              return (
                <tr
                  key={rowId}
                  className={`${isSelected ? 'bg-blue-50' : ''} hover:bg-gray-50`}
                >
                  {enableRowSelection && (
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => handleRowSelect(rowId, e.target.checked)}
                        className="rounded"
                      />
                    </td>
                  )}

                  {columns.map(col => (
                    <td key={col.key as string} className="p-3">
                      {col.render
                        ? col.render(item)
                        : (item[col.key] as React.ReactNode)}
                    </td>
                  ))}

                  {actionColumn && (
                    <td className="space-x-2 p-3">
                      {actionColumn.actions.map(action => (
                        <button
                          type="button"
                          key={action.label}
                          onClick={() => action.onClick(item)}
                          className={`rounded-md px-2 py-2 ${
                            action.className || ''
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}

                  {onMoveRow && (
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveRow(index, 'up')}
                          className={`rounded p-1 ${
                            index === 0
                              ? 'cursor-not-allowed text-gray-300'
                              : 'text-blue-500 hover:bg-blue-100'
                          }`}
                        >
                          <MoveUp size={16} />
                        </button>
                        <button
                          disabled={index === displayData.length - 1}
                          onClick={() => handleMoveRow(index, 'down')}
                          className={`rounded p-1 ${
                            index === displayData.length - 1
                              ? 'cursor-not-allowed text-gray-300'
                              : 'text-blue-500 hover:bg-blue-100'
                          }`}
                        >
                          <MoveDown size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {enablePagination && totalPages > 1 && (
        <div className="my-4 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() =>
                handlePageChange(Math.max(1, tableState.currentPage - 1))
              }
              disabled={tableState.currentPage === 1}
              className={`rounded-l-md px-3 py-1 ${
                tableState.currentPage === 1
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              } border`}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                page =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - tableState.currentPage) <= 1
              )
              .map((page, i, arr) => {
                const prevPage = arr[i - 1];
                const showEllipsisBefore = prevPage && prevPage !== page - 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsisBefore && (
                      <span className="border bg-white px-3 py-1 text-gray-700">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`border px-3 py-1 ${
                        tableState.currentPage === page
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-green-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() =>
                handlePageChange(
                  Math.min(totalPages, tableState.currentPage + 1)
                )
              }
              disabled={tableState.currentPage === totalPages}
              className={`rounded-r-md px-3 py-1 ${
                tableState.currentPage === totalPages
                  ? 'cursor-not-allowed bg-green-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              } border`}
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      )}{' '}
    </div>
  );
};

export default Table;
