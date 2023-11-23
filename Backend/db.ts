import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    user: process.env.PGUSER,
    password: process.env.POSTGRES_PASSWORD,
});


export default pool;