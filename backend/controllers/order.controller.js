import Order from "../models/order.model.js";

export const placeOrder = async(req,res)=>{
    try {
        const {buyer, items} = req.body;

        const createdOrder = await Order.create({buyer, items})

        if(!createdOrder){
            return res.json({
                success: false,
                message:"error while creating an order"
            });
        }
        res.status(201).json({
            success: true,
            message: "order created",
            createdOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error",
            error: error
        })
    }
}
export const getOrders = async(req,res)=>{
    try {
        const Orders = await Order.find()
        if(!Orders||Orders.length === 0){
            return res.status(404).json({
                success: false,
                message: "No order found!"
            })
        }
        res.json({
            success: true,
            Orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error",
            error: error
        })
    }
}
export const getOrder = async(req,res)=>{
    try {
        const { id } = req.params
        const anOrder = await Order.findById(id);
        if(!anOrder){
            return res.status(404).json({
                success: false,
                message: "No order found!"
            })
        }
        res.json({
            success: true,
            anOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error",
            error: error
        })
    }
}