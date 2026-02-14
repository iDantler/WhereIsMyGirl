# 💗 Proyecto San Valentín - Arquitectura Modular

## 📁 Estructura del Proyecto

```
Dan/
├── index.html              # Página principal
├── styles.css              # ⚠️ Archivo original (ya no se usa)
├── script.js               # ⚠️ Archivo original (ya no se usa)
│
├── css/                    # 🎨 Estilos modulares
│   ├── base.css           # Variables, reset, estilos generales
│   ├── navbar.css         # Barra de navegación y theme toggle
│   ├── hero.css           # Sección hero con animaciones
│   ├── sections.css       # Secciones generales
│   ├── cards.css          # Tarjetas y acordeones
│   ├── gallery.css        # Galería y lightbox
│   ├── playlist.css       # Playlist y cupones
│   ├── modal.css          # Modal de respuesta
│   ├── tu-tienda.css      # Tarjetas animadas Tu Tienda
│   ├── splash.css         # Pantalla de bienvenida
│   ├── dark-mode.css      # Estilos para modo oscuro
│   └── responsive.css     # Media queries responsive
│
├── js/                     # ⚡ JavaScript modular
│   ├── scroll.js          # Scroll suave y animaciones
│   ├── accordion.js       # Acordeones interactivos
│   ├── modal.js           # Modal de respuesta con localStorage
│   ├── splash.js          # Animación splash screen con confeti
│   ├── theme.js           # Toggle dark/light mode
│   ├── tu-tienda.js       # Animación de cartas Tu Tienda
│   ├── gallery.js         # Lightbox para imágenes/videos
│   └── typewriter.js      # Efecto typewriter en hero
│
├── img/                    # 🖼️ Recursos multimedia
│   ├── Background/
│   ├── Cursor/
│   ├── Favicon/
│   ├── Iconos/
│   └── Images/
│       └── Videos/
│
└── components/             # 📦 Componentes (vacío por ahora)
```

## 🔧 Ventajas de la Modularización

### CSS Modular
- **Mantenimiento**: Cada archivo CSS es independiente y fácil de editar
- **Rendimiento**: Solo carga los estilos necesarios
- **Claridad**: Cada módulo tiene un propósito específico
- **Reutilización**: Los módulos se pueden usar en otros proyectos

### JavaScript Modular
- **Debugging**: Más fácil encontrar y corregir errores
- **Escalabilidad**: Agregar nuevas funcionalidades sin afectar el código existente
- **Colaboración**: Varios desarrolladores pueden trabajar en módulos diferentes
- **Testing**: Cada módulo se puede probar de forma independiente

## 📝 Orden de Carga

### CSS (en index.html)
```html
1. base.css       → Variables y estilos fundamentales
2. navbar.css     → Navegación
3. hero.css       → Hero section
4. sections.css   → Secciones generales
5. cards.css      → Tarjetas y acordeones
6. gallery.css    → Galería
7. playlist.css   → Playlist
8. modal.css      → Modales
9. tu-tienda.css  → Tu Tienda
10. splash.css    → Splash screen
11. dark-mode.css → Modo oscuro (sobrescribe estilos base)
12. responsive.css → Media queries (último para sobrescribir)
```

### JavaScript (en index.html)
```html
1. scroll.js      → Scroll suave y animaciones
2. accordion.js   → Acordeones
3. modal.js       → Modal de respuesta
4. splash.js      → Splash screen
5. theme.js       → Dark mode
6. tu-tienda.js   → Cartas animadas
7. gallery.js     → Lightbox
8. typewriter.js  → Efecto typewriter
```

## 🎯 Cómo Editar

### Para cambiar colores o variables:
→ Editar `css/base.css` (modifica las variables CSS en `:root`)

### Para modificar la navegación:
→ Editar `css/navbar.css` y `js/theme.js`

### Para cambiar animaciones del hero:
→ Editar `css/hero.css` y `js/typewriter.js`

### Para ajustar acordeones:
→ Editar `css/cards.css` y `js/accordion.js`

### Para modificar la galería:
→ Editar `css/gallery.css` y `js/gallery.js`

### Para cambiar el modal de respuesta:
→ Editar `css/modal.css` y `js/modal.js`

### Para ajustar las cartas de Tu Tienda:
→ Editar `css/tu-tienda.css` y `js/tu-tienda.js`

### Para cambiar estilos responsive:
→ Editar `css/responsive.css`

### Para modificar el dark mode:
→ Editar `css/dark-mode.css` y `js/theme.js`

## ⚙️ Archivos Originales

Los archivos `styles.css` y `script.js` originales **ya no se utilizan** pero se mantienen como respaldo. 

Para eliminarlos (opcional):
```bash
# Windows PowerShell
Remove-Item styles.css
Remove-Item script.js
```

## 🚀 Próximos Pasos

1. ✅ Código modularizado completamente
2. 📤 Implementar envío de respuestas a Excel (siguiente paso)
3. 🔄 Optimizar carga de recursos
4. 📱 Mejorar responsive en tablets

## 💡 Notas

- Todos los archivos CSS y JS están comentados para facilitar su comprensión
- Los módulos son independientes pero algunos dependen de la estructura HTML
- El orden de carga es importante para evitar errores
- Los archivos usan rutas relativas desde la raíz del proyecto
