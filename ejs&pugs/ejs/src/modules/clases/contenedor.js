const fs = require('fs');

module.exports = class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.lastId = 0
        this.contenido = []
    }
    //crear metodo que reciba un objeto, lo guardo en un archivo y devuelvo el id asignado
    save(objeto) {
        this.lastId += 1
        objeto.id = parseInt(this.lastId)
        this.contenido.push(objeto);
        let newContent = JSON.stringify(this.contenido)
        console.log(this.contenido)
        fs.writeFileSync(this.nombreArchivo, newContent);
        return objeto;
    }
    //Actualizar
    upload(id, newObjeto) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let objeto = objetos.find(obj => obj.id == id);
        let indice = objetos.indexOf(objeto);
        objetos.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(objetos));

        this.contenido.push(newObjeto);
        let newContent = JSON.stringify(this.contenido)
        fs.writeFileSync(this.nombreArchivo, newContent);
        return newObjeto;
    }
    //crear metodo que reciba un id y devuelva el objeto correspondiente o null si no existe
    findById(id) {
        let objeto = this.contenido.find(obj => obj.id == id);
        return objeto;
    }
    //devolver un array con todos los objetos del archivo
    findAll() {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        return objetos;
    }
    //eliminar del archivo el objeto con el id recibido
    delete(id) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let objeto = objetos.find(obj => obj.id == id);
        let indice = objetos.indexOf(objeto);
        objetos.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(objetos));
        return true
    }
    //elimina todos los objetos del archivo
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '[]');
    }
    //Obtiene un producto random
    getRandomArbitrary () {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        const lista = JSON.parse(contenido);
        const index = (Math.random() * (lista.length - 1)).toFixed();
        console.log(index)
        const object = lista[index]
        return object
    }
    // Actualizar contador de id
    actualizarId () {
        const array = this.contenido.sort(function(a, b) {
            return b.id - a.id;
        })
        this.lastId = parseInt(array[0].id)
        console.log(array[0].id)
        return
    }
    // Leer el contenido
    leerContenido (){
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        this.contenido = JSON.parse(contenido)
    }
    // Actualizar el contenido
    actualizarContenido (newCont){
        fs.writeFileSync(this.nombreArchivo, newCont);
    }
}