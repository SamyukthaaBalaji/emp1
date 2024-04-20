const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:b2cB*ff15*456dfDb-EE*5e2cC3e-1f6@roundhouse.proxy.rlwy.net:26878/railway",
});

module.exports = pool;
