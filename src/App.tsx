import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Inventory from './pages/Inventory';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-hp-blue"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Main App Component
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-hp-blue"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="payroll" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll - Coming Soon</h2></div>} />
          <Route path="orders" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders - Coming Soon</h2></div>} />
          <Route path="tasks" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks - Coming Soon</h2></div>} />
          <Route path="messages" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages - Coming Soon</h2></div>} />
          <Route path="invoices" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices - Coming Soon</h2></div>} />
          <Route path="analytics" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics - Coming Soon</h2></div>} />
          <Route path="employees" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employees - Coming Soon</h2></div>} />
          <Route path="search" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search - Coming Soon</h2></div>} />
          <Route path="activity" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log - Coming Soon</h2></div>} />
          <Route path="export" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export Data - Coming Soon</h2></div>} />
        </Route>
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;