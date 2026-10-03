# NEXUS · Telemática & Redes

Sitio web estático para las **Unidades Temáticas 1 y 2**, preparado para publicarse gratis con **GitHub Pages**.

## 1. Personalizar tus datos

Abre `script.js` y cambia solamente:

```js
const PROJECT = {
  responsible: "Moisés de Jesús Pérez Pinto",
  program: "TU CARRERA / PROGRAMA",
  bio: "TU BIOGRAFÍA BREVE"
};
```

El nombre se actualizará automáticamente en:
- encabezados de responsable,
- biografía,
- pie de página,
- iniciales del avatar.

## 2. Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `telematica-redes`).
2. Sube **el contenido de esta carpeta** a la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `script.js`
   - carpeta `assets/`
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Guarda.
6. GitHub mostrará la URL pública cuando termine el despliegue.

Ejemplo:
`https://TU-USUARIO.github.io/telematica-redes/`

## 3. Fuentes

El sitio separa:
- material base de la unidad;
- fuentes técnicas complementarias usadas para contenidos no desarrollados en las guías.

Las referencias están visibles dentro de la propia página.

## 4. Estructura

Es un sitio **single-page responsive** con navegación por secciones:
- Inicio
- Conceptos
- Redes
- Funcionamiento
- Arquitectura
- Unidad 2
- Biografía
- Referencias

No requiere framework ni proceso de compilación.


## Unidad Temática 2
Se agregó una nueva sección `#unidad2` con:
- espacio para el video de la exposición;
- resumen académico del video;
- datos del participante, asignatura y profesor.

Para insertar el video de YouTube, abre `script.js` y pega el enlace completo en:
`const UNIT2_VIDEO_URL = "";`

Ejemplo:
`const UNIT2_VIDEO_URL = "https://www.youtube.com/watch?v=XXXXXXXXXXX";`

## Mejora visual de Unidad Temática 2
Se añadió una capa visual premium a la Unidad 2 conservando la misma identidad gráfica NEXUS de la Unidad 1. Incluye comparación sincrónica/asincrónica, tarjetas de herramientas, flujo de comunidad de aprendizaje, medios, software de comunicación, reflexión personal y bloque de video/resumen. Fecha de entrega: 04 OCT.


## Video Unidad 2
El video de la exposición está incluido localmente en `assets/unidad2-exposicion.mp4` y se reproduce dentro de la página. También se conserva el enlace de YouTube: https://youtu.be/8LzHefBdqC0
