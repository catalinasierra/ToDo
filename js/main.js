window.onload = () => {
    document.querySelector('#titulo').addEventListener('keypress', agregarTarea);

    let tareas = localStorage.getItem('tareas');

    if (tareas == null) {
        localStorage.setItem('tareas', JSON.stringify([]));
    } else {
        renderizarTareas();
    }
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
        almacenarTarea(tarea);

        this.value = '';
        localStorage.setItem("Clave", titulo);
        datos = localStorage.getItem("Clave");
        console.log(datos);
    }
}

function mostrarTarea(tarea) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const label = document.createElement('label');
    const inputCheckbox = document.createElement('input');
    const titulo = document.createTextNode(tarea.titulo);

    inputCheckbox.type = 'checkbox'
    inputCheckbox.value = ''
    inputCheckbox.addEventListener('change', () => {
        const respuesta = confirm('¿Realmente terminó la tarea?');

        if (respuesta) {
            marcarComoRealizado(tarea);
            li.parentElement.removeChild(li);
        }
    });

    li.classList.add('ui-state-default');
    div.classList.add('checkbox');

    label.appendChild(inputCheckbox);
    label.appendChild(titulo);
    div.appendChild(label);
    li.appendChild(div);

    document.querySelector('ul.list-unstyled').appendChild(li);
}

function marcarComoRealizado(tarea) {
    const li = document.createElement('li');
    const titulo = document.createTextNode(tarea.titulo);
    const button = document.createElement('button');
    const i = document.createElement('i');
    button.classList.add('remove-item');
    button.classList.add('btn');
    button.classList.add('btn-danger');
    button.classList.add('btn-xs');
    button.classList.add('pull-right');

    i.classList.add('fa-sharp');
    i.classList.add('fa-solid');
    i.classList.add('fa-trash');
    button.appendChild(i);

    li.appendChild(titulo);
    li.appendChild(button);

    document.querySelectorAll('ul.list-unstyled')[1].appendChild(li);

    button.addEventListener('click', () => {
        li.parentElement.removeChild(li);
    });
}

function almacenarTarea(tarea) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas.push(tarea);

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function renderizarTareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));

    // TODO: Renderizar en el DOM las tareas existentes:
    for(const tarea of tareas) {
        console.log(tarea);
        console.log(typeof tarea);
    }
}
