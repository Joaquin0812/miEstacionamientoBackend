const express = require('express')
var cors = require('cors');
const app = express()
const port = 3000
app.use(cors());

const mongoose = require('mongoose');
const mongoDbPassword = "UIx2hrGsVjrAZNCa"
mongoose.connect(`mongodb+srv://hernandezjoac:${mongoDbPassword}@cluster0.xx9m4ma.mongodb.net/?retryWrites=true&w=majority`);

// Schemas
const estacionamientoSchema = require('./models/estacionamiento')
const dueñoSchema = require('./models/dueño')
const clienteSchema = require('./models/cliente')
const historialSchema = require('./models/historialreservas')

const Estacionamiento = mongoose.model('Estacionamiento', estacionamientoSchema);
const Dueño = mongoose.model('Dueño', dueñoSchema);
const Cliente = mongoose.model('Cliente', clienteSchema);
const HistorialReservas = mongoose.model('HistorialReservas', historialSchema)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Endpoint para obtener todos los estacionamientos disponibles
app.get('/estacionamiento', async (req, res) => {
  const estado = req.query.estado
  const estacionamientos = await Estacionamiento.find({ disponibilidad: estado });
  res.send(estacionamientos);
})

app.get('/estacionamiento/byDueno', async (req, res) => {
  const idDueno = req.query.idDueño

  const estacionamiento = await Estacionamiento.find({ idDueño: idDueno })
  res.send(estacionamiento);
})

app.put('/estacionamiento/:id', async (req, res) => {
  const id = req.params.id
  const estado = req.query.estado

  let estacionamiento = await Estacionamiento.findById(id)
  estacionamiento.disponibilidad = estado
  estacionamiento = await estacionamiento.save()
  res.send(estacionamiento);
})


// Endpoint para llenar la base de datos
app.post('/db/populate', (req, res) => {

  // POBLANDO DUEÑOS
  // const dueño1 = new Dueño({ nombre: 'Juan Perez', email: "juan.perez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } })
  // const dueño2 = new Dueño({ nombre: 'Jose Gonzalez', email: "jose.gonzalez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } })
  // const dueño3 = new Dueño({ nombre: 'Ana Gomez', email: "ana.gomez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } });

  // dueño1.save().then(() => console.log('dueño1 created'));
  // dueño2.save().then(() => console.log('dueño2 created'));
  // dueño3.save().then(() => console.log('dueño3 created'));

  // POBLANDO ESTACIONAMIENTOS
  // const estacionamiento1 = new Estacionamiento({ idDueño: '655ecd2f7605921d2bffae1b', direccion: 'Moneda 123', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })
  // const estacionamiento2 = new Estacionamiento({ idDueño: '655ecd968daa8d3fe80ffbcd', direccion: 'Catedral 1401', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })
  // const estacionamiento3 = new Estacionamiento({ idDueño: '655ecd968daa8d3fe80ffbce', direccion: 'Amunategui 800', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })

  // estacionamiento1.save().then(() => console.log('estacionamiento1 created'));
  // estacionamiento2.save().then(() => console.log('estacionamiento2 created'));
  // estacionamiento3.save().then(() => console.log('estacionamiento3 created'));

  // POBLANDO CLIENTES
  // const cliente1 = new Cliente({ nombre: 'Cristobal Campos', email: "cristobal.campos@gmail.com", password: "12345", rut: "22345653-1", cuentaBancaria: { banco: "Scotiabank", tipoCuenta: "Corriente", nroCuenta: "22446611" } })
  // const cliente2 = new Cliente({ nombre: 'Daniela Acevedo', email: "daniela.acevedo@gmail.com", password: "12345", rut: "18411234-k", cuentaBancaria: { banco: "Falabella", tipoCuenta: "Corriente", nroCuenta: "3269012" } })
  // const cliente3 = new Cliente({ nombre: 'Diego Osorio', email: "diego.osorio@gmail.com", password: "12345", rut: "14977254-2", cuentaBancaria: { banco: "Itau", tipoCuenta: "Corriente", nroCuenta: "00321456" } })

  // cliente1.save().then(() => console.log('cliente1 created'))
  // cliente2.save().then(() => console.log('cliente2 created'))
  // cliente3.save().then(() => console.log('cliente3 created'))

  // POBLANDO HISTORIAL RESERVAS
  const historial1 = new HistorialReservas({ idEstacionamiento: '655ed6a0a5f27bcc7d24d3b3', rutcliente: '22345653-1', nombrecliente: 'Cristobal Campos', emailcliente: 'cristobal.campos@gmail.com', fecha: "25/11/2023", valor: '5600' })

  historial1.save().then(() => console.log('historial1 created'))
  res.send('Hello World!')
})


// Endpoint para Login
app.post('/login', async (req, res) => {
  const { email, password, tipoUsuario } = req.query;
  if (tipoUsuario === 'cliente') {
    const cliente = await Cliente.findOne({ email, password });
    if (cliente) {
      //res.send('User authenticated')
      res.send(cliente)
    } else {
      res.status(401).send('Error')
    }
  } else if (tipoUsuario === 'dueño') {
    const dueño = await Dueño.findOne({ email, password });
    if (dueño) {
      //res.send('User authenticated')
      res.send(dueño)
    } else {
      res.status(401).send('Error')
    }
  } else {
    res.status(400).send('tipoUsuario not found')
  }
})

// Consulta todos los clientes en la base de datos
app.get('/cliente', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Consulta el historial de reservas según rut de cliente
app.get('/historial/byCliente', async (req, res) => {
  const idCliente = req.query.idCliente
  const historialReservas = await HistorialReservas.find({ idCliente })
  res.json(historialReservas);
})

app.get('/dueno/byEstacionamiento', async (req, res) => {
  const idEstacionamiento = req.query.idEstacionamiento
  const estacionamiento = await Estacionamiento.findById(idEstacionamiento)
  const dueno = await Dueño.findById(estacionamiento.idDueño)
  res.send(dueno);
})

//Endpoint para meter la reserva al historial
//INTENTO Endpoint para ingresar calificacion
app.post('/historial', async (req, res) => {
  const { idEstacionamiento, idCliente, fecha, tiempoDeUso } = req.query;
  const historial = new HistorialReservas({ idEstacionamiento, idCliente, fecha, tiempoDeUso })
  const savedHistorial = await historial.save();
  res.send(savedHistorial);
})

app.put('/historial/calificar', async (req, res) => {
  const { tipoUsuario, idHistorial, puntuacion, comentario } = req.query;

  let historial = await HistorialReservas.findById(idHistorial)
  if (tipoUsuario === 'cliente') {
    historial.calificacion.cliente.puntuacion = puntuacion
    historial.calificacion.cliente.comentario = comentario
  } else if (tipoUsuario === 'dueno') {
    historial.calificacion.dueno.puntuacion = puntuacion
    historial.calificacion.dueno.comentario = comentario
  }
  historial = await historial.save()
  res.send(historial);
})