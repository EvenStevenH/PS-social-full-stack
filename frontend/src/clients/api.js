import axios from "axios";

export const token = () => localStorage.getItem("token");

export const userClient = axios.create({
	baseURL: "http://localhost:3002/api/users",
	headers: {
		Authorization: `Bearer ${token()}`,
	},
});

export const postClient = axios.create({
	baseURL: "http://localhost:3002/api/posts",
	// IF not using interceptors
	// headers: {
	// 	Authorization: `Bearer ${token}`,
	// },
});

// use the latest version of token in localStorage
postClient.interceptors.request.use((req) => {
	if (token) {
		req.headers.Authorization = `Bearer ${token()}`;
	}
	return req;
});
