var Piezas = function (posicionX,posicionY,ancho,largo,imagen,contexto,piezasPorLado,posicionDePiezaX,posicionDePiezaY,piezaBlanca,numeroDePieza) 
{
	this.posicionX = posicionX;
	this.posicionY = posicionY;
	this.ancho = ancho;
	this.largo = largo;
	this.imagen = imagen;
	this.contexto = contexto;
	this.piezasPorLado = piezasPorLado;
	this.anchoInternoImagen = imagen.width/piezasPorLado;
	this.largoInternoImagen = imagen.height/piezasPorLado;	
	this.posicionDePiezaX =	posicionDePiezaX;
	this.posicionDePiezaY = posicionDePiezaY;
	this.posicionActualX=posicionX;
	this.posicionActualY=posicionY;
	this.piezaBlanca = piezaBlanca;
	this.numeroDePieza = numeroDePieza;


	
}

Piezas.prototype.FormarPieza=function()
{
	//this.contexto.clearRect(0,0,this.anchoInternoImagen,thoslargoInternoImagen);
	var corrimientoX = this.posicionDePiezaX*this.anchoInternoImagen;
	var corrimientoY = this.posicionDePiezaY*this.largoInternoImagen;
	if(!this.piezaBlanca)
	{
	this.contexto.drawImage(this.imagen,corrimientoX,corrimientoY,this.anchoInternoImagen,this.largoInternoImagen,this.posicionActualX,this.posicionActualY,this.ancho,this.largo);		
	}
	else
	{
	this.contexto.clearRect(this.posicionActualX,this.posicionActualY,this.ancho,this.largo);
	
	this.contexto.beginPath();//Empezar a dibujar
	this.contexto.rect(this.posicionActualX,this.posicionActualY,this.ancho,this.largo);
	this.contexto.fillStyle = 'white';
	this.contexto.fill();
	this.contexto.lineWidth= 0;
	//this.contexto.stroke();//terminar de dibujar
	}
}



