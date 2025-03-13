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

    // Función para cargar los apodos
    function cargarApodos() {
        console.log("Cargando apodos...");
        fetch('http://localhost:8080/api/apodos/todos')
            .then(response => {
                console.log("Respuesta recibida:", response);
                if (!response.ok) {
                    throw new Error(`Error al cargar apodos: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Apodos cargados:", data);
                apodo.innerHTML = '<option value="0">Seleccione un apodo</option>';
                data.forEach(apodoItem => {
                    const apodoOption = document.createElement('option');
                    apodoOption.value = apodoItem.idApodo;
                    apodoOption.textContent = `${apodoItem.nombreApodo}`;
                    apodo.appendChild(apodoOption);
                });
            })
            .catch(error => {
                console.error('Error al cargar apodos:', error);
                alert('Error al cargar apodos. Por favor, inténtelo de nuevo.');
            });
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
                console.log('Datos recibidos:', data);
                const selectElement = document.getElementById('nombre');
                if (!selectElement) {
                    console.error('Elemento con ID "nombre" no encontrado');
                    return;
                }
                selectElement.innerHTML = '<option value="0">Seleccione un nombre</option>';
                data.forEach(funcionario => {
                    const option = document.createElement('option');
                    option.value = funcionario.run;
                    option.textContent = `${funcionario.nombre} ${funcionario.apellidoPaterno} ${funcionario.apellidoMaterno}`;
                    selectElement.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar nombres:', error);
                alert('Error al cargar nombres. Intente de nuevo.');
            });
    }

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
                            `;
                            tbody.appendChild(row);
                        });

                        // Cargar usuarios, apodos y nombres
                        cargarUsuarios();
                        cargarApodos();
                        cargarNombres();

                        // Agregar evento a los botones de asignar
                        const botonesAsignar = document.querySelectorAll('.btn-asignar');
                        botonesAsignar.forEach(boton => {
                            boton.addEventListener('click', function () {
                                // Mostrar el modal
                                document.getElementById('modal').style.display = 'block';
                                document.getElementById('fondo-modal').style.display = 'block';
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
                            <td>${item.usuarioRun}</td>
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

    // Cerrar el modal
    document.getElementById('cerrar-modal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('fondo-modal').style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de él
    document.getElementById('fondo-modal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
        this.style.display = 'none';
    });
});