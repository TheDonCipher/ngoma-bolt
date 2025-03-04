import React, { useState } from 'react';
import {
  Bell,
  Globe,
  Lock,
  CreditCard,
  Shield,
  HelpCircle,
} from 'lucide-react';

const ArtistSettings = () => {
  const [activeTab, setActiveTab] = useState<string>('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value="artist@example.com"
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  readOnly
                />
                <p className="mt-1 text-sm text-gray-500">
                  This is the email used for account notifications
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value="amaradiop"
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This appears in your profile URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Language
                </label>
                <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Update Password
                </button>
              </div>
            </div>

            <div className="border-t pt-6 mt-8">
              <h3 className="text-lg font-medium mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enhance your account security</p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                  Enable
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Follower Notifications</p>
                  <p className="text-sm text-gray-500">
                    Get notified when someone follows you
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-gray-500">
                    Receive promotional emails
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Payment Methods</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-center text-gray-500 dark:text-gray-400">
                No payment methods added yet
              </p>
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add Payment Method
                </button>
              </div>
            </div>

            <div className="border-t pt-6 mt-8">
              <h3 className="text-lg font-medium mb-4">Payout Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Default Payout Method
                  </label>
                  <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="bank">Bank Account</option>
                    <option value="paypal">PayPal</option>
                    <option value="crypto">Cryptocurrency Wallet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Payout Threshold
                  </label>
                  <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="25">$25</option>
                    <option value="50">$50</option>
                    <option value="100">$100</option>
                    <option value="250">$250</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum balance required for automatic payout
                  </p>
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Save Payout Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a settings category</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        <h3 className="font-medium text-lg mb-4">Settings</h3>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'account'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Globe className="mr-3 h-5 w-5 text-gray-400" />
            Account
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'security'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Lock className="mr-3 h-5 w-5 text-gray-400" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'notifications'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Bell className="mr-3 h-5 w-5 text-gray-400" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'payments'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
            Payments
          </button>
        </nav>
      </div>

      <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ArtistSettings;
