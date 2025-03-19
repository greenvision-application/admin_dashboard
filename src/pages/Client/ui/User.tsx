import { useState, useEffect } from 'react';
// import {User} from '../../../types/Model';
import { Table } from '../../../components';
import type { ActionColumn } from '../../../components';
import provinces from '../../../data/provinces.json';
import { District, Ward } from '../../../types/Model';
import {
  getUsers,
  updateUser,
  createUser
} from '../../../services/userService';
import { getRoles } from '../../../services/roleService';
import { Role } from '../../../types/Model';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

// Định nghĩa interface dựa trên dữ liệu API thực tế
interface UserTable {
  id: string;
  created_at: string;
  username: string | null;
  email: string;
  preferences: string | null;
  is_active: boolean;
  address: {
    ward: string;
    district: string;
    province: string;
  } | null;
  role_id: string;
  Role: {
    id: string;
    role_name: string;
  };
}

interface UserColumn {
  key: keyof UserTable;
  title: string;
  render?: (user: UserTable) => JSX.Element;
}

interface NewUser {
  id: string;
  username: string;
  email: string;
  role_id: string;
  password: string;
  role?: string;
  ward: string;
  district: string;
  province: string;
}

const UserList: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  //update
  const [edit, setEdit] = useState(false);
  //roles
  const [roles, setRoles] = useState<Role[]>([]);
  //tỉnh thành
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [userData, setUserData] = useState<UserTable[]>([]);
  const [showForm, setShowForm] = useState(false);
  // const [newUser, setNewUser] = useState({
  //   username: '',
  //   email: '',
  //   role_id: '',
  //   password: '',
  //   role: '',
  //   ward: '',
  //   district: '',
  //   province: ''
  // });
  const [newUser, setNewUser] = useState<NewUser>({
    id: '',
    username: '',
    email: '',
    role_id: '',
    password: '',
    role: '',
    ward: '',
    district: '',
    province: ''
  });
  const [loading, setLoading] = useState(true);
  // Lấy danh sách roles từ API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        console.log('api roles', rolesData);
        setRoles(rolesData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log('data user', data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate username
    if (!newUser.username.trim()) {
      newErrors.username = 'Tên người dùng là bắt buộc';
    }

    // Validate email
    if (!newUser.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate password (chỉ khi tạo mới)
    if (!edit && !newUser.password.trim()) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (!edit && newUser.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }

    // Validate role
    if (!newUser.role_id) {
      newErrors.role_id = 'Vai trò là bắt buộc';
    }

    // Validate province
    if (!newUser.province) {
      newErrors.province = 'Tỉnh/Thành phố là bắt buộc';
    }

    // Validate district (chỉ khi đã chọn tỉnh)
    if (newUser.province && !newUser.district) {
      newErrors.district = 'Quận/Huyện là bắt buộc';
    }

    // Validate ward (chỉ khi đã chọn huyện)
    if (newUser.district && !newUser.ward) {
      newErrors.ward = 'Phường/Xã là bắt buộc';
    }

    // Set errors
    setErrors(newErrors);
    console.log('Errors:', newErrors);
    

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };
// validate realtime
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
  
    switch (field) {
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Tên người dùng là bắt buộc';
        } else {
          delete newErrors.username;
        }
        break;
  
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Email không hợp lệ';
        } else {
          delete newErrors.email;
        }
        break;
  
      case 'password':
        if (!edit && !value.trim()) {
          newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (!edit && value.length < 8) {
          newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else {
          delete newErrors.password;
        }
        break;
  
      case 'role_id':
        if (!value) {
          newErrors.role_id = 'Vai trò là bắt buộc';
        } else {
          delete newErrors.role_id;
        }
        break;
  
      case 'province':
        if (!value) {
          newErrors.province = 'Tỉnh/Thành phố là bắt buộc';
        } else {
          delete newErrors.province;
        }
        break;
  
      case 'district':
        if (newUser.province && !value) {
          newErrors.district = 'Quận/Huyện là bắt buộc';
        } else {
          delete newErrors.district;
        }
        break;
  
      case 'ward':
        if (newUser.district && !value) {
          newErrors.ward = 'Phường/Xã là bắt buộc';
        } else {
          delete newErrors.ward;
        }
        break;
  
      default:
        break;
    }
  
    setErrors(newErrors);
    if (!newErrors) {
      toast.error(JSON.stringify(newErrors));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewUser(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate real-time
  validateField(field, value);

    // Reset error for the field
    // if (errors[field]) {
    //   setErrors(prevErrors => ({
    //     ...prevErrors,
    //     [field]: ''
    //   }));
    // }
  };

  const handleDisable = async (id: string) => {
    const result = await Swal.fire({
      title: 'Xác nhận vô hiệu hóa',
      text: 'Bạn có chắc muốn vô hiệu hóa tài khoản này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Vô hiệu hóa',
      cancelButtonText: 'Hủy'
    });
    if (result.isConfirmed) {
      try {
        await updateUser(id, { is_active: false });

        // Cập nhật danh sách user trong state
        setUserData(prev =>
          prev.map(user =>
            user.id === id ? { ...user, is_active: false } : user
          )
        );

        // Hiển thị thông báo thành công
        toast.success('Tài khoản đã được vô hiệu hóa!', {
          position: 'top-right',
          autoClose: 3000
        });
      } catch (error) {
        console.error('Lỗi khi vô hiệu hóa tài khoản:', error);
        toast.error('Không thể vô hiệu hóa tài khoản. Vui lòng thử lại.', {
          position: 'top-right',
          autoClose: 3000
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      console.log('Errors:', errors);
      return; // Stop if there are errors
    }

    const selectedProvince = provinces.find(
      p => p.code === Number(newUser.province)
    );
    const selectedDistrict = districts.find(
      d => d.code === Number(newUser.district)
    );
    const selectedWard = wards.find(w => w.code === Number(newUser.ward));

    const userPayload = {
      username: newUser.username,
      email: newUser.email,
      role_id: newUser.role_id,
      address: {
        province: selectedProvince ? selectedProvince.name : '',
        district: selectedDistrict ? selectedDistrict.name : '',
        ward: selectedWard ? selectedWard.name : ''
      },
      is_active: true,
      password: newUser.password
    };
    // Chỉ thêm password khi tạo user mới
    if (!edit) {
      userPayload.password = newUser.password;
    }

    try {
      if (edit) {
        // 🟢 Chỉnh sửa user
        await updateUser(newUser.id, userPayload);

        // Lấy thông tin role mới
        const updatedRole = roles.find(r => r.id === newUser.role_id);

        // Cập nhật lại danh sách user sau khi chỉnh sửa
        // Cập nhật lại danh sách user với role mới
        setUserData(prev =>
          prev.map(user =>
            user.id === newUser.id
              ? {
                  ...user,
                  ...userPayload,
                  Role: updatedRole ? { ...updatedRole } : user.Role
                }
              : user
          )
        );
        toast.success('Cập nhật người dùng thành công!');
      } else {
        // 🆕 Tạo user mới (Gọi API createUser)
        console.log('User Payload trước khi gửi API:', userPayload); // 🛠 Kiểm tra dữ liệu
        const response = await createUser(userPayload);
        console.log('API createUser trả về:', response); // 🛠 Kiểm tra phản hồi API

        // Thêm user mới vào danh sách user
        setUserData(prev => [
          ...prev,
          {
            ...response,
            Role: roles.find(r => r.id === response.role_id) || null
          }
        ]);
        toast.success('Thêm người dùng thành công!');
      }

      setShowForm(false);
      setNewUser({
        id: '',
        username: '',
        email: '',
        role_id: '',
        password: '',
        ward: '',
        district: '',
        province: ''
      });
    } catch (error: any) {
      console.error('Lỗi khi cập nhật user:', error);
      toast.error(error.message);
    }
  };

  const userColumns: UserColumn[] = [
    {
      key: 'username',
      title: 'Tên người dùng',
      render: user => <span>{user.username || 'N/A'}</span>
    },
    { key: 'email', title: 'Email' },
    {
      key: 'address',
      title: 'Địa chỉ',
      render: user => (
        <span>
          {user.address
            ? `${user.address.ward}, ${user.address.district}, ${user.address.province}`
            : 'N/A'}
        </span>
      )
    },
    {
      key: 'Role',
      title: 'Vai trò',
      render: user => (
        <span>{user.Role ? user.Role.role_name : 'Chưa có vai trò'}</span>
      )
    },
    {
      key: 'is_active',
      title: 'Trạng thái',
      render: (user: UserTable) => (
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            user.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {user.is_active ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    }
  ];

  const actionColumn: ActionColumn<UserTable> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Vô hiệu hóa tài khoản',
        onClick: user => handleDisable(user.id),
        className: 'bg-red-400 hover:bg-red-800',
        id: user => `disable-btn-${user.id}`
      },
      {
        label: 'Chỉnh sửa thông tin',
        onClick: user => handleEditUser(user),
        className: 'bg-green-500 hover:bg-green-400',
        id: user => `edit-btn-${user.id}`
      }
    ]
  };

  const handleEditUser = (user: UserTable) => {
    setEdit(true);
    // Tìm tỉnh của user trong provinces.json
    const selectedProvince = provinces.find(
      p => p.name === user.address?.province
    );

    // Tìm huyện của user từ tỉnh đã chọn
    const selectedDistrict = selectedProvince?.districts.find(
      d => d.name === user.address?.district
    );

    // Tìm danh sách xã từ huyện đã chọn
    const selectedWards = selectedDistrict ? selectedDistrict.wards : [];

    // Đặt dữ liệu user vào state
    setNewUser({
      id: user.id,
      username: user.username || '',
      email: user.email,
      role_id: user.role_id,
      province: selectedProvince ? selectedProvince.code.toString() : '',
      district: selectedDistrict ? selectedDistrict.code.toString() : '',
      ward: user.address?.ward || '',
      password: ''
    });

    // Cập nhật danh sách huyện & xã
    setDistricts(selectedProvince ? selectedProvince.districts : []);
    setWards(selectedWards);

    setTimeout(() => {
      setNewUser({
        id: user.id,
        username: user.username || '',
        email: user.email,
        role_id: user.role_id,
        province: selectedProvince ? selectedProvince.code.toString() : '',
        district: selectedDistrict ? selectedDistrict.code.toString() : '',
        ward:
          selectedWards
            .find(w => w.name === user.address?.ward)
            ?.code.toString() || '',
        password: ''
      });
    }, 0);

    setShowForm(true); // Hiển thị form chỉnh sửa
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = Number(e.target.value);
    const selectedProvince = provinces.find(p => p.code === provinceCode);

    setNewUser({
      ...newUser,
      province: provinceCode.toString(),
      district: '',
      ward: ''
    });
    setDistricts(selectedProvince ? selectedProvince.districts : []);
    setWards([]);
    //validate realtime
    validateField('province', provinceCode.toString());
    // // Reset errors
    // if (errors.province) {
    //   setErrors(prevErrors => ({
    //     ...prevErrors,
    //     province: ''
    //   }));
    // }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = Number(e.target.value);
    const selectedDistrict = districts.find(d => d.code === districtCode);

    setNewUser({ ...newUser, district: districtCode.toString(), ward: '' });
    setWards(selectedDistrict ? selectedDistrict.wards : []);
    // Validate real-time
  validateField('district', districtCode.toString());
    // // Reset errors
    // if (errors.district) {
    //   setErrors(prevErrors => ({
    //     ...prevErrors,
    //     district: ''
    //   }));
    // }
  };
  const resetUserForm = () => {
    if (edit) {
      // Chỉ reset nếu đang chỉnh sửa
      setNewUser({
        id: '',
        username: '',
        email: '',
        role_id: '',
        password: '',
        ward: '',
        district: '',
        province: '',
        role: ''
      });
      setDistricts([]);
      setWards([]);
      setEdit(false);
    }
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setErrors({});
            if (!showForm) resetUserForm();
          }}
          className={`rounded px-4 py-2 text-white ${!showForm ? 'bg-green-500 hover:bg-green-900' : 'bg-red-500 hover:bg-red-400'}`}
        >
          {showForm ? 'X' : 'Thêm người dùng'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-xl font-bold">
            {edit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
          </h2>
          <div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tên người dùng <span className="text-red-500">*</span>
              </label>
              <input
                id="input-username"
                type="text"
                value={newUser.username}
                onChange={e => handleInputChange('username', e.target.value)}
                className="w-full rounded border p-2"
                 
              />
              {errors.username && (
                <p id='error-username' className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="input-email"
                type="email"
                value={newUser.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className="w-full rounded border p-2"
                 
              />
              {errors.email && (
                <p id='error-email' className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            {!edit && (
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  id="input-password"
                  type="password"
                  value={newUser.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className="w-full rounded border p-2"
                  minLength={8}
                   
                />
                {errors.password && (
                  <p id='error-password' className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            )}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                id="select-province"
                value={newUser.province}
                onChange={handleProvinceChange}
                className="w-full rounded border p-2"
                 
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map(province => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p id='error-province' className="mt-1 text-sm text-red-500">{errors.province}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <select
                id="select-district"
                value={newUser.district}
                onChange={handleDistrictChange}
                className="w-full rounded border p-2"
                 
                disabled={!newUser.province}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map(district => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p id='error-district' className="mt-1 text-sm text-red-500">{errors.district}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <select
                id="select-ward"
                value={newUser.ward}
                onChange={e => handleInputChange('ward', e.target.value)}
                className="w-full rounded border p-2"
                 
                disabled={!newUser.district}
              >
                <option value="">Chọn phường/xã</option>
                {wards.map(ward => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
              {errors.ward && (
                <p id='error-ward' className="mt-1 text-sm text-red-500">{errors.ward}</p>
              )}
            </div>

            {/* Dropdown chọn vai trò */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <select
                id="select-role"
                value={newUser.role_id}
                onChange={e => {
                  console.log('Role UUID được chọn:', e.target.value);
                  setNewUser({ ...newUser, role_id: e.target.value });
                }}
                className="w-full rounded border p-2"
                 
              >
                <option value="">Chọn vai trò</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <p id='error-role_id' className="mt-1 text-sm text-red-500">{errors.role_id}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                id="button-submit"
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Lưu
              </button>
              <button
                id="button-cancel"
                onClick={() => setShowForm(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table
          data={userData}
          columns={userColumns}
          actionColumn={actionColumn}
        />
      )}
    </>
  );
};

export default UserList;
