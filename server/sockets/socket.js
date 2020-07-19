//Backend
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

//Con el new dispamos el contructor de la clase
//DECLARAMOS UNA NUEVA INSTANCIA DEL TICKETCONTROL Y DE ESTA FORMA LO PODREMOS UTILIZAR
const ticketControl = new TicketControl;

io.on('connection', (client) => {

    //**Escuchar SiguienteTicket
    client.on('SiguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);

        callback(siguiente); //llamar el callback con el siguiente ticket
    });


    //~~Emitir un evento de estado  Actual y me debe retornar el ultimo ticket
    client.emit('estadoActual', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //&&Escuchar, evento para escuchar 
    //Escritorio que le corresponde a cada persona
    //funcion se va a llamar atendeTicket,la cual va a recibir una data (ya sea el escritorio), y necesito el 
    //callback para notificar cuando ya se haga el proceso o nottificar el escritorio que le toca a el ticket
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) { //si no viene el escritorio no puedo hacer nada
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket); //Envir al fronted 

        //xxxEmitir con broadcas a todos los usuarios a la pagina socket.publico, cuando atender ticket se ejecute en la 
        //pagina socket.escritorio 
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()

        })

    });



});