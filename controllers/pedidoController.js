const { response } = require('express');
const Pedido = require('../models/pedidoModel');

class PedidoController {

    static async obtenerPedidos(req, res) {
        try {
            const pedidos = await Pedido.obtenerPedidos();
            res.json(pedidos);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({ mensaje: 'Error en el servidor.' });
        }
    }

    static async insertarPedido(req, res) {
        try {
            const resultado = await Pedido.insertarPedido(req.body);
            
            if (resultado.error) {
                return res.status(400).json({ mensaje: resultado.error });
            }
            
            res.status(201).json(resultado);
        } catch (error) {
            console.error('Error al insertar pedido:', error);
            res.status(500).json({ mensaje: 'Error al insertar pedido.', error: error.message });
        }
    }

    static async actualizarPedido(req, res) {
        const { id_pedido } = req.params;
        const data = req.body;

        try {
            const resultado = await Pedido.actualizarPedido(id_pedido, data);

            if (!resultado) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
            }

            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al actualizar pedido:', error);
            res.status(500).json({ mensaje: 'Error al actualizar pedido.', error: error.message });
        }
    }

    static async eliminarPedido(req, res) {
        const { id_pedido } = req.params;

        try {
            const resultado = await Pedido.eliminarPedido(id_pedido);
            if (!resultado) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
            }
            
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al eliminar pedido:', error);
            res.status(500).json({ mensaje: 'Error al eliminar pedido.', error: error.message });
        }
    }

    // Agregar el método para obtener el detalle del pedido
    static async obtenerDetallePedido(req, res) {
        const { id } = req.params;
        try {
            const detallePedido = await Pedido.obtenerDetallePedido(id);
            if (detallePedido.length === 0) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            }
            res.status(200).json(detallePedido);
        } catch (error) {
            console.error('Error al obtener el detalle del pedido:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    }
}

module.exports = PedidoController;


