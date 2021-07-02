const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const OrderSchema= new Schema({
    products: [  {_id: {type:Schema.Types.ObjectId , ref:"products"} ,quantity:{type:Number}}   ],
    total:{type:Number, required:true}
})

const OrdersModal= mongoose.model("orders",OrderSchema)

module.exports= OrdersModal;