// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos(); // Carga los datos de los funcionarios
    cargarOpcionesCargo(); // Carga las opciones de cargos
    cargarOpcionesUnidadLaboral(); // Carga las opciones de unidades laborales

    // Añade un evento de clic a cada enlace del menú
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const subMenu = this.nextElementSibling;
            if (subMenu) {
                subMenu.classList.toggle('open'); // Alterna la visibilidad del submenú
            }
        });
    });

    // Añade eventos de clic y envío de formulario
    document.getElementById('btn-actualizar').addEventListener('click', cargarFormularioActualizar);
    document.getElementById('formulario-actualizar-dotacion').addEventListener('submit', actualizarFuncionario);
});

// Muestra el formulario modal
function mostrarFormulario() {
    document.getElementById('formulario-modal').style.display = 'block';
}

// Cierra el formulario modal y resetea el formulario
function cerrarFormulario() {
    document.getElementById('formulario-modal').style.display = 'none';
    document.getElementById('formulario-dotacion').reset();
}

// Muestra el formulario de actualización
function mostrarFormularioActualizar() {
    document.getElementById('formulario-actualizar-modal').style.display = 'block';
}

// Cierra el formulario de actualización y resetea el formulario
function cerrarFormularioActualizar() {
    document.getElementById('formulario-actualizar-modal').style.display = 'none';
    document.getElementById('formulario-actualizar-dotacion').reset();
}

// Añade una nueva fila a la tabla de funcionarios
async function agregarFila(event) {
    event.preventDefault();

    // Crea un objeto con los datos del funcionario
    const funcionario = {
        run: document.getElementById('run').value,
        nombre: document.getElementById('nombre').value,
        apellidoPaterno: document.getElementById('apellidoPaterno').value,
        apellidoMaterno: document.getElementById('apellidoMaterno').value,
        calidad_jurídica: document.getElementById('calidad_jurídica').value,
        sigla_unidad_laboral: document.getElementById('sigla_unidad_laboral').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        edad: document.getElementById('edad').value,
        resolución_exenta: document.getElementById('resolución_exenta').value,
        fecha_resolucion_exenta: document.getElementById('fecha_resolucion_exenta').value,
        desde: document.getElementById('desde').value,
        hasta: document.getElementById('hasta').value,
        estado: document.getElementById('estado').value,
        celular_particular: document.getElementById('celular_particular').value,
        fono_oficina: document.getElementById('fono_oficina').value,
        email_institucional: document.getElementById('email_institucional').value,
        email_personal: document.getElementById('email_personal').value,
        cargo: { idCargo: document.getElementById('cargo').value },
        oficina: { id_oficina: document.getElementById('unidad_laboral').value },
        calificacion: document.getElementById('calificacion').value // Asegúrate de que este campo esté presente
    };

    try {
        // Envía una solicitud POST para crear un nuevo funcionario
        const response = await fetch('/api/funcionarios/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        if (!response.ok) {
            throw new Error('Error al guardar en la base de datos');
        }

        const nuevoFuncionario = await response.json();

        // Agrega el nuevo funcionario a la tabla en el frontend
        agregarFilaTabla(nuevoFuncionario);

        // Limpia el formulario y lo cierra
        document.getElementById('formulario-dotacion').reset();
        cerrarFormulario();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al guardar el funcionario.');
    }
}

