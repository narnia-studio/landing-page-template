export default function Icon({icon}) {
	return (
		 icon && 
		<svg 

			xmlns="http://www.w3.org/2000/svg" 
			fill="none" 
			aria-hidden="true"
			focusable="false"
			style={{pointerEvents: 'none'}}
			dangerouslySetInnerHTML={{__html: icon.paths}}
			viewBox={icon.viewBox}>
		</svg>
	)
 }