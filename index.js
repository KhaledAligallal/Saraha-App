import express from 'express'
import userRouter from './src/modules/User/user,routes.js'
import messageRouter from './src/modules/message/message,routes.js'
import db_connection from './DB/connection.js'
import { config } from 'dotenv'
config()
const app = express()
const port = process.env.PORT


app.use(express.json())
app.use (userRouter)
app.use(messageRouter)
db_connection()


app.listen(port,()=>{console.log('server is running')})
