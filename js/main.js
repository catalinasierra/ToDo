window.onload = () => {
    document.querySelector('#titulo').addEventListener('keypress', agregarTarea)
}


function agregarTarea(event) {
    if (event.charCode == 13) {
        const titulo = this.value.trim();

        if (!titulo.length) {
            alert('Debe escribir un texto.');
            return;
        }


        var id = new Date().getTime().toString();
        let fecha = moment().format('YYYY-MM-DD H:mm:ss');
        const status = false;
        const tarea = new ToDo(id, titulo, fecha, status);

        mostrarTarea(tarea);
        this.value = '';
    }
}

function mostrarTarea(tarea) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const titulo = document.createTextNode(tarea.titulo);

    input.type = 'checkbox'
    input.value = ''
    input.addEventListener('change', () => {
        const respuesta = confirm('¿Realmente terminó la tarea?');

        if (respuesta) {
            alert('Quitaremos la tarea');
            marcarComoRealizado(tarea);
        }
    })
    
    li.classList.add('ui-state-default');
    div.classList.add('checkbox');

    label.appendChild(input);
    label.appendChild(titulo);
    div.appendChild(label);
    li.appendChild(div);

    document.querySelector('ul.list-unstyled').appendChild(li);
}
