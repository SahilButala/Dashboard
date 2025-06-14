import express from 'express'
import dotenv from 'dotenv'
import Db_Connection from './db/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRoute from './routes/userView/auth/User_route.js'
import ProductRouter from './routes/Product.js'



dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// db connection  
Db_Connection()

// middlewares
app.use(cookieParser())
app.use(express.json()) 
app.use(cors({
       origin : "http://localhost:5173",
       methods : ['GET','POST','DELETE','PUT'],
       allowedHeaders : [
        'Content-Type' , 
        'Authorization',
        'Catche-Control',
        'Expires',
        'Pragma'
       ],
       credentials : true
}))

// routes
app.use('/user/auth',UserRoute)
app.use('/products',ProductRouter)


app.get('/',(req,res)=>{
      res.send("hello server is ready")
})
app.listen(PORT,()=>{

    console.log(`server running at ${PORT}`)
})