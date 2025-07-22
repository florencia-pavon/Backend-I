import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import CartModel from '../models/cart.model.js';

const router = Router();

// Vista Home con todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await ProductModel.find().lean();
    res.render('home', { title: 'Home', productos });
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
});

// Vista RealTimeProducts con WebSocket
router.get('/realtimeproducts', async (req, res) => {
  try {
    const productos = await ProductModel.find().lean();
    res.render('realTimeProducts', { title: 'Tiempo Real', productos });
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
});

// Vista detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).lean();

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const cart = await CartModel.findOne();
    const cartId = cart?._id?.toString() || '';

    res.render('productDetail', {
      title: 'Detalle del producto',
      product,
      cartId
    });

  } catch (error) {
    res.status(500).send('Error al obtener el producto');
  }
});

// Vista detalle de carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate('products.product').lean();

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    res.render('cartDetail', {
      title: 'Carrito',
      cart
    });
  } catch (error) {
    res.status(500).send('Error al obtener el carrito');
  }
});

export default router;
