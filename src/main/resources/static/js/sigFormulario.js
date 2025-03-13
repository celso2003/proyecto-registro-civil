document.addEventListener('DOMContentLoaded', function () {
    const runValue = localStorage.getItem("run"); // Obtiene el run almacenado en localStorage

    if (runValue) {
        document.getElementById("runInput").value = runValue; // Guarda el run en un input oculto
    }

    // Elementos del segundo formulario
    const oficina = document.getElementById('oficina');
    const dotacion = document.getElementById('dotacion');
    const fecha = document.getElementById('fecha');
    const dotacionEfectiva = document.getElementById('dotacionEfectiva');
    const estadoOficina = document.getElementById('estadoOficina');
    const atencionHoy = document.getElementById('atencionHoy');
    const oficinaOpera = document.getElementById('oficinaOpera');
    const motivoNoOpera = document.getElementById('motivoNoOpera');
    const atencionParcialMotivo = document.getElementById('atencionParcialMotivo');
    const observacion = document.getElementById('observacion');
    const enviarBtn = document.getElementById('enviarBtn');

    // Función para cargar oficinas
    function cargarOficinas() {
        fetch('/api/oficinas/todos')
            .then(response => response.json())
            .then(data => {
                console.log("Datos de oficinas recibidos:", data);
                oficina.innerHTML = '<option value="">Seleccione una oficina</option>';

                data.forEach(oficinaItem => {
                    const oficinaOption = document.createElement('option');
                    // Convertimos el objeto a JSON para guardarlo en el value
                    oficinaOption.value = JSON.stringify(oficinaItem);
                    oficinaOption.textContent = `${oficinaItem.id_oficina} - ${oficinaItem.nombreOficina}`;
                    oficina.appendChild(oficinaOption);
                });
            })
            .catch(error => console.error('Error al cargar oficinas:', error));
    }

    // Función para autocompletar campos según la oficina seleccionada
    document.getElementById("oficina").addEventListener("change", function() {
        if (this.value) {
            // Parseamos el JSON almacenado en value
            const oficinaSeleccionada = JSON.parse(this.value);
            dotacion.value = oficinaSeleccionada.dotacion; // Recuperamos la dotación
        } 
    });

    // Cargar las oficinas al cargar la página
    cargarOficinas();

    // Escuchar cambios en el select de oficina
    oficina.addEventListener('change', autocompletarCampos);

    // Función para limpiar los campos del formulario
    function limpiarCampos() {
        [apodo, nombre, apellidoPaterno, apellidoMaterno, area, cargo].forEach(el => el.value = '');
    }

    // Función para enviar el formulario
    enviarBtn.addEventListener('DOMContentLoaded', function () {
        // Recuperar el run y la fecha desde localStorage
        const runFecha = localStorage.getItem("runFecha") || "";
        console.log("RunFecha cargado:", runFecha);

        // Función para obtener la fecha actual en formato YYYY-MM-DD (para prellenar el campo de fecha)
        function obtenerFechaActual() {
            const hoy = new Date();
            const año = hoy.getFullYear();
            const mes = String(hoy.getMonth() + 1).padStart(2, '0');
            const dia = String(hoy.getDate()).padStart(2, '0');
            return `${año}-${mes}-${dia}`;
        }

        // Prellenar la fecha actual si está vacío
        if (!fecha.value) {
            fecha.value = obtenerFechaActual();
        }

        // Enviar el formulario
        document.getElementById("enviarBtn").addEventListener("click", async function(event) {
            event.preventDefault();

            const trabajo = {
                oficina: document.getElementById("oficina").value,
                dotacion: document.getElementById("dotacion").value,
                fecha: document.getElementById("fecha").value,
                dotacionEfectiva: document.getElementById("dotacionEfectiva").value,
                estadoOficina: document.getElementById("estadoOficina").value,
                atencionHoy: document.getElementById("atencionHoy").value,
                oficinaOpera: document.getElementById("oficinaOpera").value,
                motivoNoOpera: document.getElementById("motivoNoOpera").value,
                atencionParcialMotivo: document.getElementById("atencionParcialMotivo").value,
                observacion: document.getElementById("observacion").value,
                runFecha: runFecha // Enviar run y fecha almacenados
            };

            try {
                const response = await fetch("http://localhost:8080/api/trabajos/actualizar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(trabajo)
                });

                if (response.ok) {
                    alert("Trabajo guardado exitosamente");
                    window.location.href = "http://localhost:8080/formulario"; // Redirige a la siguiente página
                } else {
                    const errorData = await response.json();
                    alert("Error al guardar: " + (errorData.message || "Error desconocido"));
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    });
});