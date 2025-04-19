import { useState } from 'react';
import {
  Sprout,
  LayoutGrid,
  Users,
  ScanLine,
  LogOut,
  Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '../../../utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>(
    location.pathname.slice(1) || 'dashboard'
  );

  const menuItems = [
    { id: '', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'plants', icon: Sprout, label: 'Plants' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'scan', icon: ScanLine, label: 'Scan Plant' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed top-0 left-0 flex h-screen w-24 flex-col items-center justify-between bg-black py-4">
      <button
        onClick={() => {
          setActive('');
          navigate('/');
        }}
      >
        <Logo />
      </button>
      <div className="flex w-full flex-col items-center gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="group relative">
            <div className="absolute left-full ml-6 hidden rounded-md bg-neutral-900 px-2 py-1 text-sm text-white group-hover:block">
              {item.label}
            </div>
            <button
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
                'hover:bg-green-500/20',
                active === item.id ? 'bg-green-500/10' : ''
              )}
              onClick={() => {
                setActive(item.id);
                navigate(`/${item.id}`);
              }}
            >
              <item.icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  active === item.id ? 'text-green-500' : 'text-gray-400',
                  'group-hover:text-green-500'
                )}
              />
              <span className="sr-only">{item.label}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="group relative">
        <div className="absolute left-full ml-6 hidden rounded-md bg-neutral-900 px-2 py-1 text-sm text-white group-hover:block">
          Logout
        </div>
        <button className="flex h-14 w-14 items-center justify-center rounded-xl transition-colors hover:bg-green-500/20">
          <LogOut className="h-6 w-6 text-gray-400 transition-colors group-hover:text-green-500" />
          <span className="sr-only">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
