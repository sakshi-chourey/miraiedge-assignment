import { useState } from "react";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Dropdown, DropdownItem } from "../Dropdown";
import { MoreHorizontal, Edit, Trash2, Eye, Mail, User as UserIcon } from "lucide-react";
import { User } from "../../types";

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getInitials = (user: User) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    return user.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <div className="animate-pulse">Loading users...</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No users found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No users match your current search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map(user => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  checked={selectedUsers.length === users.length && users.length > 0}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-700 dark:text-gray-300">User</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedUsers.includes(user.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      fallback={getInitials(user)}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        @{user.username} • ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={user.id % 2 === 0 ? "green" : "gray"}>
                    {user.id % 2 === 0 ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-4">
                  <Dropdown
                    trigger={
                      <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    }
                  >
                    <DropdownItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownItem>
                    <DropdownItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownItem>
                    <DropdownItem>
                      <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                      <span className="text-red-600">Delete User</span>
                    </DropdownItem>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedUsers(users.map(user => user.id));
                } else {
                  setSelectedUsers([]);
                }
              }}
              checked={selectedUsers.length === users.length && users.length > 0}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select all users
            </span>
          </label>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-4 ${
                selectedUsers.includes(user.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 mt-1 flex-shrink-0"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                />
                
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={getInitials(user)}
                  className="flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        @{user.username} • ID: {user.id}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white truncate">
                          {user.email}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Badge variant={user.id % 2 === 0 ? "green" : "gray"}>
                          {user.id % 2 === 0 ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      <Dropdown
                        trigger={
                          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        }
                      >
                        <DropdownItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownItem>
                        <DropdownItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownItem>
                        <DropdownItem>
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                          <span className="text-red-600">Delete User</span>
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
