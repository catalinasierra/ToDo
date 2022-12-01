window.onload = () => {
    document.querySelector('#titulo').addEventListener('keypress', agregarTarea)
    document.querySelector('#checkAll').addEventListener('click', marcarTodoComoRealizado)
    let tareas = localStorage.getItem('tareas');
    if (tareas == null) {
        localStorage.setItem('tareas', JSON.stringify([]));
    } else {
        renderizarTareas();
        renderizarTareasRealizadas();
        eliminarTodo()
    }
}

function agregarTarea(event) {
    if (event.charCode == 13) {
        const titulo = this.value.trim();
        refrescarpagina()
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
    inputCheckbox.value = tarea.id;
    inputCheckbox.addEventListener('change', () => {
        Swal.fire({
            title: 'Esta seguro que realizo la tarea?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, seguro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Tarea Realizada!',
                )
                marcarComoRealizado(tarea);
                cambiarStatusTarea(tarea.id);
                li.parentElement.removeChild(li);
            }
        })
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
    for (const tarea of tareas) {
        if (!tarea.status) {
            mostrarTarea(tarea);
        }
    }
    contarTareasFaltantes()
    contarTareasRealizadas()
}
function contarTareasFaltantes() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    document.querySelector('.count-todos').innerHTML = tareas.filter(t => !t.status).length;
}
function eliminarTodo() {
    const li = document.createElement('li');
    const i = document.createElement('i');
    const button = document.createElement('button');
    button.classList.add('btn-warning');
    button.classList.add('btn');

    i.classList.add('fa-solid');
    i.classList.add('fa-trash');
    button.appendChild(i);
    li.appendChild(button);

    const todoFooter = document.querySelectorAll('.todo-footer')[1];
    console.log(document.querySelectorAll('.todolist')[1])
    todoFooter.parentElement.insertBefore(button, todoFooter)

    button.addEventListener('click', (tarea) => {
        Swal.fire({
            title: 'Esta seguro que desea eliminar todo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, seguro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Ha eliminado todo!',
                )
            eliminarTodoDefinitivo();
            var e = document.querySelectorAll('.list-unstyled')[1];
            var child = e.lastElementChild
            while (child) {
                e.removeChild(child)
                child = e.lastElementChild;
            }
            renderizarTareasRealizadas();
        }
    })
});
}
function eliminarTodoDefinitivo() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));

    tareas = tareas.filter(t => !t.status);

    localStorage.setItem('tareas', JSON.stringify(tareas));
    refrescarpagina()
}
function cambiarStatusTarea(id) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));

    const tarea = tareas.find(t => t.id == id);
    tarea.status = true;

    localStorage.setItem('tareas', JSON.stringify(tareas));
    refrescarpagina()
}
function contarTareasRealizadas() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    document.querySelector('.count-realizado').innerHTML = tareas.filter(t => t.status).length;
}
function renderizarTareasRealizadas() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    for (const tarea of tareas) {
        if (tarea.status) {
            marcarComoRealizado(tarea)
        }
    }
}
function marcarTodoComoRealizado() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    const tareasnorealizadas = tareas.filter(t => !t.status);
    for (const tarea of tareasnorealizadas) {
        if (!tarea.status) {
            tarea.status = true;
        }
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
    renderizarTareasRealizadas()
    var e = document.querySelector('.list-unstyled');
    var child = e.lastElementChild
    while (child) {
        e.removeChild(child)
        child = e.lastElementChild;
        refrescarpagina()
    }
}
function refrescarpagina() {
    location.reload()
}
