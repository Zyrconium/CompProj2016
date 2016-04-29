/**
 * Created by B00189682 on 15/04/2016.
 */


var Obstacle = function(x, y, type, width, height) {

    this.x=x;
    this.y=y;
    this.type=type;
    this.width = width;
    this.height = height;
    if(this.type == "portal")
    {
        this.destination = Engine.level+1;
    }

};

Obstacle.prototype.draw = function() {
    var context = Renderer.context;
    if (this.type == "portal") {
        context.fillStyle = "rgb(255,255,0)";
    }
    else {
        context.fillStyle = "rgb(200,200,200)";
    }
	if(this.type == "blueRock")
    {
        context.fillStyle = "rgb(255,255,255)";
		context.font = "28px Times New Roman";
		context.fillText("Thanks for playing!", Renderer.getRealX(this.x-20), Renderer.getRealY(this.y));
    }
	else{
		context.fillRect(Renderer.getRealX(this.x), Renderer.getRealY(this.y), Renderer.getRealX(this.width), Renderer.getRealY(this.height));
	}
};

Obstacle.prototype.update = function()
{

};

Obstacle.prototype.hit = function()
{
    var sound = document.getElementById("wallHit");
    sound.currentTime=0;
    sound.play();
};