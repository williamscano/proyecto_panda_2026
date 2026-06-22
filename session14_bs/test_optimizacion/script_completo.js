function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const totalTime = 30 * 60;
let timeLeft = totalTime;
let score = 0;
let finished = false;

const questions = [
{
  q: "¿Qué atributo permite cargar imágenes de forma diferida (cuando se necesite)?",
  options: ["async", "loading='lazy'", "loading='eager'", "fetchpriority"],
  correct: 1
},
{
  q: "¿Cuál es el principal beneficio de usar loading='lazy'?",
  options: [
    "Mejora la accesibilidad",
    "Reduce el peso inicial de la página",
    "Cambia el tamaño de la imagen",
    "Optimiza el CSS"
  ],
  correct: 1
},
{
  q: "¿Qué atributo indica al navegador que una imagen es prioritaria?",
  options: ["priority='high'", "fetchpriority='high'", "important='high'", "loading='high'"],
  correct: 1
},
{
  q: "¿Qué herramienta de Google analiza rendimiento, accesibilidad y SEO?",
  options: ["Wave", "Squoosh", "Lighthouse", "Bootstrap"],
  correct: 2
},
{
  q: "¿Qué extensión se utiliza para analizar accesibilidad web?",
  options: ["Squoosh", "Wave", "Lighthouse", "Aria"],
  correct: 1
},
{
  q: "¿Para qué sirve Squoosh?",
  options: [
    "Crear componentes Bootstrap",
    "Optimizar imágenes",
    "Validar HTML",
    "Analizar SEO"
  ],
  correct: 1
},
{
  q: "¿Qué formato de imagen suele ofrecer mejor compresión para la web moderna?",
  options: ["BMP", "TIFF", "WebP", "RAW"],
  correct: 2
},

{
  q: "¿Qué significa ARIA?",
  options: [
    "Accessible Rich Internet Applications",
    "Advanced Rich Internet Access",
    "Automatic Rich Interface Application",
    "Accessible Resources Internet Area"
  ],
  correct: 0
},
{
  q: "¿Para qué sirve aria-label?",
  options: [
    "Añadir texto alternativo a imágenes",
    "Añadir una descripción accesible",
    "Optimizar imágenes",
    "Crear una etiqueta"
  ],
  correct: 1
},
{
  q: "¿Qué atributo ARIA indica que un elemento está expandido?",
  options: [
    "aria-open",
    "aria-visible",
    "aria-expanded",
    "aria-show"
  ],
  correct: 2
},
{
  q: "¿Qué atributo ARIA se utiliza para ocultar contenido a lectores de pantalla?",
  options: [
    "aria-hidden='true'",
    "aria-close",
    "aria-disable",
    "hidden='aria'"
  ],
  correct: 0
},
{
  q: "¿Cuál es una buena práctica para imágenes accesibles?",
  options: [
    "Eliminar todas las imágenes",
    "Usar siempre PNG",
    "Agregar atributo alt descriptivo",
    "Usar imágenes grandes"
  ],
  correct: 2
},
{
  q: "¿Qué mide principalmente Lighthouse?",
  options: [
    "Buenas prácticas",
    "Velocidad y rendimiento",
    "SEO",
    "Acceso"
  ],
  correct: 1
},

{
  q: "¿Qué componente de Bootstrap 5 permite mostrar una barra de navegación responsive?",
  options: ["Card", "Navbar", "Accordion", "Modal"],
  correct: 1
},
{
  q: "¿Qué componente de Bootstrap 5 organiza contenido en tarjetas?",
  options: ["Card", "Toast", "Collapse", "Badge"],
  correct: 0
},
{
  q: "¿Qué componente Bootstrap permite mostrar ventanas emergentes?",
  options: ["Tooltip", "Modal", "Accordion", "Navbar"],
  correct: 1
},
{
  q: "¿Qué componente Bootstrap muestra contenido colapsable?",
  options: ["Alert", "Collapse", "Badge", "Spinner"],
  correct: 1
},
{
  q: "¿Qué componente Bootstrap es ideal para preguntas frecuentes (FAQ)?",
  options: ["Accordion", "Card", "Tabs", "Navbar"],
  correct: 0
},
{
  q: "¿Qué sistema utiliza Bootstrap para maquetación responsive?",
  options: [
    "Flex Layout",
    "CSS Grid propio",
    "Grid System de 12 columnas",
    "Frames"
  ],
  correct: 2
},
{
  q: "¿Qué clase Bootstrap crea un contenedor adaptable?",
  options: [
    ".wrapper",
    ".container",
    ".section",
    ".row-fluid"
  ],
  correct: 1
},

{
  q: "¿Qué clase de Bootstrap genera la imagen fluida?",
  options: [
    "img-thumbnail",
    "img-fluid",
    "img-responsive",
    "img-rounded"
  ],
  correct: 1
},
{
  q: "¿Qué clase Bootstrap crea una fila?",
  options: [".grid", ".row", ".column", ".flex"],
  correct: 1
},

{
  q: "¿Qué significa WCAG?",
  options: [
    "Web Content Accessibility Guidelines",
    "Web Coding Accessibility Guide",
    "Website Content Accessibility Generator",
    "Web Component Access Guide"
  ],
  correct: 0
},
{
  q: "¿Qué analiza principalmente Wave?",
  options: [
    "Accesibilidad",
    "Base de datos",
    "JavaScript",
    "Hosting"
  ],
  correct: 0
},

{
  q: "¿Qué atributo permite indicar texto alternativo en una imagen?",
  options: ["title", "alt", "aria-label", "caption"],
  correct: 1
},

{
  q: "¿Qué componente Bootstrap permite crear carruseles de imágenes?",
  options: ["Slider", "Carousel", "Gallery", "TabsGallery"],
  correct: 1
},

{
  q: "¿Qué mejora el Core Web Vital LCP?",
  options: [
    "Tiempo de carga del contenido principal",
    "Contraste de colores",
    "Accesibilidad",
    "SEO local"
  ],
  correct: 0
},
{
  q: "¿Qué significa CLS en Core Web Vitals?",
  options: [
    "Cambio acumulativo del diseño",
    "Carga de scripts",
    "Compresión local de estilos",
    "Control Layout Service"
  ],
  correct: 0
},
{
  q: "¿Qué herramienta gratuita permite convertir imágenes a WebP?",
  options: [
    "Wave",
    "Lighthouse",
    "Squoosh",
    "Coolors"
  ],
  correct: 2
},
{
  q: "¿Qué atributo se recomienda para la imagen principal (hero)?",
  options: [
    "loading='lazy'",
    "fetchpriority='high'",
    "aria-hidden='true'",
    "defer"
  ],
  correct: 1
},
{
  q: "¿Qué técnica ayuda a reducir el tiempo de carga inicial?",
  options: [
    "Optimizar imágenes",
    "Duplicar archivos CSS",
    "Usar imágenes BMP",
    "Eliminar HTML semántico"
  ],
  correct: 0
},
{
  q: "¿Qué clases de Bootstrap 5 permiten crear un diseño de 2 columnas iguales en todos los tamaños de pantalla?",
  options: [
    "<div class='row'><div class='col-2'></div><div class='col-2'></div></div>",
    "<div class='row'><div class='col-4'></div><div class='col-4'></div></div>",
    "<div class='row'><div class='col-12'></div><div class='col-12'></div></div>",
    "<div class='row'><div class='col-6'></div><div class='col-6'></div></div>"
  ],
  correct: 3
},
{
  q: "¿Qué clases de Bootstrap 5 permiten mostrar 4 columnas en escritorio y 2 columnas en tablet?",
  options: [
    "col-md-3 col-lg-6",
    "col-sm-6 col-md-4",
    "col-md-6 col-lg-3",
    "col-lg-12 col-md-6"
  ],
  correct: 2
},
{
  q: "¿Dónde se recomienda colocar un archivo JavaScript cuando no se utiliza el atributo defer?",
  options: [
    "Dentro de <head> antes del CSS",
    "Al final del <body>",
    "Dentro de <footer>",
    "Dentro de <title>"
  ],
  correct: 1
},
{
  q: "¿Cuál es la forma correcta de cargar un archivo JavaScript en el <head> utilizando defer?",
  options: [
    "<script src='app.js'></script>",
    "<script defer src='app.js'></script>",
    "<script async='defer' src='app.js'></script>",
    "<script href='app.js' defer></script>"
  ],
  correct: 1
},
{
  q: "¿Qué herramienta permite detectar problemas de contraste de colores?",
  options: [
    "Wave",
    "Squoosh",
    "Bootstrap",
    "VS Code"
  ],
  correct: 0
},
{
  q: "¿Cuál es el principal objetivo de minificar archivos CSS y JavaScript en un sitio web?",
  options: [
    "Agregar nuevas funcionalidades al sitio",
    "Reducir el tamaño de los archivos para mejorar la velocidad de carga",
    "Mejorar el diseño visual de la página",
    "Aumentar la resolución de las imágenes"
  ],
  correct: 1
},
{
  q: "¿Qué acción contribuye directamente a la optimización del rendimiento de una página web?",
  options: [
    "Utilizar imágenes sin comprimir",
    "Incluir varias librerías",
    "Optimizar imágenes, minificar archivos",
    "Minificar solo archivos CSS"
  ],
  correct: 2
},
{
  q: "¿Qué clase de Bootstrap 5 crea un botón principal de color rojo?",
  options: [
    "btn-primary",
    "button-primary",
    "primary-btn",
    "btn-danger"
  ],
  correct: 3
},
{
  q: "¿Para qué sirve la clase mx-auto en Bootstrap 5?",
  options: [
    "Agregar margen superior e inferior automático",
    "Centrar horizontalmente un elemento mediante márgenes automáticos",
    "Alinear texto al centro",
    "Agregar margen izquierda y derecha automáticamente"
  ],
  correct: 1
}
];

