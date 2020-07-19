//Frontend, logica para manejar los tiket 

//comando para establecer la comunicación del cliente con el servidor
var socket = io();

//jquery utilizar mismas veces la variable tiene referencia al elemento label html
var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectados al servidor cola')
});
socket.on('disconnect', function() {
    console.log('Perdimos conexión al servidor cola');
});

//~~Listener que escuche el estado actual y colocarlo cuando se carga la pagina web
socket.on('estadoActual', function(respuesta) {
    console.log(respuesta);
    label.text(respuesta.ultimo);
});

//listener al boton Generar ticket
//jquery
$('button').on('click', function() {
    //**emitir SiguienteTicket y que ejecute una funcion cuando termine
    socket.emit('SiguienteTicket', null, function(SiguienteTicket) {

        label.text(SiguienteTicket);
        //mostrar el ticket en el label
    });
    //el servidor diga en la consola cual es el siguiente tique

});