const pool = require('../config/db'); // Importa la configuración de la base de datos

class Cliente {
    static async obtenerClientePorCorreo(correo) {
        const query = 'SELECT * FROM clientes WHERE correo = $1';
        const values = [correo];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    constructor({ nombre, apellidos, correo, contrasena }) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    async save() {
        const query = `
            INSERT INTO clientes (nombre, apellidos, correo, contrasena)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            this.nombre,
            this.apellidos,
            this.correo,
            this.contrasena,
        ];
        const result = await pool.query(query, values);
        this.id_cliente = result.rows[0].id_cliente;
    }
}

module.exports = Cliente;