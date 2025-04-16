import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../widgets';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex flex-1 flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default Layout;
