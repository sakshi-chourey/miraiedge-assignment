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
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <GlobalProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path="dashboard"
              element={
                <DashboardPageProviders>
                  <Dashboard />
                </DashboardPageProviders>
              }
            />
            <Route
              path="users"
              element={
                <UsersPageProviders>
                  <Users />
                </UsersPageProviders>
              }
            />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalProviders>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
