import { ApiResponse, User } from '../types';

const BASE_URL = 'https://reqres.in/api';

export class ApiService {
  static async getUsers(page: number = 1, perPage: number = 6): Promise<ApiResponse<User>> {
    try {
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

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async searchUsers(query: string, page: number = 1): Promise<ApiResponse<User>> {
    try {
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

      const data = await response.json();

      if (!query.trim()) {
        return data;
      }

      const filteredUsers = data.data.filter((user: User) =>
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );

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
