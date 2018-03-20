//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorPeliculas = require('./controladores/controladorPeliculas');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/generos',controladorPeliculas.devolverGeneros);

app.get('/peliculas',controladorPeliculas.buscarPeliculas);

app.get('/peliculas/recomendacion',controladorPeliculas.devolverRecomendacion);

app.get('/peliculas/:id',controladorPeliculas.devolverDetallesPelicula);
//entender por que entra  la funcion de arriba si la ruta es diferente


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

