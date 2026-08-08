import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SignupBackWarning({
	open,
	onOpenChange,
	onConfirm,
}) {
	return (
		<AlertDialog
			open={open}
			onOpenChange={onOpenChange}
		>

			<AlertDialogContent className="bg-zinc-950 border-zinc-800 text-white">

				<AlertDialogHeader>

					<AlertDialogTitle>
						Go back and restart verification?
					</AlertDialogTitle>

					<AlertDialogDescription className="text-zinc-400">
						Your email has already been verified. Going back will
						restart the signup process and you'll need to verify
						your email again.
					</AlertDialogDescription>

				</AlertDialogHeader>

				<AlertDialogFooter>

					<AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800">
						Stay here
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={() => onConfirm(1)}
						className="bg-red-500 hover:bg-red-600 text-white"
					>
						Restart signup
					</AlertDialogAction>

				</AlertDialogFooter>

			</AlertDialogContent>

		</AlertDialog>
	)
}

