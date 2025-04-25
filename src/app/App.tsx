import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import {
  NotFound,
  Dashboard,
  Plant,
  User,
  Scan,
  Setting,
  PlantDetail,
  SwaggerPage,
  UpdatePlantUI
} from '../pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/plants" element={<Plant />} />
          <Route path="/plant/:plantId" element={<PlantDetail />} />
          <Route path="/plant/:plantId/update" element={<UpdatePlantUI />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/swagger" element={<SwaggerPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
