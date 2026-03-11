import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import CreatePost from './pages/CreatePost';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>


        <div style={appStyle}>
          {/* Header appears on all pages */}
          <Header />

          {/* Main content area */}
          <main style={mainStyle}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />


              <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              }
              />

              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page - catches all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer appears on all pages */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Simple 404 component
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainStyle = {
  flex: 1,
};

export default App;