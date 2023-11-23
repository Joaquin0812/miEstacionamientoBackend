const mongoose = require('mongoose');
const DueñoSchema = require("./dueño");

const EstacionamientoSchema = new mongoose.Schema({
    idDueño: String,
    direccion: String,
    latitud: String,
    longitud: String,
    disponibilidad: { type: String, enum: ['deshabilitado', 'reservado', 'en uso', 'disponible'], default: 'disponible' },
    valorPorHora: { type: Number, default: 100 },
});

module.exports = EstacionamientoSchema;