import express from 'express';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from '../db/queries/categories.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error('Błąd podczas pobierania kategorii:', err.message);
    res.status(500).json({ error: 'Nie udało się pobrać kategorii' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Nazwa kategorii jest wymagana' });
  }

  try {
    const category = await addCategory(name.trim());
    res.status(201).json({ message: 'Kategoria została pomyślnie dodana', category });
  } catch (err) {
    console.error('Błąd podczas dodawania kategorii:', err.message);
    res.status(400).json({ error: err.message || 'Nie udało się dodać kategorii' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Nazwa kategorii jest wymagana' });
  }

  try {
    const updatedCategory = await updateCategory(id, name.trim());
    res.status(200).json({ message: 'Kategoria została pomyślnie zaktualizowana', updatedCategory });
  } catch (err) {
    console.error('Błąd podczas aktualizowania kategorii:', err.message);
    res.status(400).json({ error: err.message || 'Nie udało się zaktualizować kategorii' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategory(id);
    res.status(200).json({ message: 'Kategoria została pomyślnie usunięta', deletedCategory });
  } catch (err) {
    console.error('Błąd podczas usuwania kategorii:', err.message);
    res.status(400).json({ error: err.message || 'Nie udało się usunąć kategorii' });
  }
});

export default router;
