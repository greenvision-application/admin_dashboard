// here we need to define the user interface

export interface Users {
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
    password: string
}