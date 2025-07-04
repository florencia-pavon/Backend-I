import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import ProductManager from './managers/ProductManager.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productManager = new ProductManager('../data/products.json');

const app = express();
const PORT = 8080;

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', viewsRouter); // renderiza home y realtimeproducts
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servidor HTTP y WebSocket
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const io = new Server(httpServer);
app.locals.io = io;
io.on('connection', socket => {
  socket.on('nuevoProducto', data => {
    productManager.addProduct(data);
    const productos = productManager.getProducts();
    io.emit('productosActualizados', productos);
  });
});
