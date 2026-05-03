// ===========================
// BASE DE DATOS LOCAL
// ===========================

// Almacenamiento de calificaciones
let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];

// Variables globales para juegos
let numeroSecreto = 0;
let intentos = 0;
let quizActual = 0;
let respuestasQuiz = [];
let examenActual = 0;
let respuestasExamen = [];
let puntajeExamen = 0;

// ===========================
// JUEGO 1: ADIVINANZA DE NÚMEROS
// ===========================

function iniciarJuegoAdivinanza() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    document.getElementById('adivinanza-container').style.display = 'block';
    document.getElementById('numero-intento').value = '';
    document.getElementById('adivinanza-resultado').innerHTML = '';
}

function verificarAdivinanza() {
    const intento = parseInt(document.getElementById('numero-intento').value);
    const resultadoDiv = document.getElementById('adivinanza-resultado');

    if (!intento || intento < 1 || intento > 100) {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor ingresa un número entre 1 y 100</p>';
        return;
    }

    intentos++;

    if (intento === numeroSecreto) {
        resultadoDiv.innerHTML = `<p style="color: green; font-weight: bold;">¡Correcto! Adivinaste el número en ${intentos} intentos.</p>`;
        registrarCalificacion('Adivinanza de Números', (100 - intentos * 5), 'Juego');
    } else if (intento < numeroSecreto) {
        resultadoDiv.innerHTML = `<p style="color: blue;">El número es mayor. Intentos: ${intentos}</p>`;
    } else {
        resultadoDiv.innerHTML = `<p style="color: blue;">El número es menor. Intentos: ${intentos}</p>`;
    }
}

function cerrarJuegoAdivinanza() {
    document.getElementById('adivinanza-container').style.display = 'none';
}

// ===========================
// JUEGO 2: QUIZ DE SINTAXIS
// ===========================

const preguntasQuiz = [
    {
        pregunta: '¿Cuál es la sintaxis correcta para crear una variable en Python?',
        opciones: ['variable = valor', 'var variable = valor', 'let variable = valor', 'declare variable = valor'],
        correcta: 0
    },
    {
        pregunta: '¿Cuál es la función para imprimir en Python?',
        opciones: ['printf()', 'console.log()', 'print()', 'echo()'],
        correcta: 2
    },
    {
        pregunta: '¿Cuál es el tipo de dato para una lista en Python?',
        opciones: ['Array', 'List', 'list', 'Vector'],
        correcta: 2
    },
    {
        pregunta: '¿Cómo se crea un comentario de una línea en Python?',
        opciones: ['// comentario', '/* comentario */', '# comentario', '-- comentario'],
        correcta: 2
    },
    {
        pregunta: '¿Cuál es la función para calcular la longitud de una cadena?',
        opciones: ['length()', 'len()', 'size()', 'count()'],
        correcta: 1
    }
];

function iniciarQuiz() {
    quizActual = 0;
    respuestasQuiz = [];
    document.getElementById('quiz-container').style.display = 'block';
    mostrarPreguntaQuiz();
}

function mostrarPreguntaQuiz() {
    if (quizActual < preguntasQuiz.length) {
        const pregunta = preguntasQuiz[quizActual];
        let html = `<div class="pregunta">
            <p>${quizActual + 1}. ${pregunta.pregunta}</p>`;
        
        pregunta.opciones.forEach((opcion, index) => {
            html += `<label>
                <input type="radio" name="opcion-quiz" value="${index}">
                ${opcion}
            </label>`;
        });
        
        html += `<button onclick="siguientePreguntaQuiz()" style="margin-top: 15px; padding: 8px 15px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Siguiente</button>`;
        html += `</div>`;
        
        document.getElementById('quiz-content').innerHTML = html;
    } else {
        finalizarQuiz();
    }
}

function siguientePreguntaQuiz() {
    const seleccionada = document.querySelector('input[name="opcion-quiz"]:checked');
    
    if (seleccionada) {
        respuestasQuiz.push(parseInt(seleccionada.value));
        quizActual++;
        mostrarPreguntaQuiz();
    } else {
        alert('Por favor selecciona una respuesta');
    }
}

function finalizarQuiz() {
    let aciertos = 0;
    respuestasQuiz.forEach((resp, index) => {
        if (resp === preguntasQuiz[index].correcta) {
            aciertos++;
        }
    });
    
    const porcentaje = (aciertos / preguntasQuiz.length) * 100;
    document.getElementById('quiz-content').innerHTML = `
        <div style="text-align: center;">
            <h3>Quiz Finalizado</h3>
            <p>Acertaste: ${aciertos} de ${preguntasQuiz.length}</p>
            <p>Porcentaje: ${porcentaje.toFixed(2)}%</p>
        </div>
    `;
    
    registrarCalificacion('Quiz Sintaxis Python', porcentaje, 'Juego');
}

function cerrarQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
}

// ===========================
// JUEGO 3: EMPAREJAMIENTO
// ===========================

const conceptos = [
    { concepto: 'Variable', definicion: 'Contenedor para almacenar datos' },
    { concepto: 'Función', definicion: 'Bloque de código reutilizable' },
    { concepto: 'Lista', definicion: 'Colección ordenada de elementos' },
    { concepto: 'Diccionario', definicion: 'Colección de pares clave-valor' },
    { concepto: 'Bucle', definicion: 'Estructura que repite código' }
];

function iniciarEmparejamiento() {
    document.getElementById('emparejamiento-container').style.display = 'block';
    generarEmparejamiento();
}

function generarEmparejamiento() {
    const conceptosShuffled = [...conceptos].sort(() => Math.random() - 0.5);
    const definicionesShuffled = [...conceptos.map(c => c.definicion)].sort(() => Math.random() - 0.5);
    
    let html = `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <h4>Conceptos:</h4>`;
    
    conceptosShuffled.forEach((item, index) => {
        html += `<div style="padding: 10px; background: #f0f0f0; margin: 5px 0; border-radius: 5px; cursor: move;" draggable="true" ondragstart="dragStart(event)" data-concepto="${item.concepto}">
            ${item.concepto}
        </div>`;
    });
    
    html += `</div><div>
        <h4>Definiciones:</h4>`;
    
    definicionesShuffled.forEach((def) => {
        html += `<div style="padding: 10px; background: #e8f4f8; margin: 5px 0; border-radius: 5px; min-height: 40px;" ondrop="drop(event)" ondragover="allowDrop(event)" data-definicion="${def}">
            ${def}
        </div>`;
    });
    
    html += `</div></div>
        <button onclick="verificarEmparejamiento()" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Verificar</button>`;
    
    document.getElementById('emparejamiento-content').innerHTML = html;
}

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    event.target.textContent = data;
}

function verificarEmparejamiento() {
    alert('Emparejamiento completado. Calificación registrada.');
    registrarCalificacion('Emparejamiento de Conceptos', 85, 'Juego');
}

function cerrarEmparejamiento() {
    document.getElementById('emparejamiento-container').style.display = 'none';
}

// ===========================
// JUEGO 4: ORDENAR CÓDIGO
// ===========================

const codigosDesordenados = [
    {
        titulo: 'Crear una lista',
        lineas: ['mi_lista = []', 'mi_lista.append(1)', 'mi_lista.append(2)', 'print(mi_lista)'],
        orden: [0, 1, 2, 3]
    },
    {
        titulo: 'Crear un bucle',
        lineas: ['print(i)', 'for i in range(5):', '    pass'],
        orden: [1, 2, 0]
    },
    {
        titulo: 'Definir una función',
        lineas: ['    return x * 2', 'def duplicar(x):', 'print(duplicar(5))'],
        orden: [1, 0, 2]
    }
];

let codigoActual = 0;

function iniciarOrdenCodigo() {
    codigoActual = 0;
    document.getElementById('orden-codigo-container').style.display = 'block';
    mostrarCodigoDesordenado();
}

function mostrarCodigoDesordenado() {
    if (codigoActual < codigosDesordenados.length) {
        const codigo = codigosDesordenados[codigoActual];
        const lineasShuffled = [...codigo.lineas].sort(() => Math.random() - 0.5);
        
        let html = `<div>
            <h4>${codigo.titulo}</h4>
            <p>Ordena las líneas de código correctamente:</p>
            <div id="codigo-lines" style="border: 2px solid #ddd; padding: 15px; border-radius: 5px; background: #f9f9f9;">`;
        
        lineasShuffled.forEach((linea, index) => {
            html += `<div draggable="true" ondragstart="dragStartCodigo(event)" ondragover="allowDrop(event)" ondrop="dropCodigo(event)" style="padding: 8px; margin: 5px 0; background: white; border: 1px solid #ccc; border-radius: 3px; cursor: move;">
                ${linea}
            </div>`;
        });
        
        html += `</div><button onclick="siguienteCodigoOrdenado()" style="margin-top: 15px; padding: 8px 15px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Siguiente</button>`;
        
        document.getElementById('orden-codigo-content').innerHTML = html;
    } else {
        document.getElementById('orden-codigo-content').innerHTML = '<p style="color: green; text-align: center; font-weight: bold;">¡Felicidades! Completaste todos los ejercicios.</p>';
        registrarCalificacion('Ordenar Código', 90, 'Juego');
    }
}

let draggedElement = null;

