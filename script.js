const timelineEntries = [
  {
    year: "2002",
    title: "Sporting CP",
    text:
      "Cristiano Ronaldo dio el salto a la elite del fútbol portugués con el Sporting de Lisboa, donde su rapidez, técnica y hambre por mejorar llamaron la atención de Europa.",
    highlights: [
      "Debut en el máximo nivel con una explosividad destacada.",
      "Ganó reputación por su capacidad ofensiva y su capacidad de desbordar.",
      "Su evolución le abrió la puerta al Real Madrid."
    ]
  },
  {
    year: "2003",
    title: "Manchester United",
    text:
      "En Inglaterra comenzó a consolidarse como una gran estrella. Su trabajo defensivo, su explosividad y su capacidad para aparecer en el área fueron decisivos para el crecimiento del club.",
    highlights: [
      "Goleó en partidos clave de Premier League y Europa.",
      "Formó una dupla letal con jugadores de gran calidad.",
      "Comenzó a ganar reconocimiento internacional."
    ]
  },
  {
    year: "2009",
    title: "Real Madrid",
    text:
      "La llegada al Real Madrid marcó un punto de inflexión. En el Santiago Bernabéu se convirtió en protagonista absoluto de una era brillante del club.",
    highlights: [
      "Máxima referencia ofensiva del equipo.",
      "Relevantes temporadas con cifras goleadoras extraordinarias.",
      "Consolidó su reputación como delantero mundial."
    ]
  },
  {
    year: "2018",
    title: "Juventus y la continuidad",
    text:
      "Tras su etapa dorada en Madrid, Ronaldo siguió dejando huella en la Serie A, mostrándose dominante con su velocidad, trabajo sin balón y capacidad para decidir partidos decisivos.",
    highlights: [
      "Aporta experiencia, liderazgo y presencia goleadora.",
      "Mantiene una elite física y competitiva.",
      "Continúa como referente en la fase final de su carrera."
    ]
  },
  {
    year: "2023",
    title: "Legado global",
    text:
      "Hoy, su legado trasciende los números. Es un símbolo de disciplina, ambición y excelencia, con un impacto enorme en la cultura del fútbol mundial.",
    highlights: [
      "Inspiración para nuevas generaciones de futbolistas.",
      "Referente en liderazgo, preparación física y competitividad.",
      "Símbolo deportivo de carácter y perseverancia."
    ]
  }
];

const timelineTitle = document.getElementById("timeline-title");
const timelineYear = document.getElementById("timeline-year");
const timelineText = document.getElementById("timeline-text");
const timelineList = document.getElementById("timeline-list");
const timelinePanel = document.getElementById("timeline-panel");
const buttons = Array.from(document.querySelectorAll(".timeline-button"));
const footerYear = document.getElementById("year");
const navToggle = document.querySelector(".mobile-nav-toggle");
const mainNav = document.getElementById("main-nav");

function renderTimeline(index) {
  const entry = timelineEntries[index];

  if (!entry) {
    return;
  }

  if (timelineYear) timelineYear.textContent = entry.year;
  if (timelineTitle) timelineTitle.textContent = entry.title;
  if (timelineText) timelineText.textContent = entry.text;

  if (timelineList) {
    timelineList.innerHTML = entry.highlights
      .map((item) => `<li>${item}</li>`)
      .join("");
  }

  buttons.forEach((button, buttonIndex) => {
    const sameIndex = buttonIndex === index;
    button.classList.toggle("is-active", sameIndex);
    button.setAttribute("aria-selected", String(sameIndex));
    button.tabIndex = sameIndex ? 0 : -1;

    if (sameIndex && button.id && timelinePanel) {
      timelinePanel.setAttribute("aria-labelledby", button.id);
    }
  });
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    renderTimeline(index);
  });

  button.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % buttons.length;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + buttons.length) % buttons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }

    buttons[nextIndex].focus();
    renderTimeline(nextIndex);
  });
});

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  });
}

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

renderTimeline(0);
