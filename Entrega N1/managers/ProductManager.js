import { existsSync, readFileSync, writeFileSync } from 'fs';

class ProductManager {
  constructor(ruta) {
    this.ruta = ruta;
  }

  leerProductos() {
    if (existsSync(this.ruta)) {
      const contenido = readFileSync(this.ruta, 'utf-8');
      return JSON.parse(contenido);
    } else {
      return [];
    }
  }

  guardarProductos(productos) {
    writeFileSync(this.ruta, JSON.stringify(productos, null, 2));
  }

  getProducts() {
    return this.leerProductos();
  }

  getProductById(id) {
    const productos = this.leerProductos();
    return productos.find(p => p.id === id);
  }

  addProduct(producto) {
    const productos = this.leerProductos();

    producto.id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    productos.push(producto);

    this.guardarProductos(productos);
    return producto;
  }

  updateProduct(id, nuevosDatos) {
    const productos = this.leerProductos();
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1) {
      productos[index] = { ...productos[index], ...nuevosDatos, id };
      this.guardarProductos(productos);
      return productos[index];
    }

    return null;
  }

  deleteProduct(id) {
    const productos = this.leerProductos();
    const nuevosProductos = productos.filter(p => p.id !== id);
    this.guardarProductos(nuevosProductos);
  }
}

export default ProductManager;
