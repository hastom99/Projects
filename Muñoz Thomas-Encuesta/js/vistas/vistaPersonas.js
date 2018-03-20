var VistaPersonas = function(modelo,controlador,elementos)
{
	this.modelo = modelo;
	this.controlador = controlador;
	this.elementos = elementos;
	var contexto = this;
	this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
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

VistaPersonas.prototype = {


	inicializar: function()
	{
		this.reconstruirLista();//hacer funcion;
		var contexto = this;

	},

	reconstruirLista:function()
	{
		var listaPersonas = this.elementos.listaPersonas;
		listaPersonas.html('');
		var contexto = this;
		var personas = this.modelo.nombres;
		personas.forEach(function(clave)
		{
		listaPersonas.append($('<li>',{'id': "prueba", 'text':clave.nombresDePersona + "  realizo : " + clave.votos + " votos "}));
		});
	}
};