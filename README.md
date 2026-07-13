# Proyecto Panda Rojo

Sitio web de ejemplo del curso CP Confección y Publicación Web nivel 2, basado en HTML, CSS, javscript y BS5; página optimizada (responsive, GA4) de código abierto lo puede clonar y trabajar con Vscode; y actualizar cambios directamente a infinityfree a traves de workflows.

## 🚀 Características
*   **Diseño Modular:** Componentes reutilizables estructurados para el encabezado y pie de página.
*   **Optimización SEO:** Incluye archivos `sitemap.xml` y `robots.txt` para un mejor indexado en motores de búsqueda.
*   **Página de Error Personalizada:** Cuenta con una vista `404.html` para mejorar la experiencia de usuario ante enlaces rotos.
*   **Automatización:** Configurado con GitHub Actions (`.github/workflows`) para despliegue automatizado (*deploy*).

## 📁 Estructura del Proyecto

```text
├── .github/workflows/    # Configuración de integración y despliegue continuo (CI/CD)
├── assets/images/        # Recursos visuales e imágenes del sitio
├── components/           # Componentes HTML reutilizables (Header, Footer, etc.)
├── css/                  # Hojas de estilo globales y específicas
├── js/                   # Scripts y lógica interactiva en JavaScript
├── .gitattributes        # Configuración de atributos del repositorio Git
├── .htaccess             # Directivas de configuración para servidores Apache
├── 404.html              # Pantalla personalizada para errores 404
├── donaciones.html       # Sección o página dedicada a donaciones
├── index.html            # Página de inicio principal del sitio
├── robots.txt            # Instrucciones para rastreadores web (SEO)
└── sitemap.xml           # Mapa del sitio para motores de búsqueda (SEO)
```

## 🛠️ Instalación y Uso Local

### Opción A: Abriendo un repositorio remoto

<img width="964" height="476" alt="image" src="https://github.com/user-attachments/assets/9c6eebf4-e005-4cde-8576-4d5d55cdd269" />


Puedes clonar y trabajar en este repositorio localmente utilizando cualquiera de los siguientes dos métodos:
### Opción B: Desde Visual Studio Code (Interfaz Gráfica)
1. En GitHub, haz clic en el botón verde **Code** y copia la URL de este repositorio.
2. Abre **Visual Studio Code**.
3. Presiona `Ctrl + Shift + G` para abrir la pestaña de **Control de fuentes** y haz clic en **Clonar repositorio** (o abre la paleta de comandos con `Ctrl + Shift + P` y escribe `Git: Clone`).
4. Pega la URL copiada y presiona `Enter`.
5. Selecciona la carpeta local de tu computadora donde quieras guardar el proyecto.
6. Cuando aparezca el aviso emergente abajo a la derecha, haz clic en **Abrir** para cargar el espacio de trabajo.

### Opción C: Mediante Consola de Comandos
1. Clona el repositorio en tu máquina:
   ```bash
   git clone https://github.com
   ```
2. Accede al directorio e inicia tu editor:
   ```bash
   cd tu-repositorio
   code .
   ```

---

## 📦 Flujo de Automatización (Deploy)

El archivo `.github/workflows/deploy.yml` gestiona el pipeline de Integración y Despliegue Continuo (CI/CD). Su funcionamiento consiste en reaccionar a cada actualización que subas a la nube:

* **Activación por Push:** Cada vez que haces un comando `git push` hacia la rama principal (`main`), el servidor en la nube de GitHub despierta automáticamente.
* **Entorno Virtual:** Levanta un contenedor ligero con Linux Ubuntu para procesar tus archivos.
* **Sincronización FTP Inteligente:** Utiliza la acción automatizada `SamKirkland/FTP-Deploy-Action`. Compara los archivos locales con los de tu hosting e identifica únicamente las modificaciones totales para subirlas rápidamente mediante protocolo de transferencia segura, ahorrando ancho de banda y tiempo de carga.

---

## 🔐 Configuración de Secretos en GitHub (InfinityFree)

Dado que **InfinityFree** no cuenta de forma interna con terminal remota SSH o Git, usamos sus accesos FTP vinculados de forma segura mediante **GitHub Secrets**. Sigue estos pasos para configurarlo sin exponer tus contraseñas públicamente en el código:

### Paso 1: Obtener credenciales de InfinityFree
1. Inicia sesión en el panel de control de tu cuenta en [InfinityFree](https://forum.infinityfree.com/).
2. Ve a las configuraciones de tu cuenta y busca la sección **FTP Details** o **FTP Accounts**.
3. Copia los siguientes cuatro valores clave:
   * **FTP Hostname** (Ej: `ftpupload.net`)
   * **FTP Username** (Ej: `epiz_XXXXXXXX`)
   * **FTP Password** (Tu contraseña de la cuenta)
   * **Upload Folder** (Normalmente es `/htdocs` o `/tu-dominio/htdocs/`)

### Paso 2: Guardar las variables en GitHub
1. Dirígete a la página principal de este repositorio en **GitHub**.
2. Ve a la pestaña **Settings** (Configuraciones) en el menú superior.
3. En el menú lateral izquierdo, despliega la sección **Secrets and variables** y haz clic en **Actions**.
4. Haz clic en el botón verde **New repository secret**.
5. Crea un secreto por cada credencial escribiendo el **Nombre** en mayúsculas exactamente igual al listado de abajo, introduce su respectivo valor y guárdalo presionando *Add secret*:

   * `FTP_SERVER`: Pega aquí tu *FTP Hostname*.
   * `FTP_USERNAME`: Pega aquí tu *FTP Username*.
   * `FTP_PASSWORD`: Pega aquí tu *FTP Password*.

### Código de referencia del archivo `.github/workflows/deploy.yml`
Tus secretos se vinculan dentro de tu archivo de configuración mediante la sintaxis `${{ secrets.NOMBRE }}` de la siguiente forma:

```yaml
name: 🚀 Deploy website on push

on:
  push:
    branches:
      - main # Cambiar por master si tu rama principal se llama así

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest

    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v4

      - name: 📂 Sync files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: \${{ secrets.FTP_SERVER }}
          username: \${{ secrets.FTP_USERNAME }}
          password: \${{ secrets.FTP_PASSWORD }}
          server-dir: ./htdocs/ # Asegúrate de que apunte a la carpeta pública de InfinityFree
```


## 📦 Despliegue (Deploy)
El proyecto está configurado para desplegarse automáticamente mediante **GitHub Actions** al realizar cambios en la rama principal. Revisa el flujo en la carpeta `.github/workflows` para verificar la ruta de publicación.
