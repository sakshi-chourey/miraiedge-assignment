import { createContext, useContext, useState, useMemo } from 'react';
import { ApiService } from '../services/api';
import { User } from '../types';

interface UsersState {
  allUsers: User[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentFilter: string;
  currentPage: number;
  perPage: number;
}

interface UsersContextType {
  allUsers: User[];
  users: User[];
  totalUsers: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentFilter: string;
  currentPage: number;
  perPage: number;
  fetchUsers: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UsersState>({
    allUsers: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    currentFilter: 'all',
    currentPage: 1,
    perPage: 6,
  });

  const filteredUsers = useMemo(() => {
    let filtered = state.allUsers;
    
    if (state.searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.first_name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
    
    if (state.currentFilter !== 'all') {
      filtered = filtered.filter(user => {
        const isActive = user.id % 2 === 0;
        return state.currentFilter === 'active' ? isActive : !isActive;
      });
    }
    
    return filtered;
  }, [state.allUsers, state.searchQuery, state.currentFilter]);

  const totalPages = Math.ceil(filteredUsers.length / state.perPage);
  
  const users = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.perPage;
    const endIndex = startIndex + state.perPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, state.currentPage, state.perPage]);

  const fetchUsers = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await ApiService.getUsers(1, 12);
      
      setState(prev => ({ 
        ...prev, 
        allUsers: response.data,
        isLoading: false 
      }));
    } catch (err) {
      console.error('Error fetching users:', err);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to fetch users. Please try again.',
        isLoading: false 
      }));
    }
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
  };

  const setFilter = (filter: string) => {
    setState(prev => ({ ...prev, currentFilter: filter, currentPage: 1 }));
  };

  const setPage = (page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const setPerPage = (perPage: number) => {
    setState(prev => ({ ...prev, perPage, currentPage: 1 }));
  };

  return (
    <UsersContext.Provider value={{
      allUsers: state.allUsers,
      users,
      totalUsers: filteredUsers.length,
      totalPages,
      isLoading: state.isLoading,
      error: state.error,
      searchQuery: state.searchQuery,
      currentFilter: state.currentFilter,
      currentPage: state.currentPage,
      perPage: state.perPage,
      fetchUsers,
      setSearchQuery,
      setFilter,
      setPage,
      setPerPage,
    }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
