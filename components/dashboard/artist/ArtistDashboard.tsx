import React, { useState } from 'react';
import {
  Home,
  User,
  Music,
  Calendar,
  ShoppingBag,
  BarChart2,
  Settings,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';
import ArtistStatsCard from './ArtistStatsCard';
import ArtistPublicProfilePreview from './ArtistPublicProfilePreview';
import ArtistProfileEditForm from './ArtistProfileEditForm';
import AlbumListComponent from './AlbumListComponent';
import AnalyticsDashboard from './AnalyticsDashboard';
import MerchandiseManagement from './MerchandiseManagement';
import EventManagement from './EventManagement';

const ArtistDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArtistStatsCard />
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <h3 className="text-xl font-bold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSection('music')}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <span className="flex items-center">
                      <Music className="h-5 w-5 mr-2 text-indigo-500" />
                      Upload New Music
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveSection('events')}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <span className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                      Schedule Event
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveSection('merchandise')}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <span className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2 text-indigo-500" />
                      Add Merchandise
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    Your Artist Profile
                  </h3>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                  >
                    Edit Profile
                  </button>
                </div>
                <p className="text-white text-opacity-90 mb-4">
                  Showcase your brand, music, and connect with fans. Complete
                  your profile for better visibility.
                </p>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <ArtistPublicProfilePreview />
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
              <ArtistProfileEditForm />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Preview</h2>
              <ArtistPublicProfilePreview />
            </div>
          </div>
        );
      case 'music':
        return <AlbumListComponent />;
      case 'events':
        return <EventManagement />;
      case 'merchandise':
        return <MerchandiseManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <div>Select a section</div>;
    }
  };

  const navItems = [
    { name: 'Overview', icon: <Home size={20} />, id: 'overview' },
    { name: 'Profile', icon: <User size={20} />, id: 'profile' },
    { name: 'Music', icon: <Music size={20} />, id: 'music' },
    { name: 'Events', icon: <Calendar size={20} />, id: 'events' },
    { name: 'Merchandise', icon: <ShoppingBag size={20} />, id: 'merchandise' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, id: 'analytics' },
    { name: 'Settings', icon: <Settings size={20} />, id: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white dark:bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Ngoma</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                } group flex items-center px-4 py-3 text-base font-medium rounded-md w-full`}
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center px-4 py-2 rounded-md">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {navItems.find((item) => item.id === activeSection)?.name ||
                  'Dashboard'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your artist profile and content
              </p>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtistDashboard;
