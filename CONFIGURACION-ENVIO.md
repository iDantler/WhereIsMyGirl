# 📧 Guía de Configuración - Sistema de Envío de Respuestas

## 🎯 Objetivo
Configurar el sistema para que las respuestas del modal se envíen automáticamente a tu email.

---

## ✅ Opción 1: EmailJS (Recomendada - MÁS FÁCIL)

### Paso 1: Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (es GRATIS hasta 200 emails/mes)
3. Regístrate con tu email

### Paso 2: Configurar el servicio de email
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Conéctalo con tu cuenta
5. Copia el **Service ID** (lo necesitarás después)

### Paso 3: Crear una plantilla de email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. En el editor, usa esta plantilla:

```
Subject: 💌 Nueva respuesta de Paola

De: Paola
Fecha: {{date}}

Mensaje:
{{message}}
```

4. Guarda y copia el **Template ID**

### Paso 4: Obtener tu Public Key
1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key**

### Paso 5: Añadir EmailJS a tu proyecto

Agrega este script en el `<head>` de tu [index.html](index.html), antes de los otros scripts:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init('AE5Ol3cUljRG0Eja1'); // Reemplazar con tu Public Key
  })();
</script>
```

### Paso 6: Actualizar el código en modal.js

Abre [js/modal.js](js/modal.js) y busca la línea 58 donde dice:

```javascript
// OPCIÓN 1: EmailJS (requiere configuración - ver instrucciones abajo)
// Descomenta estas líneas después de configurar EmailJS:
/*
const response = await emailjs.send(
```

**Descomenta ese bloque** (quita `/*` y `*/`) y reemplaza:
- `'YOUR_SERVICE_ID'` → con tu Service ID
- `'YOUR_TEMPLATE_ID'` → con tu Template ID
- `'YOUR_PUBLIC_KEY'` → con tu Public Key

**Comenta o elimina** la sección "OPCIÓN 2: Google Forms" (líneas 67-78)

### Paso 7: ¡Listo!
Recarga la página y prueba enviar un mensaje. Deberías recibirlo en tu email.

---

## ✅ Opción 2: Google Forms (Alternativa)

### Paso 1: Crear un Google Form
1. Ve a [https://forms.google.com](https://forms.google.com)
2. Crea un nuevo formulario
3. Añade una pregunta de **"Respuesta larga"**
4. Título: "Mensaje de Paola"

### Paso 2: Configurar respuestas
1. Ve a "Respuestas" → Icono de hoja de cálculo verde
2. Crea una hoja de cálculo vinculada
3. Ahí verás todos los mensajes que se envíen

### Paso 3: Obtener el Entry ID
1. Abre tu formulario en modo "Vista previa"
2. Abre la consola del navegador (F12)
3. Ve a la pestaña "Network"
4. Envía el formulario con un mensaje de prueba
5. Busca la petición que empieza con "formResponse"
6. En "Payload" verás algo como `entry.123456789=mensaje`
7. Copia ese número (el Entry ID)

### Paso 4: Obtener la URL del formulario
1. En tu formulario, haz clic en "Enviar"
2. Copia el enlace del formulario

### Paso 5: Actualizar el código

En [js/modal.js](js/modal.js), línea 73, reemplaza:

```javascript
formData.append('entry.YOUR_ENTRY_ID', mensaje);
```

Por:

```javascript
formData.append('entry.TU_ENTRY_ID_REAL', mensaje);

// Y añade después:
await fetch('https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse', {
  method: 'POST',
  mode: 'no-cors',
  body: formData
});
```

---

## 🎨 Personalización

### Cambiar el mensaje de notificación
En [js/modal.js](js/modal.js), línea 83:
```javascript
mostrarNotificacion('¡Mensaje enviado con éxito! 💕', 'success');
```

### Cambiar colores de notificaciones
En [js/modal.js](js/modal.js), línea 97, modifica los colores:
```javascript
background: ${tipo === 'success' ? 'var(--primary)' : '#d32f2f'};
```

---

## 📊 Ver las respuestas

### Con EmailJS:
- Las recibirás directamente en tu email configurado
- Puedes crear filtros en Gmail para organizarlas

### Con Google Forms:
- Ve a tu hoja de cálculo de Google Sheets
- Todas las respuestas aparecerán automáticamente con fecha y hora

---

## 🐛 Solución de Problemas

### El mensaje no se envía
1. Verifica que hayas añadido el script de EmailJS al HTML
2. Revisa la consola del navegador (F12) para ver errores
3. Asegúrate de haber inicializado EmailJS con tu Public Key
4. Verifica que los IDs sean correctos

### No recibo emails
1. Revisa tu carpeta de spam
2. Verifica que el servicio de email esté activo en EmailJS
3. Comprueba que hayas llegado al límite mensual (200 gratis)

### Google Forms no funciona
1. Asegúrate de que el formulario acepte respuestas
2. Verifica que el Entry ID sea correcto
3. La respuesta se guarda aunque no veas confirmación (mode: 'no-cors')

---

## 💡 Recomendación

**Usa EmailJS** - Es más directo, recibes notificaciones instantáneas y es más profesional.

Si tienes dudas, pregúntame y te ayudo con la configuración paso a paso.