// Añade una nueva fila a la tabla de funcionarios en el frontend
function agregarFilaTabla(funcionario) {
    const tablaBody = document.getElementById('tabla-body');

    const nuevaFila = document.createElement('tr');

    const runCompleto = funcionario.run ? funcionario.run + (funcionario.dv ? `-${funcionario.dv}` : '') : '';

    nuevaFila.innerHTML = `
        <td><input type="checkbox" class="select-row" data-run="${funcionario.run}"></td>
        <td>${runCompleto}</td>
        <td>${funcionario.nombre ? funcionario.nombre : ''}</td>
        <td>${funcionario.apellidoPaterno ? funcionario.apellidoPaterno : ''}</td>
        <td>${funcionario.apellidoMaterno ? funcionario.apellidoMaterno : ''}</td>
        <td>${funcionario.calificacion ? funcionario.calificacion : ''}</td> 
        <td>${funcionario.calidad_jurídica ? funcionario.calidad_jurídica : ''}</td>
        <td>${funcionario.oficina ? funcionario.oficina.nombreOficina : ''}</td>
        <td>${funcionario.sigla_unidad_laboral ? funcionario.sigla_unidad_laboral : ''}</td>
        <td>${funcionario.cargo ? funcionario.cargo.nombreCargo : ''}</td>
        <td>${formatearFecha(funcionario.fecha_nacimiento)}</td>
        <td>${funcionario.edad ? funcionario.edad : ''}</td>
        <td>${funcionario.resolución_exenta ? funcionario.resolución_exenta : ''}</td>
        <td>${formatearFecha(funcionario.fecha_resolucion_exenta)}</td>
        <td>${formatearFecha(funcionario.desde)}</td>
        <td>${formatearFecha(funcionario.hasta)}</td>
        <td>${funcionario.estado ? funcionario.estado : ''}</td>
        <td>${funcionario.celular_particular ? funcionario.celular_particular : ''}</td>
        <td>${funcionario.fono_oficina ? funcionario.fono_oficina : ''}</td>
        <td>${funcionario.email_institucional ? funcionario.email_institucional : ''}</td>
        <td>${funcionario.email_personal ? funcionario.email_personal : ''}</td>
    `;

    tablaBody.appendChild(nuevaFila);
}

// Elimina una fila de la tabla de funcionarios en el frontend
function eliminarFila(run) {
    const checkboxes = document.querySelectorAll('.select-row');
    checkboxes.forEach(checkbox => {
        if (checkbox.dataset.run === run.toString()) {
            const row = checkbox.closest('tr');
            row.remove();
        }
    });
}

// Formatea una fecha en formato local
function formatearFecha(fecha) {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString();
}

