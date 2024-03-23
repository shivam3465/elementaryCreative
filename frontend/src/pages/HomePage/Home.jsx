import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useDisclosure } from "@chakra-ui/react";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { InputModal } from "../../components/InputModal/InputModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const Home = () => {
	const [itemToBeDeleted, setItemToBeDeleted] = useState("");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productsUpdated, setProductsUpdated] = useState(false);

	const { VITE_BASE_URL } = import.meta.env;

	const [itemToBeAdded, setItemToBeAdded] = useState({});
	const [itemToBeUpdated, setItemToBeUpdated] = useState({});

	//for deleting a product from inventory
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure();

	//for adding the product in inventory
	const {
		isOpen: isAddModalOpen,
		onOpen: onAddModalOpen,
		onClose: onAddModalClose,
	} = useDisclosure();

	//for updating the product in inventory
	const {
		isOpen: isUpdateModalOpen,
		onOpen: onUpdateModalOpen,
		onClose: onUpdateModalClose,
	} = useDisclosure();

	const headers = [
		"Item Name",
		"Date Entered",
		"Entered By",
		"Quantity Available",
		"Actions",
	];

	const productKeys = [
		"productName",
		"addedOn",
		"addedBy",
		"productQuantity",
	];

	const handleDelete = (productName, id) => {
		setItemToBeDeleted({ productName, id });
		onDeleteModalOpen();
	};

	const deletionConfirmed = async () => {
		try {
			const { data } = await axios.delete(
				`${VITE_BASE_URL}/inventory/${itemToBeDeleted.id}`,
				{
					withCredentials: true,
				}
			);

			toast.success(data.message);
			setProductsUpdated(!productsUpdated);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
		onDeleteModalClose();
	};

	const handleAddItem = async () => {
		try {
			const { data } = await axios.post(
				`${VITE_BASE_URL}/inventory/add`,
				itemToBeAdded,
				{
					withCredentials: true,
				}
			);

			setProductsUpdated(!productsUpdated);
			toast.success("Product added in inventory successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
		onAddModalClose();
	};

	const handleUpdateItem = async () => {
		try {
			const { data } = await axios.put(
				`${VITE_BASE_URL}/inventory/${itemToBeUpdated._id}`,
				itemToBeUpdated,
				{
					withCredentials: true,
				}
			);

			setProductsUpdated(!productsUpdated);
			toast.success("Product added in inventory successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
		onUpdateModalClose();
	};

	useEffect(() => {
		const fetcher = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(
					`${VITE_BASE_URL}/inventory/all`,
					{
						withCredentials: true,
					}
				);

				setProducts(data.result);
				setLoading(false);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
				setLoading(false);
			}
		};
		fetcher();
	}, [productsUpdated]);

	return (
		<div className="relative max-w-screen-2xl m-auto px-8 2xl:px-2 ">
			<h2 className="font-bold my-6 text-[20px] text-center">
				Inventory Items
			</h2>

			{/* here rendering the inventoryItems */}
			<div className="border-[1px] border-gray-300 overflow-hidden rounded-md">
				<table className="w-full">
					<tbody>
						<tr className="bg-blue-100 ">
							{headers.map((header, i) => {
								return (
									<th
										className="text-start px-2 py-3 text-[18px]"
										key={i}>
										{header}
									</th>
								);
							})}
						</tr>

						{products.length === 0 ? (
							<tr>
								<td
									className="text-center font-medium py-4 text-[18px]"
									colSpan={5}>
									No products to show
								</td>
							</tr>
						) : (
							products.map((inventoryItem, i) => {
								return (
									<tr
										className="text-start bg-slate-50"
										key={i}>
										{Object.values(productKeys).map(
											(property, j) => {
												let value =
													inventoryItem[property];

												//checking for the field which is of date type and converting it to dd-MM-yyyy format
												if (property === "addedOn") {
													const date = new Date(
														value
													);
													value = `${date.getDate()}-${
														date.getMonth() + 1
													}-${date.getFullYear()}`;
												}

												return (
													<td
														className="p-2 text-[17px]"
														key={j}>
														{value}
													</td>
												);
											}
										)}
										<td className="p-2 flex justify-start items-center">
											<MdDelete
												onClick={() =>
													handleDelete(
														inventoryItem.productName,
														inventoryItem._id
													)
												}
												className="text-[23px] cursor-pointer active:scale-95 hover:text-gray-600 text-red-500 mr-4"
											/>
											<MdModeEdit
												onClick={()=>{
													setItemToBeUpdated(inventoryItem)
													onUpdateModalOpen()
												}}
												className="text-[23px] cursor-pointer active:scale-95 hover:text-gray-600 text-blue-500 mr-4"
											/>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* both of these modals will only be rendered when there displaying conditions are met which is controlled by onOpen function through buttons */}

			{/* for confirmation of deletion of product  */}
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={onDeleteModalClose}
				itemName={itemToBeDeleted.productName}
				onConfirmation={deletionConfirmed}
			/>

			{/* modal for adding product */}
			<InputModal
				isOpen={isAddModalOpen}
				onClose={onAddModalClose}
				onConfirmation={handleAddItem}
				setData={setItemToBeAdded}
			/>

			{/* modal for updating product */}
			<InputModal
				isOpen={isUpdateModalOpen}
				onClose={onUpdateModalClose}
				onConfirmation={handleUpdateItem}
				setData={setItemToBeUpdated}
				productToBeEdited={itemToBeUpdated}
			/>

			<div
				className="fixed cursor-pointer active:scale-95 flex items-center justify-start bottom-8 right-12 bg-blue-500 text-white p-4 rounded-lg min-w-[160px]"
				onClick={onAddModalOpen}>
				<div className="text-[19px]">Add Item </div>
				<FaPlus className="text-white ml-[6px] text-[20px]" />
			</div>

			{loading && <Loader />}
		</div>
	);
};

export default Home;
