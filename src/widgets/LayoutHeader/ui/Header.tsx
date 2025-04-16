import { useState } from 'react';
import { BotMessageSquare, Moon, Search, Sun } from 'lucide-react';
import { Button, Input } from '../../../components';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="sticky top-0 right-0 left-24 border-b border-gray-300 bg-white">
      <div className="flex h-20 items-center justify-between px-4 py-2">
        {/* Tittle Section */}
        <div>
          <h1 className="text-xl font-bold">GreenVision Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            100 Plants with 1000 Users
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-6 max-w-md flex-1">
          <div className="relative">
            <Search className="text-muted-foreground absolute mx-1.5 my-1.5 h-7 w-5" />
            <Input
              type="search"
              placeholder="Search Plant or User..."
              className="w-full border-0 bg-gray-200/90 pl-8"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="icon"
            className="text-primary"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* AI Bot */}
          <Button variant="icon" className="text-primary">
            <BotMessageSquare className="h-6 w-6" />
            <span className="sr-only">AI Bot</span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Tuong Nhat</p>
              <p className="text-muted-foreground text-xs">Admin</p>
            </div>
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-green-500 shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                // src={'https://avatar.iran.liara.run/public/45'}
                src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                alt="User avatar"
                className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
