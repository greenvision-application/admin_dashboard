// Here we define the API routes for our server.
import { getUsers,getUserById, createUser, updateUser, deleteUser  } from "./services/userService";
import { categoryService } from "./services/categoryService";
import { plantService } from "./services/plantService";
import { getRoleById, getRoles, createRole, updateRole, deleteRole } from "./services/roleService";
import axiosInstance from "./axios/axiosConfig";
import {login, logout,isAuthenticated }from "./services/authService"
export { getUsers,getUserById, createUser, updateUser, deleteUser, 
        getRoleById, getRoles, updateRole, deleteRole, createRole,
        categoryService,
        plantService,
        axiosInstance,
        login,
        logout,
        isAuthenticated
};