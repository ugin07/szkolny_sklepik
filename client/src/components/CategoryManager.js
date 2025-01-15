import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../api/api';

const CategoryManager = ({ theme }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      if (Array.isArray(data)) {
        setCategories(data);
        setError(null);
      } else {
        setError('Błąd: dane nie są tablicą.');
      }
    } catch (err) {
      console.error('Błąd podczas pobierania kategorii:', err);
      setError('Nie udało się załadować kategorii.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError('Nazwa kategorii nie może być pusta!');
      return;
    }
    try {
      await addCategory({ name: newCategory });
      setNewCategory('');
      fetchCategories();
      setError(null);
    } catch (err) {
      console.error('Błąd podczas dodawania kategorii:', err);
      setError('Nie udało się dodać kategorii.');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!newCategory.trim()) {
      setError('Nazwa kategorii nie może być pusta!');
      return;
    }
    try {
      await updateCategory(editingCategory.id, { name: newCategory });
      setNewCategory('');
      setEditingCategory(null);
      fetchCategories();
      setError(null);
    } catch (err) {
      console.error('Błąd podczas aktualizowania kategorii:', err);
      setError('Nie udało się zaktualizować kategorii.');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
      setError(null);
    } catch (err) {
      console.error('Błąd podczas usuwania kategorii:', err);
      setError('Nie udało się usunąć kategorii.');
    }
  };

  return (
    <div
      className={`container mt-4 py-4 rounded ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
    >
      <h4>Zarządzanie kategoriami</h4>

      {error && (
        <div className="alert alert-danger" role="alert" style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p>Ładowanie kategorii...</p>
      ) : (
        <>
          <ul className={`list-group mb-3 ${theme === 'light' ? '' : 'bg-dark'}`}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    theme === 'light' ? '' : 'bg-dark text-light'
                  }`}
                >
                  {category.name}
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edytuj
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li
                className={`list-group-item ${theme === 'light' ? '' : 'bg-dark text-light'}`}
              >
                Brak kategorii
              </li>
            )}
          </ul>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={
                editingCategory ? 'Edytuj kategorię' : 'Dodaj nową kategorię'
              }
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            >
              {editingCategory ? 'Zaktualizuj' : 'Dodaj'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryManager;
