import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const nuevoCarrito = await CartModel.create({ products: [] });
    res.status(201).json({ status: 'success', cart: nuevoCarrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al crear carrito' });
  }
});

// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const carrito = await CartModel.findById(req.params.cid).populate('products.product');
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener carrito' });
  }
});

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const carrito = await CartModel.findById(cid);
    const producto = await ProductModel.findById(pid);

    if (!carrito || !producto) {
      return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    }

    const prodEnCarrito = carrito.products.find(p => p.product.toString() === pid);

    if (prodEnCarrito) {
      prodEnCarrito.quantity += 1;
    } else {
      carrito.products.push({ product: pid, quantity: 1 });
    }

    await carrito.save();
    res.json({ status: 'success', cart: carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
  }
});

// DELETE api/carts/:cid/products/:pid - Eliminar producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const carrito = await CartModel.findById(cid);

    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    carrito.products = carrito.products.filter(p => p.product.toString() !== pid);
    await carrito.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
  }
});

// PUT api/carts/:cid - Reemplazar todos los productos del carrito
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const carrito = await CartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    carrito.products = products;
    await carrito.save();

    res.json({ status: 'success', cart: carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar productos del carrito' });
  }
});

// PUT api/carts/:cid/products/:pid - Actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const carrito = await CartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    const producto = carrito.products.find(p => p.product.toString() === pid);
    if (!producto) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }

    producto.quantity = quantity;
    await carrito.save();

    res.json({ status: 'success', cart: carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar cantidad' });
  }
});

// DELETE api/carts/:cid - Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  try {
    const carrito = await CartModel.findById(req.params.cid);
    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    carrito.products = [];
    await carrito.save();

    res.json({ status: 'success', message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al vaciar carrito' });
  }
});

export default router;
