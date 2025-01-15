import db from '../db.js';

export async function getAllProducts() {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.*, 
        c.name AS categoryName
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    return rows;
  } catch (err) {
    console.error('Błąd podczas pobierania produktów:', err.message);
    throw new Error('Nie udało się pobrać listy produktów.');
  }
}

export async function getProductById(id) {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.*, 
        c.name AS categoryName
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);

    if (rows.length === 0) {
      throw new Error(`Produkt o ID ${id} nie został znaleziony.`);
    }

    return rows[0];
  } catch (err) {
    console.error(`Błąd podczas pobierania produktu o ID ${id}:`, err.message);
    throw new Error('Nie udało się pobrać produktu.');
  }
}

export async function addProduct(productData) {
  try {
    const { name, categoryId, price, stock, description, imageUrl } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, category_id, price, stock, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [name, categoryId, price, stock, description, imageUrl]
    );
    return { productId: result.insertId };
  } catch (err) {
    console.error('Błąd podczas dodawania produktu:', err.message);
    throw new Error('Nie udało się dodać produktu.');
  }
}

export async function updateProduct(id, productData) {
  try {
    const { name, categoryId, price, stock, description, imageUrl } = productData;
    const [result] = await db.query(
      `UPDATE products
       SET name = ?, category_id = ?, price = ?, stock = ?, description = ?, imageUrl = ?
       WHERE id = ?`,
      [name, categoryId, price, stock, description, imageUrl, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Produkt o ID ${id} nie został znaleziony.`);
    }
    return { id, message: 'Produkt został zaktualizowany pomyślnie.' };
  } catch (err) {
    console.error(`Błąd podczas aktualizowania produktu o ID ${id}:`, err.message);
    throw new Error('Nie udało się zaktualizować produktu.');
  }
}

export async function deleteProduct(id) {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Produkt o ID ${id} nie został znaleziony.`);
    }
    return { id, message: 'Produkt został usunięty pomyślnie.' };
  } catch (err) {
    console.error(`Błąd podczas usuwania produktu o ID ${id}:`, err.message);
    throw new Error('Nie udało się usunąć produktu.');
  }
}

export async function addDiscount(id, discountData) {
  try {
    const { discountPrice, discountUntil } = discountData;
    const [result] = await db.query(
      `UPDATE products
       SET discountPrice = ?, discountUntil = ?
       WHERE id = ?`,
      [discountPrice, discountUntil, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Produkt o ID ${id} nie został znaleziony.`);
    }
    return { id, message: 'Zniżka została pomyślnie dodana/zaktualizowana.' };
  } catch (err) {
    console.error(`Błąd podczas dodawania/aktualizowania zniżki dla produktu o ID ${id}:`, err.message);
    throw new Error('Nie udało się zaktualizować zniżki dla produktu.');
  }
}
