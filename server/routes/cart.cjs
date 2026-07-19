const express = require('express');
const router = express.Router();

let cart = [];

router.post('/add', (req, res) => {
  const { productId, name, price } = req.body;

  cart.push({
    productId,
    name,
    price,
    quantity: 1
  });

  res.status(201).json({
    message: 'Product added to cart',
    cart
  });
});

router.delete('/remove/:productId', (req, res) => {
  const { productId } = req.params;

  cart = cart.filter(item => item.productId !== productId);

  res.json({
    message: 'Product removed from cart',
    cart
  });
});

router.get('/', (req, res) => {
  res.json(cart);
});

module.exports = router;