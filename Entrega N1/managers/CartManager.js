import { existsSync, readFileSync, writeFileSync } from 'fs';

class CartManager {
  constructor(ruta) {
    this.ruta = ruta;
  }

  leerCarritos() {
    if (existsSync(this.ruta)) {
      const contenido = readFileSync(this.ruta, 'utf-8');
      return JSON.parse(contenido);
    } else {
      return [];
    }
  }

  guardarCarritos(carritos) {
    writeFileSync(this.ruta, JSON.stringify(carritos, null, 2));
  }

  createCart() {
    const carritos = this.leerCarritos();

    const nuevoCarrito = {
      id: carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1,
      products: []
    };

    carritos.push(nuevoCarrito);
    this.guardarCarritos(carritos);

    return nuevoCarrito;
  }

  getCartById(id) {
    const carritos = this.leerCarritos();
    return carritos.find(c => c.id === id);
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
