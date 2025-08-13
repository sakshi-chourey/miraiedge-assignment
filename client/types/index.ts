export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
  support?: {
    url: string;
    text: string;
  };
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPages: number;
  currentPage: number;
}

export interface SearchFilters {
  query: string;
  page: number;
  perPage: number;
}

export type NavigationItem = {
  name: string;
  id: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Theme = 'light' | 'dark';
