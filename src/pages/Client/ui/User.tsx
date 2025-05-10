import { useState } from 'react';
import { Table, Column, Action } from '../../../components/table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      role: 'Admin'
    },
    { id: 2, name: 'Tran Thi B', email: 'tranthib@example.com', role: 'User' },
    { id: 3, name: 'Le Van C', email: 'levanc@example.com', role: 'User' },
    {
      id: 4,
      name: 'Pham Thi D',
      email: 'phamthid@example.com',
      role: 'Manager'
    },
    {
      id: 5,
      name: 'Hoang Van E',
      email: 'hoangvane@example.com',
      role: 'User'
    },
    {
      id: 6,
      name: 'Nguyen Thi F',
      email: 'nguyenthif@example.com',
      role: 'User'
    },
    { id: 7, name: 'Tran Van G', email: 'tranvang@example.com', role: 'Admin' },
    { id: 8, name: 'Le Thi H', email: 'lethih@example.com', role: 'User' },
    {
      id: 9,
      name: 'Pham Van I',
      email: 'phamvani@example.com',
      role: 'Manager'
    },
    {
      id: 10,
      name: 'Hoang Thi K',
      email: 'hoangthik@example.com',
      role: 'User'
    },
    {
      id: 11,
      name: 'Nguyen Van L',
      email: 'nguyenvanl@example.com',
      role: 'User'
    },
    { id: 12, name: 'Tran Thi M', email: 'tranthim@example.com', role: 'User' },
    { id: 13, name: 'Le Van N', email: 'levann@example.com', role: 'Manager' },
    { id: 14, name: 'Pham Thi O', email: 'phamthio@example.com', role: 'User' },
    {
      id: 15,
      name: 'Hoang Van P',
      email: 'hoangvanp@example.com',
      role: 'Admin'
    },
    {
      id: 16,
      name: 'Nguyen Thi Q',
      email: 'nguyenthiq@example.com',
      role: 'User'
    },
    { id: 17, name: 'Tran Van R', email: 'tranvanr@example.com', role: 'User' },
    { id: 18, name: 'Le Thi S', email: 'lethis@example.com', role: 'Manager' },
    { id: 19, name: 'Pham Van T', email: 'phamvant@example.com', role: 'User' },
    {
      id: 20,
      name: 'Hoang Thi U',
      email: 'hoangthiu@example.com',
      role: 'Admin'
    },
    {
      id: 21,
      name: 'Nguyen Van V',
      email: 'nguyenvanv@example.com',
      role: 'User'
    },
    { id: 22, name: 'Tran Thi W', email: 'tranthiw@example.com', role: 'User' },
    { id: 23, name: 'Le Van X', email: 'levanx@example.com', role: 'Manager' },
    { id: 24, name: 'Pham Thi Y', email: 'phamthiy@example.com', role: 'User' },
    {
      id: 25,
      name: 'Hoang Van Z',
      email: 'hoangvanz@example.com',
      role: 'Admin'
    },
    {
      id: 26,
      name: 'Nguyen Thi AA',
      email: 'nguyenthiaa@example.com',
      role: 'User'
    },
    {
      id: 27,
      name: 'Tran Van BB',
      email: 'tranvanbb@example.com',
      role: 'User'
    },
    {
      id: 28,
      name: 'Le Thi CC',
      email: 'lethicc@example.com',
      role: 'Manager'
    },
    {
      id: 29,
      name: 'Pham Van DD',
      email: 'phamvandd@example.com',
      role: 'User'
    },
    {
      id: 30,
      name: 'Hoang Thi EE',
      email: 'hoangthiee@example.com',
      role: 'Admin'
    },
    {
      id: 31,
      name: 'Nguyen Van FF',
      email: 'nguyenvanff@example.com',
      role: 'User'
    },
    {
      id: 32,
      name: 'Tran Thi GG',
      email: 'tranthigg@example.com',
      role: 'User'
    },
    {
      id: 33,
      name: 'Le Van HH',
      email: 'levanhh@example.com',
      role: 'Manager'
    },
    {
      id: 34,
      name: 'Pham Thi II',
      email: 'phamthiii@example.com',
      role: 'User'
    },
    {
      id: 35,
      name: 'Hoang Van JJ',
      email: 'hoangvanjj@example.com',
      role: 'Admin'
    },
    {
      id: 36,
      name: 'Nguyen Thi KK',
      email: 'nguyenthikk@example.com',
      role: 'User'
    },
    {
      id: 37,
      name: 'Tran Van LL',
      email: 'tranvanll@example.com',
      role: 'User'
    },
    {
      id: 38,
      name: 'Le Thi MM',
      email: 'lethimm@example.com',
      role: 'Manager'
    },
    {
      id: 39,
      name: 'Pham Van NN',
      email: 'phamvannn@example.com',
      role: 'User'
    },
    {
      id: 40,
      name: 'Hoang Thi OO',
      email: 'hoangthioo@example.com',
      role: 'Admin'
    },
    {
      id: 41,
      name: 'Nguyen Van PP',
      email: 'nguyenvanpp@example.com',
      role: 'User'
    },
    {
      id: 42,
      name: 'Tran Thi QQ',
      email: 'tranthiqq@example.com',
      role: 'User'
    },
    {
      id: 43,
      name: 'Le Van RR',
      email: 'levanrr@example.com',
      role: 'Manager'
    },
    {
      id: 44,
      name: 'Pham Thi SS',
      email: 'phamthiss@example.com',
      role: 'User'
    },
    {
      id: 45,
      name: 'Hoang Van TT',
      email: 'hoangvantt@example.com',
      role: 'Admin'
    },
    {
      id: 46,
      name: 'Nguyen Thi UU',
      email: 'nguyenthiuu@example.com',
      role: 'User'
    },
    {
      id: 47,
      name: 'Tran Van VV',
      email: 'tranvanvv@example.com',
      role: 'User'
    },
    {
      id: 48,
      name: 'Le Thi WW',
      email: 'lethiww@example.com',
      role: 'Manager'
    },
    {
      id: 49,
      name: 'Pham Van XX',
      email: 'phamvanxx@example.com',
      role: 'User'
    },
    {
      id: 50,
      name: 'Hoang Thi YY',
      email: 'hoangthiyy@example.com',
      role: 'Admin'
    },
    {
      id: 51,
      name: 'Nguyen Van ZZ',
      email: 'nguyenvanzz@example.com',
      role: 'User'
    },
    {
      id: 52,
      name: 'Tran Thi AAA',
      email: 'tranthiaaa@example.com',
      role: 'User'
    },
    {
      id: 53,
      name: 'Le Van BBB',
      email: 'levanbbb@example.com',
      role: 'Manager'
    },
    {
      id: 54,
      name: 'Pham Thi CCC',
      email: 'phamthiccc@example.com',
      role: 'User'
    },
    {
      id: 55,
      name: 'Hoang Van DDD',
      email: 'hoangvanddd@example.com',
      role: 'Admin'
    },
    {
      id: 56,
      name: 'Nguyen Thi EEE',
      email: 'nguyenthieee@example.com',
      role: 'User'
    },
    {
      id: 57,
      name: 'Tran Van FFF',
      email: 'tranvanfff@example.com',
      role: 'User'
    },
    {
      id: 58,
      name: 'Le Thi GGG',
      email: 'lethiggg@example.com',
      role: 'Manager'
    },
    {
      id: 59,
      name: 'Pham Van HHH',
      email: 'phamvanhhh@example.com',
      role: 'User'
    },
    {
      id: 60,
      name: 'Hoang Thi III',
      email: 'hoangthiiii@example.com',
      role: 'Admin'
    },
    {
      id: 61,
      name: 'Nguyen Van JJJ',
      email: 'nguyenvanjjj@example.com',
      role: 'User'
    },
    {
      id: 62,
      name: 'Tran Thi KKK',
      email: 'tranthikkk@example.com',
      role: 'User'
    },
    {
      id: 63,
      name: 'Le Van LLL',
      email: 'levanlll@example.com',
      role: 'Manager'
    },
    {
      id: 64,
      name: 'Pham Thi MMM',
      email: 'phamthimmm@example.com',
      role: 'User'
    },
    {
      id: 65,
      name: 'Hoang Van NNN',
      email: 'hoangvannn@example.com',
      role: 'Admin'
    },
    {
      id: 66,
      name: 'Nguyen Thi OOO',
      email: 'nguyenthiooo@example.com',
      role: 'User'
    },
    {
      id: 67,
      name: 'Tran Van PPP',
      email: 'tranvanppp@example.com',
      role: 'User'
    },
    {
      id: 68,
      name: 'Le Thi QQQ',
      email: 'lethiqqq@example.com',
      role: 'Manager'
    },
    {
      id: 69,
      name: 'Pham Van RRR',
      email: 'phamvanrrr@example.com',
      role: 'User'
    },
    {
      id: 70,
      name: 'Hoang Thi SSS',
      email: 'hoangthisss@example.com',
      role: 'Admin'
    }
  ]);
  const columns: Column<User>[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Tên' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Vai trò' }
  ];

  const actions: Action<User>[] = [
    {
      label: 'Sửa',
      id: 'edit',
      onClick: user => {
        console.log('Edit user:', user);
      },
      className: 'bg-blue-500 text-white'
    },
    {
      label: 'Xóa',
      id: 'delete',
      onClick: user => {
        setUsers(users.filter(u => u.id !== user.id));
      },
      className: 'bg-red-500 text-white'
    }
  ];

  const handleDeleteSelected = (indices: number[]) => {
    // Lấy ID của các user đã chọn
    const selectedIds = indices.map(index => users[index].id);
    // Xóa các user đã chọn
    setUsers(users.filter(user => !selectedIds.includes(user.id)));
  };

  const handleMoveRow = (index: number, direction: 'up' | 'down') => {
    const newUsers = [...users];
    if (direction === 'up' && index > 0) {
      [newUsers[index], newUsers[index - 1]] = [
        newUsers[index - 1],
        newUsers[index]
      ];
    } else if (direction === 'down' && index < users.length - 1) {
      [newUsers[index], newUsers[index + 1]] = [
        newUsers[index + 1],
        newUsers[index]
      ];
    }
    setUsers(newUsers);
  };

  return (
    <Table
      data={users}
      columns={columns}
      actionColumn={{
        title: 'Thao tác',
        actions: actions
      }}
      enableRowSelection={true}
      enableSorting={true}
      enablePagination={true}
      pageSize={5}
      onDeleteSelected={handleDeleteSelected}
      onMoveRow={handleMoveRow}
    />
  );
};
export default User;
