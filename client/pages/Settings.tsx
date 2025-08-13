import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Settings & Configuration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage system settings, user preferences, security configurations, and platform customizations.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border p-8">
        <div className="text-center">
          <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Settings Page
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is ready for implementation with your specific settings requirements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Available Features:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• User account settings</li>
                <li>• Security & privacy controls</li>
                <li>• Notification preferences</li>
                <li>• Theme customization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Additional Options:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• API key management</li>
                <li>• System configuration</li>
                <li>• Backup & restore options</li>
                <li>• Integration settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
