import express from 'express'
import { Clientes } from './clientes.js'
const app = express()
app.use(express.json())
//get -> obtener info
//post --> crear recursos
//delete --> borrar recursos
//put y patch modificar recursos

const clientes: Clientes[] = [
    new Clientes(123456789, 'Juan', 'Perez', 'Calle A 123', 'juan@example.com',542477332211),
    new Clientes(987654321, 'María', 'González', 'Calle B 456', 'maria@example.com',542477665544),

];

app.get('/api/clientes', (req, res) => {
    res.json({data: clientes});
});

app.get('/api/clientes/:dni', (req, res ) => {
    const dni = parseInt(req.params.dni); // Convertir el parámetro dni a número
    const cliente = clientes.find(cliente => cliente.dni === dni);
    if(!cliente){
        return res.status(404).send({ message: 'Cliente no encontrado' }); // Agregué el return aca
    }
    res.json({data: cliente})
})

app.post('/api/clientes', (req, res) => {
    const {dni, nombre, apellido, direccion, mail, telefono} = req.body

    const nuevoCliente = new Clientes(dni, nombre, apellido, direccion, mail, telefono)

    clientes.push(nuevoCliente)
    res.status(201).send({message: 'cliente creado', data: nuevoCliente})
})

// Endpoint para actualizar un cliente existente por DNI
app.put('/api/clientes/:dni', (req, res) => {
    const dni = parseInt(req.params.dni, 10);
    const dniClienteIndex = clientes.findIndex(cliente => cliente.dni === dni);

    if (dniClienteIndex === -1) {
        return res.status(404).send({ message: 'Cliente no encontrado' });
    }

    // Actualizar los datos del cliente
    const { nombre, apellido, direccion, mail, telefono } = req.body;
    clientes[dniClienteIndex] = {
        ...clientes[dniClienteIndex],
        nombre,
        apellido,
        direccion,
        mail,
        telefono
    };

    // Enviar respuesta con el cliente actualizado
    res.status(200).send({ message: 'Cliente actualizado', data: clientes[dniClienteIndex] });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
})