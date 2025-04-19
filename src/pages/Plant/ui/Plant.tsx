import { FilePenLine, Trash } from 'lucide-react';
import { getAllPlant } from '../../../services';
import { useFetchData } from '../../../hooks';
import type { Plant } from '../../../types';
import { Action, Column, Loading, Table } from '../../../components';

const Plant = () => {
  const { data, isLoading, error } = useFetchData<Plant[]>({
    fetchFn: getAllPlant
  });

  if (isLoading) return <Loading label="Getting plants data..." />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return null;

  const renderList = (item: string[]) => {
    return (
      <ul className="line-clamp-3">
        {item.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    );
  };

  const actions: Action<Plant>[] = [
    {
      id: Math.random(),
      icon: <FilePenLine size={25} />,
      onClick: plant => {
        console.log('Edit plant:', plant);
      },
      className: 'bg-blue-400 text-white hover:bg-blue-500'
    },
    {
      id: Math.random(),
      icon: <Trash size={25} />,
      onClick: plant => {
        console.log('Edit plant:', plant);
      },
      className: 'bg-red-400 text-white hover:bg-red-500'
    }
  ];

  const columns: Column<Plant>[] = [
    { key: 'plant_name', title: 'Name' },
    {
      key: 'overview',
      title: 'Overview',
      render: (item: Plant) => renderList(item.overview)
    },
    {
      key: 'characteristic',
      title: 'Characteristic',
      render: (item: Plant) => renderList(item.characteristic)
    },
    {
      key: 'function',
      title: 'Function',
      render: (item: Plant) => renderList(item.function)
    },
    {
      key: 'meaning',
      title: 'Meaning',
      render: (item: Plant) => renderList(item.meaning)
    }
  ];
  return (
    <Table
      data={data}
      actionColumn={{
        title: 'Actions',
        actions: actions
      }}
      columns={columns}
      enableRowSelection={true}
      enableSorting={true}
      enablePagination={true}
      pageSize={5}
    />
  );
};
export default Plant;
