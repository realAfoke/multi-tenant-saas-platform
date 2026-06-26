import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const instance=applyCaseMiddleware(
	axios.create({
		baseURL:import.meta.env.VITE_API_URL,
		withCredentials:true
	})
)


instance.interceptors.response.use()
