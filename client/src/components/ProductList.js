import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/api';

const ProductList = ({ theme, onAddToCart, user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Błąd przy ładowaniu produktów:', err);
        setError('Nie udało się załadować produktów. Spróbuj później.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div>Ładowanie produktów...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div>Brak dostępnych produktów.</div>;
  }

  return (
    <div className="container">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-5">
          <h3>{category}</h3>
          <div className="row">
            {groupedProducts[category].map((product) => (
              <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
                <ProductCard
                  product={product}
                  theme={theme}
                  onAddToCart={onAddToCart}
                  isDisabled={!user}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div
          className="modal"
          style={modalStyles}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="modal-content"
            style={{
              ...modalContentStyles,
              backgroundColor: theme === 'light' ? 'white' : '#343a40',
              color: theme === 'light' ? 'black' : 'white',
            }}
          >
            <h5>{selectedProduct.name}</h5>
            <img
              src={selectedProduct.imageUrl || 'https://via.placeholder.com/400'}
              alt={selectedProduct.name}
              style={{ width: '100%', height: 'auto', marginBottom: '15px', borderRadius: '10px' }}
            />
            <p>Cena: {selectedProduct.discountPrice ?? selectedProduct.price} zł</p>
            <p>{selectedProduct.description || 'Brak opisu.'}</p>
            <button className="btn btn-secondary mt-3" onClick={closeModal}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1050,
};

const modalContentStyles = {
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '500px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default ProductList;
