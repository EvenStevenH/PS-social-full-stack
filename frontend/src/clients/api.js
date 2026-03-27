import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const token = () => localStorage.getItem("token");

export const userClient = axios.create({
	// baseURL: "http://localhost:3002/api/users",
	baseURL: BASE_URL + "/api/users",
	headers: {
		Authorization: `Bearer ${token()}`,
	},
});

export const postClient = axios.create({
	// baseURL: "http://localhost:3002/api/posts",
	baseURL: `${BASE_URL}/api/posts`,
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
