import React, { useState } from 'react';

const ProductCard = ({ product, theme, onAddToCart, isDisabled }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isDisabled) {
      alert('Musisz się zarejestrować lub zalogować, aby dodać produkt do koszyka.');
      return;
    }

    setLoading(true);

    onAddToCart(product);

    setLoading(false);
    alert('Produkt dodany do koszyka!');
  };

  return (
    <>
      <div
        className={`card ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'} text-center h-100 shadow`}
        style={{
          cursor: 'pointer',
          transition: 'background-color 0.3s, color 0.3s',
          borderRadius: '10px',
        }}
        onClick={toggleModal}
      >
        <img
          src={product.imageUrl || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="card-img-top"
          style={{
            height: '200px',
            objectFit: 'cover',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Cena: {product.discountPrice ?? product.price} zł</p>
          <p className="card-text">Dostępność: {product.stock}</p>
          <p
            className="card-text text-truncate"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              overflow: 'hidden',
            }}
          >
            {product.description || 'Brak opisu.'}
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart}
            disabled={loading || isDisabled}
            style={{
              width: '100%',
              fontWeight: 'bold',
              cursor: loading || isDisabled ? 'not-allowed' : 'pointer',
              opacity: loading || isDisabled ? 0.6 : 1,
            }}
          >
            {loading ? 'Dodawanie...' : 'Dodaj do koszyka'}
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal"
          style={modalStyles}
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleModal();
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
            <button
              className="btn btn-close"
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={toggleModal}
            ></button>
            <img
              src={product.imageUrl || 'https://via.placeholder.com/400'}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '15px',
                borderRadius: '10px',
              }}
            />
            <h5>{product.name}</h5>
            <p>Cena: {product.discountPrice ?? product.price} zł</p>
            <p>Dostępność: {product.stock}</p>
            <p>{product.description || 'Brak opisu.'}</p>
          </div>
        </div>
      )}
    </>
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
  position: 'relative',
};

export default ProductCard;
