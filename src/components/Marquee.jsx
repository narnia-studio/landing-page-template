export default function Marquee(props) {
	return (
		props.children && (
			<figure class="marquee">
				{Array.from({ length: 3 }, (_, i) => (
					<div
						className="marquee__content"
						aria-hidden={i > 0 || undefined}
						key={i}
					>
						{props.children}
					</div>
				))}
			</figure>
		)
	);
}
