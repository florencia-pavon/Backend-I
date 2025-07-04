import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor(relativePath) {
    this.path = path.resolve(__dirname, relativePath);
  }

  leerProductos() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  guardarProductos(productos) {
    fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
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
