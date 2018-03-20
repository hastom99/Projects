//var mapa= new google.maps.Map(document.getElementById("mapa"),{ center: {lat: -34.397, lng: 150.644},zoom: 8}); // Mapa que vamos a modificar
var mapa;
/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */
var posicionCentral= {'lat':-34.592868,'ing':-58.4199791};
//var posicionCentral = new google.maps.LatLng{lat:-34.592868,ing:-58.4199791};
// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
	  mapa = new google.maps.Map(document.getElementById('map'), {
          center: {lat:posicionCentral.lat, lng: posicionCentral.ing},
          zoom: 12
        });
    /* Modificá la variable mapa con el constructor Map().
    Tendrás que asignarle un valor de zoom y
    un centro igual a la variable posicionCentral. */
  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
