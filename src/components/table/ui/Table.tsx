import React from 'react';
import { TableProps } from '../propTypes';

const Table = <T,>({
  data,
  columns,
  actionColumn
}: TableProps<T>): JSX.Element => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
      <table className="min-w-full border-collapse table-fixed">
        {/* Header */}
        <thead>
          <tr className="bg-primary text-white text-center">
            {columns.map(col => (
              <th key={col.key as string} className="p-3">
                {col.title}
              </th>
            ))}
            {actionColumn && <th className="p-3">{actionColumn.title}</th>}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-neutral-400 hover:bg-green-50">
              {columns.map(col => (
                <td key={col.key as string} className="p-2 min-w-36 border-r border-neutral-300 align-top">
                  {col.render
                    ? col.render(item)
                    : (item[col.key] as React.ReactNode)}
                </td>
              ))}
              {actionColumn && (
                <td className="space-x-2 p-3 align-top">
                  {actionColumn.actions.map(action => (
                    <button
                      type="button"
                      key={action.label}
                      onClick={() => action.onClick(item)}
                      className={`rounded-md px-2 py-2 m-2 ${
                        action.className || ''
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;