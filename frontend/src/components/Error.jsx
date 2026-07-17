import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError()
	return (
		<div className="bg-gray-100 h-screen flex items-center justify-center">
			<div className="flex flex-col justify-center items-center">
				<div className="text-2xl">
					Oops an error occured!
				</div>
				<i>{error.statusText || error.message}</i>
			</div>
		</div>
	)
}
