const { Router } = require('express');
const router = Router();
const { getProducts, createProduct, getProduct, deleteProduct, updateProduct, getTypeProducts } = require('../controllers/products.controller');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct);

router.route('/search/:type')
    .get(getTypeProducts)

module.exports = router;