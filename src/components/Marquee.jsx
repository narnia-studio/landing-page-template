import { useState, useEffect } from "preact/hooks";

export default function Marquee({ items }) {
	const [enableMotion, setEnableMotion] = useState(false);
	const [prefersMotion, setPrefersMotion] = useState(null);
	const [enhance, setEnhance] = useState(false);

	const motionStorageKey = "enable-astro-blog-motion";

	const handleAnimationState = (value) => {
		setEnableMotion(!value);
		localStorage.setItem(motionStorageKey, String(!value));
	};

	useEffect(() => {
		try {
			// checks if js is enabled
			const _enhanced =
				document.documentElement.classList.contains("enhanced");
			setEnhance(_enhanced);

			setPrefersMotion(
				window.matchMedia("(prefers-reduced-motion: no-preference)")
			);
			const _storedValue = localStorage.getItem(motionStorageKey);
			const _motionEnabled =
				_storedValue != undefined ? _storedValue == "true" : undefined;

			if (_motionEnabled != undefined) {
				setEnableMotion(_motionEnabled);
			} else {
				setEnableMotion(prefersMotion.matches);
				localStorage.setItem(motionStorageKey, String(enableMotion));
			}
		} catch (error) {}
	}, []);

	return (
		<>
			<div hidden={enhance ? undefined : ""} class="marquee" id="marquee">
				<div class="wrapper">
					<button
						type="button"
						role="switch"
						aria-pressed={enableMotion}
						id="playButton"
						onClick={() => handleAnimationState(enableMotion)}
					>
						<div className="vh">
							Animation is {enableMotion ? "enabled" : "disabled"}
						</div>
						<svg
							id="pause"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 224 352"
							aria-hidden="true"
							focusable="false"
						>
							<path
								d="M80 352H0V0h80v352Zm144 0h-80V0h80v352Z"
								fill="currentColor"
							/>
						</svg>
						<svg
							id="play"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 320 384"
							aria-hidden="true"
							focusable="false"
						>
							<path
								d="M272.53 0v163.52L0 0v384l272.53-163.52V384H320V0h-47.47Z"
								fill="currentColor"
							/>
						</svg>
					</button>
					<div className="marquee__content">
						{items &&
							Array.from({ length: 2 }, (_, i) => (
								<ul role="list" aria-hidden={i == 1 || undefined} key={i}>
									{items.map((item) => (
										<li key={i + "-" + item.value}>
											{item.value}
										</li>
									))}
								</ul>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
