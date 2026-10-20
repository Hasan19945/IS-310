// Elementer glir mykt inn når de kommer til syne under scrolling.
// Uten JavaScript, eller med "redusert bevegelse" slått på, vises alt som vanlig.
const reduserBevegelse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduserBevegelse && "IntersectionObserver" in window) {
	const elementer = document.querySelectorAll(
		"main section h2, .video-ramme, .medlem, .ambisjon-kort, .ambisjon > p"
	);

	const observer = new IntersectionObserver(
		(oppforinger) => {
			oppforinger.forEach((oppforing) => {
				if (!oppforing.isIntersecting) return;
				oppforing.target.classList.add("synlig");
				observer.unobserve(oppforing.target);
			});
		},
		{ threshold: 0.15 }
	);

	elementer.forEach((element) => {
		// Kort i samme rad kommer inn litt etter hverandre
		if (element.classList.contains("ambisjon-kort")) {
			const indeks = Array.from(element.parentElement.children).indexOf(element);
			element.style.transitionDelay = `${indeks * 120}ms`;
		}

		element.classList.add("reveal");

		// Når animasjonen er ferdig fjernes klassene, så hover-effektene virker som før
		element.addEventListener("transitionend", function ferdig(hendelse) {
			if (hendelse.propertyName !== "transform" || !element.classList.contains("synlig")) return;
			element.classList.remove("reveal", "synlig");
			element.style.transitionDelay = "";
			element.removeEventListener("transitionend", ferdig);
		});

		observer.observe(element);
	});
}
