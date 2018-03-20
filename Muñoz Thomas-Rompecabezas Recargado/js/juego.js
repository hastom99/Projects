// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var Juego ={
 filaVacia : 0,
 columnaVacia: 0,
 contadorMovimiento:0,
 cantidadDePiezasPorLado:2,
 tiempoMezclado:150,
 dificultad:1,
 primerMovimiento:true,
 cantidadDeMezclas:0,
 piezas:[],
 movimientos:[],
cargarImagen: function () {
    //se calscula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
   // this.configurarCanvas();
  },

iniciarImagen: function (callback) {
    this.imagen = new Image();
    var self = this;
    //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
    this.imagen.addEventListener('load', function () {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/stevejobs1.jpg";
  },


  iniciar: function () 
  {
    this.canvas = $("canvas");
    this.context = canvas.getContext('2d');
    this.piezas = [];
    this.movimientos=[];
    this.columnaVacia = 0;
    this.filaVacia= 0;
    var self = this;
    this.cantidadDePiezasPorLado = Number.parseInt(document.getElementById("cantidadDePiezas").value);
    self.tiempoMezclado=0;

    self.tiempoMezclado= 300/self.cantidadDePiezasPorLado;
    //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
    this.crearGrillaPiezas();
    this.iniciarImagen(function () { 
    self.construirPiezas();
    self.cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
    self.mezclarPiezas(self.cantidadDeMezclas);
    });
  },

  construirPiezas: function()
  {
    var posicionX=0;
    var posicionY=0;
    var piezaBlanca=true;
    var contador=1;
    for (var i=0; i < this.cantidadDePiezasPorLado; i++) {

      for (var i2 = 0; i2 <this.cantidadDePiezasPorLado; i2++) {
        posicionX=this.anchoPiezas*i2;
        posicionY= this.altoPiezas*i;
        this.piezas[i][i2]= new Piezas(posicionX,posicionY,this.anchoPiezas,this.altoPiezas,this.imagen,this.context,this.cantidadDePiezasPorLado,i2,i,piezaBlanca,contador);
        this.piezas[i][i2].FormarPieza();
        piezaBlanca= false;
        contador++;
      }
      poisicionX=0;
    }
  }

}



Juego.mezclarPiezas = function(veces){
  if(veces<=0){return false;}

  this.moverEnDireccion(this.elegirDireccion());
  setTimeout(function(){
    Juego.mezclarPiezas(veces-1);
  },Juego.tiempoMezclado,this);
  this.contadorMovimiento= Math.trunc(this.cantidadDePiezasPorLado*15*((3/this.dificultad)*(this.cantidadDePiezasPorLado/3))); 
  this.actualizarContadorMovimiento(this.contadorMovimiento);
  this.movimientos=[];
  this.primerMovimiento=true;
  return true;
}

Juego.elegirDireccion=function()
{
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  return direccion;
}

Juego.crearGrillaPiezas=function()
{
  var arrayAuxiliar=[];
  var contador=0;
  this.piezas.length=this.cantidadDePiezasPorLado;
  for(var i =0;i<this.cantidadDePiezasPorLado;i++)
  {

    arrayAuxiliar=[];  
    for(var i2 =1;i2<=this.cantidadDePiezasPorLado;i2++)
    {
      arrayAuxiliar.push(i2+contador);
    }
    this.piezas[i]=(arrayAuxiliar);
    contador+=this.cantidadDePiezasPorLado
  }
}

Juego.capturarTeclas=function () 
{
  
  $('body').keydown(function(e)
  {

    Juego.detectarTecla(e);
    
  });
}
Juego.detectarTecla = function(evento)
{
  console.log(evento.which);
  if(this.contadorMovimiento>0)
    {  
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      this.moverEnDireccion(evento.which);
      this.detectarSiGano();
      evento.preventDefault();  
    }else if(evento.which==90)
    {
      this.regresarMovimientoAnterior();
    }
  }
}
Juego.mouseClick = function()
{

 $("#canvas").click(function(e)
  {
    if(Juego.contadorMovimiento>0)
    {
      Juego.obtenerPosicion(e);
    }
  })
  
}

Juego.obtenerPosicion= function(event)
{
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  this.obtenerPiezaClick(x,y);
  //console.log(event.clientX +""+ event.clientY);
}

Juego.obtenerPiezaClick = function(x,y)
{
  var indiceX =Math.trunc(x / this.anchoPiezas);
  var indiceY =Math.trunc(y/this.anchoPiezas);
  var moduloIndiceX =Math.abs(this.columnaVacia-indiceX);
  var moduloIndiceY =Math.abs(this.filaVacia-indiceY)
  if(moduloIndiceX<=1 && moduloIndiceY<=1 && (moduloIndiceY+moduloIndiceX)!=2 && (moduloIndiceX-moduloIndiceY)!=0)
  {
    Juego.comprobarDirrecion(indiceY,indiceX,this.cantidadDePiezasPorLado);
    Juego.detectarSiGano();
  }
}
Juego.nivelRompecabeza = function()
{
  $('.inputRadio').on('click',function()
  {
    var nivel = $("input:checked").val();
    switch(nivel)
    {
      case 'facil':
        Juego.dificultad=1;
        break;
      case 'intermedio':
        Juego.dificultad=2;
        break;
      case 'dificil':
        Juego.dificultad=3;
        break;
    }
    Juego.iniciar();

  });
}

