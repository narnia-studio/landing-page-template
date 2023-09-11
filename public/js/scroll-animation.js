import { gsap } from "../../node_modules/gsap";
import { ScrollTrigger } from "../../node_modules/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// gsap.to('.card-animation', {
// 	scrollTrigger: {
// 		trigger: '.card-animation',
// 		// markers: true,
// 		start: 'top center',
// 		toggleActions: 'restart pause reverse pause'
// 	},
// 	y: 0,
// 	duration: 1,
// 	stagger: 0.2
// })