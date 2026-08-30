import menuIcon from "@/assets/menu3.svg"

export default function MenuIcon({ toggle, setToggle }) {
	return (
		<div className="fixed top-0 md:relative z-99  ">
			{!toggle &&
				<img
					src={menuIcon}
					className=" w-8 h-8  cursor-pointer"
					onClick={(e) => {
						e.stopPropagation()
						setToggle(true)
					}}
				/>}
		</div>

	)
}
