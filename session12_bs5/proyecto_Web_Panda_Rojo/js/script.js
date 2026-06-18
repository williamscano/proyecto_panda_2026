
    (function () {
      // Scroll to top button
      const scrollBtn = document.getElementById('scrollTopBtn');
      const toggleScroll = () => { if (window.scrollY > 300) scrollBtn?.classList.add('show'); else scrollBtn?.classList.remove('show'); };
      window.addEventListener('scroll', toggleScroll);
      window.addEventListener('load', toggleScroll);
      scrollBtn?.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

      // Cerrar menú hamburguesa al hacer clic en enlace
      document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
          const collapse = document.querySelector('.navbar-collapse');
          if (collapse?.classList.contains('show')) document.querySelector('.navbar-toggler')?.click();
        });
      });
      document.querySelectorAll('.navbar-nav .dropdown-item').forEach(link => {
        link.addEventListener('click', () => {
          const collapse = document.querySelector('.navbar-collapse');
          if (collapse?.classList.contains('show')) document.querySelector('.navbar-toggler')?.click();
        });
      });

      // Form donaciones: lógica
      const form = document.getElementById('donacionPandaForm');
      const limpiarBtn = document.getElementById('limpiarBtn');
      const feedback = document.getElementById('feedbackArea');
      const customCheck = document.getElementById('custom-amount');
      const customInput = document.getElementById('cantidadPersonalizada');
      const radios = document.querySelectorAll('input[name="donacion"]');

      function clearForm() {
        document.getElementById('nombre').value = '';
        document.getElementById('apellidos').value = '';
        document.getElementById('correo').value = '';
        radios.forEach(r => r.checked = false);
        if (customCheck) customCheck.checked = false;
        if (customInput) customInput.value = '';
        feedback.innerHTML = '';
      }
      limpiarBtn?.addEventListener('click', clearForm);

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        let monto = null;
        let selectedRadio = Array.from(radios).find(r => r.checked);
        if (selectedRadio) monto = selectedRadio.value;
        else if (customCheck && customCheck.checked && customInput.value && parseFloat(customInput.value) > 0) monto = customInput.value;
        const nombreVal = document.getElementById('nombre').value.trim();
        const apellidosVal = document.getElementById('apellidos').value.trim();
        const emailVal = document.getElementById('correo').value.trim();
        if (!nombreVal || !apellidosVal || !emailVal) {
          feedback.innerHTML = '<div class="alert alert-warning">⚠️ Completa todos los datos personales.</div>';
          return;
        }
        if (!monto) {
          feedback.innerHTML = '<div class="alert alert-warning">❌ Selecciona una cantidad de donación o introduce otra cantidad.</div>';
          return;
        }
        feedback.innerHTML = `<div class="alert alert-success">✅ ¡Gracias ${nombreVal}! Tu donación de ${monto} € ayudará a proteger al panda rojo. Recibirás un email en ${emailVal}.</div>`;
        form.reset();
        if (customCheck) customCheck.checked = false;
        if (customInput) customInput.value = '';
      });
    })();
 