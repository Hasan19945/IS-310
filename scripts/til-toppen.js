// Viser "Til toppen"-knappen når man har scrollet et stykke ned, og tar brukeren tilbake til toppen.
const tilToppenKnapp = document.querySelector(".til-toppen");

if (tilToppenKnapp) {
	const oppdaterKnapp = () => {
		tilToppenKnapp.classList.toggle("vis", window.scrollY > 600);
	};

	window.addEventListener("scroll", oppdaterKnapp, { passive: true });
	oppdaterKnapp();

	// Myk scrolling styres av scroll-behavior i CSS (og slås av ved "redusert bevegelse")
	tilToppenKnapp.addEventListener("click", () => {
		window.scrollTo({ top: 0 });
	});
}
