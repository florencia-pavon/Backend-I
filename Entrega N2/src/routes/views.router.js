import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('../data/products.json');

router.get('/', (req, res) => {
  const productos = productManager.getProducts();
  res.render('home', { title: 'Home', productos });
});

router.get('/realtimeproducts', (req, res) => {
  const productos = productManager.getProducts();
  res.render('realTimeProducts', { title: 'Tiempo Real', productos });
});

export default router;
