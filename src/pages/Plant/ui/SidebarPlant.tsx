import React from 'react';
import {
  Save,
  Info,
  FileText,
  Sparkles,
  Heart,
  Mountain,
  ImageIcon
} from 'lucide-react';
import { Button } from '../../../components';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'basic', label: 'Basic information', icon: <Info size={20} /> },
    { id: 'details', label: 'Characteristics', icon: <FileText size={20} /> },
    { id: 'functions', label: 'Uses', icon: <Sparkles size={20} /> },
    { id: 'meanings', label: 'Meanings', icon: <Heart size={20} /> },
    { id: 'environment', label: 'Environments', icon: <Mountain size={20} /> },
    { id: 'images', label: 'Images', icon: <ImageIcon size={20} /> }
  ];

  return (
    <div className="flex w-56 flex-col gap-7 border-r border-gray-200 bg-gray-50 p-4">
      <nav className="space-y-1">
        {/* Tabs */}
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-md flex w-full items-center rounded-md px-3 py-2 font-medium ${
              activeTab === tab.id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <span className="mr-3">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Save button */}
      <Button
        type="submit"
        variant="icon"
        className="text-md inline-flex items-center border border-transparent bg-green-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
      >
        <Save size={18} className="mr-2" />
        Save new info
      </Button>
    </div>
  );
};

export default Sidebar;
