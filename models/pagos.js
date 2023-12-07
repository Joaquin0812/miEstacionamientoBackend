const mongoose = require('mongoose');


const PagosSchema = new mongoose.Schema({
    idCliente: String,
    idEstacionamiento: String,
    fecha: String,
    banco: String,
    nroCuenta: String,
    tipoCuenta: String,
    monto: { type: Number, default: 8600 }
});

module.exports = PagosSchema;