// Carga los datos de los funcionarios desde la API
function cargarDatos() {
    fetch('/api/funcionarios/todos')
        .then(response => response.json())
        .then(funcionarios => {
            const tablaBody = document.getElementById('tabla-body');
            tablaBody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos

            funcionarios.forEach(funcionario => {
                agregarFilaTabla(funcionario);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Carga las opciones de cargos desde la API
function cargarOpcionesCargo() {
    fetch('/api/cargos/todos')
        .then(response => response.json())
        .then(cargos => {
            const selectCargo = document.getElementById('cargo');
            const selectCargoActualizar = document.getElementById('cargo-actualizar');
            cargos.forEach(cargo => {
                const option = document.createElement('option');
                option.value = cargo.idCargo;
                option.textContent = cargo.nombreCargo;
                selectCargo.appendChild(option);
                selectCargoActualizar.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => console.error('Error al cargar los cargos:', error));
}

// Carga las opciones de unidades laborales desde la API
function cargarOpcionesUnidadLaboral() {
    fetch('/api/oficinas/todos')
        .then(response => response.json())
        .then(oficinas => {
            const selectUnidadLaboral = document.getElementById('unidad_laboral');
            const selectUnidadLaboralActualizar = document.getElementById('unidad_laboral-actualizar');
            oficinas.forEach(oficina => {
                const option = document.createElement('option');
                option.value = oficina.id_oficina;
                option.textContent = oficina.nombreOficina;
                selectUnidadLaboral.appendChild(option);
                selectUnidadLaboralActualizar.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => console.error('Error al cargar las unidades laborales:', error));
}

// Elimina un funcionario seleccionado
async function deleteFuncionario() {
    const checkboxes = document.querySelectorAll('.select-row:checked');
    if (checkboxes.length === 0) {
        alert('Por favor, seleccione al menos un funcionario para eliminar.');
        return;
    }

    const run = checkboxes[0].dataset.run;
    const url = `/api/funcionarios/eliminar/${run}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert('Funcionario eliminado exitosamente');
            eliminarFila(run);
        } else {
            alert('Error al eliminar el funcionario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el funcionario');
    }
}

// Carga los datos en el formulario al actualizar
async function cargarFormularioActualizar() {
    const checkboxes = document.querySelectorAll('.select-row:checked');

    if (checkboxes.length !== 1) {
        alert('Seleccione un único funcionario para actualizar.');
        return;
    }

    const id_funcionario = checkboxes[0].dataset.run;

    try {
        const response = await fetch(`/api/funcionarios/${id_funcionario}`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del funcionario');
        }

        const funcionario = await response.json();

        // Rellenar los datos en el formulario de actualizar
        document.getElementById('run-actualizar').value = funcionario.run;
        document.getElementById('run-actualizar').textContent = funcionario.run;
        document.getElementById('nombre-actualizar').value = funcionario.nombre;
        document.getElementById('apellidoPaterno-actualizar').value = funcionario.apellidoPaterno;
        document.getElementById('apellidoMaterno-actualizar').value = funcionario.apellidoMaterno;
        document.getElementById('calidad_jurídica-actualizar').value = funcionario.calidad_jurídica;
        document.getElementById('sigla_unidad_laboral-actualizar').value = funcionario.sigla_unidad_laboral;
        document.getElementById('fecha_nacimiento-actualizar').value = funcionario.fecha_nacimiento;
        document.getElementById('edad-actualizar').value = funcionario.edad;
        document.getElementById('resolución_exenta-actualizar').value = funcionario.resolución_exenta;
        document.getElementById('fecha_resolucion_exenta-actualizar').value = funcionario.fecha_resolucion_exenta;
        document.getElementById('desde-actualizar').value = funcionario.desde;
        document.getElementById('hasta-actualizar').value = funcionario.hasta;
        document.getElementById('estado-actualizar').value = funcionario.estado;
        document.getElementById('celular_particular-actualizar').value = funcionario.celular_particular;
        document.getElementById('fono_oficina-actualizar').value = funcionario.fono_oficina;
        document.getElementById('email_institucional-actualizar').value = funcionario.email_institucional;
        document.getElementById('email_personal-actualizar').value = funcionario.email_personal;
        document.getElementById('cargo-actualizar').value = funcionario.cargo.idCargo;
        document.getElementById('unidad_laboral-actualizar').value = funcionario.oficina.id_oficina;
        document.getElementById('calificacion-actualizar').value = funcionario.calificacion; // Añadir este campo

        // Mostrar el formulario de actualizar
        mostrarFormularioActualizar();

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los datos del funcionario.');
    }
}

// Actualiza los datos del funcionario en la API
async function actualizarFuncionario(event) {
    event.preventDefault();

    const id_funcionario = document.getElementById('run-actualizar').value;

    const funcionarioActualizado = {
        nombre: document.getElementById('nombre-actualizar').value,
        apellidoPaterno: document.getElementById('apellidoPaterno-actualizar').value,
        apellidoMaterno: document.getElementById('apellidoMaterno-actualizar').value,
        calidad_jurídica: document.getElementById('calidad_jurídica-actualizar').value,
        sigla_unidad_laboral: document.getElementById('sigla_unidad_laboral-actualizar').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento-actualizar').value,
        edad: document.getElementById('edad-actualizar').value,
        resolución_exenta: document.getElementById('resolución_exenta-actualizar').value,
        fecha_resolucion_exenta: document.getElementById('fecha_resolucion_exenta-actualizar').value,
        desde: document.getElementById('desde-actualizar').value,
        hasta: document.getElementById('hasta-actualizar').value,
        estado: document.getElementById('estado-actualizar').value,
        celular_particular: document.getElementById('celular_particular-actualizar').value,
        fono_oficina: document.getElementById('fono_oficina-actualizar').value,
        email_institucional: document.getElementById('email_institucional-actualizar').value,
        email_personal: document.getElementById('email_personal-actualizar').value,
        cargo: { idCargo: document.getElementById('cargo-actualizar').value },
        oficina: { id_oficina: document.getElementById('unidad_laboral-actualizar').value },
        calificacion: document.getElementById('calificacion-actualizar').value // Añadir este campo
    };

    try {
        // Envía una solicitud PUT para actualizar el funcionario
        const response = await fetch(`/api/funcionarios/actualizar/${id_funcionario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionarioActualizado)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el funcionario');
        }

        cerrarFormularioActualizar();
        cargarDatos();

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al actualizar el funcionario.');
    }
}