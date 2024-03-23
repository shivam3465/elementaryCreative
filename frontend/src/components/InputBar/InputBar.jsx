import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const InputBar = ({
	label,
	id,
	placeholder,
	handlechange,
	inputType,
	bgColor,
	value
}) => {
	const [showEye, setShowEye] = useState(false);
    const [currentInput,setCurrentInput] = useState(inputType || "text");

    const toggleInputType = ()=>{
        setShowEye(!showEye);
        if(inputType === "password"){
            setCurrentInput(
                showEye ? "password": "text"
            )
        }
    }

	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="font-bold text-[18px]">
				{label}
			</label>
			<div className="relative">
				<input
					type={ currentInput}
					id={id}
					className={`w-full border-[2px] border-gray-300 py-[3px] px-2 my-2 rounded-md font-normal outline-none ${
						bgColor || "bg-white"
					}`}
					placeholder={placeholder}
					onChange={(e) => handlechange(id, e.target.value)}
					defaultValue={value || ""}
				/>
				{inputType === "password" && (
					<>
						{showEye ? (
							<FaEye className="absolute right-[12px] bottom-4" onClick={toggleInputType} />
						) : (
							<FaEyeSlash className="absolute right-[12px] bottom-4" onClick={toggleInputType} />
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default InputBar;
