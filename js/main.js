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
        localStorage.setItem("Clave", titulo);
        datos=localStorage.getItem("Clave");
        console.log(datos);
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

    removeItem();
    
}
function removeItem(){
    var element = document.getElementById("principal");
    console.log(element)
    var child=document.getElementById("titulo");
    console.log(child)
    element.removeChild(child);
}
