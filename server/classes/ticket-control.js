// 1. Clase para crear los tiquets

const fs = require('fs');

class Ticket { //2.clase interna ticket por atender
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    //toda clase es bueno q lleve su constructor para inicializarla
    //constructor es lo q se va a ejecutar cuando  new,let TicketControl= new TicketControl
    constructor() {
        //propiedades : ultimo, hoy 
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; // crear arreglo vacio
        this.ultimos4 = [];


        let data = require('../data/data.json'); //grabamos en un archivo json o si queremos a una bd
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    //Estado de la cola
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`; //retorna el ultimo ticket
    }

    //Ultimos 4 tickets
    getUltimos4() {
        return this.ultimos4 //retorna array
    };

    //Funcion atender ticket pantalla html(pantalla publica boton)
    atenderTicket(escritorio) { //aqui recibo el escritorio ya se a el 1-4
        if (this.tickets.length === 0) { //verifico que hayan tiquets pendientes por atender
            return 'No hay tickets';
        }
        //extraigo el numero para romper la relacion que tiene javascript con que todos los objetos son 
        //pasados por referencia , para evitar siertos tipos de problemas con ese aspecto de javascript
        //Obtener el primer tiquet para atender
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //shift Elimino el primer tiquet posiscion del arreglo

        //Creo un nueva instancia ticket que voy a atender que tiene el numero de ticket y escritorio al cual va a ser atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //colocar el ticket que voy a atender al inicio del arreglo ultimos 4 q ven las personas en la pantalla. unshift=agrega al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) { //verificar que solo existan 4 tickets en ese arreglo
            this.ultimos4.splice(-1, 1); //borra el ultimo, que las personas se vayan despachando una por unas
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo(); //grabo archivo
        return atenderTicket; //regreso el ticket que voy a atender

    }


    reiniciarConteo() {
        this.ultimo = 0; //this. es una referencia
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsondata = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        console.log(jsondata.ultimo);

        let jsonDataString = JSON.stringify(jsondata);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}