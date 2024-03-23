import { Link, Navigate, useNavigate } from "react-router-dom";
import InputBar from "../../components/InputBar/InputBar";
import { useContext, useState } from "react";
import { validateEmailId } from "../../utils/validateEmail";
import { toast } from "react-toastify";
import axios from "axios";
import { userContext } from "../../context/UserContext";
import Loader from "../../components/Loader/Loader";

const Register = () => {
	const { user, setUser } = useContext(userContext);

	const [userData, setUserData] = useState({});
	const [loading,setLoading] = useState(false);

	const { VITE_BASE_URL } = import.meta.env;

	const navigate = useNavigate();

	const handleInputChange = (key, value) => {
		setUserData((userData) => {
			return { ...userData, [key]: value };
		});
	};

	const handleRegister = async (e) => {
		if (!validateEmailId(userData.email)) {
			toast.error("Invalid email address");
			return;
		}
		if (!userData.name) {
			toast.error("Please enter your name");
			return;
		}
		if (!userData.password) {
			toast.error("Please enter a password");
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.post(
				`${VITE_BASE_URL}/user/register`,
				userData,
				{ withCredentials: true }
			);

			if (data?.user) {
				setUser(data.user);
				navigate("/");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			// Check if the error has a response and extract data from it
			if (error.response && error.response.data) {
				const { data } = error.response;
				console.log("Error response data: ", data);
				if (!data.success) {
					// Handle the error message from the server
					toast.error(data.message);
				} else {
					// Handle other server errors
					toast.error("An error occurred");
				}
			} else {
				console.log("Error: ", error);
				toast.error("An error occurred");
			}
		}
		setLoading(false);
	};

	if (user) return <Navigate to={"/"} />;

	return (
		<div className="max-w-screen-2xl m-auto flex items-center justify-center h-screen bg-blue-50">
			{/* main container  */}
			<div className="relative border-2 bg-white border-gray-300 p-4 rounded-md w-[500px]">
				<h2 className="font-bold my-6 text-center text-[20px]">
					Register to Inventory Manager
				</h2>
				<InputBar
					label={"Name"}
					id={"name"}
					inputType={"text"}
					placeholder={"Enter Name"}
					handlechange={handleInputChange}
					bgColor={"bg-blue-50"}
				/>
				<InputBar
					label={"Email Id"}
					id={"email"}
					inputType={"email"}
					placeholder={"Enter Email Id "}
					handlechange={handleInputChange}
					bgColor={"bg-blue-50"}
				/>
				<InputBar
					label={"Password"}
					id={"password"}
					inputType={"password"}
					placeholder={"Enter Password "}
					handlechange={handleInputChange}
					bgColor={"bg-blue-50"}
				/>

				<div className="flex items-center my-2">
					<div className="mr-2">Have an account? </div>
					<Link
						className="text-blue-700 hover:text-blue-400 font-medium"
						to={"/login"}>
						Login Here
					</Link>
				</div>
				<button
					onClick={handleRegister}
					className="cursor-pointer active:scale-95  bg-blue-500 text-white px-4 min-w-[80px] py-2 rounded-lg mr-8 ">
					Register
				</button>
				{loading && <Loader />}
			</div>
		</div>
	);
};

export default Register;
