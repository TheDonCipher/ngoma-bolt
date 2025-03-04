import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  ChevronDown,
  Search,
  Home,
  Settings,
  LogOut,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardTopbarProps {
  userName?: string;
  userImage?: string;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  userName = 'User',
  userImage,
}) => {
  return (
    <div className="w-full flex justify-between items-center py-3 px-6">
      {/* Left side with search */}
      <div className="hidden md:block relative w-64 lg:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 bg-slate-100 border-0 h-9"
        />
      </div>

      {/* Center - Mobile search button */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Search className="h-5 w-5" />
      </Button>

      {/* Right side elements */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {/* Theme toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-700 dark:text-slate-300"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Home link (visible on larger screens) */}
        <Link href="/" className="hidden md:block">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-700 dark:text-slate-300"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <div className="py-2 px-4 text-center text-sm text-slate-500">
                No new notifications
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button size="sm" className="w-full">
                View all
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-1 h-auto flex items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback className="bg-amber-100 text-amber-800">
                  {userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex items-center gap-1">
                <span className="text-sm font-medium">{userName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardTopbar;
