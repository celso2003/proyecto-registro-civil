// Selecciona todos los elementos del menú desplegable
const menuItems = document.querySelectorAll('.menu-item-dropdown');
// Selecciona la barra lateral
const sidebar = document.getElementById('sidebar');
// Selecciona el botón del menú
const menuBtn = document.getElementById('menu-btn');

// Añade un evento de clic al botón del menú
menuBtn.addEventListener('click', () => {
    let anySubMenuOpen = false;
    menuItems.forEach((menuItem) => {
        const subMenu = menuItem.querySelector('.sub-menu');
        if (menuItem.classList.contains('sub-menu-toggled')) {
            anySubMenuOpen = true;
            menuItem.classList.remove('sub-menu-toggled');
            if (subMenu) {
                subMenu.style.height = '0';
                subMenu.style.padding = '0';
            }
        }
    });
});

// Añade un evento de clic a cada elemento del menú
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        if (sidebar.classList.contains('minimize')) {
            sidebar.classList.remove('minimize');
        } else {
            const subMenu = menuItem.querySelector('.sub-menu');
            const isActive = menuItem.classList.toggle('sub-menu-toggled');
            if (subMenu) {
                if (isActive) {
                    subMenu.style.height = `${subMenu.scrollHeight}px`;
                    subMenu.style.opacity = '1';
                } else {
                    subMenu.style.height = '0';
                    subMenu.style.padding = '0';
                }
            }
            menuItems.forEach((item) => {
                if (item !== menuItem) {
                    const otherSubMenu = item.querySelector('.sub-menu');
                    if (otherSubMenu) {
                        item.classList.remove('sub-menu-toggled');
                        otherSubMenu.style.height = '0';
                        otherSubMenu.style.padding = '0';
                    }
                }
            });
        }
    });
});

// URL base de la API
const API_URL = '/api/ausentes';

// Obtener todos los ausentes
async function getAllAusentes() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
            throw new Error('Error al obtener los ausentes');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Obtener un ausente por su id
