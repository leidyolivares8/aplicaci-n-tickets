//Froned pantalla publico ver los ultimos 4 tiques por atender
var socket = io();


//Crear referencia a cada uno de los elementos del html, para mostrar en el fronted , jquery
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');


//declaramos 2 arreglos para apuntar a cada posición del arreglo en el html
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    // console.log(data);
    actualizarHTML(data.ultimos4)
});
//xxxEscuchar ultimos 4 actualizar esta pagina , cuando en la otra pagina socket.escritorio.js asigne escritorio a tiquet*/
socket.on('ultimos4', function(data) {
    // sonido cuando orima boton atender siguiente ticket;
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos4)
});

function actualizarHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}