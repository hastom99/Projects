/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(value) {
    
  //  var value = elemento.pregunta.val();
    var respuestas = [];
      $('[name="option[]"]').each(function(e) {
        if($(this).val()!= "")
        {
          respuestas.push({'textoRespuesta':$(this).val(), 'votos':0});
        }
        //completar
      });
      if(value!="")
      {
     //   contexto.limpiarFormulario();
        this.modelo.agregarPregunta(value, respuestas);
      }
    //this.modelo.agregarPregunta(pregunta, respuestas);
  },
  sacarPregunta: function()
  {
    var id = this.tomarPreguntaSeleccionada();
    if(id !== -1)
    {
      this.modelo.sacarPregunta(id);
    }
  	 //PARA BORRAR 
  },

  borrarTodo: function()
  {
  	this.modelo.borrarTodasLasPreguntas();
  },

  editarPregunta: function()
  {

    var id = this.tomarPreguntaSeleccionada();
    if(!isNaN(id))
    {
      var texto = prompt('Editar pregunta','');
      if(texto != "" && texto != null)
      {
        this.modelo.editarPregunta(id,texto);
      }
    }
  	//this.modelo.editarPregunta(pregunta,nuevoTexto);
  },
  agregarUnVoto: function(contexto)
  {
    var contextoControlador = this;
    $('#preguntas').find('div').each(function(){
    var nombrePregunta = $(this).attr('value');
    var id = $(this).attr('id');
        //var pregunta = contexto.controlador.obtenerPregunta(nombrePregunta);
    var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
    if(typeof respuestaSeleccionada !== "undefined")
    {
      $('input[name=' + id + ']').prop('checked',false);
      var nombre = $("#nombreUsuario").val();
      if(typeof nombre !== "undifined" && nombre !== "")
      {
        contextoControlador.modelo.aumentarVoto(nombrePregunta,respuestaSeleccionada,nombre);
      }
    }
      });
  //	this.modelo.aumentarVoto(pregunta,respusta,nombre);
  },
  obtenerPregunta: function(pregunta)
  {
  	return this.modelo.obtenerPregunta(pregunta);
  },
  agregarRespuesta: function()
  {
  	//this.modelo.agregarRespuesta(pregunta,respuesta);
    var preguntaSelec = this.tomarPreguntaSeleccionada();
    if(!isNaN(preguntaSelec))
    {
      var agregarRespuesta = prompt('Agregar respuestas','');
      if(agregarRespuesta != ""  && agregarRespuesta != null)
    {
      this.modelo.agregarRespuesta(preguntaSelec,agregarRespuesta);
    }
    } 
  },
   tomarPreguntaSeleccionada : function()
  {
    var $preguntaSelec = parseInt($(".list-group-item.active").attr('id'));//LE PASO AL CONTROLADOR EL TEXTO DE LA PREGUNTA QUE QUIERO ELIMINAR
    return $preguntaSelec;
  }
};
