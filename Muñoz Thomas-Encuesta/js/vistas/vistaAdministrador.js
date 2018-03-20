/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
    contexto.limpiarFormulario();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
    
  });
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
   
  });
  this.modelo.votoAgregado.suscribir(function() {
    contexto.reconstruirLista();
   
  });
  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  
  });
  this.modelo.respuestaAgregada.suscribir(function() {
    contexto.reconstruirLista();
   
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //INCIAR LOS METEODOS
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
    //this.construirElementoPregunta();    
//llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li>",{
      class:"list-group-item",
      id: pregunta.id,
      text: pregunta.textoPregunta});

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {

      contexto.controlador.agregarPregunta(e.pregunta.val());
    });

    e.botonBorrarPregunta.click(function()
    {  
      //contexto.controlador.sacarPregunta(contexto.tomarPreguntaSeleccionada());
      contexto.controlador.sacarPregunta();
    });
    e.borrarTodo.click(function()
    {
      contexto.controlador.borrarTodo();
    });
    e.botonEditarPregunta.click(function()
    { 
    //contexto.controlador.editarPregunta(contexto.tomarPreguntaSeleccionada(),textoEditadoPregunta);
      contexto.controlador.editarPregunta();
    });
    e.botonAgregarRespuesta.click(function()
    {
     // var agregarRespuesta = prompt('Agregar respuesta:');
     // if(agregarRespuesta!=null)
     // {
      contexto.controlador.agregarRespuesta();
      //}
    });
    //asociar el resto de los botones a eventos
  },
  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

