import 'dotenv/config'
import express from 'express'
import { dataSource } from './dataSource'
import router from './routes'
import { errorHandlerMiddleware } from './middlewares/error.middleware'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dataSource
  .initialize()
  .then(() => {
    console.log('db initialized')
  })
  .catch((err) => {
    console.error(err)
  })

const app = express()
app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: 'http://localhost:3006',
    optionsSuccessStatus: 200,
  }),
)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  next()
})
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', router)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
