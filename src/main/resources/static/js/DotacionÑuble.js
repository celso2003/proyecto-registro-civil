// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('#tabla-body tr');

    // Función para normalizar texto (eliminar acentos, convertir a mayúsculas y eliminar espacios)
    const normalizeText = (text) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/\s+/g, '');
    };

    // Borrar celdas de "¿OFICINA OPERA HOY? (SI/NO)" en adelante si "¿CORRESPONDE ATENDER HOY? (SI/NO)" es "NO"
    rows.forEach(row => {
        const atenderHoyCell = row.children[2]; // Columna "¿CORRESPONDE ATENDER HOY? (SI/NO)"
        if (normalizeText(atenderHoyCell.textContent) === 'NO') {
            for (let i = 3; i < row.children.length; i++) {
                row.children[i].textContent = '';
            }
        }
    });

    // Fetch data from the API
    fetch('/api/trabajos/todos')
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

            // Filtrar los datos por la fecha actual
            const todaysData = data.filter(trabajo => {
                const trabajoDate = new Date(trabajo.fecha_envio).toISOString().split('T')[0];
                return trabajoDate === today;
            });

            if (todaysData.length === 0) {
                console.log('No hay datos para hoy.');
            }

            todaysData.forEach(trabajo => {
                const oficina = normalizeText(trabajo.oficina);
                const oficinaOpera = normalizeText(trabajo.oficinaOpera);
                const atencionParcialMotivo = trabajo.atencionParcialMotivo;
                const motivoNoOpera = trabajo.motivoNoOpera;
                const dotacionEfectiva = trabajo.dotacionEfectiva;

                rows.forEach(row => {
                    const oficinaCell = normalizeText(row.children[0].textContent.trim());
                    const atenderHoyCell = row.children[2]; // Columna "¿CORRESPONDE ATENDER HOY? (SI/NO)"
                    if (oficinaCell === oficina && normalizeText(atenderHoyCell.textContent) !== 'NO') {
                        const operaCell = row.children[3]; // Columna "¿OFICINA OPERA HOY? (SI/NO)"
                        const motivoCell = row.children[5]; // Columna "MOTIVO OFICINA OPERATIVA PARCIAL O NO OPERATIVA"
                        const semaforoCell = row.children[4]; // Columna "SEMAFORO"
                        const presencialCell = row.children[6]; // Columna "PRESENCIAL"

                        // Remove existing semaforo classes
                        semaforoCell.classList.remove('semaforo-operativa', 'semaforo-no-operativa', 'semaforo-operatividad-parcial');

                        if (oficinaOpera === 'SI') {
                            operaCell.textContent = 'SI';
                            motivoCell.textContent = atencionParcialMotivo || 'No Aplica';
                            if (normalizeText(motivoCell.textContent) === normalizeText('No Aplica')) {
                                semaforoCell.textContent = 'OPERATIVA';
                                semaforoCell.classList.add('semaforo-operativa');
                            } else {
                                semaforoCell.textContent = 'OPERATIVIDAD PARCIAL';
                                semaforoCell.classList.add('semaforo-operatividad-parcial');
                            }
                        } else if (oficinaOpera === 'NO') {
                            operaCell.textContent = 'NO';
                            motivoCell.textContent = motivoNoOpera || 'No Aplica';
                            if (normalizeText(motivoCell.textContent) !== normalizeText('No Aplica')) {
                                semaforoCell.textContent = 'NO OPERATIVA';
                                semaforoCell.classList.add('semaforo-no-operativa');
                                presencialCell.textContent = '0'; // Set PRESENCIAL to 0 if NO OPERATIVA
                            }
                        } else {
                            operaCell.textContent = 'No Aplica';
                            motivoCell.textContent = 'No Aplica';
                        }

                        // Set dotacionEfectiva in the "PRESENCIAL" column if not NO OPERATIVA
                        if (semaforoCell.textContent !== 'NO OPERATIVA') {
                            presencialCell.textContent = dotacionEfectiva !== null ? dotacionEfectiva : 'No Aplica';
                        }
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Existing code to set "¿CORRESPONDE ATENDER HOY? (SI/NO)"
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Domingo) a 6 (Sábado)
    const date = today.getDate(); // Día del mes

    // Selección de filas de la tabla por su posición
    const bulnesRow = document.querySelector('#tabla-body tr:nth-child(1)');
    const bustamanteRow = document.querySelector('#tabla-body tr:nth-child(2)');
    const cachapoalRow = document.querySelector('#tabla-body tr:nth-child(3)');
    const chillanRow = document.querySelector('#tabla-body tr:nth-child(4)');
    const chillanSoRow = document.querySelector('#tabla-body tr:nth-child(5)');
    const chillanViejoRow = document.querySelector('#tabla-body tr:nth-child(6)');
    const cobquecuraRow = document.querySelector('#tabla-body tr:nth-child(7)');
    const coelemuRow = document.querySelector('#tabla-body tr:nth-child(8)');
    const coihuecoRow = document.querySelector('#tabla-body tr:nth-child(9)');
    const carmenRow = document.querySelector('#tabla-body tr:nth-child(10)');
    const ninhueRow = document.querySelector('#tabla-body tr:nth-child(11)');
    const pemucoRow = document.querySelector('#tabla-body tr:nth-child(12)');
    const pintoRow = document.querySelector('#tabla-body tr:nth-child(13)');
    const portezueloRow = document.querySelector('#tabla-body tr:nth-child(14)');
    const quillonRow = document.querySelector('#tabla-body tr:nth-child(15)');
    const quinchamaliRow = document.querySelector('#tabla-body tr:nth-child(16)');
    const quirihueRow = document.querySelector('#tabla-body tr:nth-child(17)');
    const ranquilRow = document.querySelector('#tabla-body tr:nth-child(18)');
    const sanCarlosRow = document.querySelector('#tabla-body tr:nth-child(19)');
    const sanFabianDeAlicoRow = document.querySelector('#tabla-body tr:nth-child(20)');
    const sanGregorioDeÑiquenRow = document.querySelector('#tabla-body tr:nth-child(21)');
    const sanIgnacioRow = document.querySelector('#tabla-body tr:nth-child(22)');
    const sanNicolasRow = document.querySelector('#tabla-body tr:nth-child(23)');
    const trehuacoRow = document.querySelector('#tabla-body tr:nth-child(24)'); // Añadir fila de Trehuaco
    const yungayRow = document.querySelector('#tabla-body tr:nth-child(25)');

    // Selección de celdas específicas de cada fila
    const bulnesCell = bulnesRow.children[2];
    const bustamanteCell = bustamanteRow.children[2];
    const cachapoalCell = cachapoalRow.children[2];
    const quinchamaliCell = quinchamaliRow.children[2];
    const chillanCell = chillanRow.children[2];
    const chillanSoCell = chillanSoRow.children[2];
    const chillanViejoCell = chillanViejoRow.children[2];
    const cobquecuraCell = cobquecuraRow.children[2];
    const coelemuCell = coelemuRow.children[2];
    const coihuecoCell = coihuecoRow.children[2];
    const carmenCell = carmenRow.children[2];
    const ninhueCell = ninhueRow.children[2];
    const pemucoCell = pemucoRow.children[2];
    const pintoCell = pintoRow.children[2];
    const portezueloCell = portezueloRow.children[2];
    const quillonCell = quillonRow.children[2];
    const quirihueCell = quirihueRow.children[2];
    const ranquilCell = ranquilRow.children[2];
    const sanCarlosCell = sanCarlosRow.children[2];
    const sanFabianDeAlicoCell = sanFabianDeAlicoRow.children[2];
    const sanGregorioDeÑiquenCell = sanGregorioDeÑiquenRow.children[2];
    const sanIgnacioCell = sanIgnacioRow.children[2];
    const sanNicolasCell = sanNicolasRow.children[2];
    const trehuacoCell = trehuacoRow.children[2]; // Añadir celda de Trehuaco
    const yungayCell = yungayRow.children[2];

    // Verificar si es el 1° o 3° martes del mes para Bustamante
    const isFirstTuesday = dayOfWeek === 2 && date <= 7;
    const isThirdTuesday = dayOfWeek === 2 && date >= 15 && date <= 21;

    if (isFirstTuesday || isThirdTuesday) {
        bustamanteCell.textContent = 'SI';
    } else {
        bustamanteCell.textContent = 'NO';
    }

    // Verificar si es el 1° o 3° jueves del mes para Cachapoal
    const isFirstThursday = dayOfWeek === 4 && date <= 7;
    const isThirdThursday = dayOfWeek === 4 && date >= 15 && date <= 21;

    if (isFirstThursday || isThirdThursday) {
        cachapoalCell.textContent = 'SI';
    } else {
        cachapoalCell.textContent = 'NO';
    }

    // Verificar si es el 1° o 3° miércoles del mes para Quinchamalí
    const isFirstWednesday = dayOfWeek === 3 && date <= 7;
    const isThirdWednesday = dayOfWeek === 3 && date >= 15 && date <= 21;

    if (isFirstWednesday || isThirdWednesday) {
        quinchamaliCell.textContent = 'SI';
    } else {
        quinchamaliCell.textContent = 'NO';
    }

    // Verificar si es martes o jueves para Trehuaco
    const isTuesdayOrThursday = dayOfWeek === 2 || dayOfWeek === 4;

    if (isTuesdayOrThursday) {
        trehuacoCell.textContent = 'SI';
    } else {
        trehuacoCell.textContent = 'NO';
    }

    // Verificar si es un día de semana (lunes a viernes)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Lunes a Viernes
        bulnesCell.textContent = 'SI';
        chillanCell.textContent = 'SI';
        chillanSoCell.textContent = 'SI';
        chillanViejoCell.textContent = 'SI';
        cobquecuraCell.textContent = 'SI';
        coelemuCell.textContent = 'SI';
        coihuecoCell.textContent = 'SI';
        carmenCell.textContent = 'SI';
        ninhueCell.textContent = 'SI';
        pemucoCell.textContent = 'SI';
        pintoCell.textContent = 'SI';
        portezueloCell.textContent = 'SI';
        quillonCell.textContent = 'SI';
        quirihueCell.textContent = 'SI';
        ranquilCell.textContent = 'SI';
        sanCarlosCell.textContent = 'SI';
        sanFabianDeAlicoCell.textContent = 'SI';
        sanGregorioDeÑiquenCell.textContent = 'SI';
        sanIgnacioCell.textContent = 'SI';
        sanNicolasCell.textContent = 'SI';
        yungayCell.textContent = 'SI';
    } else { // Fines de semana
        bulnesCell.textContent = 'NO';
        chillanCell.textContent = 'NO';
        chillanSoCell.textContent = 'NO';
        chillanViejoCell.textContent = 'NO';
        cobquecuraCell.textContent = 'NO';
        coelemuCell.textContent = 'NO';
        coihuecoCell.textContent = 'NO';
        carmenCell.textContent = 'NO';
        ninhueCell.textContent = 'NO';
        pemucoCell.textContent = 'NO';
        pintoCell.textContent = 'NO';
        portezueloCell.textContent = 'NO';
        quillonCell.textContent = 'NO';
        quirihueCell.textContent = 'NO';
        ranquilCell.textContent = 'NO';
        sanCarlosCell.textContent = 'NO';
        sanFabianDeAlicoCell.textContent = 'NO';
        sanGregorioDeÑiquenCell.textContent = 'NO';
        sanIgnacioCell.textContent = 'NO';
        sanNicolasCell.textContent = 'NO';
        yungayCell.textContent = 'NO';
    }
});

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

function descargarExcel() {
    // Obtén la tabla completa
    var tabla = document.querySelector('table');
    
    // Crea una nueva hoja de trabajo
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(tabla);
    
    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'DotacionÑuble');
    
    // Genera el archivo Excel y lo descarga
    XLSX.writeFile(wb, 'DotacionÑuble.xlsx');
}

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('#tabla-body tr');

    // Función para normalizar texto (eliminar acentos, convertir a mayúsculas y eliminar espacios)
    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
    };

    // Fetch data from the API
    fetch('/api/trabajos/todos')
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

            // Filtrar los datos por la fecha actual
            const todaysData = data.filter(trabajo => {
                const trabajoDate = new Date(trabajo.fecha_envio).toISOString().split('T')[0];
                return trabajoDate === today;
            });

            if (todaysData.length === 0) {
                console.log('No hay datos para hoy.');
            }

            todaysData.forEach(trabajo => {
                const oficina = normalizeText(trabajo.oficina);
                const oficinaOpera = normalizeText(trabajo.oficinaOpera);
                const atencionParcialMotivo = trabajo.atencionParcialMotivo;
                const motivoNoOpera = trabajo.motivoNoOpera;
                const dotacionEfectiva = trabajo.dotacionEfectiva;
                const observaciones = trabajo.observacion;

                rows.forEach(row => {
                    const oficinaCell = normalizeText(row.children[0].textContent.trim());
                    if (oficinaCell === oficina) {
                        const presencialCell = row.children[6]; // Columna "PRESENCIAL"
                        const dotacionCell = row.children[7]; // Columna "DOTACIÓN"
                        const observacionesCell = row.children[8]; // Columna "OBSERVACIONES"

                        presencialCell.textContent = dotacionEfectiva !== null ? dotacionEfectiva : 'No Aplica';
                        dotacionCell.textContent = trabajo.dotacion !== null ? trabajo.dotacion : 'No Aplica';
                        observacionesCell.textContent = observaciones !== null ? observaciones : 'No Aplica';
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});