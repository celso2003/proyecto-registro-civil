document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    const run = document.getElementById('run');
    const apodo = document.getElementById('apodo');
    const nombre = document.getElementById('nombre');
    const apellidoPaterno = document.getElementById('apellidoPaterno');
    const apellidoMaterno = document.getElementById('apellidoMaterno');
    const area = document.getElementById("area");
    const cargo = document.getElementById('cargo');
    const oficina = document.getElementById('oficina');
    const dotacion = document.getElementById('dotacion');
    const dotacionEfectiva = document.getElementById('dotacionEfectiva');
    const estadoOficina = document.getElementById('estadoOficina');
    const atencionHoy = document.getElementById('atencionHoy');
    const oficinaOpera = document.getElementById('oficinaOpera');
    const motivoNoOpera = document.getElementById('motivoNoOpera');
    const atencionParcialMotivo = document.getElementById('atencionParcialMotivo');
    const observacion = document.getElementById('observacion');
    const siguienteBtn = document.getElementById('siguienteBtn');

    /*
    // Habilitar o deshabilitar atencionParcialMotivo según estadoOficina
    estadoOficina.addEventListener('change', function () {
        if (this.value === "Operativo Parcial") {
            atencionParcialMotivo.disabled = false; // Habilitar el select
        } else {
            atencionParcialMotivo.disabled = true; // Deshabilitar el select
            atencionParcialMotivo.value = "0"; // Resetear el valor
        }
    });

    // Habilitar o deshabilitar motivoNoOpera según oficinaOpera
    estadoOficina.addEventListener('change', function () {
        if (this.value === "No Operativo") {
            motivoNoOpera.disabled = false; // Habilitar el select
        } else {
            motivoNoOpera.disabled = true; // Deshabilitar el select
            motivoNoOpera.value = "0"; // Resetear el valor
        }
    });
    */

    // Función para validar el formulario
    function validarFormulario() {
        // Verifica si los campos obligatorios están vacíos o no se han seleccionado opciones válidas
        if (run.value === "0" || !nombre.value || !apellidoPaterno.value || !apellidoMaterno.value || 
            area.value === "0" || cargo.value === "0" || oficina.value === "" || !dotacion.value || 
            !dotacionEfectiva.value || estadoOficina.value == "0" || atencionHoy.value == "0" 
            || oficinaOpera.value == "0" || motivoNoOpera.value == "0" || atencionParcialMotivo.value == "0") {
            alert("Por favor, complete todos los campos obligatorios.");
            return false;
        }
        if (estadoOficina.value == "0" || atencionHoy.value == "0" || oficinaOpera.value == "0" || motivoNoOpera.value == "0") {
            alert("Por favor, seleccione una opción válida.");
            return false;
        }
        return true;
    }

    // Validar dotacionEfectiva en tiempo real
    dotacionEfectiva.addEventListener('input', function () {
        const valor = parseFloat(this.value); // Convertir el valor a número

        // Verificar si el valor es negativo o 0
        if (valor <= 0) {
            this.setCustomValidity("La dotación efectiva debe ser mayor que 0."); // Mensaje de error
            this.reportValidity(); // Mostrar el mensaje de error
        } else {
            this.setCustomValidity(""); // Limpiar el mensaje de error si el valor es válido
        }
    });

    // Función genérica para cargar opciones desde el servidor
    function cargarOpciones(url, selectElement, defaultText, valueKey, textKey) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                selectElement.innerHTML = `<option value="0">${defaultText}</option>`;
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item[valueKey];
                    option.textContent = item[textKey];
                    selectElement.appendChild(option);
                });
            })
            .catch(error => alert(`Error al cargar datos desde ${url}`));
    }

    // Función para cargar usuarios desde el servidor
    function cargarUsuarios() {
        fetch('http://localhost:8080/api/funcionarios/todos')
            .then(response => response.json())
            .then(data => {
                run.innerHTML = '<option value="0">Seleccione un RUN</option>';
                data.forEach(usuario => {
                    const option = document.createElement('option');
                    option.value = usuario.run;
                    option.textContent = usuario.run;
                    run.appendChild(option);
                });
            })
            .catch(error => alert('Error al cargar usuarios. Intente de nuevo.'));
    }

    // Función para autocompletar campos cuando se selecciona un RUN
    function autocompletarCampos() {
        const selectedRun = run.value;
        if (selectedRun !== "0") {
            fetch(`http://localhost:8080/api/funcionarios/${selectedRun}`)
                .then(response => response.json())
                .then(data => {
                    // Asignar el nombre del apodo
                    const apodoOption = Array.from(apodo.options).find(option => option.textContent === data.apodo?.nombreApodo);
                    if (apodoOption) apodo.value = apodoOption.value;

                    nombre.value = data.nombre || '';
                    apellidoPaterno.value = data.apellidoPaterno || '';
                    apellidoMaterno.value = data.apellidoMaterno || '';

                    // Asignar el nombre del área
                    const areaOption = Array.from(area.options).find(option => option.textContent === data.area?.nombreArea);
                    if (areaOption) area.value = areaOption.value;

                    // Asignar el nombre del cargo
                    const cargoOption = Array.from(cargo.options).find(option => option.textContent === data.cargo?.nombreCargo);
                    if (cargoOption) cargo.value = cargoOption.value;
                })
                .catch(() => alert("No se encontraron datos para el RUN seleccionado."));
        } else {
            limpiarCampos();
        }
    }

    // Función para limpiar los campos del formulario
    function limpiarCampos() {
        [apodo, nombre, apellidoPaterno, apellidoMaterno, area, cargo].forEach(el => el.value = '');
    }

    // Función para cargar oficinas
    function cargarOficinas() {
        fetch('/api/oficinas/todos')
            .then(response => response.json())
            .then(data => {
                oficina.innerHTML = '<option value="">Seleccione una oficina</option>';
                data.forEach(oficinaItem => {
                    const oficinaOption = document.createElement('option');
                    oficinaOption.value = oficinaItem.id_oficina;  // Solo guardamos el ID de la oficina
                    oficinaOption.textContent = `${oficinaItem.id_oficina} - ${oficinaItem.nombreOficina}`;
                    oficina.appendChild(oficinaOption);
                });
            })
            .catch(error => console.error('Error al cargar oficinas:', error));
    }

    // Función para autocompletar campos según la oficina seleccionada
    oficina.addEventListener("change", function() {
        if (this.value) {
            fetch(`/api/oficinas/${this.value}`)
                .then(response => response.json())
                .then(oficinaSeleccionada => {
                    dotacion.value = oficinaSeleccionada.dotacion;  // Recuperamos la dotación
                })
                .catch(error => console.error('Error al obtener oficina:', error));
        }
    });

    // Función para limpiar el formulario
    function limpiarFormulario() {
        run.value = "0"; // Resetear el select de RUN
        apodo.value = "0"; // Resetear el select de apodo
        nombre.value = ""; // Limpiar el campo de nombre
        apellidoPaterno.value = ""; // Limpiar el campo de apellido paterno
        apellidoMaterno.value = ""; // Limpiar el campo de apellido materno
        area.value = "0"; // Resetear el select de área
        cargo.value = "0"; // Resetear el select de cargo
        oficina.value = ""; // Resetear el select de oficina
        dotacion.value = ""; // Limpiar el campo de dotación
        dotacionEfectiva.value = ""; // Limpiar el campo de dotación efectiva
        estadoOficina.value = "0"; // Resetear el select de estado de la oficina
        atencionHoy.value = "0"; // Resetear el select de atención hoy
        oficinaOpera.value = "0"; // Resetear el select de oficina opera
        motivoNoOpera.value = "0"; // Resetear el select de motivo no opera
        atencionParcialMotivo.value = "0"; // Resetear el select de atención parcial
        observacion.value = ""; // Limpiar el campo de observación
    }

    // Cargar las oficinas al cargar la página
    cargarOficinas();

    // Cargar usuarios y opciones
    cargarUsuarios();
    cargarOpciones('http://localhost:8080/api/apodos/todos', apodo, 'Seleccione un apodo', 'idApodo', 'nombreApodo');
    cargarOpciones('http://localhost:8080/api/cargos/todos', cargo, 'Seleccione un cargo', 'idCargo', 'nombreCargo');
    cargarOpciones('http://localhost:8080/api/areas/todos', area, 'Seleccione un área', 'idArea', 'nombreArea');
    run.addEventListener('change', autocompletarCampos);

    // Función para enviar el formulario
    siguienteBtn.addEventListener("click", async function(event) {
        event.preventDefault();

        // Validar el formulario antes de enviar
        if (!validarFormulario()) {
            return; // Detener la ejecución si el formulario no es válido
        }
        
        // Obtener los nombres en lugar de los IDs
        const nombreArea = area.options[area.selectedIndex].textContent;
        const nombreCargo = cargo.options[cargo.selectedIndex].textContent;
        const nombreApodo = apodo.options[apodo.selectedIndex].textContent;
        const nombreOficina = oficina.options[oficina.selectedIndex].textContent.split(" - ")[1];

        const trabajo = {
            usuario: nombreApodo,  // Nombre del apodo
            run: run.value,
            nombres: nombre.value,
            apellidoPaterno: apellidoPaterno.value,
            apellidoMaterno: apellidoMaterno.value,
            area: nombreArea,  // Nombre del área
            cargo: nombreCargo,  // Nombre del cargo
            fecha: new Date().toISOString().split("T")[0],
            oficina: nombreOficina,  // Nombre de la oficina
            dotacion: dotacion.value,
            dotacionEfectiva: dotacionEfectiva.value,
            estadoOficina: estadoOficina.value,
            atencionHoy: atencionHoy.value,
            oficinaOpera: oficinaOpera.value,
            motivoNoOpera: motivoNoOpera.value,
            atencionParcialMotivo: atencionParcialMotivo.value,
            observacion: observacion.value
        };

        console.log("Datos que se van a enviar:", trabajo);  // Verifica que los datos sean correctos

        try {
            const response = await fetch("http://localhost:8080/api/trabajos/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(trabajo)
            });

            if (response.ok) {
                alert("Informe Diario guardado exitosamente");
                limpiarFormulario(); 
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