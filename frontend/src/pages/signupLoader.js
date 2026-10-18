import { redirect } from "react-router-dom"
import { instance } from "@/api/axios"

export async function signUpLoader() {
	try {
		await instance.get("users/me")
		return redirect("/dashboard")
	} catch (error) {
		console.error(error)
	}
}
