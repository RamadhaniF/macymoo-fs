const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');

// max kecil karena serverless: tiap instance Vercel membuat pool sendiri
module.exports = new Pool({
  connectionString: databaseUrl,
  max: 3,
  ssl: { rejectUnauthorized: false },
});