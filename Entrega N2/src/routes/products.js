import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('../data/products.json');

router.get('/', (req, res) => {
  const productos = productManager.getProducts();
  res.json(productos);
});


router.get('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = productManager.getProductById(id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});


router.post('/', (req, res) => {
  const nuevoProducto = productManager.addProduct(req.body);
  const productosActualizados = productManager.getProducts();
  req.app.locals.io.emit('productosActualizados', productosActualizados);

  res.status(201).json(nuevoProducto);
});

router.delete('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.deleteProduct(id);

  req.app.locals.io.emit('productoEliminado', productManager.getProducts());

  res.json({ mensaje: 'Producto eliminado' });
});

export default router;