async function getAusenteById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el ausente');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Obtener un funcionario por su RUN
async function getFuncionarioByRun(run) {
    try {
        const response = await fetch(`/api/funcionarios/${run}`);
        if (!response.ok) {
            throw new Error('Error al obtener el funcionario');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Obtener un funcionario por sus apellidos
async function getFuncionarioByApellidos(apellidoPaterno, apellidoMaterno) {
    try {
        const response = await fetch(`/api/funcionarios/buscarPorApellidos?apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}`);
        if (!response.ok) {
            throw new Error('Error al obtener el funcionario');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Obtener el nombre de la oficina por su ID
async function getOficinaById(id) {
    try {
        const response = await fetch(`/api/oficinas/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la oficina');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Crear un nuevo ausente
async function createAusente(ausente) {
    try {
        // Limpiar el RUN antes de enviarlo
        ausente.run = ausente.run.replace(/\D/g, '');

        const response = await fetch(`${API_URL}/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ausente)
        });
        if (!response.ok) {
            throw new Error('Error al crear el ausente');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Actualizar un ausente por su id
async function updateAusente(id, ausente) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ausente)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el ausente');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Eliminar un ausente por su id
async function deleteAusente(id) {
    try {
        const response = await fetch(`${API_URL}/eliminar/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el ausente');
        }
    } catch (error) {
        console.error(error);
    }
}

// Función para formatear el RUN
function formatRun(run) {
    run = run.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    if (run.length === 7) {
        run = run.slice(0, 1) + '.' + run.slice(1, 4) + '.' + run.slice(4); // Formato para 7 dígitos
    } else if (run.length === 8) {
        run = run.slice(0, 2) + '.' + run.slice(2, 5) + '.' + run.slice(5); // Formato para 8 dígitos
    } else if (run.length > 8) {
        run = run.slice(0, -5) + '.' + run.slice(-5); // Agregar punto antes de los últimos 6 dígitos
        run = run.slice(0, -9) + '.' + run.slice(-9); // Agregar punto antes de los últimos 10 dígitos
    }
    return run;
}

// Manejar autocompletado de campos al ingresar RUN
document.getElementById('run').addEventListener('input', async function() {
    let run = this.value;
    run = formatRun(run);
    this.value = run;

    const cleanRun = run.replace(/\D/g, ''); // Eliminar puntos y guion para la búsqueda
    if (cleanRun.length === 7 || cleanRun.length === 8) { // Verificar que el run tenga al menos 7 u 8 caracteres
        try {
            const funcionario = await getFuncionarioByRun(cleanRun);
            if (funcionario) {
                document.getElementById('nombre').value = funcionario.nombre;
                document.getElementById('apellidoPaterno').value = funcionario.apellidoPaterno;
                document.getElementById('apellidoMaterno').value = funcionario.apellidoMaterno;

                const idUnidadLaboral = funcionario.oficina ? funcionario.oficina.id_oficina : null;
                if (idUnidadLaboral !== undefined && idUnidadLaboral !== null) {
                    const oficina = await getOficinaById(idUnidadLaboral);
                    if (oficina) {
                        document.getElementById('oficina').value = oficina.nombreOficina;
                    } else {
                        alert('Oficina no encontrada');
                    }
                } else {
                    alert('ID de unidad laboral no encontrado');
                }
            } else {
                clearFields();
            }
        } catch (error) {
            alert('Error al obtener el funcionario');
            clearFields();
        }
    } else {
        clearFields();
    }
});

// Manejar autocompletado de campos al ingresar apellidos
document.getElementById('apellidos').addEventListener('input', async function() {
    const apellidos = this.value.split(' ');
    if (apellidos.length >= 2) {
        const apellidoPaterno = apellidos[0];
        const apellidoMaterno = apellidos[1];

        try {
            const funcionarios = await getFuncionarioByApellidos(apellidoPaterno, apellidoMaterno);
            const resultadosBusqueda = document.getElementById('resultadosBusqueda');
            resultadosBusqueda.innerHTML = '';

            if (funcionarios && funcionarios.length > 0) {
                if (funcionarios.length === 1) {
                    const funcionario = funcionarios[0];
                    document.getElementById('run').value = funcionario.run;
                    document.getElementById('runListar').value = funcionario.run; // Actualizar runListar
                    document.getElementById('nombre').value = funcionario.nombre;
                    document.getElementById('apellidoPaterno').value = funcionario.apellidoPaterno;
                    document.getElementById('apellidoMaterno').value = funcionario.apellidoMaterno;
                    document.getElementById('oficina').value = funcionario.oficina ? funcionario.oficina.nombreOficina : 'N/A';
                } else {
                    funcionarios.forEach(funcionario => {
                        const div = document.createElement('div');
                        div.classList.add('resultado-item');
                        div.innerHTML = `
                            <p><strong>RUN:</strong> ${funcionario.run}</p>
                            <p><strong>Nombre:</strong> ${funcionario.nombre}</p>
                            <p><strong>Oficina:</strong> ${funcionario.oficina ? funcionario.oficina.nombreOficina : 'N/A'}</p>
                        `;
                        div.addEventListener('click', () => {
                            document.getElementById('run').value = funcionario.run;
                            document.getElementById('runListar').value = funcionario.run; // Actualizar runListar
                            document.getElementById('nombre').value = funcionario.nombre;
                            document.getElementById('apellidoPaterno').value = funcionario.apellidoPaterno;
                            document.getElementById('apellidoMaterno').value = funcionario.apellidoMaterno;
                            document.getElementById('oficina').value = funcionario.oficina ? funcionario.oficina.nombreOficina : 'N/A';
                        });
                        resultadosBusqueda.appendChild(div);
                    });
                }
            } else {
                resultadosBusqueda.innerHTML = '<p>No se encontraron resultados</p>';
            }
        } catch (error) {
            alert('Error al obtener el funcionario');
        }
    }
});

// Limpiar los campos del formulario
function clearFields() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellidoPaterno').value = '';
    document.getElementById('apellidoMaterno').value = '';
    document.getElementById('oficina').value = '';
}

// Obtener el RUN del campo correspondiente
function obtenerRun() {
    const run = document.getElementById('run').value;
    return run;
}

// Asignar el RUN al campo runListar
function asignarRunListar() {
    const run = obtenerRun();
    document.getElementById('runListar').value = run;
}

// Mostrar u ocultar el campo "otro" basado en el tipo de ausentismo seleccionado
function mostrarOtro() {
    const tipoAusentismo = document.getElementById('tipoAusentismo').value;
    const otroContainer = document.getElementById('otro-container');
    if (tipoAusentismo === 'otro') {
        otroContainer.style.display = 'block';
    } else {
        otroContainer.style.display = 'none';
    }
}

// Alternar entre los campos de búsqueda por RUN o por apellidos
function toggleSearchFields() {
    const searchOption = document.getElementById('searchOption').value;
    const searchByRun = document.getElementById('searchByRun');
    const searchByApellidos = document.getElementById('searchByApellidos');

    if (searchOption === 'run') {
        searchByRun.style.display = 'block';
        searchByApellidos.style.display = 'none';
    } else {
        searchByRun.style.display = 'none';
        searchByApellidos.style.display = 'block';
    }
}

// Asignar el RUN al campo runListar cuando cambia la opción de búsqueda
document.getElementById('searchOption').addEventListener('change', asignarRunListar);

// Manejar el envío del formulario
document.getElementById('ausenteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoAusentismo = document.getElementById('tipoAusentismo').value;
    let otro = document.getElementById('otro').value;

    // Si el tipo de ausentismo no es "otro", eliminamos el campo "otro" del objeto
    if (tipoAusentismo !== 'otro') {
        otro = null;
    }

    // Validar que los campos obligatorios no estén vacíos
    const run = document.getElementById('run').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const oficina = document.getElementById('oficina').value; 
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaTermino = new Date(document.getElementById('fechaTermino').value);
    const observaciones = document.getElementById('observaciones').value;

    if (!run || !nombre || !apellidoPaterno || !apellidoMaterno || !oficina || !fechaInicio || !fechaTermino || !observaciones) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    // Ajustar las fechas sumando un día
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    fechaTermino.setDate(fechaTermino.getDate() + 1);

    const ausente = {
        run,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        oficina, 
        tipoAusentismo,
        otro,
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        fechaTermino: fechaTermino.toISOString().split('T')[0],
        observaciones
    };

    try {
        const nuevoAusente = await createAusente(ausente);
        alert('Ausente creado con éxito');
        document.getElementById('ausenteForm').reset(); // Limpiar el formulario
        location.reload(); // Recargar la página

    } catch (error) {
        alert('Error al crear el ausente');
    }
});
