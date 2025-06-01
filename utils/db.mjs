import * as pg from "pg";
const { Pool } = pg.default;
import 'dotenv/config'

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default connectionPool;