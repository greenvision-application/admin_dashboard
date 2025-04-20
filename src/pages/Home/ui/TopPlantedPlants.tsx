import { useState } from 'react';
import { Table } from '../../../components';
// import type { ActionColumn } from '../../../components';

// Định nghĩa kiểu dữ liệu mà mình thể hiện trên table/ api trả về
interface PlantTable {
  id: number;
  name: string;
  scientificName: string;
  image: string;
  totalPlanted: number;
  bestRegion: string;
  status: 'pending' | 'happening' | 'completed';
}

interface PlantColumn {
  key: keyof PlantTable;
  title: string;
  render?: (plant: PlantTable) => JSX.Element;
}

const initialPlantData: PlantTable[] = [
  {
    id: 1,
    name: 'Lúa',
    scientificName: 'Oryza sativa',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 12000,
    bestRegion: 'Đồng bằng sông Cửu Long',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Ngô',
    scientificName: 'Zea mays',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 8500,
    bestRegion: 'Tây Nguyên',
    status: 'happening'
  },
  {
    id: 3,
    name: 'Cà phê',
    scientificName: 'Coffea robusta',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 7500,
    bestRegion: 'Lâm Đồng',
    status: 'pending'
  },
  {
    id: 4,
    name: 'Chè',
    scientificName: 'Camellia sinensis',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 6200,
    bestRegion: 'Thái Nguyên',
    status: 'happening'
  },
  {
    id: 5,
    name: 'Hồ tiêu',
    scientificName: 'Piper nigrum',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 5400,
    bestRegion: 'Bà Rịa - Vũng Tàu',
    status: 'completed'
  },
  {
    id: 6,
    name: 'Sắn',
    scientificName: 'Manihot esculenta',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 4800,
    bestRegion: 'Tây Nguyên',
    status: 'pending'
  },
  {
    id: 7,
    name: 'Dừa',
    scientificName: 'Cocos nucifera',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    totalPlanted: 4500,
    bestRegion: 'Bến Tre',
    status: 'happening'
  }
];

const TopPlantedPlants: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantTable[]>(initialPlantData);
  // const handleEdit = (id: number) => {
  //   alert(`Sửa cây có ID: ${id}`);
  // };
  setPlantData(initialPlantData);

  // const handleDelete = (id: number) => {
  //   if (window.confirm('Bạn có chắc muốn xóa không?')) {
  //     setPlantData(prev => prev.filter(plant => plant.id !== id));
  //   }
  // };

  const plantColumns: PlantColumn[] = [
    {
      key: 'image',
      title: 'Hình ảnh',
      render: (plant: PlantTable) => (
        <img
          src={plant.image}
          alt={plant.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      )
    },
    { key: 'name', title: 'Tên cây trồng' },
    { key: 'scientificName', title: 'Tên khoa học' },
    { key: 'totalPlanted', title: 'Số lượng trồng' },
    { key: 'bestRegion', title: 'Vùng trồng tốt nhất' },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (plant: PlantTable) => {
        const statusColors: Record<string, string> = {
          happening: 'bg-green-100 text-green-700',
          completed: 'bg-yellow-100 text-yellow-700',
          pending: 'bg-gray-100 text-gray-700'
        };
        return (
          <span
            className={`rounded-full px-3 py-1 text-sm ${statusColors[plant.status]}`}
          >
            {plant.status}
          </span>
        );
      }
    }
  ];
  // const actionColumn: ActionColumn<PlantTable> = {
  //   title: 'Hành động',
  //   actions: [
  //     {
  //       label: 'Sửa',
  //       onClick: plant => handleEdit(plant.id),
  //       className: 'bg-blue-400 hover:bg-blue-600'
  //     },
  //     {
  //       label: 'Xóa',
  //       onClick: plant => handleDelete(plant.id),
  //       className: 'bg-red-400 hover:bg-red-700'
  //     }
  //   ]
  // };
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800">
        🌱 Top Cây Trồng Nhiều Nhất
      </h2>
      <Table
        data={plantData}
        columns={plantColumns}
        // actionColumn={actionColumn}
      />
    </>
  );
};

export default TopPlantedPlants;
