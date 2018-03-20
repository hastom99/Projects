var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{ 
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 2;
      Juego.crearGrillaPiezas();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.piezas.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.piezas[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });
});

describe('Posicion valida para mover una pieza',function()
{
  it('Posicion valida Positiva',function()
  {
    expect(Juego.posicionValida(1,1,3)).to.be.true; 
  });

  it('Posicion valida Negativa',function()
  {
    expect(Juego.posicionValida(1,-1,3)).to.be.false; 

  });

  it('Posicion valida con Cero',function()
  {
    expect(Juego.posicionValida(1,0,3)).to.be.true; 
  });
});

describe('Numero validos para Mezclar Piezas',function()
{
 
  it('Numero Negativo',function()
  {
    expect(Juego.mezclarPiezas(-20)).to.be.false; 

  });

  it('Prueba con Cero',function()
  {
    expect(Juego.posicionValida(0)).to.be.false; 
  });
});

describe('movimientos restantes para mostrar cartel perdedor',function()
{
 
  it('Quedan 30 movimientos',function()
  {
    expect(Juego.cartelPerdedor(20)).to.be.false; 
  });

  it('Quedan 0 movimientos',function()
  {
    expect(Juego.cartelPerdedor(0)).to.be.true; 

  });

  it('Quedan -30 movimientos',function()
  {
    expect(Juego.cartelPerdedor(-20)).to.be.false; 
  });
});
