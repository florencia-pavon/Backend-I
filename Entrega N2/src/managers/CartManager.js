import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartManager {
  constructor(relativePath) {
    this.path = path.resolve(__dirname, relativePath);
  }

  leerCarts() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  getCartById(id) {
    const carritos = this.leerCarts();
    return carritos.find(c => c.id.toString() === id.toString());
  }

  addProductToCart(cid, pid) {
    const carritos = this.leerCarritos();
    const carrito = carritos.find(c => c.id === cid);

    if (carrito) {
      const productoEnCarrito = carrito.products.find(p => p.product === pid);

      if (productoEnCarrito) {
        productoEnCarrito.quantity++;
      } else {
        carrito.products.push({ product: pid, quantity: 1 });
      }

      this.guardarCarritos(carritos);
      return carrito;
    }

    return null;
  }
}

export default CartManager;
