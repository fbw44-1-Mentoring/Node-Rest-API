
const OrdersModal = require("../modals/OrdersModal")
const ProductsModal = require("../modals/ProductsModal")

exports.getAllOrders= async (req,res,next)=>{
    try{
        const orders= await OrdersModal.find({})
        res.send({success:true, orders:orders})
    }
    catch(err){
        console.log(err.message)
    }
}

exports.addNewOrder = async (req,res,next)=>{
    try{
        req.body.products.map(product=>{
          ProductsModal.findById(product._id).then((item)=>{
              if(item.quantity - product.quantity<0){
                  return res.send({success:false, message: `we only have ${item.quantity}`})
              }
                item.quantity= item.quantity - product.quantity
                item.save()
            }).catch(err=>console.log(err.message))
        })
        

        const order= new OrdersModal(req.body)
        await order.save()
        return res.send({success:true, order:order})


       /*  const product= await ProductsModal.findOne({itemname:req.body.itemname})
        
        if(product.quantity - req.body.quantity<0){
            return res.status(400).send({success:false, message: `only ${product.quantity} left`})
        } */

     /*    product.quantity= product.quantity - req.body.quantity; 
        await product.save() */

    }
    catch(err){
        console.log(err.message)
    }
}

/* module.exports= {getAllOrder, addNewOrder} */