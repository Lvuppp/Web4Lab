import { DataSource } from 'typeorm'
import 'dotenv/config'
import * as path from 'path'

export const dataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  entities: [path.resolve(__dirname, 'entities', '*.entity{.ts,.js}')],
  synchronize: true,
})
