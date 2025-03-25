import { useEffect, useState } from "react";
import { getRoles } from "../../../api";
import { Role } from "../../../types";

const RoleList = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách roles:", error);
      }
    };

    fetchRoles();
  }, []);

  if (roles.length === 0) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h2>Danh sách vai trò</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>{role.role_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;