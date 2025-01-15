import db from '../db.js';

export const getAllCategories = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    console.log('Kategorie pobrane z bazy danych:', rows);
    return rows;
  } catch (err) {
    console.error('Błąd podczas pobierania kategorii:', err);
    throw err;
  }
};

export const addCategory = async (name) => {
  try {
    const [existingCategory] = await db.query(
      'SELECT * FROM categories WHERE LOWER(name) = LOWER(?)',
      [name]
    );
    if (existingCategory.length > 0) {
      throw new Error('Kategoria o tej nazwie już istnieje');
    }

    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    console.log('Dodano nową kategorię:', result);
    return result.insertId;
  } catch (err) {
    console.error('Błąd podczas dodawania kategorii:', err);
    throw err;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const [existingCategory] = await db.query(
      'SELECT * FROM categories WHERE LOWER(name) = LOWER(?) AND id != ?',
      [name, id]
    );
    if (existingCategory.length > 0) {
      throw new Error('Kategoria o tej nazwie już istnieje');
    }

    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    if (result.affectedRows === 0) {
      throw new Error('Kategoria o podanym ID nie została znaleziona');
    }
    console.log('Zaktualizowano kategorię:', result);
    return result;
  } catch (err) {
    console.error('Błąd podczas aktualizowania kategorii:', err);
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Kategoria o podanym ID nie została znaleziona');
    }
    console.log('Usunięto kategorię o ID:', id);
    return result;
  } catch (err) {
    console.error('Błąd podczas usuwania kategorii:', err);
    throw err;
  }
};