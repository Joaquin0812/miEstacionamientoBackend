const mongoose = require('mongoose');


const HistorialSchema = new mongoose.Schema({
    idEstacionamiento: String,
    rutcliente: String,
    nombrecliente: String,
    emailcliente: String,
    fecha: String,
    valor: Number,
    calificacion: {
        puntuacion: { type: Number, enum: ['1' ,'2', '3', '4', '5'], default: '1' },
        comentario: { type: String, default: "" }
    }    
});

module.exports = HistorialSchema;