const ProductModel = require('../models/productModel');

const productController = {
  async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json({ ok: true, total: products.length, data: products });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al obtener productos' });
    }
  },
  async getById(req, res) {
    try {
      const product = await ProductModel.getById(req
