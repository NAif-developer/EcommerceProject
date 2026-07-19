const express = require('express');
const router = express.Router();

let wishlist = [];

router.post('/add', (req, res) => {
  const { productId, name, price } = req.body;

  wishlist.push({
    productId,
    name,
    price
  });

  res.json({
    message: 'Product added to wishlist',
    wishlist
  });
});

router.delete('/remove/:productId', (req, res) => {
  const { productId } = req.params;

  wishlist = wishlist.filter(
    item => item.productId !== productId
  );

  res.json({
    message: 'Product removed from wishlist',
    wishlist
  });
});

router.get('/', (req, res) => {
  res.json(wishlist);
});

module.exports = router;
