import { redirect } from "react-router-dom"
import { instance } from "@/api/axios"

export async function loginLoader() {
	try {
		await instance.get("users/me")
		return redirect("/")
	} catch (error) {
		console.error(error)
	}
}
