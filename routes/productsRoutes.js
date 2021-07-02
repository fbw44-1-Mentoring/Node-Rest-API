const express= require("express")
const Router = express.Router()
const ProductsModal = require("../modals/ProductsModal")
const jwt = require("jsonwebtoken")
//get route to get all products
Router.get("/", async (req,res,next)=>{
            try{
                let code = req.header("code")
                
                let decodedToken= jwt.verify(code, "naqvi")

                if(decodedToken){
                          const products= await ProductsModal.find({})
                        res.send({success:true, products:products})
                }else{
                    res.status(403).send({success:false, message:"authorized access"})
                }
          
            }
            catch(err){
                console.log(err.message)
            }
    })

//post route to add new product into DB
Router.post("/", async(req,res,next)=>{
    try{
        const product = new ProductsModal(req.body)
        await product.save()
        res.send({success:true, product:product})
    }
    catch(err){
        console.log(err.message)
    }
})





module.exports= Router;