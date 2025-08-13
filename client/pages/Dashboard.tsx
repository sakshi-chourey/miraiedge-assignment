import { useEffect, useState } from "react";
import { StatsCards } from "../components/dashboard/StatsCards";
import { Button } from "../components/Button";
import { Plus, Users, FileBarChart } from "lucide-react";
import { ApiService } from "../services/api";
import { DashboardStats } from "../types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const usersData = await ApiService.getUsers(1, 6);
      setStats({
        totalUsers: usersData.total,
        activeUsers: Math.floor(usersData.total * 0.8),
        totalPages: usersData.total_pages,
        currentPage: usersData.page,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Button variant="secondary" className="w-full sm:w-auto">
            <FileBarChart className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <StatsCards stats={stats} isLoading={isLoading} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow border p-6">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                action: "New user registration",
                user: "John Doe",
                time: "5 minutes ago",
                type: "success",
              },
              {
                action: "Profile updated",
                user: "Jane Smith",
                time: "12 minutes ago",
                type: "info",
              },
              {
                action: "User logged in",
                user: "Mike Johnson",
                time: "25 minutes ago",
                type: "success",
              },
              {
                action: "Password reset requested",
                user: "Sarah Wilson",
                time: "1 hour ago",
                type: "warning",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Today's Registrations
              </span>
              <span className="font-semibold text-green-600">+12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Sessions
              </span>
              <span className="font-semibold text-blue-600">847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Server Uptime
              </span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Response Time
              </span>
              <span className="font-semibold text-green-600">120ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
