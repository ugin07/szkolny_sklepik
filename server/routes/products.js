import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addDiscount,
} from '../db/queries/products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error('Błąd podczas pobierania produktów:', err.message);
    res.status(500).json({ error: 'Nie udało się pobrać produktów. Spróbuj później.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID produktu jest wymagane.' });
  }

  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Produkt nie znaleziony.' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(`Błąd podczas pobierania produktu o ID ${id}:`, err.message);
    res.status(500).json({ error: 'Nie udało się pobrać produktu. Spróbuj później.' });
  }
});

router.post('/', async (req, res) => {
  const { name, categoryId, price, stock, description, imageUrl } = req.body;

  if (!name || !price || stock === undefined || !categoryId) {
    return res.status(400).json({
      error: 'Wymagane pola: nazwa, kategoria, cena, ilość na magazynie.',
    });
  }

  if (name.length > 100) {
    return res.status(400).json({ error: 'Nazwa produktu jest za długa (maksymalnie 100 znaków).' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ error: 'Opis produktu jest za długi (maksymalnie 500 znaków).' });
  }

  try {
    const { productId } = await addProduct({ name, categoryId, price, stock, description, imageUrl });
    res.status(201).json({ message: 'Produkt został pomyślnie dodany.', productId });
  } catch (err) {
    console.error('Błąd podczas dodawania produktu:', err.message);
    res.status(500).json({ error: 'Nie udało się dodać produktu. Spróbuj później.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID produktu jest wymagane.' });
  }

  if (name && name.length > 100) {
    return res.status(400).json({ error: 'Nazwa produktu jest za długa (maksymalnie 100 znaków).' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ error: 'Opis produktu jest za długi (maksymalnie 500 znaków).' });
  }

  try {
    await updateProduct(id, req.body);
    res.status(200).json({ message: 'Produkt został pomyślnie zaktualizowany.' });
  } catch (err) {
    console.error(`Błąd podczas aktualizowania produktu o ID ${id}:`, err.message);
    res.status(500).json({ error: 'Nie udało się zaktualizować produktu. Spróbuj później.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID produktu jest wymagane.' });
  }

  try {
    await deleteProduct(id);
    res.status(200).json({ message: 'Produkt został pomyślnie usunięty.' });
  } catch (err) {
    console.error(`Błąd podczas usuwania produktu o ID ${id}:`, err.message);
    res.status(500).json({ error: 'Nie udało się usunąć produktu. Spróbuj później.' });
  }
});

router.patch('/:id/discount', async (req, res) => {
  const { id } = req.params;
  const { discountPrice, discountUntil } = req.body;

  if (!discountPrice || !discountUntil) {
    return res.status(400).json({
      error: 'Wymagane pola: cena ze zniżką, data zakończenia zniżki.',
    });
  }

  try {
    await addDiscount(id, req.body);
    res.status(200).json({ message: 'Zniżka została pomyślnie dodana/zaktualizowana.' });
  } catch (err) {
    console.error(`Błąd podczas dodawania/aktualizowania zniżki dla produktu o ID ${id}:`, err.message);
    res.status(500).json({ error: 'Nie udało się zaktualizować zniżki. Spróbuj później.' });
  }
});

export default router;
