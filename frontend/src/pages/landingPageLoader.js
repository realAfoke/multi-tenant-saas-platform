import { instance } from "@/api/axios";
import { redirect } from "react-router-dom";


export async function landingPageLoader() {
	try {
		await instance.get('users/me')
		return redirect('/')

	} catch (error) {
		console.error(error)
	}
}
