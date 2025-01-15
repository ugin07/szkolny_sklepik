import express from 'express';

const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/', (req, res) => {
  const { productId, quantity, productName, price } = req.body;

  if (!productId || !quantity || !productName || !price) {
    return res.status(400).json({ error: 'Nieprawidłowe dane' });
  }

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, productName, price, quantity });
  }

  res.status(201).json(cart);
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;

  cart = cart.filter((item) => item.productId !== parseInt(productId, 10));

  res.status(200).json(cart);
});

router.delete('/', (req, res) => {
  cart = [];
  res.status(200).json({ message: 'Koszyk został opróżniony' });
});

export default router;
