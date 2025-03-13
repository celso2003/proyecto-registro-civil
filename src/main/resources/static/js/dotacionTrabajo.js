// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const oficina = document.getElementById('oficina');

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

    cargarOficinas();

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

    // Función para cargar nombres desde el servidor
    function cargarNombres() {
        fetch('http://localhost:8080/api/funcionarios/todos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                const selectElement = document.getElementById('nombre');
                selectElement.innerHTML = '<option value="0">Seleccione un nombre</option>';
                data.forEach(funcionario => {
                    const option = document.createElement('option');
                    option.value = funcionario.run; // El value será el run
                    option.textContent = `${funcionario.apodo.nombreApodo} -${funcionario.nombre} ${funcionario.apellidoPaterno} ${funcionario.apellidoMaterno}`; // Texto visible
                    selectElement.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar nombres:', error);
                alert('Error al cargar nombres. Intente de nuevo.');
            });
    }

    // Variable global para almacenar la fila seleccionada
    let filaSeleccionada = null;

    // Evento para el botón "buscar"
    document.getElementById('buscar').addEventListener('click', function () {
        const id_oficina = document.getElementById('oficina').value;
        const fecha = document.getElementById('fecha').value;
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar la tabla

        // Función para mostrar datos de puestosoficina
        const mostrarPuestosOficina = () => {
            fetch(`/api/puestosoficina/todos?idOficina=${id_oficina}`)
                .then(response => response.json())
                .then(dataPuestos => {
                    if (dataPuestos.length > 0) {
                        // Mostrar los datos de puestosoficina
                        dataPuestos.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                            <td>${item.puestoDeTrabajo}</td>
                            <td>${item.tipoDeTrabajo}</td>
                            <td>${item.areaDeTrabajo}</td>
                            <td>${item.nombreEstacion}</td>
                            <td>${item.telefono}</td>
                            <td>${item.direccionIp}</td>
                            <td>${item.impresora}</td>
                            <td class="usuario-run">
                                <button class="btn-asignar">Asignar Usuario</button>
                            </td>
                            <td>${item.run}</td> <!-- Espacio para RUN -->
                            <td>${item.usuario}</td> <!-- Espacio para usuario -->
                             <td>${item.nombreFuncionario}</td> <!-- Espacio para Nombre del Funcionario -->
                            <td>${item.tipoFuncionario}</td> <!-- Espacio para Tipo de Funcionario -->
                            <td>${item.categoriaFuncionario}</td> <!-- Espacio para Categoría del Funcionario -->
                        `;
                            tbody.appendChild(row);
                        });

                        cargarUsuarios(); // Cargar usuarios para asignar
                        cargarNombres(); // Cargar nombres para asignar

                        // Muestra el botón guardar
                        document.getElementById('guardar').style.display = 'inline-block';

                        document.getElementById('guardar').addEventListener('click', function () {
                            const oficina = document.getElementById('oficina').value;
                            const fecha = document.getElementById('fecha').value;
                            const rows = document.querySelectorAll('tbody tr');

                            const registros = [];

                            rows.forEach(row => {
                                const cells = row.querySelectorAll('td');

                                const registro = {
                                    oficina: { id_oficina: parseInt(oficina) },
                                    fecha: fecha,
                                    puestoDeTrabajo: cells[0].textContent,
                                    tipoDeTrabajo: cells[1].textContent,
                                    areaDeTrabajo: cells[2].textContent,
                                    nombreEstacion: cells[3].textContent,
                                    telefono: parseInt(cells[4].textContent),
                                    direccionIp: cells[5].textContent,
                                    impresora: cells[6].textContent,
                                    run: cells[8].textContent || '',
                                    usuario: cells[9].textContent || '',
                                    nombreFuncionario: cells[10].textContent || '',
                                    tipoFuncionario: cells[11].textContent || '',
                                    categoriaFuncionario: parseInt(cells[12].textContent)
                                };

                                registros.push(registro);
                            });

                            console.log(registros); // Verificar los datos en la consola

                            fetch('/api/presenciap/guardarTodos', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(registros)
                            })
                                .then(response => {
                                    console.log("Respuesta del servidor:", response);
                                    if (response.status === 200) {
                                        return response.json(); // Solo si la respuesta es correcta
                                    } else {
                                        console.log("Error en la respuesta del servidor:", response.status);
                                        return null; // No pasa a la siguiente parte si no es 200
                                    }
                                })
                                .then(data => {
                                    if (data) {
                                        console.log('Datos guardados:', data);
                                    } else {
                                        console.log('Error al guardar los datos, pero no interrumpo el flujo');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error inesperado:', error);
                                    alert('Registro enviado.');
                                    window.location.reload();
                                });
                        });

                        // Agregar evento a los botones de asignar
                        const botonesAsignar = document.querySelectorAll('.btn-asignar');
                        botonesAsignar.forEach(boton => {
                            boton.addEventListener('click', function () {
                                filaSeleccionada = this.closest('tr'); // Guardar la fila seleccionada
                                if (!filaSeleccionada) {
                                    console.error("No se pudo encontrar la fila seleccionada.");
                                    return;
                                }

                                // Mostrar el modal
                                document.getElementById('modal').style.display = 'block';
                                document.getElementById('fondo-modal').style.display = 'block';
                                alert("Seleccione un RUN o un nombre para hacer la búsqueda.");
                            });
                        });
                    } else {
                        console.log('No hay datos en puestosoficina para la oficina seleccionada.');
                    }
                })
                .catch(error => console.error('Error al obtener datos de puestosoficina:', error));
        };

        // Primero, buscar en presenciap
        fetch(`/api/presenciap/todos?idOficina=${id_oficina}&fecha=${fecha}`)
            .then(response => response.json())
            .then(dataPresencia => {
                if (dataPresencia.length === 0) {
                    // Si no hay datos en presenciap, buscar en puestosoficina
                    console.log('No hay datos en presenciap, buscando en puestosoficina...');
                    mostrarPuestosOficina();
                } else {
                    // Mostrar los datos de presenciap
                    dataPresencia.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${item.puestoDeTrabajo}</td>
                        <td>${item.tipoDeTrabajo}</td>
                        <td>${item.areaDeTrabajo}</td>
                        <td>${item.nombreEstacion}</td>
                        <td>${item.telefono}</td>
                        <td>${item.direccionIp}</td>
                        <td>${item.impresora}</td>
                        <td>${item.run}</td>
                        <td>${item.usuario}</td>
                        <td>${item.nombreFuncionario}</td>
                        <td>${item.tipoFuncionario}</td>
                        <td>${item.categoriaFuncionario}</td>
                    `;
                        tbody.appendChild(row);
                    });
                }
            })
            .catch(error => console.error('Error al obtener datos de presenciap:', error));
    });

    // Cerrar el modal con el botón "cerrar-modal"
    document.getElementById('cerrar-modal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('fondo-modal').style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de él
    document.getElementById('fondo-modal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
        this.style.display = 'none';
    });

    // Función para autocompletar campos por RUN
    function autocompletarCamposPorRun() {
        const run = document.getElementById('run').value.trim(); // Obtener y limpiar el RUN

        if (!run || run === "0" || run === "undefined") {
            console.warn("RUN no válido o no seleccionado.");
            alert("Por favor, ingrese un RUN válido.");
            return;
        }

        // Hacer la solicitud a la API
        fetch(`http://localhost:8080/api/funcionarios/${encodeURIComponent(run)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo obtener los datos del funcionario.`);
                }
                return response.json();
            })
            .then(data => {
                // Verificar si hay una fila seleccionada
                if (!filaSeleccionada) {
                    console.warn("No se encontró una fila seleccionada.");
                    alert("No se encontró una fila seleccionada. Por favor, seleccione una fila antes de enviar.");
                    return;
                }

                // Llenar las celdas correspondientes
                const celdas = filaSeleccionada.getElementsByTagName('td');
                if (celdas.length >= 12) {
                    celdas[8].textContent = run; // RUN
                    celdas[9].textContent = data.apodo.nombreApodo || '';
                    celdas[10].textContent = data.nombre + " " + data.apellidoPaterno + " " + data.apellidoMaterno || ''; // Nombre del Funcionario
                    celdas[11].textContent = data.tipo_funcionario || '';
                    celdas[12].textContent = data.calificacion || '';
                } else {
                    console.error("La fila seleccionada no tiene suficientes celdas.");
                }

                // Cerrar el modal después de completar la operación
                document.getElementById('modal').style.display = 'none';
                document.getElementById('fondo-modal').style.display = 'none';
            })
            .catch(error => {
                console.error("Error:", error.message);
                alert("No se encontraron datos para el RUN ingresado.");
            });
    }

    // Función para autocompletar campos por nombre
    function autocompletarCamposPorNombre() {
        const nombre = document.getElementById('nombre').value.trim(); // Obtener y limpiar el nombre

        if (!nombre || nombre === "0" || nombre === "undefined") {
            console.warn("Nombre no válido o no seleccionado.");
            alert("Por favor, ingrese un nombre válido.");
            return;
        }

        // Hacer la solicitud a la API
        fetch(`http://localhost:8080/api/funcionarios/${encodeURIComponent(nombre)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo obtener los datos del funcionario.`);
                }
                return response.json();
            })
            .then(data => {
                // Verificar si hay una fila seleccionada
                if (!filaSeleccionada) {
                    console.warn("No se encontró una fila seleccionada.");
                    alert("No se encontró una fila seleccionada. Por favor, seleccione una fila antes de enviar.");
                    return;
                }

                // Llenar las celdas correspondientes
                const celdas = filaSeleccionada.getElementsByTagName('td');
                if (celdas.length >= 12) {
                    celdas[8].textContent = nombre; // Nombre
                    celdas[9].textContent = data.apodo.nombreApodo || '';
                    celdas[10].textContent = data.nombre + " " + data.apellidoPaterno + " " + data.apellidoMaterno || ''; // Nombre del Funcionario
                    celdas[11].textContent = data.tipo_funcionario || '';
                    celdas[12].textContent = data.calificacion || '';
                } else {
                    console.error("La fila seleccionada no tiene suficientes celdas.");
                }

                // Cerrar el modal después de completar la operación
                document.getElementById('modal').style.display = 'none';
                document.getElementById('fondo-modal').style.display = 'none';
            })
            .catch(error => {
                console.error("Error:", error.message);
                alert("No se encontraron datos para el nombre ingresado.");
            });
    }

    // Evento para el botón "buscar-modal"
    document.getElementById('buscar-modal').addEventListener('click', function () {
        // Obtener los valores de los campos
        const run = document.getElementById('run').value.trim();
        const nombre = document.getElementById('nombre').value.trim();

        // Determinar qué función llamar según los valores ingresados
        if (run && run !== "0" && run !== "undefined") {
            autocompletarCamposPorRun();
        } else if (nombre && nombre !== "0" && nombre !== "undefined") {
            autocompletarCamposPorNombre();
        } else {
            console.warn("No se ingresó un valor válido.");
            alert("Por favor, ingrese un RUN o nombre válido.");
        }
    });
});