Juego.regresarMovimientoAnterior = function()
{
  if(this.movimientos.length>=1)
  {
  var ultimoMovimiento = this.movimientos[this.movimientos.length-2];
  if(ultimoMovimiento==undefined)
  {
    ultimoMovimiento= this.movimientos[0];
    this.primerMovimiento=true;
  }
  this.movimientos.pop();
  //this.comprobarDirrecion(this,ultimoMovimiento[0],ultimoMovimiento[1],this.cantidadDePiezasPorLado);
  this.intercambiarPosiciones(this.filaVacia,this.columnaVacia,
    ultimoMovimiento[0],ultimoMovimiento[1]),false;
  this.actualizarPosicionVacia(ultimoMovimiento[0],ultimoMovimiento[1]);
  }
}

Juego.moverEnDireccion=function(direccion)
{
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 38){
    nuevaFilaPiezaVacia = this.filaVacia-1;
    nuevaColumnaPiezaVacia = this.columnaVacia;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 40) {
    nuevaFilaPiezaVacia = this.filaVacia+1;
    nuevaColumnaPiezaVacia = this.columnaVacia;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = this.filaVacia;
    nuevaColumnaPiezaVacia = this.columnaVacia-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 39) {
    // Completar
     nuevaFilaPiezaVacia = this.filaVacia;
    nuevaColumnaPiezaVacia = this.columnaVacia+1;
  }

 this.comprobarDirrecion(nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia,this.cantidadDePiezasPorLado);
}

Juego.comprobarDirrecion= function(nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia,cantidadDePiezasPorLado)
{
  if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia,cantidadDePiezasPorLado))
  {
    var arrayMovimiento;
    if(this.primerMovimiento)
    {
      arrayMovimiento = [this.filaVacia,this.columnaVacia];
      this.movimientos.push(arrayMovimiento);
      this.primerMovimiento=false;
    }
    arrayMovimiento = [nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia];
    this.movimientos.push(arrayMovimiento);
    this.intercambiarPosiciones(this.filaVacia,this.columnaVacia,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia,true);
    this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}

Juego.posicionValida=function(fila, columna,tamañoRompecabezas){
  if((fila>=0 && fila<=tamañoRompecabezas-1 ) && (columna>=0 && columna<=tamañoRompecabezas-1) )
  {
    return true;
  }  
  else 
  {
    return false;
  }
}

Juego.actualizarPosicionVacia= function(nuevaFila,nuevaColumna){
  this.filaVacia = nuevaFila;
  this.columnaVacia = nuevaColumna;
}

Juego.intercambiarPosiciones=function(filaPos1, columnaPos1, filaPos2, columnaPos2,descontarContador)
{
  var posicion1= this.piezas[filaPos1][columnaPos1];
  var posicion2= this.piezas[filaPos2][columnaPos2];
  var auxiliar1 = posicion2.posicionActualX;
  var auxiliar2 = posicion2.posicionActualY;
  posicion2.posicionActualX = posicion1.posicionActualX;
  posicion2.posicionActualY = posicion1.posicionActualY;
  posicion1.posicionActualX = auxiliar1;
  posicion1.posicionActualY = auxiliar2;
  this.piezas[filaPos1][columnaPos1]= this.piezas[filaPos2][columnaPos2];
  this.piezas[filaPos2][columnaPos2]= posicion1;  
  posicion1.FormarPieza();
  posicion2.FormarPieza(); 
  if(descontarContador)
  {
  this.contadorMovimiento--;
  this.actualizarContadorMovimiento();
  }
}
// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
Juego.cartelPerdedor = function(movimientos)
{
  if(movimientos == 0)
  {
    swal("Perdiste", "Es un buen momento para replantearte tu vida despues de haber perdido esta partida");
     return true;
  }
  return false;
  
}

Juego.detectarSiGano = function()
{
   var gano = Juego.chequearSiGano();
      if(gano){
        setTimeout(function(){
          Juego.mostrarCartelGanador();  
        },500);
      } 
}

Juego.actualizarContadorMovimiento=function()
{
  $("#contadorMovimiento").text("Movimientos Restantes: " + this.contadorMovimiento);
  this.cartelPerdedor(this.contadorMovimiento);
  
}
Juego.botonMezclar = function()
{
     $('#mezclar').on('click',function()
     {
        //var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
        Juego.mezclarPiezas(Juego.cantidadDeMezclas);
     });
}
Juego.chequearSiGano = function(){ 
  var totalDePiezas = this.cantidadDePiezasPorLado*this.cantidadDePiezasPorLado;
  var GanarNum=0;
  var contador=0;
  for ( var i = 0; i <= this.cantidadDePiezasPorLado-1; i++) 
  {
    for ( var i2 = 0; i2 <= this.cantidadDePiezasPorLado-1; i2++) 
    {
      contador++;
      if(this.piezas[i][i2].numeroDePieza== contador)
      {
        GanarNum++;
      }
    }
  }
  if(GanarNum==totalDePiezas)
  {
    this.mostrarCartelGanador();
  }
}

Juego.mostrarCartelGanador=function(){
    swal("Ganaste", "Espero que al ganar este juego encuentres un sentido a esta vida ?)");
}

Juego.nivelRompecabeza();
  Juego.capturarTeclas();
      Juego.mouseClick();
    Juego.botonMezclar();