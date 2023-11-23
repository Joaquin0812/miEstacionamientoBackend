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


const Estacionamiento = mongoose.model('Estacionamiento', estacionamientoSchema);
const Dueño = mongoose.model('Dueño', dueñoSchema);
const Cliente = mongoose.model('Cliente', clienteSchema);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/estacionamiento', async (req, res) => {
  const estado = req.query.estado
  const estacionamientos = await Estacionamiento.find({ disponibilidad: estado });
  res.send(estacionamientos);
})

app.put('/estacionamiento/:id', async (req, res) => {
  const id = req.params.id
  const estado = req.query.estado

  let estacionamiento = await Estacionamiento.findById(id)
  estacionamiento.disponibilidad = estado
  estacionamiento= await estacionamiento.save()
  res.send(estacionamiento);
})


// Consulta todos los clientes en la base de datos
app.get('/cliente', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
})


// Llenar la base de datos
app.post('/db/populate', (req, res) => {
  // const dueño1 = new Dueño({ nombre: 'Juan Perez', email: "juan.perez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } })
  // const dueño2 = new Dueño({ nombre: 'Jose Gonzalez', email: "jose.gonzalez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } })
  // const dueño3 = new Dueño({ nombre: 'Ana Gomez', email: "ana.gomez@gmail.com", password: "12345", rut: "12345678-9", cuentaBancaria: { banco: 'Estado', tipoCuenta: 'Corriente', nroCuenta: '123124' } });
  
  // dueño1.save().then(() => console.log('dueño1 created'));
  // dueño2.save().then(() => console.log('dueño2 created'));
  // dueño3.save().then(() => console.log('dueño3 created'));

  // const estacionamiento1 = new Estacionamiento({ idDueño: '655ecd2f7605921d2bffae1b', direccion: 'Moneda 123', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })
  // const estacionamiento2 = new Estacionamiento({ idDueño: '655ecd968daa8d3fe80ffbcd', direccion: 'Catedral 1401', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })
  // const estacionamiento3 = new Estacionamiento({ idDueño: '655ecd968daa8d3fe80ffbce', direccion: 'Amunategui 800', disponibilidad: 'disponible', latitud: '-33.12123', longitud: '100.1234122' })

  // estacionamiento1.save().then(() => console.log('estacionamiento1 created'));
  // estacionamiento2.save().then(() => console.log('estacionamiento2 created'));
  // estacionamiento3.save().then(() => console.log('estacionamiento3 created'));

  const cliente1 = new Cliente ({nombre: 'Cristobal Campos', email: "cristobal.campos@gmail.com", password: "12345", rut: "22345653-1", cuentaBancaria: {banco: "Scotiabank", tipoCuenta: "Corriente", nroCuenta: "22446611"}})
  const cliente2 = new Cliente ({nombre: 'Daniela Acevedo', email: "daniela.acevedo@gmail.com", password: "12345", rut: "18411234-k", cuentaBancaria: {banco: "Falabella", tipoCuenta: "Corriente", nroCuenta: "3269012"}})
  const cliente3 = new Cliente ({nombre: 'Diego Osorio', email: "diego.osorio@gmail.com", password: "12345", rut: "14977254-2", cuentaBancaria: {banco: "Itau", tipoCuenta: "Corriente", nroCuenta: "00321456"}})
  
  cliente1.save(),then(() => console.log('cliente1 created'))
  cliente2.save(),then(() => console.log('cliente2 created'))
  cliente3.save(),then(() => console.log('cliente3 created'))
  
  res.send('Hello World!')
})


// Endpoint para Login
app.post ('/login', async (req,res) => {
  const { email, password, tipoCliente}   = req.query;
  console.log (email,password,tipoCliente)
  res.send("")
  //const cliente = await Cliente.findOne({ email, password});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})