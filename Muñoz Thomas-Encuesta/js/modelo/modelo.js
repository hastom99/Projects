/*o
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  this.nombres = [];
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.cargar();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    this.ultimoId = this.ultimoId+1;
    return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  sacarPregunta: function(id)
  {
    var indicePreguntaSacar = this.obtenerPregunta(id);
    this.preguntas=this.preguntas.filter(function(pregunta){return pregunta.id !== id;});
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodasLasPreguntas: function()
  {
    this.preguntas = [];
    this.ultimoId= 0;
    this.nombres=[];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  editarPregunta: function(id,nuevaPregunta)
  {
    
     var preguntaARemplazar = this.obtenerPregunta(id);
     preguntaARemplazar.textoPregunta = nuevaPregunta;
     this.preguntas.splice(this.preguntas.indexOf(this.obtenerPregunta(id)),1,preguntaARemplazar);
     //this.preguntas[indicePreguntaSacar].textoPregunta = nuevaPregunta;
     this.guardar();
     this.preguntaEditada.notificar();
  },

  aumentarVoto: function(nombreDePregunta,respuesta,nombre)
  {
    var pregunta = this.obtenerPregunta(nombreDePregunta);
    pregunta.cantidadPorRespuesta[this.obtenerIndiceRespuesta(pregunta,respuesta)].votos += 1;
    nombre = nombre.toUpperCase();
    var indexNombre = this.nombres.findIndex(x => x.nombresDePersona === nombre);
    if(indexNombre<0)
    {
      var nombreNuevo = {'nombresDePersona': nombre, 'votos':1};
      this.nombres.push(nombreNuevo);
    }  
    else 
    {
      this.nombres[indexNombre].votos+=1;
    }
    this.guardar();
    this.votoAgregado.notificar();
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("Preguntas",JSON.stringify(this.preguntas));
    localStorage.setItem("Id",JSON.stringify(this.ultimoId));
    localStorage.setItem("Nombres",JSON.stringify(this.nombres));
  },
  cargar: function()
  {
    this.preguntas = JSON.parse(localStorage.getItem("Preguntas"));
    this.ultimoId = JSON.parse(localStorage.getItem("Id"));
    this.nombres = JSON.parse(localStorage.getItem("Nombres"));
    if(this.preguntas == null)
    {
      this.preguntas=[];
    }
    if(this.nombres==null)
    {
      this.nombres = [];
    }
  },
  obtenerPregunta: function(valor)
  {
  //  return this.preguntas.findIndex(x => x.textoPregunta === pregunta); 
    var indentificador;
    if (typeof valor === 'number')
    {
      indentificador = 'id';
    }
    else
    {
      indentificador = 'textoPregunta';
    }
    for(var i =0; i<this.preguntas.length;++i)
    {
      if(this.preguntas[i][indentificador] === valor)
      {
        return this.preguntas[i];
      }
    }
    throw new Error("La pregunta no está definida");
  },

  obtenerIndiceRespuesta: function(pregunta,respuesta)
  {
    return pregunta.cantidadPorRespuesta.findIndex(x => x.textoRespuesta === respuesta);
  },

  agregarRespuesta: function(id,respuesta)
  {
    this.obtenerPregunta(id).cantidadPorRespuesta.push({'textoRespuesta':respuesta, 'votos':0 });
    this.guardar();
    this.respuestaAgregada.notificar();
  }
};
