const fs = require('fs');
let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const crear = (descripcion) => {

    let porHacer = {
        descripcion,
        completado: false
    }
    cargarDB();
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    //console.log(listadoPorHacer);
    //leer archivo JSON
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let posicionArray = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    let nuevoArray = listadoPorHacer.splice(posicionArray, 1);
    guardarDB();
    return listadoPorHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}