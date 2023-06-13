import { useState, useEffect, useRef } from "preact/hooks";

export default function AnimationControl() {
	const [enableMotion, setEnableMotion] = useState(false);
	const [prefersMotion, setPrefersMotion] = useState(null);
	const [enhance, setEnhance] = useState(false);

	const motionStorageKey = "enable-astro-blog-motion";

	const updateClass = (value) => {
		if (value) {
			document.documentElement.classList.add("animate")
		} else {
			document.documentElement.classList.remove("animate")
		}
	}

	const handleAnimationState = (value) => {
		const _enabled = !value;
		setEnableMotion(_enabled);
		localStorage.setItem(motionStorageKey, String(_enabled));
		updateClass(_enabled);
	};

	useEffect(() => {
		try {
			// checks document has class "enhanced" 
			// which indicates presence of javascript
			const _enhanced =
				document.documentElement.classList.contains("enhanced");
			setEnhance(_enhanced);

			setPrefersMotion(
				window.matchMedia("(prefers-reduced-motion: no-preference)")
			);

			// handle local storage
			const _storedValue = localStorage.getItem(motionStorageKey);
			const _motionEnabled =
				_storedValue != undefined ? _storedValue == "true" : undefined;


			if (_motionEnabled != undefined) {
				setEnableMotion(_motionEnabled);
				updateClass(_motionEnabled);
			} else {
				const _enabled = prefersMotion.matches;
				setEnableMotion(_enabled);
				updateClass(_enabled);
				localStorage.setItem(motionStorageKey, String(_enabled));
			}
		} catch (error) {}
	}, []);

	return (
		<button
			data-visible={enhance}
			className="animation-control"
			type="button"
			aria-pressed={enableMotion}
			id="playButton"
			onClick={() => handleAnimationState(enableMotion)}
		>
			<span className="vh">
				Animation is {enableMotion ? "enabled" : "disabled"}
			</span>
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
	);
}
