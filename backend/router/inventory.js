import express from "express";
import { checkAuthentication } from "../middleware/auth.js";
import {
	addProductInInventory,
	deleteProductFromInventory,
	getAllProductsFromInventory,
	updateProductInInventory,	
} from "../controllers/inventory.js";

const router = express.Router();

router.post("/add", checkAuthentication, addProductInInventory);
router.get("/all", checkAuthentication, getAllProductsFromInventory);

router
	.put("/:id", checkAuthentication, updateProductInInventory)
	.delete("/:id", checkAuthentication, deleteProductFromInventory);

export default router;
