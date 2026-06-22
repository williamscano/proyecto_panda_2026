// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");
const toggleScroll = () => {
  if (window.scrollY > 300) scrollBtn?.classList.add("show");
  else scrollBtn?.classList.remove("show");
};
window.addEventListener("scroll", toggleScroll);
window.addEventListener("load", toggleScroll);
scrollBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Cerrar menú hamburguesa al hacer clic en enlace
document
  .querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.querySelector(".navbar-collapse");
      if (collapse?.classList.contains("show"))
        document.querySelector(".navbar-toggler")?.click();
    });
  });
document.querySelectorAll(".navbar-nav .dropdown-item").forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = document.querySelector(".navbar-collapse");
    if (collapse?.classList.contains("show"))
      document.querySelector(".navbar-toggler")?.click();
  });
});

// ========== FORM DONACIONES ==========
const form = document.getElementById("donacionPandaForm");
const limpiarBtn = document.getElementById("limpiarBtn");
const feedback = document.getElementById("feedbackArea");
const customCheck = document.getElementById("custom-amount");
const customInput = document.getElementById("cantidadPersonalizada");
const radios = document.querySelectorAll('input[name="donacion"]');

// Función para limpiar el formulario
function clearForm() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("correo").value = "";
  radios.forEach((r) => (r.checked = false));
  if (customCheck) customCheck.checked = false;
  if (customInput) customInput.value = "";
  feedback.innerHTML = "";
  // Resetear clases de validación
  document.querySelectorAll(".form-control").forEach((el) => {
    el.classList.remove("is-valid", "is-invalid");
  });
  document.getElementById("nombre").focus();
}
limpiarBtn?.addEventListener("click", clearForm);

// Validación en tiempo real (opcional)
form?.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
    } else {
      this.classList.remove("is-invalid");
      this.classList.add("is-valid");
    }
  });
});

