// Función para cargar componentes HTML
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Error cargando ${componentPath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    return true;
  } catch (error) {
    console.error('Error al cargar componente:', error);
    return false;
  }
}

// Función para cargar todos los componentes
async function loadAllComponents() {
  const components = [
    { id: 'header-container', path: 'components/header.html' },
    { id: 'footer-container', path: 'components/footer.html' }
  ];

  await Promise.all(components.map(({ id, path }) => loadComponent(id, path)));
  
  // Disparar evento cuando los componentes estén cargados
  document.dispatchEvent(new Event('componentsLoaded'));
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAllComponents);