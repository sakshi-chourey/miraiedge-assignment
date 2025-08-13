import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Search, Filter, X, Download } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onPerPageChange: (perPage: number) => void;
  currentFilter: string;
  perPage: number;
  totalResults: number;
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  onFilterChange,
  onPerPageChange,
  currentFilter,
  perPage,
  totalResults,
}: SearchAndFilterProps) {
  const [tempQuery, setTempQuery] = useState(searchQuery);
  
  const debouncedQuery = useDebounce(tempQuery, 300);

  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, searchQuery, onSearchChange]);

  useEffect(() => {
    setTempQuery(searchQuery);
  }, [searchQuery]);

  const clearSearch = () => {
    setTempQuery("");
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by name, username, or email..."
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            className="pl-10 pr-10 w-full"
          />
          {tempQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <select
              value={currentFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Show:</span>
            <select
              value={perPage.toString()}
              onChange={(e) => onPerPageChange(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            {totalResults} {totalResults === 1 ? "result" : "results"}
          </span>

          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export Data</span>
          </Button>
        </div>
      </div>

      {(searchQuery || currentFilter !== "all") && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-sm">
                <span className="truncate max-w-[150px]">Search: "{searchQuery}"</span>
                <button
                  onClick={clearSearch}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-300 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {currentFilter !== "all" && (
              <div className="flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-md text-sm">
                <span>Status: {currentFilter}</span>
                <button
                  onClick={() => onFilterChange("all")}
                  className="ml-2 hover:text-purple-600 dark:hover:text-purple-300 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {tempQuery !== debouncedQuery && (
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400"></div>
          <span>Searching...</span>
        </div>
      )}
    </div>
  );
}
