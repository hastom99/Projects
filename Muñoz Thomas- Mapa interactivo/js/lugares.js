lugaresModulo = (function () {
  var servicioLugares; // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).
  var circulo; 
  var self=this;
  var direccionInput=[
    document.getElementById('direccion'),
    document.getElementById('agregar'),
    document.getElementById('hasta'),
    document.getElementById('desde')
  ];

  var autocompletarArray;
  
    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
  autocompletarArray.forEach(function(elemento)
  {
    setearAutocompletar(elemento,circulo);
  });
  


  //  autocompletar.setBounds(circulo.getBounds());
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa);
    var center = {
        lat: mapa.center.lat(),
        lng: mapa.center.lng()
      };
    circulo = new google.maps.Circle(
    {
        center: center,
        radius: 20000 
    });
    var that = this;
    var a = 0;
    autocompletarArray=[];
    direccionInput.forEach(function(elemento)
    {
       //resolver este problema
      autocompletarArray.push(new google.maps.places.Autocomplete(elemento));
      setearAutocompletar(autocompletarArray[a],circulo);
      a++;
    });
    autocompletar();
  }

  function setearAutocompletar(objeto,circulo)
  {
    objeto.setBounds(circulo.getBounds());
    // Busca lugares con el tipo especificado en el campo de TipoDeLugar
  }

  function buscarCerca (posicion) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    var tipo = $("#tipoDeLugar").val();
    var radio = $("#radioS").text();
    radio = parseInt(radio.slice(0,-4));
    servicioLugares.nearbySearch(
      {
        location: posicion,
          radius: radio,
          type: tipo
        },function(results,status)
        {
          marcadorModulo.marcarLugares(results,status);
        });
  }
  return {
    inicializar,
    buscarCerca
  }
})()
