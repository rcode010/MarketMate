import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name:{
        type:String, 
        required: [true,"Name is requried"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"]
    },
    isActive: {
        type: Boolean,
        default:true
    }
},{timestamps: true})

const Store = mongoose.model("Store", storeSchema)

export default Store;