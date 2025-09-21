import Store from "../models/store.model.js";
import User from "../models/user.model.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    if (!stores || stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No store found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "all stores",
      stores,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, owner } = req.body;

    const createdStore = await Store.create({ name, owner });
    if (!createdStore) {
      return res.json({
        success: false,
        message: "Error while creating store",
      });
    }
    res.json({
      success: true,
      message: "store created successfully",
      store: createdStore,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};
export const getStore = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await User.find({_id: id})
    const store = await Store.find({ owner: id });
    if (!store || store.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No store found!",
      });
    }
    res.status(200).json({
      success: true,
      store: {
        name: store.name,
        ownerId:store.ownerId,
        owner: owner.name
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStore = await Store.deleteOne(id);
    if (!deletedStore) {
      return json.status(404).json({
        success: false,
        message: "no store found to delete",
      });
    }
    res.json({
      success: true,
      message: "store deleted successfully",
      store: deletedStore,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};
