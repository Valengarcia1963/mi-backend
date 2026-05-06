require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

const logger       = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(logger);

const productRoutes = require('./routes/productRoutes');
const healthRoutes  = require('./routes/healthRoutes');

app.use('/health',        healthRoutes);
app.use('/api/productos', productRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'mi-microservicio', version: '2.0.0' });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, message: 'Ruta no encontrada' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
