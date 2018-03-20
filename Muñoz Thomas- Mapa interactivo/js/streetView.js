streetViewModulo = (function () {
  var paronama // 'Visor' de StreetView

  function inicializar () {
        /* Completar la función inicializar()  que crea un panorama
        en una posición y lo muestra en la página. */
            var miLatLng =  new google.maps.LatLng({lat:-34.592868,lng:-58.4199791});
           panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: miLatLng,
              pov: {
                heading: 45,
                pitch: -13
              }
            });
        mapa.setStreetView(panorama);

  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
        /* Completar la función fijarStreetView que actualiza la posición
         de la variable panorama y cambia el mapa de modo tal que se vea
         el streetView de la posición actual. */
    panorama.setPosition(ubicacion.geometry.location);   
    mapa.setStreetView(panorama);

  }

  return {
    inicializar,
    fijarStreetView
  }
})()
