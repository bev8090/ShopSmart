import { Route, Routes } from "react-router";

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LogoutPage from "./pages/LogoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderDetailPage from './pages/OrderDetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CategoryPage from "./pages/CategoryPage.jsx";
import AdminPanel from './pages/AdminPanel.jsx';
import CreateProductPage from './pages/CreateProductPage.jsx';
import ModifyProductPage from "./pages/ModifyProductPage.jsx";
import { ProtectedRoute, ProtectedAdminRoute } from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div className="relative min-h-dvh container">
      <div className="absolute top-0 z-[-2] h-full w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedAdminRoute>
              <CreateProductPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/modify"
          element={
            <ProtectedAdminRoute>
              <ModifyProductPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App;