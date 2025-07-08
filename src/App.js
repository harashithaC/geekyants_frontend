import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const LoginComponent = lazy(() => import("./components/login/Login"));

const App = () => {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginComponent />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
