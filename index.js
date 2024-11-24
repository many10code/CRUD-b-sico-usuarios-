const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes'); // Importar rutas de pedidos

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/empleados', empleadoRoutes);
app.use('/api/pedidos', pedidoRoutes); // Usar rutas de pedidos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
