// Espera a que todo el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
  
    // Referencias a los elementos del DOM
    const agregarBtn = document.getElementById('agregar'); // Botón para agregar un nuevo ítem
    const limpiarBtn = document.getElementById('limpiar'); // Botón para limpiar la lista
    const inputItem = document.getElementById('item'); // Campo de entrada para el nuevo ítem
    const contenedor = document.getElementById('contenedor'); // Contenedor de la lista de ítems

    // Función para obtener el listado del almacenamiento local
    function obtenerListado() {
        // Obtiene el listado guardado en localStorage con la clave 'listado'
        const listado = localStorage.getItem('listado');
        // Si hay un listado guardado, lo parsea como JSON, de lo contrario, retorna un array vacío
        return listado ? JSON.parse(listado) : [];
    }

    // Función para guardar el listado en el almacenamiento local
    function guardarListado(listado) {
        // Guarda el listado en localStorage como una cadena JSON con la clave 'listado'
        localStorage.setItem('listado', JSON.stringify(listado));
    }

    // Función para actualizar la vista del listado
    function actualizarVista() {
        // Obtiene el listado del almacenamiento local
        const listado = obtenerListado();
        // Limpia el contenedor actual para evitar duplicados
        contenedor.innerHTML = '';

        // Recorre el listado de ítems y crea un elemento <li> para cada uno
        listado.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Clase para el estilo

            li.textContent = item; // Establece el texto del ítem

            // Crea un botón para eliminar el ítem
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger btn-sm'; // Clase para el estilo
            btnEliminar.textContent = 'Eliminar'; // Texto del botón

            // Maneja el clic en el botón de eliminar
            btnEliminar.addEventListener('click', function() {
                eliminarItem(item); // Llama a la función para eliminar el ítem
            });

            li.appendChild(btnEliminar); // Añade el botón al <li>
            contenedor.appendChild(li); // Añade el <li> al contenedor
        });
    }

    // Función para añadir un ítem al listado
    function añadirItem(item) {
        // Obtiene el listado actual
        const listado = obtenerListado();
        // Añade el nuevo ítem al listado
        listado.push(item);
        // Guarda el listado actualizado en localStorage
        guardarListado(listado);
        // Actualiza la vista para reflejar los cambios
        actualizarVista();
    }

    // Función para eliminar un ítem del listado
    function eliminarItem(item) {
        // Obtiene el listado actual
        let listado = obtenerListado();
        // Filtra el listado para eliminar el ítem específico
        listado = listado.filter(i => i !== item);
        // Guarda el listado actualizado en localStorage
        guardarListado(listado);
        // Actualiza la vista para reflejar los cambios
        actualizarVista();
    }

    // Función para limpiar el listado
    function limpiarListado() {
        // Elimina el listado guardado en localStorage
        localStorage.removeItem('listado');
        // Actualiza la vista para reflejar que la lista está vacía
        actualizarVista();
    }

    // Maneja el clic en el botón "Agregar"
    agregarBtn.addEventListener('click', function() {
        const nuevoItem = inputItem.value.trim(); // Obtiene y limpia el texto del campo de entrada
        if (nuevoItem) { // Solo agrega el ítem si el campo no está vacío
            añadirItem(nuevoItem); // Añade el ítem al listado
            inputItem.value = ''; // Limpia el campo de entrada
        }
    });

    // Maneja el clic en el botón "Limpiar"
    limpiarBtn.addEventListener('click', function() {
        limpiarListado(); // Limpia el listado
    });

    // Actualiza la vista al cargar la página para mostrar los ítems guardados
    actualizarVista();
});
