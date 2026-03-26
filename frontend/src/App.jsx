import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import NavBar from "./components/NavBar";
import { useUser } from "./context/userContext";

function App() {
	// bring in user info
	const { user } = useUser();

	return (
		<>
			<NavBar />

			{user ? (
				<Routes>
					<Route
						path="/feed"
						element={<Feed />}
					/>
					<Route
						path="*"
						element={<Navigate to="/feed" />}
					/>
				</Routes>
			) : (
				<Routes>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="*"
						element={<Navigate to="/login" />}
					/>
				</Routes>
			)}
		</>
	);
}

export default App;