const quizContainer = document.getElementById("quiz");

questions.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "question";

  div.innerHTML = `
    <h3>${index + 1}. ${item.q}</h3>
    <div class="options">
      ${item.options.map((opt, i) => `
        <label>
          <input type="radio" name="q${index}" onchange="checkAnswer(${index}, ${i}, this)">
          ${escapeHTML(opt)}
        </label>
      `).join("")}
    </div>
    <div class="feedback" id="feedback${index}"></div>
  `;

  quizContainer.appendChild(div);
});

function checkAnswer(qIndex, optionIndex, input) {
  if (finished) return;

  const question = questions[qIndex];
  const labels = input.closest('.options').querySelectorAll('label');
  labels.forEach(l => l.classList.remove('correct', 'incorrect'));

  const feedback = document.getElementById(`feedback${qIndex}`);

  if (optionIndex === question.correct) {
    input.parentElement.classList.add('correct');
    feedback.textContent = '✔ Correcto';
    score++;
  } else {
    input.parentElement.classList.add('incorrect');
    labels[question.correct].classList.add('correct');
    feedback.textContent = '✖ Incorrecto';
  }

  document.getElementsByName(`q${qIndex}`).forEach(i => i.disabled = true);
}

function finishQuiz() {
  if (finished) return;
  finished = true;
  document.getElementById('score').textContent = `Resultado: ${score} / ${questions.length}`;
}

function startTimer() {
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    if (timeLeft <= 0 || finished) {
      clearInterval(interval);
      finishQuiz();
      return;
    }
    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerEl.textContent = `Tiempo restante: ${m}:${s.toString().padStart(2, '0')}`;
  }, 1000);
}

startTimer();