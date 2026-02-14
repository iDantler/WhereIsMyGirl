# 🔒 Guía de Seguridad - Subir a GitHub

## ⚠️ IMPORTANTE: Proteger tus credenciales

He creado un sistema seguro para que puedas subir tu proyecto a GitHub sin exponer tus credenciales de EmailJS.

---

## 📁 Archivos Creados

### 1. `.gitignore`
Este archivo le dice a Git qué archivos NO subir. Ya incluye:
- `js/config.js` (tu archivo con credenciales reales)
- Archivos del sistema
- Dependencias
- Archivos temporales

### 2. `js/config.js` ✅ (PRIVADO - NO se sube)
Contiene tus credenciales reales:
```javascript
serviceId: 'service_rowpp9j'
templateId: 'template_8jcbild'  
publicKey: 'AE5Ol3cUljRG0Eja1'
```
**Ya está en .gitignore** - No se subirá a GitHub

### 3. `js/config.example.js` 📝 (PÚBLICO - SÍ se sube)
Plantilla para que otros configuren el proyecto:
```javascript
serviceId: 'YOUR_SERVICE_ID'
templateId: 'YOUR_TEMPLATE_ID'
publicKey: 'YOUR_PUBLIC_KEY'
```

---

## 🚀 Cómo Subir a GitHub

### Paso 1: Verificar que .gitignore funciona
```bash
# Ver qué archivos se van a subir
git status

# Asegúrate de que js/config.js NO aparece en la lista
# Solo debe aparecer js/config.example.js
```

### Paso 2: Inicializar repositorio (si no lo has hecho)
```bash
cd c:\Users\zuhou\Dan
git init
```

### Paso 3: Añadir archivos
```bash
git add .
```

### Paso 4: Verificar que config.js NO está incluido
```bash
git status

# Deberías ver:
# ✅ js/config.example.js  (incluido)
# ❌ js/config.js          (ignorado - NO aparece)
```

### Paso 5: Hacer commit
```bash
git commit -m "Proyecto San Valentín - Carta digital interactiva"
```

### Paso 6: Subir a GitHub
```bash
# Crea un nuevo repositorio en GitHub.com primero, luego:
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

---

## 👥 Para que otros usen tu proyecto

Si alguien clona tu repositorio, debe hacer esto:

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git

# 2. Copiar el archivo de ejemplo
cd TU_REPO
copy js\config.example.js js\config.js

# 3. Editar js/config.js con sus propias credenciales
# (Abrir en editor y poner sus IDs de EmailJS)
```

---

## 🔍 Verificar Seguridad

### ¿Cómo saber si mis credenciales están protegidas?

1. **Busca en GitHub**: Una vez subido, busca en tu repositorio
   - ❌ NO deberías ver `service_rowpp9j`
   - ❌ NO deberías ver `template_8jcbild`
   - ❌ NO deberías ver `AE5Ol3cUljRG0Eja1`
   - ✅ SÍ deberías ver `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, etc.

2. **Verifica .gitignore**: Asegúrate de que existe y contiene `js/config.js`

3. **Comando de verificación**:
```bash
git ls-files | findstr config
# Debería mostrar solo: js/config.example.js
# NO debe mostrar: js/config.js
```

---

## 🆘 ¿Ya subiste las credenciales por error?

Si accidentalmente subiste `config.js` con tus credenciales:

### 1. Regenera tus credenciales en EmailJS
- Ve a [EmailJS Dashboard](https://dashboard.emailjs.com)
- Genera nuevos IDs
- Actualiza tu `config.js` local

### 2. Elimina el archivo del historial de Git
```bash
# Eliminar del repositorio pero mantener local
git rm --cached js/config.js

# Hacer commit
git commit -m "Eliminar credenciales del repositorio"

# Forzar push
git push -f origin main
```

### 3. Verifica que .gitignore esté correcto
```bash
# Asegúrate de que .gitignore contiene:
js/config.js
```

---

## 📝 README sugerido para GitHub

Agrega esto a tu README.md para que otros sepan cómo configurarlo:

```markdown
## ⚙️ Configuración

1. Copia el archivo de configuración:
   ```bash
   copy js\config.example.js js\config.js
   ```

2. Edita `js/config.js` con tus credenciales de EmailJS

3. Obtén tus credenciales en [EmailJS.com](https://www.emailjs.com)
```

---

## ✅ Checklist antes de subir

- [ ] Archivo `.gitignore` existe
- [ ] `.gitignore` incluye `js/config.js`
- [ ] Archivo `js/config.example.js` existe (se subirá)
- [ ] Archivo `js/config.js` existe localmente (NO se subirá)
- [ ] Corriste `git status` y verificaste que `config.js` NO aparece
- [ ] README.md tiene instrucciones de configuración

---

## 🎯 Resumen

**PRIVADO (NO se sube):**
- `js/config.js` - Tus credenciales reales

**PÚBLICO (SÍ se sube):**
- `js/config.example.js` - Plantilla
- `.gitignore` - Lista de exclusiones
- Todos los demás archivos

¡Ahora puedes subir tu proyecto a GitHub de forma segura! 🔒
