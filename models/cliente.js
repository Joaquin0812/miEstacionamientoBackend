const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    rut: String,
    cuentaBancaria: {
        banco: String,
        tipoCuenta: { type: String, enum: ['Corriente', 'Vista'], default: 'Vista'},
        nroCuenta: String
    },
    
});

module.exports = ClienteSchema;