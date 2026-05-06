const pool = require('../config/database');

const ProductModel = {
  async getAll() {
    const result = await pool.query(`
      SELECT p.*, c.nombre AS categoria
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  },
  async getById(id) {
    const result = await pool.query(`
      SELECT p.*, c.nombre AS categoria
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  },
  async create({ nombre, descripcion, precio, stock, category_id }) {
    const result = await pool.query(
      `INSERT INTO products (nombre, descripcion, precio, stock, category_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, precio, stock, category_id]
    );
    return result.rows[0];
  },
  async update(id, { nombre, descripcion, precio, stock, category_id }) {
    const result = await pool.query(
      `UPDATE products SET nombre=$1, descripcion=$2, precio=$3,
       stock=$4, category_id=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [nombre, descripcion, precio, stock, category_id, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
  },
};

module.exports = ProductModel;
