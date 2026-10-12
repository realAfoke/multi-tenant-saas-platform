import React, { useState, useMemo } from "react";
import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { instance } from "@/api/axios";
import { useAppState } from "@/hooks/apptools";
import { useNavigate } from "react-router-dom";


const MOCK_USERS = [
	{ id: "1", name: "Alex Rivera", email: "alex@company.com", avatar: "https://i.pravatar.cc/150?u=alex", status: "online" },
	{ id: "2", name: "Jordan Lee", email: "jordan@company.com", avatar: "https://i.pravatar.cc/150?u=jordan", status: "offline" },
	{ id: "3", name: "Sam Patel", email: "sam@company.com", avatar: "https://i.pravatar.cc/150?u=sam", status: "online" },
	{ id: "4", name: "Taylor Kim", email: "taylor@company.com", avatar: "https://i.pravatar.cc/150?u=taylor", status: "away" },
	{ id: "5", name: "Morgan Blake", email: "morgan@company.com", avatar: "https://i.pravatar.cc/150?u=morgan", status: "online" },
	{ id: "6", name: "Casey Quinn", email: "casey@company.com", avatar: "https://i.pravatar.cc/150?u=casey", status: "offline" },
];

export default function InviteToDirectChat({ onInvite, onClose, existingChatUserIds = [], onOpenChange }) {
	const [query, setQuery] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [isInviting, setIsInviting] = useState(false);

	const filteredUsers = useMemo(() => {
		const lower = query.toLowerCase().trim();
		return MOCK_USERS.filter(
			(u) =>
				!existingChatUserIds.includes(u.id) &&
				(u.name.toLowerCase().includes(lower) ||
					u.email.toLowerCase().includes(lower))
		);
	}, [query, existingChatUserIds]);

	const handleInvite = async () => {
		if (!selectedUser) return;
		setIsInviting(true);
		// Simulate API call
		await new Promise((r) => setTimeout(r, 800));
		onInvite?.(selectedUser);
		setIsInviting(false);
		setSelectedUser(null);
		setQuery("");
	};

	const statusColor = (status) => {
		switch (status) {
			case "online":
				return "bg-emerald-500";
			case "away":
				return "bg-amber-400";
			default:
				return "bg-zinc-400";
		}
	};
	const navigate = useNavigate();

	const {
		setView,
		setSelectedDm,
		setChannel,
	} = useAppState();

	const [startSearch, setStartSearch] = useState(false);

	const queryClient = useQueryClient();

	const { data: queryResult, isFetching } = useQuery({
		queryKey: ["user", query],

		queryFn: async () => {
			try {
				const response = await instance.get(
					`chat/search-friend/?search=${query}`
				);

				setStartSearch(false);

				return response.data;
			} catch (err) {
				console.error(err);
				throw Error(err);
			}
		},

		enabled: !!query,
	});

	const openDM = (dm) => {
		setView("dm");
		setSelectedDm(dm);
		setChannel({});

		onOpenChange(false);

		navigate(`/chat/${dm?.id}`);
	};


	return (
		<div className="w-full max-w-md mx-auto">
			<div className="fixed h-screen w-full z-999 top-0 left-0 bg-black dark:bg-zinc-900 md:rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
				<div className="px-6 pt-6 pb-4 flex items-start justify-between">
					<div>
						<h2 className="text-xl font-semibold dark:text-zinc-50 tracking-tight">
							New Direct Message
						</h2>
						<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
							Search for a person to start a private chat
						</p>
					</div>
					{onClose && (
						<button
							onClick={onClose}
							className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
							aria-label="Close"
						>
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					)}
				</div>

				<div className="px-6 pb-4">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
							<svg
								className="h-5 w-5 text-zinc-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<input
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								// setSelectedUser(null);
							}}
							placeholder="Search by name or email…"
							className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-[15px]"
							autoFocus
						/>
					</div>
				</div>

				<div className="max-h-[320px] overflow-y-auto px-3 pb-3">
					{queryResult?.length === 0 ? (
						<div className="py-12 text-center">
							<div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
								<svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">No people found</p>
							<p className="text-xs text-zinc-400 mt-1">Try a different name or email</p>
						</div>
					) : (
						<ul className="space-y-1">
							{queryResult?.map((user) => {
								const isSelected = selectedUser?.id === user.id;
								const name = `${user?.firstName} ${user?.lastName}`
								return (
									<li key={user.id} className="flex justify-between">
										<div>
											<button
												className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${isSelected
													? "bg-indigo-50 dark:bg-indigo-500/15 ring-1 ring-indigo-200 dark:ring-indigo-500/30"
													: "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
													}`}
											>
												<div className="relative flex-shrink-0">
													<img
														src={user?.avatar}
														alt={name}
														className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
													/>
													<span
														className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${statusColor(
															user.status
														)}`}
													/>
												</div>

												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-white dark:text-zinc-100 truncate">
														{name}
													</p>
													<p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
														{user.email}
													</p>
												</div>

												{isSelected && (
													<div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
														<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
														</svg>
													</div>
												)}
											</button>
										</div>
										<div className="px-6 py-4  dark:border-zinc-800  dark:bg-zinc-900/50">
											<button
												onClick={() => openDM(user)}
												disabled={isFetching}
												className={`w-full py-3 px-2 rounded-sm font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${selectedUser && !isInviting
													? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]"
													: "bg-blue-500 dark:bg-zinc-800 text-white cursor-not-allowed"
													}`}
											>
												{isInviting ? (
													<>
														<svg className="animate-spin h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none">
															<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
															<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
														</svg>
														Starting chat…
													</>
												) : (
													<>
														<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
														</svg>
														{selectedUser ? `Message ${selectedUser.name.split(" ")[0]}` : "message"}
													</>
												)}
											</button>
										</div>

									</li>
								);
							})}
						</ul>
					)}
				</div>

			</div>
		</div>
	);
}
