import express, { json } from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();

app.use(json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Productos y Carritos de Florencia Pavon!');
}
);
