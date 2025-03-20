import { Route, Routes } from 'react-router-dom'; // Thêm import BrowserRouter
import React from 'react';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NotFound, Dashboard, Plant, User, Scan, Setting, LoginPage } from '../pages';
import {ProtectedRoute} from '../components';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Route đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route chính */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<User />} />
            <Route path="/plants" element={<Plant />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/settings" element={<Setting />} />
          </Route>
        </Route>
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  );
}

export default App;
