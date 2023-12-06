const mongoose = require('mongoose');


const HistorialSchema = new mongoose.Schema({
    idEstacionamiento: String,
    idCliente: String,
    fecha: String,
    tiempoDeUso: Number,
    calificacion: {
        dueno: {
            puntuacion: { type: String, enum: ['0', '1', '2', '3', '4', '5'], default: '0' },
            comentario: { type: String, default: "" }
        },
        cliente: {
            puntuacion: { type: String, enum: ['0', '1', '2', '3', '4', '5'], default: '0' },
            comentario: { type: String, default: "" }
        }
    }
});

module.exports = HistorialSchema;