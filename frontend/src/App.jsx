import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import StoresPage from "./pages/StoresPage";
import MyStorePage from "./pages/MyStorePage";
import ProductsPage from "./pages/ProductsPage";
import MyOrderPage from "./pages/MyOrderPage";
import CreateNewProduct from "./components/createNewProduct";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      <Toaster />

      <NavBar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/stores"
            element={user ? <StoresPage /> : <Navigate to="/login" />}
          /><Route
            path="/mystore"
            element={user ? <MyStorePage /> : <Navigate to="/login" />}
          /><Route
            path="/products"
            element={user ? <ProductsPage /> : <Navigate to="/login" />}
          /><Route
            path="/myorders"
            element={user ? <MyOrderPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-new-product"
            element={user ? <CreateNewProduct /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
