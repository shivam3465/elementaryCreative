import axios from "axios";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../context/UserContext";

const Navbar = () => {
	const { user ,setUser} = useContext(userContext);

	const { VITE_BASE_URL } = import.meta.env;

	const { pathname } = useLocation();
	if (pathname === "/login" || pathname === "/register") return;

	const handleLogout = async () => {
		try {
			const { data } = await axios.get(
				`${VITE_BASE_URL}/user/logout`,				
				{ withCredentials: true }
			);
			
			setUser(null);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	//check if user is logined or not
	if (!user) return <Navigate to={"/login"} />;

	return (
		<div className="bg-gray-200 py-4 px-8">
			<div className="max-w-screen-2xl m-auto flex justify-between items-center ">
				<div className="font-bold text-lg text-blue-500">
					Inventory Manager
				</div>
				<div className="flex justify-center items-center">
					<div className="px-2 text-blue-500 font-medium">{user}</div>
					<FaUser />

					<MdLogout
						title="Logout"
						className="cursor-pointer ml-4 text-[22px] active:scale-95 hover:text-blue-400"
						onClick={handleLogout}
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
