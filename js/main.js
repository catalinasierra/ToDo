window.onload = () => {
    document.querySelector('#titulo').addEventListener('keypress', agregarTarea)
}


function agregarTarea(event) {
    if (event.charCode == 13) {
        const titulo = this.value.trim();
        console.log(titulo)

        if (!titulo.length) {
            alert('Debe escribir un texto.');
            return;
        }


    var id = new Date().getTime().toString();
    console.log(id);


    let fecha = moment();
    console.log (fecha.format('YYYY-MM-DD H:mm:ss'))

    //const status = false;
    //console.log(status)

        //const tarea = new ToDo(id, titulo, fecha, status);
}
}
