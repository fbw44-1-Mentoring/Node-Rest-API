const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema= new Schema({
    itemname:{type:String, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true}
})


const ProductsModal= mongoose.model("products", ProductSchema)

module.exports= ProductsModal;