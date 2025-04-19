import { getAllPlant } from '../../../services';
import { useFetchData } from '../../../hooks';
import type { Plant } from '../../../types';
import type { Column, ActionColumn } from '../../../components/table';
import { Loading, Table } from '../../../components';

const Plant = () => {
  const { data, isLoading, error } = useFetchData<Plant[]>({
    fetchFn: getAllPlant
  });

  if (isLoading) return <Loading label="Getting plants data..." />;
  if (error) return <div>Error: {error.toString()}</div>;

  const plantData = data;
  const plantColumn: Column<Plant>[] = [
    { key: 'plant_name', title: 'Tên cây' },
    // { key: 'image_url', title: 'Ảnh' },
    { key: 'scientific_name', title: 'Tên khoa học' },
    { key: 'overview', title: 'Tổng quan' },
    { key: 'characteristic', title: 'Đặc điểm' },
    { key: 'function', title: 'Chức năng' },
    { key: 'meaning', title: 'Ý nghĩa' }
  ];
  const actionColumnPlant: ActionColumn<Plant> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Sửa',
        onClick: (plant: Plant) => {
          console.log('Sửa cây trồng:', plant);
        },
        className:
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      },
      {
        label: 'Xóa',
        onClick: (plant: Plant) => {
          console.log('Xóa cây trồng:', plant);
        },
        className:
          'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      }
    ]
  };

  return (
    <Table
      data={plantData}
      columns={plantColumn}
      actionColumn={actionColumnPlant}
    />
  );
};
export default Plant;
