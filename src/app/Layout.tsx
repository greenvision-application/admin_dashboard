import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../widgets';

const Layout = () => {
  return (
    <div className="relative">
      <Sidebar />
      <main className="ml-24 flex h-screen flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default Layout;
