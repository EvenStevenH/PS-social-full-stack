import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function NavBar() {
	// bring in user info from context
	const { user, logout } = useUser();

	return (
		<nav>
			{user && <li>Welcome, {user.username}!</li>}

			<ul>
				{user ? (
					<>
						<li>
							<Link to="/feed">Feed</Link>
						</li>
						<li onClick={logout}>
							<Link to="/login">Logout</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
