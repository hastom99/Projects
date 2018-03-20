var con = require('../lib/conexionbd');

function buscarPeliculas (req,res) {
	var genero = req.query.genero;
	var anio = req.query.anio;
	var titulo = req.query.titulo;
	var generoString,anioString,tituloString;
	var contador=0;
	var columnaOrden = req.query.columna_orden;
	var tipoOrden = req.query.tipo_orden;
	var peticiones= [];
	var sql;
	var cantidad = req.query.cantidad;
	var pagina = req.query.pagina;
	var cantidadDePeliculas;
	var self = this;

	sql = "select id from pelicula";
		con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			self.cantidadDePeliculas = resultado.length; 
		}
	});

	if(genero != undefined)
	{
		contador++;
		generoString = "genero.id = "+genero;
		peticiones.push(generoString);
	}
	if(anio != undefined)
	{
		contador++;
		anioString = "anio = " + anio;
		peticiones.push(anioString);
	}
	if(titulo != undefined)
	{
		contador++;
		tituloString = "titulo like '%"+titulo+"%'";
		peticiones.push(tituloString);
	}


	switch (contador)
	{
		case 0:
			sql = "select *,pelicula.id from pelicula join genero on genero_id = genero.id";
			break;
		case 1:
			sql = "select *,pelicula.id from pelicula join genero on genero_id = genero.id where " + peticiones[0];
			break;
		case 2:
			sql = "select *,pelicula.id from pelicula join genero on genero_id = genero.id where " + peticiones[0] + " AND " + peticiones[1];
			break;
		case 3:
			sql = "select *,pelicula.id from pelicula join genero on genero_id = genero.id where "+ peticiones[0]+ " AND " + peticiones[1] + " AND "+ peticiones[2];
			break;
	}

	pagina = cantidad*(pagina-1);
	sql += " order by "+columnaOrden+" "+tipoOrden+" limit "+pagina+","+cantidad;

	con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			var respuesta = {
				'peliculas' : resultado,
				'total' : self.cantidadDePeliculas
			}
			res.send(JSON.stringify(respuesta));
		}
	});
	

}

function devolverGeneros(req,res)
{
	var sql = "select * from genero";
	con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			var respuesta = {
				'generos' : resultado,
			}
			res.send(JSON.stringify(respuesta));
		}
	});
}

function devolverDetallesPelicula(req,res)
{
	var id = req.params.id; 
	var self = this;
	var sql = "select *,genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.id = "+ id;
	var peliculaDetalles;
	con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			self.peliculaDetalles = resultado;
		}
	});

	sql = "select actor.nombre from actor_pelicula join pelicula on pelicula_id = pelicula.id join actor on actor_id = actor.id where pelicula.id = "+id;
	con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			var respuesta =
			{
				'actores' : resultado,
				'pelicula' : self.peliculaDetalles
			}
			res.send(JSON.stringify(respuesta));
		}
	});
}

function devolverRecomendacion(req,res)
{
	var genero = req.query.genero;
	var anioInicio = req.query.anio_inicio;
	var anioFin = req.query.anio_fin;
	var puntuacion = req.query.puntuacion;
	var duracion = req.query.duracion;
	var sql= "select *,pelicula.id from pelicula join genero on genero_id = genero.id where";
	var generoString,anioString,puntuacionString,duracionString;
	var contador=0;;
	var peticiones = [];
	if(anioInicio != undefined)
	{
		anioString = " anio between "+anioInicio;
		peticiones.push(anioString);
		peticiones.push(anioFin);
		contador+=2;		 
	}

	if(puntuacion!= undefined)
	{
		puntuacionString = " puntuacion > "+ puntuacion;
		peticiones.push(puntuacionString);
		contador++;
	}

	if(duracion != undefined)
	{
		duracionString = " duracion > " + duracion;
		peticiones.push(duracionString);
		contador++;
	}
		if(genero != undefined)
	{
		generoString = " genero.nombre = '"+genero+"'";
		peticiones.push(generoString);
		contador++;
	}
	switch(contador)
	{
		case 0:
			break;
		case 1:
			sql+= peticiones[0];
			break;
		case 2:
			sql+= peticiones[0]+" AND "+ peticiones[1];
			break;
		case 3:
			sql+= peticiones[0]+ " AND "+ peticiones[1] + " AND " + peticiones[2];
			break;
	}
	con.query(sql,function(error,resultado,fields)
	{
		if(error)
		{
			console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");	
		}
		else
		{
			var respuesta = {

				'peliculas': resultado
			};
		}

		res.send(JSON.stringify(respuesta));	

	});
}

module.exports = {
	buscarPeliculas:buscarPeliculas,
	devolverGeneros: devolverGeneros,
	devolverDetallesPelicula : devolverDetallesPelicula,
	devolverRecomendacion: devolverRecomendacion,
}