function dragStartCodigo(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = 'move';
}

function dropCodigo(event) {
    event.preventDefault();
    if (draggedElement && draggedElement !== event.target) {
        const temp = draggedElement.textContent;
        draggedElement.textContent = event.target.textContent;
        event.target.textContent = temp;
    }
}

function siguienteCodigoOrdenado() {
    codigoActual++;
    mostrarCodigoDesordenado();
}

function cerrarOrdenCodigo() {
    document.getElementById('orden-codigo-container').style.display = 'none';
}

// ===========================
// EXAMEN FINAL
// ===========================

const preguntasExamen = [
    {
        pregunta: '¿Cuál es el resultado de 2 ** 3 en Python?',
        opciones: ['6', '8', '9', '5'],
        correcta: 1
    },
    {
        pregunta: '¿Qué hace la función len()?',
        opciones: ['Copia un objeto', 'Calcula la longitud', 'Suma elementos', 'Ordena datos'],
        correcta: 1
    },
    {
        pregunta: '¿Cuál es la estructura correcta de un condicional if?',
        opciones: ['if condicion', 'if condicion:', 'if (condicion)', 'if condicion then:'],
        correcta: 1
    },
    {
        pregunta: '¿Qué tipo de dato es ["a", "b", "c"]?',
        opciones: ['Tupla', 'Diccionario', 'Lista', 'Conjunto'],
        correcta: 2
    },
    {
        pregunta: '¿Cuál es la forma correcta de crear un diccionario vacío?',
        opciones: ['{}', '[]', 'dict()', 'a y c son correctas'],
        correcta: 3
    },
    {
        pregunta: '¿Qué hace el método .append()?',
        opciones: ['Elimina un elemento', 'Agrega un elemento', 'Ordena elementos', 'Duplica la lista'],
        correcta: 1
    },
    {
        pregunta: '¿Cuál es la salida de print(5 > 3)?',
        opciones: ['5', '3', 'True', 'False'],
        correcta: 2
    },
    {
        pregunta: '¿Cuántas veces se ejecuta este bucle: for i in range(5):?',
        opciones: ['4 veces', '5 veces', '6 veces', 'Infinitamente'],
        correcta: 1
    },
    {
        pregunta: '¿Cuál es la forma correcta de comentar en Python?',
        opciones: ['// comentario', '/* comentario */', '# comentario', '-- comentario'],
        correcta: 2
    },
    {
        pregunta: '¿Qué retorna una función sin return explícito?',
        opciones: ['0', 'Vacío', 'None', 'Error'],
        correcta: 2
    }
];

function iniciarExamen() {
    examenActual = 0;
    respuestasExamen = [];
    puntajeExamen = 0;
    document.getElementById('examen-modal').style.display = 'block';
    mostrarPreguntaExamen();
}

function mostrarPreguntaExamen() {
    if (examenActual < preguntasExamen.length) {
        const pregunta = preguntasExamen[examenActual];
        let html = `
            <div class="pregunta">
                <p><strong>${examenActual + 1}. ${pregunta.pregunta}</strong></p>`;
        
        pregunta.opciones.forEach((opcion, index) => {
            html += `<label>
                <input type="radio" name="opcion-examen" value="${index}">
                ${opcion}
            </label>`;
        });
        
        const botones = `
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                ${examenActual > 0 ? `<button onclick="anteriorExamen()" style="flex: 1; padding: 10px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer;">Anterior</button>` : ''}
                <button onclick="siguienteExamen()" style="flex: 1; padding: 10px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                    ${examenActual === preguntasExamen.length - 1 ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>
        `;
        
        html += `</div>${botones}`;
        document.getElementById('examen-content').innerHTML = html;
    }
}

function siguienteExamen() {
    const seleccionada = document.querySelector('input[name="opcion-examen"]:checked');
    
    if (seleccionada !== null) {
        respuestasExamen[examenActual] = parseInt(seleccionada.value);
        
        if (seleccionada.value == preguntasExamen[examenActual].correcta) {
            puntajeExamen += 10;
        }
        
        examenActual++;
        
        if (examenActual < preguntasExamen.length) {
            mostrarPreguntaExamen();
        } else {
            finalizarExamen();
        }
    } else {
        alert('Por favor selecciona una respuesta');
    }
}

function anteriorExamen() {
    if (examenActual > 0) {
        examenActual--;
        mostrarPreguntaExamen();
    }
}

