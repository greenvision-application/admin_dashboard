import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { NotFound, Dashboard, Plant, User, Scan, Setting } from '../pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/plants" element={<Plant />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
