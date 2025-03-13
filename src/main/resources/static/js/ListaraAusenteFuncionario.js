// Selección de elementos del DOM
const menuItems = document.querySelectorAll('.menu-item-dropdown');
const sidebar = document.getElementById('sidebar');
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

// Obtener todos los ausentes y llenar la tabla
async function getAllAusentes() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) {
            throw new Error('Error al obtener los ausentes');
        }
        const ausentes = await response.json();
        fillAusentesTable(ausentes);
    } catch (error) {
        console.error(error);
    }
}

// Llenar la tabla con los datos de los ausentes
function fillAusentesTable(ausentes) {
    const tableBody = document.querySelector('#ausentesTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    // Ordenar los ausentes por fecha_envio en orden descendente
    ausentes.sort((a, b) => new Date(b.fecha_envio) - new Date(a.fecha_envio));

    ausentes.forEach(ausente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ausente.run}</td>
            <td>${ausente.nombre}</td>
            <td>${ausente.apellidoPaterno}</td>
            <td>${ausente.apellidoMaterno}</td>
            <td>${ausente.oficina}</td>
            <td>${ausente.tipoAusentismo}</td>
            <td>${ausente.otro || ''}</td>
            <td>${new Date(ausente.fechaInicio).toLocaleDateString()}</td>
            <td>${new Date(ausente.fechaTermino).toLocaleDateString()}</td>
            <td>${ausente.observaciones}</td>
            <td>${ausente.fecha_envio ? new Date(ausente.fecha_envio).toLocaleString() : ''}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Llamar a la función para obtener y mostrar los ausentes al cargar la página
document.addEventListener('DOMContentLoaded', getAllAusentes);