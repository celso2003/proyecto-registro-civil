// Selección de elementos del DOM
const menuItems = document.querySelectorAll('.menu-item-dropdown');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const recordatorioList = document.getElementById('recordatorio-list');
const recordatorioForm = document.getElementById('recordatorio-form');
const recordatorioNombre = document.getElementById('recordatorio-nombre');

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

// Función para obtener y mostrar los recordatorios
async function fetchRecordatorios() {
    const response = await fetch('/api/recordatorios/listar');
    const recordatorios = await response.json();
    recordatorioList.innerHTML = ''; // Limpiar la lista de recordatorios
    recordatorios.forEach(recordatorio => {
        const li = document.createElement('li');

        const icon = document.createElement('i');
        icon.classList.add('bx', 'bxs-bell'); // Usando Boxicons para el ícono de campanita

        const textSpan = document.createElement('span');
        textSpan.textContent = recordatorio.nombre;

        const deleteContainer = document.createElement('div');
        deleteContainer.classList.add('delete-container');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', async () => {
            await deleteRecordatorio(recordatorio.id);
            fetchRecordatorios(); // Volver a cargar los recordatorios después de eliminar uno
        });

        deleteContainer.appendChild(deleteBtn);
        li.appendChild(icon);
        li.appendChild(textSpan);
        li.appendChild(deleteContainer);
        recordatorioList.appendChild(li);
    });
}

// Función para eliminar un recordatorio por su ID
async function deleteRecordatorio(id) {
    await fetch(`/api/recordatorios/${id}`, {
        method: 'DELETE'
    });
}

// Añade un evento de envío al formulario de recordatorios
recordatorioForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nombre = recordatorioNombre.value;
    const response = await fetch('/api/recordatorios/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    });
    if (response.ok) {
        fetchRecordatorios(); // Volver a cargar los recordatorios después de crear uno nuevo
        recordatorioNombre.value = ''; // Limpiar el campo de entrada
    }
});

// Cargar los recordatorios al cargar la página
fetchRecordatorios();