const express = require("express")
const Router = express.Router()
const {getAllOrders, addNewOrder} = require("../controllers/ordersControllers")

//get All Order
Router.get("/",getAllOrders )

//post order ,add new order
Router.post("/",addNewOrder )





module.exports= Router;