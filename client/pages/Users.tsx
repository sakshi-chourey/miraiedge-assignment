import { useEffect } from "react";
import { UsersTable } from "../components/users/UsersTable";
import { SearchAndFilter } from "../components/users/SearchAndFilter";
import { Pagination } from "../components/users/Pagination";
import { Button } from "../components/Button";
import { Plus, Users as UsersIcon, AlertCircle } from "lucide-react";
import { useUsers } from "../contexts/UsersContext";

export default function Users() {
  const { 
    users,
    totalUsers,
    totalPages,
    isLoading,
    error,
    searchQuery,
    currentFilter,
    currentPage,
    perPage,
    fetchUsers,
    setSearchQuery,
    setFilter,
    setPage,
    setPerPage 
  } = useUsers();

  useEffect(() => {
    if (totalUsers === 0 && !isLoading && !error) {
      fetchUsers();
    }
  }, [fetchUsers, totalUsers, isLoading, error]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchUsers}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor all users in your platform.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UsersIcon className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Users
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? "Loading..." : `${totalUsers} total users`}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onPerPageChange={handlePerPageChange}
              currentFilter={currentFilter}
              perPage={perPage}
              totalResults={totalUsers}
            />

            <UsersTable users={users} isLoading={isLoading} />

            {!isLoading && users.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
