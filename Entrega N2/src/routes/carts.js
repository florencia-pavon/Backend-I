import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const cartManager = new CartManager('../data/carts.json');
const productManager = new ProductManager('../data/products.json');


router.post('/', (req, res) => {
  const nuevoCarrito = cartManager.createCart();
  res.status(201).json(nuevoCarrito);
});

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const carrito = cartManager.getCartById(cid);
  
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
    const productosConDetalle = carrito.products.map(p => {
      const productoReal = productManager.getProductById(p.product);
  
      if (productoReal) {
        return {
          ...productoReal,
          quantity: p.quantity
        };
      } else {
        return {
          id: p.product,
          mensaje: 'Producto no encontrado',
          quantity: p.quantity
        };
      }
    });
  
    res.json({
      id: carrito.id,
      products: productosConDetalle
    });
  });


router.post('/:cid/product/:pid', (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const carritoActualizado = cartManager.addProductToCart(cid, pid);

  if (carritoActualizado) {
    res.json(carritoActualizado);
  } else {
    res.status(404).json({ mensaje: 'Carrito no encontrado' });
  }
});

export default router;
