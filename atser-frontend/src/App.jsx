import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Landing from './pages/Landing'; // ✅ NEW
import UploadForm from './pages/UploadForm';
import Dashboard from './pages/Dashboard';
import History from './pages/History';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">

          <Navbar />

          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />

            {/* PROTECTED */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <UploadForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </div>
      </Router>
    </AuthProvider>
  );
}