import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/HomePage/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { userContext } from "./context/UserContext";
import axios from "axios";

function App() {
	const [user, setUser] = useState("");

	const { VITE_BASE_URL } = import.meta.env;

	useEffect(() => {
		const fetcher = async () => {
			try {
				const { data } = await axios.get(`${VITE_BASE_URL}/user/me`, {
					withCredentials: true,
				});

				setUser(data.user);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		};
		fetcher();
	}, []);

	return (
		<div className="relative">
			<userContext.Provider value={{ user, setUser }}>
				<Router>
					<Navbar />
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
					</Routes>
				</Router>
				<ToastContainer />
			</userContext.Provider>
		</div>
	);
}

export default App;
