import { useState } from "react";
import { userClient } from "../clients/api";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
	// bring in setter function from context
	const { setUser } = useUser();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// send the form data to our backend
			const { data } = await userClient.post("/register", form);
			console.log(data);

			//take token and store it locally
			localStorage.setItem("token", data.token);

			// save some user data in our state
			setUser(data.user);

			// take user to different page
			navigate("/feed");
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	};

	return (
		<div>
			<h1>Register Page</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					value={form.username}
					onChange={handleChange}
					id="username"
					name="username"
					type="text"
					required
				/>

				<label htmlFor="email">Email:</label>
				<input
					value={form.email}
					onChange={handleChange}
					id="email"
					name="email"
					type="email"
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					value={form.password}
					onChange={handleChange}
					id="password"
					name="password"
					type="password"
					required
				/>

				<button>Register</button>
			</form>
		</div>
	);
}
