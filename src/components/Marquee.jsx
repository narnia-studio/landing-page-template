export default function Marquee(props) {
	return (
		props.children && (
			<div class="marquee">
				{Array.from({ length: 4 }, (_, i) => (
					<ul
						className="marquee__content"
						role="list"
						aria-hidden={i > 0 || undefined}
						key={i}
					>
						{props.children}
					</ul>
				))}
			</div>
		)
	);
}
