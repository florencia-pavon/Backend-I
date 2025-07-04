# 🚀 Entrega N°2 - Backend Coderhouse

Este proyecto amplía la funcionalidad del servidor en Node.js con Express, integrando vistas dinámicas con Handlebars y actualizaciones en tiempo real mediante WebSockets. Se pueden visualizar productos y añadir nuevos con efecto inmediato para todos los usuarios conectados 🔁.

## 🧰 Tecnologías utilizadas

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🔧 **Express-Handlebars**
- 🔄 **Socket.io**
- 🗂️ **File System (fs)**
- 🌐 **HTML/CSS**
- 🎨 **Bootstrap 5**


### 🏠 Home
- `GET /`  
  Muestra todos los productos disponibles renderizados con Handlebars.

### 🧪 RealTimeProducts
- `GET y POST /realtimeproducts`  
  Renderiza productos y un formulario para crear nuevos.  
  Cuando se agrega un producto:
  - Se guarda en `products.json` 💾
  - Todos los clientes ven la actualización **en tiempo real** ⚡

## 🔗 Endpoints

### 📦 Productos

- `GET /api/products`
- `GET /api/products/:pid`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`

### 🛒 Carritos

- `POST /api/carts`
- `GET /api/carts/:cid`
- `POST /api/carts/:cid/product/:pid`

## 🖼️ Imágenes de productos

Las imágenes están alojadas en la carpeta pública:  
📁 `/public/multimedia`  
Se accede desde las vistas usando rutas como:  
📸 `/multimedia/cookies/brownie.jpg`

---

💡 Este proyecto demuestra cómo combinar una API REST con vistas dinámicas y tiempo real en un entorno full stack básico.

