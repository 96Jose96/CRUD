const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

//crear nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
});

//buscar usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

//actualizar informacion de un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const usuarioIndex = usuarios.findIndex(user => user.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = {
            ...usuarios[usuarioIndex],
            nombre: req.body.nombre || usuarios[usuarioIndex].nombre,
            edad: req.body.edad || usuarios[usuarioIndex].edad,
            lugarProcedencia: req.body.lugarProcedencia || usuarios[usuarioIndex].lugarProcedencia,
        };
        res.json(usuarios[usuarioIndex]);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

//eliminar un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const usuarioIndex = usuarios.findIndex(user => user.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuarioIndex !== -1) {
        const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
        res.json(`Usuario eliminado: ${usuarioEliminado}`);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});



app.listen(3000, () => {
    console.log('Server escuchando en el puerto: http://localhost:3000')
})