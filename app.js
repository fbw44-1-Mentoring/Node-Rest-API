const express = require("express")
const UsersRoutes= require("./routes/usersRoutes")
const ProductsRoutes= require("./routes/productsRoutes")
const OrdersRoutes= require("./routes/ordersRoutes")
const app = express()
const PORT = process.env.PORT || 4000;
const cors = require("cors")
//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//use cors middleware
app.use(cors({origin:"http://localhost:3000",exposedHeaders:"code"}))

//mongoose Connection
const mongoose= require("mongoose")
mongoose.connect(
    "mongodb://127.0.0.1:27017", 
    {dbName:"fbw44-1-fullstack-app",useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true}, 
    ()=>console.log("connection mongoDB established") )


app.use("/users", UsersRoutes)
app.use("/products",ProductsRoutes)
app.use("/orders", OrdersRoutes)

//MVC
//MODAL ...database
//VIEW ....FrontEnd
//CONTROLLERS ... Routes Handler

app.get("/",(req,res,next)=>{
    res.send("Hi from express server")
})





app.listen(PORT, ()=>console.log("server is running on ",PORT))