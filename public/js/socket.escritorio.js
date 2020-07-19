//Frontend, logica para  atender el ticket por escritorio
var socket = io();

//asegurearme que venga algo el objeto escritorio por el url

//obtener los parametros por el url escritorio=10
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);
var label = $('small');

if (!searchParams.has('escritorio')) { //has si viene en el localhost escritorio
    window.location = 'index.html';
    throw new error('El escritorio es necesario');
}

//en la pantalla en el label Escritorio mostrar el #del escritorio
var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio' + escritorio);

//boton en la pantalla atender tiquet enviar el escritorio
$('button').on('click', function() {
    socket.emit('atenderTicket', { //##Emitir el escritorio al backed me envia callback con la rta
            escritorio: escritorio
        },
        function(resp) {
            console.log(resp);

            if (resp === 'No hay tickets') {
                label.text(resp);
                alert(resp);
                return;
            }
            label.text('Ticket' + resp.numero);


        });

});