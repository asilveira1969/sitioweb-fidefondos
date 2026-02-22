# FideFondos DeFi - Plataforma de Gestión de Inversiones

Sitio web profesional para gestión de inversiones en finanzas descentralizadas (DeFi).

## 🚀 Características

- **Página Principal**: Hero section, métricas en tiempo real, preview de estrategias
- **Estrategias**: Calculadora ROI, vaults disponibles por red blockchain
- **Portafolio**: Dashboard completo con gráficos y posiciones activas
- **Sobre Nosotros**: Información de la empresa, equipo, FAQ y contacto

## 📁 Estructura del Proyecto

```text
├── index.html              # Página principal
├── strategies.html         # Estrategias de inversión
├── portfolio.html          # Dashboard de portafolio
├── about.html              # Sobre nosotros
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── resources/              # Recursos visuales (imágenes)
└── docs/                   # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Tailwind CSS** (CDN) - Framework CSS utilitario
- **JavaScript ES6+** - Lógica e interactividad
- **Anime.js** - Animaciones fluidas
- **ECharts.js** - Gráficos financieros
- **Typed.js** - Efectos de texto dinámicos
- **Chart.js** - Gráficos adicionales

## 📦 Dependencias Externas

- Tailwind CSS: `https://cdn.tailwindcss.com`
- Anime.js: `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`
- ECharts: `https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js`
- Chart.js: `https://cdn.jsdelivr.net/npm/chart.js`
- Typed.js: `https://cdn.jsdelivr.net/npm/typed.js@2.0.12`

## 🚀 Inicio Rápido

1. Abre `index.html` en tu navegador
2. No requiere servidor local para funcionamiento básico
3. Para desarrollo completo, usa un servidor local (ej: `python -m http.server` o Live Server)

## 📝 Desarrollo

Este proyecto está diseñado para ser desplegado en GitHub Pages y conectado a un dominio personalizado.

## 📄 Licencia

© 2025 FideFondos. Todos los derechos reservados.

## PC Migration

This repository uses a migration standard for moving work between PCs.

- Checklist standard: `docs/migration-checklist.md`
- Project migration report (current PC): `docs/migration-report-fidefondos-2026-02-21.md`
- Verification script (non-destructive):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-migration.ps1
```

Optional parameters:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-migration.ps1 -repo_path . -expected_branch main -expected_remote origin -project_type static-web
```
