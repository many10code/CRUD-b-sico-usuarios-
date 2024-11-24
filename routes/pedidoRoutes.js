const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Definir rutas para obtener, crear, actualizar y eliminar pedidos
router.get('/', pedidoController.obtenerPedidos);
router.post('/', pedidoController.insertarPedido);
router.put('/:id', pedidoController.actualizarPedido);
router.delete('/:id', pedidoController.eliminarPedido);

router.get('/:id/detalle', pedidoController.obtenerDetallePedido);

module.exports = router;
