var myCanvas;
var ctx;

myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext("2d");

//set draw every now a then to create particles
setInterval(function(){draw();},33);

var particles = [];
for(var i=0;i<50;i++){
	//make a particle and add it to the array
	particles.push(new createPar());
}

//create a function that creates a new particle with it's own x,y coordinates, color, etc.
function createPar(){
	//random x,y position for each particle
	this.x = Math.random()*500;
	this.y = Math.random()*500;
	//random velocity, subtracting 10 should make half of them get negative numbers, moving the opposite direction
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	//random color
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+","+g+","+b+",0.5)";
	//random size
	this.radius = Math.random()*20+10;
}
function draw(){
	ctx.globalCompositeOperation = "source-over";
	//fill canvas with black rectangle
	ctx.fillStyle="rgba(0,0,0,0.5)";
	ctx.fillRect(0,0,500,500);
	//blend particles into background
	ctx.globalCompositeOperation = "lighter";
	//loop through each of the 50 particles in the array and move each one
	for(var t=0;t<particles.length;t++){
		//var to refer to the current particle the loop is working on
		var p = particles[t];
		//lets draw a circular particle
		ctx.beginPath();
		//specify a gradient fill
		var gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
		gradient.addColorStop(0.4,"black");
		gradient.addColorStop(0.4,"#657382");
		gradient.addColorStop(0,p.color);
		//gradient.addColorStop(0.4,"black");
		ctx.fillStyle = gradient;
		//make circle, Math.PI*2 makes a full circle
		ctx.arc(p.x,p.y,p.radius,Math.PI*2,false);
		ctx.fill();
		//move particle a little 
		p.x += p.vx;
		p.y += p.vy;
		//if particle goes off screen put it on opposite side it went off
		if(p.x<-50)p.x = 550;
		if(p.y<-50)p.y = 550;
		if(p.x>550)p.x = -50;
		if(p.y>550)p.y = -50;	
	}
}