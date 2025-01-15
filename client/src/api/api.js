import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas rejestracji:', error.message);
    throw new Error('Nie udało się zarejestrować');
  }
};

export const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas logowania:', error.message);
    throw new Error('Nie udało się zalogować');
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas pobierania produktów:', error.message);
    throw new Error('Nie udało się pobrać produktów');
  }
};

export const addProduct = async (productData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/products`, productData);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas dodawania produktu:', error.message);
    throw new Error('Nie udało się dodać produktu');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas aktualizowania produktu:', error.message);
    throw new Error('Nie udało się zaktualizować produktu');
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error.message);
    throw new Error('Nie udało się usunąć produktu');
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/categories`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas pobierania kategorii:', error.message);
    throw new Error('Nie udało się pobrać kategorii');
  }
};

export const addCategory = async (categoryData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/categories`, categoryData);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas dodawania kategorii:', error.message);
    throw new Error('Nie udało się dodać kategorii');
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/categories/${id}`, categoryData);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas aktualizowania kategorii:', error.message);
    throw new Error('Nie udało się zaktualizować kategorii');
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas usuwania kategorii:', error.message);
    throw new Error('Nie udało się usunąć kategorii');
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/orders`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas pobierania zamówień:', error.message);
    throw new Error('Nie udało się pobrać zamówień');
  }
};

export const getUserOrders = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas pobierania zamówień użytkownika:', error.message);
    throw new Error('Nie udało się pobrać zamówień użytkownika');
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, { status });
    return res.data;
  } catch (error) {
    console.error('Błąd podczas aktualizowania statusu zamówienia:', error.message);
    throw new Error('Nie udało się zaktualizować statusu zamówienia');
  }
};

export const getSalesReport = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/reports/sales`);
    return res.data;
  } catch (error) {
    console.error('Błąd podczas pobierania raportu sprzedaży:', error.message);
    throw new Error('Nie udało się pobrać raportu sprzedaży');
  }
};

export const getCart = async () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  } catch (error) {
    console.error('Błąd podczas pobierania koszyka:', error.message);
    throw new Error('Nie udało się pobrać koszyka');
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Błąd podczas dodawania do koszyka:', error.message);
    throw new Error('Nie udało się dodać produktu do koszyka');
  }
};

export const removeFromCart = async (productId) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item) => item.productId !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Błąd podczas usuwania z koszyka:', error.message);
    throw new Error('Nie udało się usunąć produktu z koszyka');
  }
};

export const clearCart = async () => {
  try {
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    console.error('Błąd podczas czyszczenia koszyka:', error.message);
    throw new Error('Nie udało się wyczyścić koszyka');
  }
};
