import { ApiResponse, User } from '../types';

// Base URL for the mock API
const BASE_URL = 'https://reqres.in/api';

export class ApiService {
  /**
   * Fetches a paginated list of users from the API.
   * @param page - Page number to fetch
   * @param perPage - Number of users per page
   */
  static async getUsers(page: number = 1, perPage: number = 6): Promise<ApiResponse<User>> {
    try {
      // Make a GET request to fetch users
      const response = await fetch(`${BASE_URL}/users?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Return parsed JSON response
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Searches users by name or email. Returns filtered results.
   * @param query - Search string
   * @param page - Page number to fetch
   */
  static async searchUsers(query: string, page: number = 1): Promise<ApiResponse<User>> {
    try {
      // Make a GET request to fetch users
      const response = await fetch(`${BASE_URL}/users?page=${page}`, {
        method: 'GET',
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response
      const data = await response.json();

      // If no query, return all users
      if (!query.trim()) {
        return data;
      }

      // Filter users by name or email
      const filteredUsers = data.data.filter((user: User) =>
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );

      // Return filtered results
      return {
        ...data,
        data: filteredUsers,
        total: filteredUsers.length
      };
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }
}
