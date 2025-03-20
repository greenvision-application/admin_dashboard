import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../widgets';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-24 flex-1">
        <Header />
        <section className="mt-20">
          <Outlet />
        </section>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default Layout;
