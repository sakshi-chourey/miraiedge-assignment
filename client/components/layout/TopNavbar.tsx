import { Bell, Search, Sun, Moon, User } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Dropdown, DropdownItem, DropdownSeparator } from "../Dropdown";
import { Avatar } from "../Avatar";
import { useTheme } from "../../contexts/ThemeContext";

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
      <div className="hidden md:flex items-center flex-1 max-w-md lg:ml-0 md:ml-16">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search users, reports..."
            className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        <Dropdown
          trigger={
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Avatar
                src="/avatars/01.png"
                alt="Admin User"
                fallback="AU"
              />
            </button>
          }
        >
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
          <DropdownItem>Profile Settings</DropdownItem>
          <DropdownItem>Billing</DropdownItem>
          <DropdownItem>Team Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Log out</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
