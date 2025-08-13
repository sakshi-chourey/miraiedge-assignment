// Import global styles and dependencies
import './global.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  GlobalProviders, 
  UsersPageProviders, 
  DashboardPageProviders 
} from './contexts/AppProviders';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

// Main application component
function App() {
  return (
    // Wrap the app with global providers (e.g., theme)
    <GlobalProviders>
      {/* Set up routing for the dashboard application */}
      <Router>
        <Routes>
          {/* DashboardLayout wraps all main pages */}
          <Route path="/" element={<DashboardLayout />}>
            {/* Render Dashboard for both / and /dashboard */}
            <Route
              index
              element={
                <DashboardPageProviders>
                  <Dashboard />
                </DashboardPageProviders>
              }
            />
            <Route
              path="dashboard"
              element={
                <DashboardPageProviders>
                  <Dashboard />
                </DashboardPageProviders>
              }
            />
            {/* Users management page */}
            <Route
              path="users"
              element={
                <UsersPageProviders>
                  <Users />
                </UsersPageProviders>
              }
            />
            {/* Reports and analytics page */}
            <Route path="reports" element={<Reports />} />
            // ...existing code...
          </Route>
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalProviders>
  );
}

// Mount the React app to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
