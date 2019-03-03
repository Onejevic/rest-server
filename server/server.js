//Requerimos el archivo config que se encuentra la configuración del puerto
require('../config/config')

const express = require('express');
const app = express();

//permite procesar toda esta información enviada y procesarla
//en un formato json, para que pueda ser procesada facilmente con
//las peticiones post
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
//recordemos que estos son middlewares, es decir que siempre
//se ejecutarán cuando pase el código o solicite información
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    //-------------------------------------------------------------
    //se tiene como convención que las peticiones get
    //se mandan por la url
app.get('/usuario', function(req, res) {
    res.json('respuesta get');
});
//-------------------------------------------------------------
//esta petición se utiliza para crear nuevos datos estos
//no se envían en la url
app.post('/usuario', function(req, res) {
    //por los middleware puedo recibir los datos con req.body
    //y mostrarlos como respuesta
    let body = req.body;
    //si detecto que el nombre es indefinido mando un status
    //http código 400
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
});
//-------------------------------------------------------------
//esta petición se utiliza para actualizar datos es muy
//parecida a patch
//es importante destacar que en la url puedo enviar parámetros
//y esto se hace bajo la sentencia ':parametro'
app.put('/usuario/:id', function(req, res) {
    //para almacenarlos utilizamos la sentencia req.params.parametro
    let id = req.params.id;
    //mandamos como respuesta un json con el parámetro del path
    res.json({
        id
    });
});
//-------------------------------------------------------------
//aunque no es conveniente eliminar datos, esta se utiliza
//para eliminarlos
app.delete('/usuario', function(req, res) {
    res.json('respuesta delete');
});
//-------------------------------------------------------------
//Configuramos el puerto bajo la variable global process.env.PORT
app.listen(process.env.PORT, () => { console.log(`Puerto ${process.env.PORT}`); });