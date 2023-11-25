const mongoose = require('mongoose');


const HistorialSchema = new mongoose.Schema({
    idDueño: String,
    rutcliente: String,
    nombrecliente: String,
    emailcliente: String,
    fecha: String,
    valor: Number
});

module.exports = HistorialSchema;