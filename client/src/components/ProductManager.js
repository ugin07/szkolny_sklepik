import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from '../api/api';

const ProductManager = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Błąd przy pobieraniu produktów:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Błąd przy pobieraniu kategorii:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' && value > 9999.99) {
      setErrorMessage('Cena nie może przekroczyć 9999.99');
      return;
    }

    setNewProduct({ ...newProduct, [name]: value });
    setErrorMessage('');
  };

  const handleAddProduct = async () => {
    const { name, categoryId, price, stock, description, imageUrl } = newProduct;

    if (!name.trim() || !categoryId || !price || !stock || !description.trim() || !imageUrl.trim()) {
      setErrorMessage('Wszystkie pola muszą być wypełnione.');
      return;
    }

    if (price > 9999.99) {
      setErrorMessage('Cena nie może przekroczyć 9999.99');
      return;
    }

    try {
      await addProduct(newProduct);
      setSuccessMessage('Produkt został pomyślnie dodany.');
      fetchProducts();
      setNewProduct({
        name: '',
        categoryId: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: '',
      });
      setErrorMessage('');
    } catch (err) {
      console.error('Błąd przy dodawaniu produktu:', err);
      setErrorMessage('Nie udało się dodać produktu.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        await updateProduct(editingProduct.id, editingProduct);
        setEditingProduct(null);
        fetchProducts();
        setSuccessMessage('Produkt został pomyślnie zaktualizowany.');
      } catch (err) {
        console.error('Błąd przy aktualizowaniu produktu:', err);
        setErrorMessage('Nie udało się zaktualizować produktu.');
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
      setSuccessMessage('Produkt został pomyślnie usunięty.');
    } catch (err) {
      console.error('Błąd przy usuwaniu produktu:', err);
      setErrorMessage('Nie udało się usunąć produktu.');
    }
  };

  return (
    <div
      className={`container mt-4 ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
    >
      <h2>Zarządzaj produktami</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div
        className={`card p-3 my-3 ${theme === 'light' ? 'bg-white' : 'bg-secondary text-light'}`}
        style={{
          border: theme === 'dark' ? '1px solid #ddd' : '1px solid #ccc',
        }}
      >
        <h4>Dodaj produkt</h4>
        <label className="form-label">Nazwa</label>
        <input
          type="text"
          placeholder="Wpisz nazwę"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          className={`form-control mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        />
        <label className="form-label">Kategoria</label>
        <select
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleChange}
          className={`form-select mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label className="form-label">Cena (zł)</label>
        <input
          type="number"
          placeholder="Wpisz cenę"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          className={`form-control mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        />
        <label className="form-label">Ilość na magazynie</label>
        <input
          type="number"
          placeholder="Wpisz ilość"
          name="stock"
          value={newProduct.stock}
          onChange={handleChange}
          className={`form-control mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        />
        <label className="form-label">Opis</label>
        <textarea
          placeholder="Wpisz opis"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          className={`form-control mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        />
        <label className="form-label">URL obrazu</label>
        <input
          type="text"
          placeholder="Wpisz URL obrazu"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleChange}
          className={`form-control mb-2 ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
        />
        <button onClick={handleAddProduct} className="btn btn-primary">
          Dodaj
        </button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div
              className={`card p-3 ${theme === 'light' ? 'bg-white' : 'bg-secondary text-light'}`}
              style={{
                border: theme === 'dark' ? '1px solid #ddd' : '1px solid #ccc',
              }}
            >
              {editingProduct && editingProduct.id === product.id ? (
                <>
                  <label className="form-label">Nazwa</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className={`form-control mb-2 ${
                      theme === 'dark' ? 'bg-dark text-light border-light' : ''
                    }`}
                  />
                  <label className="form-label">Kategoria</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                    }
                    className={`form-select mb-2 ${
                      theme === 'dark' ? 'bg-dark text-light border-light' : ''
                    }`}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <label className="form-label">Cena (zł)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                    className={`form-control mb-2 ${
                      theme === 'dark' ? 'bg-dark text-light border-light' : ''
                    }`}
                  />
                  <label className="form-label">Opis</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className={`form-control mb-2 ${
                      theme === 'dark' ? 'bg-dark text-light border-light' : ''
                    }`}
                  />
                  <label className="form-label">URL obrazu</label>
                  <input
                    type="text"
                    value={editingProduct.imageUrl}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                    }
                    className={`form-control mb-2 ${
                      theme === 'dark' ? 'bg-dark text-light border-light' : ''
                    }`}
                  />
                  <button onClick={handleUpdateProduct} className="btn btn-success me-2">
                    Zapisz
                  </button>
                </>
              ) : (
                <>
                  <h5>{product.name}</h5>
                  <p>Kategoria: {product.categoryName || 'Nie podana'}</p>
                  <p>Opis: {product.description}</p>
                  <p>Cena: {product.price} ₽</p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Usuń
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
