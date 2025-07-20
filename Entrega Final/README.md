# 🚀 Entrega Final - Backend | Coderhouse

Este proyecto es una aplicación de servidor construida con Node.js y Express, que permite gestionar productos y carritos utilizando una base de datos MongoDB Atlas. Incluye funcionalidades en tiempo real mediante WebSockets, vistas dinámicas con Handlebars y operaciones CRUD completas.

---

## 🛠 Tecnologías utilizadas

- 🟢 Node.js
- ⚙️ Express
- 🧩 MongoDB Atlas + Mongoose
- 🔌 WebSockets (Socket.io)
- 🧠 Mongoose Paginate v2
- 💡 Handlebars (Views)
- 🧪 Dotenv
- 🎨 Bootstrap

---

## 🔗 Endpoints

### 📦 Productos

- `GET /api/products`  
  Consulta todos los productos con soporte de:
  - `?limit=10` (elementos por página)
  - `?page=2` (número de página)
  - `?query=categoryName` (filtrar por categoría o disponibilidad)
  - `?sort=asc|desc` (ordenar por precio ascendente/descendente)

- `GET /api/products/:pid`  
  Obtener un producto específico por ID.

- `POST /api/products`  
  Crear un nuevo producto.

- `PUT /api/products/:pid`  
  Actualizar un producto por ID.

- `DELETE /api/products/:pid`  
  Eliminar un producto por ID.

---

### 🛒 Carritos

- `POST /api/carts`  
  Crear un carrito vacío.

- `GET /api/carts/:cid`  
  Obtener los productos de un carrito (con `populate` de los productos reales).

- `POST /api/carts/:cid/product/:pid`  
  Agregar un producto al carrito (incrementa cantidad si ya existe).

- `PUT /api/carts/:cid`  
  Reemplazar todos los productos del carrito.

- `PUT /api/carts/:cid/products/:pid`  
  Actualizar cantidad de un producto específico del carrito.

- `DELETE /api/carts/:cid/products/:pid`  
  Eliminar un producto específico del carrito.

- `DELETE /api/carts/:cid`  
  Vaciar todo el carrito.

---

## 👁️‍🗨️ Vistas (Handlebars)

- `/`  
  Muestra todos los productos (vista home con filtros y paginación).

- `/realtimeproducts`  
  Lista de productos en tiempo real (actualización instantánea con WebSocket).

- `/products/:pid`  
  Detalle completo de un producto con opción de agregar al carrito.

- `/carts/:cid`  
  Detalle de un carrito con los productos agregados.

---

## 🧪 Test con Postman

### Crear un producto
- Método: `POST`
- URL: `http://localhost:8080/api/products`
- Body (JSON):
```json
{
  "title": "Brownie",
  "description": "Chocolate intenso",
  "code": "B001",
  "price": 1500,
  "stock": 25,
  "category": "cakes",
  "thumbnails": ["multimedia/cakes/brownie.jpg"]
}
