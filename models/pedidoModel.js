const pool = require('../config/db');

class Pedido {
    static async obtenerPedidos() {
        try {
            const query = 'SELECT * FROM pedidos';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            throw error;
        }
    }

    static async insertarPedido(data) {
        const { id_cliente, fecha_recogida, hora_recogida, total, qr_code, estado_pedido } = data;
        try {
            const query = `
                INSERT INTO pedidos (id_cliente, fecha_recogida, hora_recogida, total, qr_code, estado_pedido)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *`;
            const { rows } = await pool.query(query, [id_cliente, fecha_recogida, hora_recogida, total, qr_code, estado_pedido]);
            return {
                mensaje: 'Pedido registrado exitosamente.',
                pedido: rows[0]
            };
        } catch (error) {
            console.error('Error al insertar pedido:', error);
            throw error;
        }
    }

    static async actualizarPedido(id_pedido, data) {
        const { fecha_recogida, hora_recogida, total, qr_code, estado_pedido } = data;
        try {
            const query = `
                UPDATE pedidos
                SET fecha_recogida = $1, hora_recogida = $2, total = $3, qr_code = $4, estado_pedido = $5
                WHERE id_pedido = $6
                RETURNING *`;
            const { rows } = await pool.query(query, [fecha_recogida, hora_recogida, total, qr_code, estado_pedido, id_pedido]);
            if (rows.length === 0) {
                return null;
            }
            return {
                mensaje: 'Pedido actualizado exitosamente.',
                pedido: rows[0]
            };
        } catch (error) {
            console.error('Error al actualizar pedido:', error);
            throw error;
        }
    }

    static async eliminarPedido(id_pedido) {
        try {
            const query = 'DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *';
            const { rows } = await pool.query(query, [id_pedido]);
            if (rows.length === 0) {
                return null;
            }
            return {
                mensaje: 'Pedido eliminado exitosamente.'
            };
        } catch (error) {
            console.error('Error al eliminar pedido:', error);
            throw error;
        }
    }

    static async obtenerDetallePedido(id_pedido) {
        try {
            const query = `
                SELECT 
                    
                    p.fecha_recogida, 
                    p.hora_recogida, 
                    p.total, 
                    p.qr_code, 
                    p.estado_pedido, 
                    c.nombre AS cliente_nombre, 
                    c.apellidos AS cliente_apellidos,
                    c.correo AS cliente_correo,
                    c.direccion AS cliente_direccion,
                    pr.nombre AS producto_nombre,
                    pr.precio AS producto_precio,
                    pp.cantidad
                FROM 
                    pedidos p
                JOIN 
                    clientes c ON p.id_cliente = c.id_cliente
                JOIN 
                    productos_pedido pp ON p.id_pedido = pp.id_pedido
                JOIN 
                    productos pr ON pp.id_producto = pr.id_producto
                WHERE 
                    p.id_pedido = $1;
            `;
            const { rows } = await pool.query(query, [id_pedido]);
            return rows;
        } catch (error) {
            console.error('Error al obtener el detalle del pedido:', error);
            throw error;
        }
    }
}

module.exports = Pedido;

