import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');


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
  const nuevoProducto = req.body;
  const productoAgregado = productManager.addProduct(nuevoProducto);
  res.status(201).json(productoAgregado);
});


router.put('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const nuevosDatos = req.body;
  const productoActualizado = productManager.updateProduct(id, nuevosDatos);

  if (productoActualizado) {
    res.json(productoActualizado);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});


router.delete('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.deleteProduct(id);
  res.json({ mensaje: 'Producto eliminado' });
});

export default router;
