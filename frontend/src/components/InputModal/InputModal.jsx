import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

import InputBar from "../InputBar/InputBar";

const InputModal = ({
	isOpen,
	onClose,
	onConfirmation,
	setData,
	productToBeEdited,
}) => {
	const handleInputChange = (key, value) => {
		setData((data) => {
			return { ...data, [key]: value };
		});
	};

	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add new Item</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<div className="p-4">
						{/* input containers */}
						<div className="mb-6 font-bold text-lg">
							<InputBar
								label={"Product Name:"}
								id={"productName"}
								placeholder={"Enter Product Name"}
								handlechange={handleInputChange}
								value={productToBeEdited?.productName}
							/>

							<InputBar
								label={"Product quantity:"}
								id={"productQuantity"}
								inputType={"number"}
								placeholder={"Enter Product Quantity"}
								handlechange={handleInputChange}
								value={productToBeEdited?.productQuantity}
							/>
						</div>

						<button
							onClick={onConfirmation}
							className="cursor-pointer active:scale-95  bg-blue-500 text-white px-4 min-w-[80px] py-2 rounded-lg mr-8 ">
							{productToBeEdited ? "Update " : "Add"}
						</button>
						<button
							className="cursor-pointer active:scale-95 min-w-[80px]  bg-gray-200 px-4 py-2 rounded-lg "
							onClick={onClose}>
							Cancel
						</button>
					</div>
				</ModalBody>
				{/* <ModalFooter>
					</ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

export { InputModal };
