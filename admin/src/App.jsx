import * as React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import NotFound from "./pages/NotFound"; // 404 Page
import {
  AddProduct,
  Brands,
  Customers,
  Inbox,
  Login,
  Orders,
  OrderTemplate,
  ProductCategories,
  Products,
  ProductSales,
  Reviews,
  SalesAnalytics,
  Settings,
  SingleCustomer,
  SingleOrder,
  SingleProduct,
  Suppliers,
  Transactions,
} from "./pages";
import { useSelector } from "react-redux";

const sideBarWidth = 250;

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); // Hook to get the current path

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Paths where Navbar and Sidebar are not rendered
  const excludeLayoutRoutes = ["/login", "/404"];
  const isLayoutExcluded = excludeLayoutRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: "flex" }}>
      {!isLayoutExcluded && (
        <>
          <Navbar
            sideBarWidth={sideBarWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Sidebar
            sideBarWidth={sideBarWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: isLayoutExcluded ? "100%" : { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SingleProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/categories"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProductCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SingleCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales/analysis"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SalesAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProductSales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/template"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderTemplate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SingleOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suppliers"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Suppliers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Reviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Inbox />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isLayoutExcluded && <Footer />}
      </Box>
    </Box>
  );
}

export default App;
