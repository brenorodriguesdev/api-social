
import * as dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import app from './app'
import './routes'

dotenv.config()

createConnection({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_SERVER,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [String(process.env.DATABASE_ENTITIES)]
}).then((_) => app.listen(process.env.PORT || 4000))