// Submit con validación y envío real a FormSubmit
form?.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir envío normal para validar

  // Obtener valores
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const email = document.getElementById("correo").value.trim();

  // Validar campos requeridos
  if (!nombre || !apellidos || !email) {
    feedback.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          ⚠️ Por favor, completa todos los datos personales.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    // Marcar campos vacíos
    if (!nombre) document.getElementById("nombre").classList.add("is-invalid");
    if (!apellidos)
      document.getElementById("apellidos").classList.add("is-invalid");
    if (!email) document.getElementById("correo").classList.add("is-invalid");
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          ⚠️ Por favor, introduce un correo electrónico válido.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    document.getElementById("correo").classList.add("is-invalid");
    return;
  }

  // Obtener monto de donación
  let monto = null;
  let selectedRadio = Array.from(radios).find((r) => r.checked);
  if (selectedRadio) {
    monto = selectedRadio.value;
  } else if (
    customCheck &&
    customCheck.checked &&
    customInput.value &&
    parseFloat(customInput.value) > 0
  ) {
    monto = customInput.value;
  }

  if (!monto) {
    feedback.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          ❌ Selecciona una cantidad de donación o introduce otra cantidad.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    return;
  }

  // ✅ Todo válido: mostrar mensaje de éxito
  feedback.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        ✅ ¡Gracias ${nombre}! Tu donación de ${monto} € ayudará a proteger al panda rojo. Recibirás un email en ${email}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

  // 🚀 ENVIAR EL FORMULARIO A FORMSUBMIT
  // Creamos un FormData para enviar todos los campos
  const formData = new FormData(this);
  formData.append("_captcha", "false"); // Desactivar captcha (opcional)
  formData.append("_template", "table"); // Mejor formato de email
  // Puedes añadir redirección: formData.append('_next', 'https://tudominio.com/gracias.html');

  // Mostrar estado de envío
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
  submitBtn.disabled = true;

  fetch("https://formsubmit.co/williamscano.docente.bcn@gmail.com", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Éxito
        feedback.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            🎉 ¡Donación enviada con éxito! Recibirás una confirmación por email.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        setTimeout(() => {
          clearForm();
        }, 5000); // 5 segundos para que el usuario pueda leer el mensaje
      } else {
        throw new Error("Error en el servidor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      feedback.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          ❌ Hubo un error al enviar tu donación. Por favor, intenta de nuevo.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    })
    .finally(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
});

// ===== PROYECTOS PANDA - DESCRIPCIONES PARA MODAL =====
const descripcionesProyectos = {
  proyecto1: {
    titulo: "🌱 Proyecto 1: Reforestación de Bambú",
    imagen:
      "https://images.unsplash.com/photo-1779764488573-e211e1413302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhbmRhJTIwcm9qbyUyMGJhbWJ1fGVufDB8fDB8fHww",
    texto: `
      <div class="row g-3">
        <div class="col-md-12">
          <p><strong>Objetivo:</strong> Restaurar 50 hectáreas de bosque de bambú en el Himalaya oriental.</p>
          <ul>
            <li><strong>Acciones:</strong> Plantación de 10,000 brotes de bambú nativo.</li>
            <li><strong>Beneficio:</strong> Asegura la fuente de alimentación del panda rojo.</li>
            <li><strong>Impacto:</strong> Beneficia a más de 30 especies de fauna local.</li>
          </ul>
          <div class="alert alert-success mt-2">
            <i class="fas fa-check-circle me-1"></i> <strong>Meta 2026:</strong> 30% de la superficie reforestada.
          </div>
        </div>
      </div>
    `,
  },
  proyecto2: {
    titulo: "📡 Proyecto 2: Monitoreo con GPS",
    imagen:
      "https://images.unsplash.com/photo-1770231384608-09f355f0169a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFuZGElMjByb2pvJTIwYmFtYnV8ZW58MHx8MHx8fDA%3D",
    texto: `
      <div class="row g-3">
        <div class="col-md-12">
          <p><strong>Objetivo:</strong> Instalar 20 collares GPS en pandas rojos salvajes.</p>
          <ul>
            <li><strong>Acciones:</strong> Colocación de cámaras trampa en 5 zonas críticas.</li>
            <li><strong>Beneficio:</strong> Datos en tiempo real sobre movimientos y salud.</li>
            <li><strong>Impacto:</strong> Mejora los planes de conservación basados en evidencia.</li>
          </ul>
          <div class="alert alert-info mt-2">
            <i class="fas fa-map-pin me-1"></i> <strong>Zonas:</strong> Nepal, India, Bután y China.
          </div>
        </div>
      </div>
    `,
  },
  proyecto3: {
    titulo: "👥 Proyecto 3: Educación Ambiental",
    imagen:
      "https://images.unsplash.com/photo-1542736637-74169a802172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhbmRhJTIwcm9qb3xlbnwwfHwwfHx8MA%3D%3D",
    texto: `
      <div class="row g-3">
        <div class="col-md-12">
          <p><strong>Objetivo:</strong> Capacitar a 500 personas en 10 comunidades locales.</p>
          <ul>
            <li><strong>Acciones:</strong> Talleres, charlas y materiales educativos.</li>
            <li><strong>Beneficio:</strong> Reducción del conflicto humano-panda rojo.</li>
            <li><strong>Impacto:</strong> Comunidades aliadas en la conservación.</li>
          </ul>
          <div class="alert alert-warning mt-2">
            <i class="fas fa-calendar-alt me-1"></i> <strong>Próximo taller:</strong> 15 de julio de 2026.
          </div>
        </div>
      </div>
    `,
  },
};

// Inicializar modal de Bootstrap
const modalProyecto = new bootstrap.Modal(
  document.getElementById("detalleProyectoModal"),
);
const modalTitle = document.getElementById("modalProyectoLabel");
const descripcionContainer = document.getElementById("descripcionProyecto");

// Función para mostrar la descripción en el modal
function mostrarDetalleProyecto(proyectoId) {
  const proyecto = descripcionesProyectos[proyectoId];
  if (proyecto) {
    modalTitle.textContent = proyecto.titulo;
    descripcionContainer.innerHTML = `
      <div class="mb-3">
        <!-- Imagen del proyecto -->
        <img src="${proyecto.imagen}" 
             class="img-fluid rounded-3 mb-3" 
             alt="${proyecto.titulo}"
             style="width: 100%; max-height: 250px; object-fit: cover;">
        ${proyecto.texto}
        <hr>
      </div>
    `;
    modalProyecto.show();
  } else {
    descripcionContainer.innerHTML = '<p class="text-danger">Descripción no disponible.</p>';
    modalProyecto.show();
  }
}
// Asignar evento click a los botones de "Ver más detalles"
document.querySelectorAll(".ver-descripcion").forEach((boton) => {
  boton.addEventListener("click", function (e) {
    e.preventDefault();
    const proyectoId = this.getAttribute("data-proyecto");
    mostrarDetalleProyecto(proyectoId);
  });
});
