import React from 'react';
import ProductList from '../components/ProductList';
import { toast } from 'react-toastify';

const Home = ({ theme, onAddToCart, user }) => {
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Musisz się zalogować, aby dodać produkt do koszyka.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    onAddToCart(product);
    toast.success(`Dodano do koszyka: ${product.name}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div
      className={`container-xxl mt-4 ${
        theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'
      }`}
      style={{ transition: 'background-color 0.3s, color 0.3s' }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>Witamy w Szkolnym Sklepiku!</h1>
          <p className="mt-3">
            Wybierz produkty i złóż zamówienie. Jeśli jesteś administratorem,
            możesz zarządzać produktami i zamówieniami.
          </p>
        </div>
      </div>
      <ProductList theme={theme} onAddToCart={handleAddToCart} user={user} />
    </div>
  );
};

export default Home;
