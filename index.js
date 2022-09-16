class Contenedora {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
 
    getAll() {
        const fs = require('fs');
        const data = fs.readFileSync(this.nombreArchivo, 'utf-8');
        return JSON.parse(data);
    }

    getByIdRandom() {
        const fs = require('fs');
        const data = fs.readFileSync(this.nombreArchivo, 'utf-8');
        const array = JSON.parse(data);
        const random = Math.floor(Math.random() * array.length);
        return array[random];
    }
}   

module.exports = Contenedora;