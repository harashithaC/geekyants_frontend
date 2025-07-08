import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter';


const LoginComponent = lazy(() => import('./components/Login'));
const ManagerDashboardPage = lazy(() => import('./pages/ManagerDashboard'));
const EngineerDashboardPage = lazy(() => import('./components/EngineerDashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/manager/dashboard"
          element={<PrivateRoute allowedRoles={['manager']} element={<ManagerDashboardPage />} />}
        />
        <Route
          path="/engineer/dashboard"
          element={<PrivateRoute allowedRoles={['engineer']} element={<EngineerDashboardPage />} />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
