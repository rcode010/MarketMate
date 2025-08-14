import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
},{timestamps: true});

const Order = mongoose.model('Order', orderSchema);

export default Order
