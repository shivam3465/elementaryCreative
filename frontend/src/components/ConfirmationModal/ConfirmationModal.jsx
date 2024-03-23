import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,	
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

function ConfirmationModal({
	isOpen,	
	onClose,
	onConfirmation,
	itemName,
}) {
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					Are you sure want to delete this item ?
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<div className="p-4">
						<div className="mb-6 font-bold text-lg">{itemName}</div>

						<button
							onClick={onConfirmation}
							className="cursor-pointer active:scale-95  bg-blue-500 text-white px-4 min-w-[80px] py-2 rounded-lg mr-8 ">
							Yes
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
}

export { ConfirmationModal };
