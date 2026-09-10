# Cristiano Ronaldo - Sitio web estático

Este proyecto es una primera versión de una página web estática en español sobre Cristiano Ronaldo, desarrollada con HTML semántico, CSS y JavaScript vanilla sin frameworks ni backend.

## Estructura

- `index.html` - estructura y contenido de la página
- `styles.css` - estilos responsivos y visuales
- `script.js` - interactividad de la línea de tiempo

## Cómo ejecutarlo

Desde la carpeta del proyecto, ejecuta un servidor local:

```bash
cd /Users/pez/Ejemplo1/paginaCristianoRonaldo
python3 -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

## Características incluidas

- Header, nav, main y footer semánticos
- Biografía con texto en español
- Línea de tiempo interactiva con JavaScript
- Estadísticas destacadas
- Galería con imágenes reales y textos alternativos descriptivos
- Diseño responsivo
- Enlaces externos funcionales
- Estados de foco visibles para accesibilidad

## Validación

La lógica en JavaScript fue revisada con `node --check script.js` para confirmar que no hay errores de sintaxis.
