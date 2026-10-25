import { redirect } from "react-router-dom";
import { instance } from "@/api/axios";


export async function protectedRouteLoader() {
	try {
		await instance.get('users/me')
	} catch (error) {
		console.error(error)
		return redirect('/landing')
	}
}
