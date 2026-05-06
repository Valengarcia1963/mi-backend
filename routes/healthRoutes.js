const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const start = Date.now();
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()) + 's',
      database: { status: 'ok', latency: (Date.now() - start) + 'ms' },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: { status: 'unreachable', error: error.message },
    });
  }
});

module.exports = router;
