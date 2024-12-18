import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'elsa-admin',
  password: process.env.DATABASE_PASSWORD || 'qwerty123',
  database: process.env.DATABASE_NAME || 'quiz_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  // logging: process.env.DATABASE_LOG || false,
  logging: true,
  
  synchronize: false,
  ssl:
    process.env.NODE_ENV !== 'development'
      ? {
          ca: readFileSync(
            join(__dirname, '../assets/ssl-global-bundle.pem'),
          ).toString(),
        }
      : false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
