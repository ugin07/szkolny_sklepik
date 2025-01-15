import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import ProductManager from './components/ProductManager';
import CategoryManager from './components/CategoryManager';

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cartItems, setCartItems] = useState([]);
  const toastId = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const fetchCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warn('Wbij do systemu aby dodać produkty do koszyka.');
      return;
    }

    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((item) => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, product_id: product.id, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Produkt dodany do koszyka!');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    toast.success('Zalogowano pomyślnie.');
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('cart');
    toast.info('Wylogowano.');
  };

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer autoClose={3000} />
        <header>
          <Navbar
            user={user}
            onLogout={handleLogout}
            toggleTheme={toggleTheme}
            theme={theme}
            cartItemCount={cartItems.length}
          />
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} onAddToCart={handleAddToCart} user={user} />}
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} theme={theme} />
              }
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" replace /> : <Register theme={theme} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  theme={theme}
                  onCartUpdate={fetchCart}
                />
              }
            />
            {user && user.role === 'admin' && (
              <>
                <Route
                  path="/admin-dashboard"
                  element={<AdminDashboard theme={theme} />}
                />
                <Route
                  path="/product-manager"
                  element={<ProductManager theme={theme} />}
                />
                <Route
                  path="/category-manager"
                  element={<CategoryManager theme={theme} />}
                />
              </>
            )}
            {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
          </Routes>
        </main>
        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default App;
