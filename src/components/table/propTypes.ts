interface Column<T> {
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
  id?: (item:T) =>string | undefined
}

interface ActionColumn<T> {
  title: string;
  actions: Action<T>[];
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actionColumn?: ActionColumn<T>;
}

export type { Column, Action, ActionColumn, TableProps };
