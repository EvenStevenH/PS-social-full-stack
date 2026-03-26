import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token, userClient } from "../clients/api";

const UserContext = createContext(null);

// check if there's token > if yes, assume there's a user
const initialUser = token() ? { username: null } : null;

// custom provider to wrap our App
function UserProvider({ children }) {
	// set initial state to null or a temp user
	const [user, setUser] = useState(initialUser);

	const navigate = useNavigate();

	// useEffect that verifies the token and retrieves user data
	useEffect(() => {
		async function getUser() {
			try {
				// check token > if none, skip steps
				if (!token()) return;

				// use token to verify user (ex. valid? expired?)
				const { data } = await userClient.get("/");
				// await new Promise((res) => setTimeout(res, 1000)); // slow down, for testing
				console.log(data);

				// if token legit > take user data, > save to state
				setUser(data);
			} catch (error) {
				// if verification fails, logout user
				console.log(error);
				logout();
			}
		}

		getUser();
	}, []);

	const logout = () => {
		setUser(null); // clear the user state
		localStorage.removeItem("token"); // clear the local storage

		navigate("/login"); // navigate the user to login
	};

	const value = {
		user,
		setUser,
		logout,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// custom hook to easily access context value
export function useUser() {
	return useContext(UserContext);
}

export default UserProvider;
