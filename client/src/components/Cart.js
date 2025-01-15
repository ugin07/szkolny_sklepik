import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = ({ theme }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const handleIncrease = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === productId
        ? { 
            ...item, 
            quantity: item.quantity + 1, 
            totalPrice: (item.quantity + 1) * parseFloat(item.price) 
          }
        : item
    );
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleDecrease = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === productId && item.quantity > 1
        ? { 
            ...item, 
            quantity: item.quantity - 1, 
            totalPrice: (item.quantity - 1) * parseFloat(item.price) 
          }
        : item
    );
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      toast.error('Ilość musi być większa niż zero.');
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.product_id === productId
        ? { 
            ...item, 
            quantity, 
            totalPrice: quantity * parseFloat(item.price) 
          }
        : item
    );
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleRemove = (productId) => {
    const updatedCart = cartItems.filter((item) => item.product_id !== productId);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast.success('Produkt usunięty z koszyka!');
  };

  const handleClearCart = () => {
    if (window.confirm('Czy na pewno chcesz opróżnić koszyk?')) {
      setCartItems([]);
      saveCartToLocalStorage([]);
      toast.success('Koszyk opróżniony!');
    }
  };

  const handleReserve = () => {
    if (cartItems.length > 0) {
      toast.success('Produkty zarezerwowane!');
      setCartItems([]);
      saveCartToLocalStorage([]);
      navigate('/');
    } else {
      toast.error('Koszyk jest pusty!');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        className={`alert alert-info text-center my-5 ${theme === 'light' ? 'text-dark' : 'text-light'}`}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        Twój koszyk jest pusty.
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Przejdź do zakupów
        </button>
      </div>
    );
  }

  return (
    <div
      className={`container mt-4 py-4 rounded ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
      style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 100px)' }}
    >
      <div className="flex-grow-1">
        <h2>Koszyk</h2>
        <ul className="list-group">
          {cartItems.map((item) => (
            <li
              key={item.product_id}
              className={`list-group-item d-flex justify-content-between align-items-center ${theme === 'light' ? 'bg-light' : 'bg-dark text-light'}`}
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/50'}
                  alt={item.product_name}
                  style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '10px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <span
                  style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {item.product_name} - {item.quantity} × {parseFloat(item.price).toFixed(2)} zł
                </span>
              </div>
              <div className="d-flex align-items-center">
                <button className="btn btn-secondary mx-1" onClick={() => handleDecrease(item.product_id)}>
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
                  style={{ width: '60px' }}
                  min="1"
                />
                <button className="btn btn-secondary mx-1" onClick={() => handleIncrease(item.product_id)}>
                  +
                </button>
                <button className="btn btn-danger mx-1" onClick={() => handleRemove(item.product_id)}>
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <button className="btn btn-warning mx-2" onClick={handleClearCart}>
            Opróżnij koszyk
          </button>
          <button className="btn btn-success mx-2" onClick={handleReserve}>
            Zarezerwuj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
