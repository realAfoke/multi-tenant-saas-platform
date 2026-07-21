import { queryOptions } from "@tanstack/react-query";
import { instance } from "@/api/axios";


export function fetchUserQueryOption() {
	return queryOptions({
		queryKey: ['user'],
		queryFn: getUser,
	})
}


async function getUser() {
	try {
		const user = await instance.get('users/me')
		return user.data
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
}
