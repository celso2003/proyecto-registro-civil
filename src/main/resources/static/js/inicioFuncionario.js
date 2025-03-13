// Selección de elementos del DOM
const menuItems = document.querySelectorAll('.menu-item-dropdown');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const recordatorioList = document.getElementById('recordatorio-list');

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

        li.appendChild(icon);
        li.appendChild(textSpan);
        recordatorioList.appendChild(li);
    });
}

// Llamar a la función para cargar los recordatorios al cargar la página
fetchRecordatorios();