function finalizarExamen() {
    const fecha = new Date().toLocaleDateString();
    registrarCalificacion(`Examen Final (${fecha})`, puntajeExamen, 'Examen');
    
    document.getElementById('examen-content').innerHTML = `
        <div style="text-align: center;">
            <h3>¡Examen Completado!</h3>
            <p style="font-size: 24px; color: var(--primary-color); font-weight: bold;">${puntajeExamen} / 100</p>
            <p>Calificación: ${puntajeExamen >= 70 ? 'APROBADO ✓' : 'REPROBADO ✗'}</p>
        </div>
    `;
}

function cerrarExamen() {
    document.getElementById('examen-modal').style.display = 'none';
}

// ===========================
// CALIFICACIONES
// ===========================

function registrarCalificacion(nombre, puntuacion, tipo) {
    const calificacion = {
        nombre: nombre,
        puntuacion: puntuacion.toFixed(2),
        fecha: new Date().toLocaleString(),
        tipo: tipo
    };
    
    calificaciones.push(calificacion);
    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    alert(`Calificación registrada: ${nombre} - ${puntuacion.toFixed(2)}/100`);
}

function mostrarCalificaciones() {
    document.getElementById('calificaciones-modal').style.display = 'block';
    
    if (calificaciones.length === 0) {
        document.getElementById('calificaciones-content').innerHTML = '<p style="text-align: center; color: #666;">No hay calificaciones registradas aún.</p>';
        return;
    }
    
    let html = `
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="background: var(--primary-color); color: white;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Evaluación</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Puntuación</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Tipo</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Fecha</th>
                </tr>
            </thead>
            <tbody>`;
    
    let promedio = 0;
    calificaciones.forEach(cal => {
        promedio += parseFloat(cal.puntuacion);
        html += `<tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; border: 1px solid #ddd;">${cal.nombre}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: var(--primary-color);">${cal.puntuacion}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${cal.tipo}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${cal.fecha}</td>
        </tr>`;
    });
    
    promedio = promedio / calificaciones.length;
    
    html += `</tbody></table>
        <div style="background: var(--light-color); padding: 15px; border-radius: 5px; text-align: center;">
            <p style="font-size: 1.2rem;"><strong>Promedio General:</strong> <span style="color: var(--primary-color); font-size: 1.5rem;">${promedio.toFixed(2)}/100</span></p>
        </div>`;
    
    document.getElementById('calificaciones-content').innerHTML = html;
}

function cerrarCalificaciones() {
    document.getElementById('calificaciones-modal').style.display = 'none';
}

// ===========================
// EXPORTAR A EXCEL
// ===========================

function exportarAExcel() {
    if (calificaciones.length === 0) {
        alert('No hay calificaciones para exportar.');
        return;
    }
    
    // Crear contenido CSV
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Evaluación,Puntuación,Tipo,Fecha\n';
    
    let promedio = 0;
    calificaciones.forEach(cal => {
        promedio += parseFloat(cal.puntuacion);
        csvContent += `"${cal.nombre}","${cal.puntuacion}","${cal.tipo}","${cal.fecha}"\n`;
    });
    
    promedio = promedio / calificaciones.length;
    csvContent += `\nPromedio General,${promedio.toFixed(2)},,\n`;
    
    // Crear enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `calificaciones_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
    
    alert('Archivo exportado exitosamente como CSV. Puedes abrirlo en Excel.');
}

// ===========================
// FORMULARIO DE CONTACTO
// ===========================

function enviarFormulario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    const motivo = document.getElementById('motivo').value;
    
    // Crear mensaje de correo
    const mailtoLink = `mailto:contacto@aprendepython.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(
        `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`
    )}`;
    
    // En producción, aquí iría una petición a un servidor
    // Por ahora, usaremos una simulación con localStorage
    
    const contacto = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        asunto: asunto,
        mensaje: mensaje,
        motivo: motivo,
        fecha: new Date().toLocaleString()
    };
    
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));
    
    // Mostrar mensaje de confirmación
    document.getElementById('form-mensaje').innerHTML = '<span style="color: green;">✓ Mensaje enviado correctamente. Te contactaremos pronto.</span>';
    document.getElementById('formulario-contacto').reset();
    
    // Opcionalmente, abrir cliente de correo
    // window.location.href = mailtoLink;
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
        document.getElementById('form-mensaje').innerHTML = '';
    }, 3000);
}

// ===========================
// CERRAR MODALES AL HACER CLICK FUERA
// ===========================

window.onclick = function(event) {
    const examenModal = document.getElementById('examen-modal');
    const calificacionesModal = document.getElementById('calificaciones-modal');
    
    if (event.target == examenModal) {
        examenModal.style.display = 'none';
    }
    if (event.target == calificacionesModal) {
        calificacionesModal.style.display = 'none';
    }
}

// ===========================
// SCROLL SUAVE
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Inicializar
console.log('Script cargado correctamente. Calificaciones guardadas:', calificaciones.length);
