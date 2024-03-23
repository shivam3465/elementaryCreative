import { Inventory } from "../models/inventory.js";

export const addProductInInventory = async (req, res) => {
	try {
		const { productName, productQuantity } = req.body;
		const { name } = req.user;
		const productFound = await Inventory.findOne({productName});

		if (productFound)
			return res
				.status(400)
				.json({ success: false, message: "Product is already added." });

		await Inventory.create({
			productName,
			productQuantity,
			addedOn: new Date(),
			addedBy: name,
		});

		res.status(201).json({
			success: true,
			message: "Product added successfully",
		});
	} catch (error) {
    console.log(error);
		res.status(400).json({ success: false, message: error.message});
	}
};

export const getAllProductsFromInventory = async (req, res) => {
  try {
    const { id } = req.user;
    const products = await Inventory.find({});
  
    res.status(200).json({
      success: true,
      message: "Products found successfully",
      result: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProductInInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName,productQuantity}=req.body;
  
    const product = await Inventory.findById(id);

    if(!product) {
      return res
				.status(400)
				.json({ success: false, message: "No product found to update" });
    }
  
    product.productName = productName;
    product.productQuantity = productQuantity;
    product.addedBy = req.user.name;
    product.addedOn = new Date();

    await product.save();
  
    res.status(200).json({
      success: true,
      message: "Products updated successfully"		
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProductFromInventory = async (req, res) => {
	try {
		const { id } = req.params;
		await Inventory.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
    console.log(error);
		res.status(400).json({
			success: false,
			message: "Not a valid product id",
		});
	}
};
