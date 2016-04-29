/**
 * Created by B00189682 on 04/03/2016.
 */

var Renderer = {};

var Images = {};

Renderer.setup = function() {
    Renderer.canvas = document.getElementById("display");
    Renderer.context = Renderer.canvas.getContext("2d");
    Renderer.context.canvas.width  = window.innerWidth - 20;
    Renderer.context.canvas.height = window.innerHeight - 20;

    //Renderer.loadImages();
};

Renderer.display = function(timePassed){

    var context = Renderer.context;
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;

    context.clearRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);
    context.fillStyle = "rgb(40,140,40)";
    context.fillRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);
    context.save();

    for(var i=0;i<Engine.entities.length;i++)
    {
        Engine.entities[i].draw();
    }

    context.restore();
    context.fillStyle = "rgb(255,255,255)";
    context.font="28px Times New Roman";
    context.fillText(fps.toFixed(0), Renderer.getRealX(390), Renderer.getRealY(10))
    if(Engine.started==false)
    {
        context.fillText("Control with WASD", Renderer.getRealX(50), Renderer.getRealY(50));
        context.fillText("Mouse to fire", Renderer.getRealX(50), Renderer.getRealY(80));
        context.fillText("E to charge through the enemy", Renderer.getRealX(50), Renderer.getRealY(110));
        context.fillText("Press R to begin, or to reset if you die.", Renderer.getRealX(50), Renderer.getRealY(140));
        context.font="16px Times New Roman";
        context.fillText("Sound effects used with permission from freesound.org users:", Renderer.getRealX(230), Renderer.getRealY(100));
        context.fillText("'D W', 'ProjectsU012', 'Cabeeno Rossley',", Renderer.getRealX(230), Renderer.getRealY(112));
        context.fillText("'Erdie', 'dermotte', 'Kane53126'", Renderer.getRealX(230), Renderer.getRealY(124));
        context.fillText("'Federico Manuti' and 'dobroide'(who's sound was", Renderer.getRealX(230), Renderer.getRealY(136));
        context.fillText("modified for our horse death sound)", Renderer.getRealX(230), Renderer.getRealY(148));
        context.fillText("more info available in the included 'Sounds.txt'", Renderer.getRealX(230), Renderer.getRealY(160));
    }


};

Renderer.showDead = function()
{
    var context = Renderer.context;
    context.fillStyle = "rgb(255,150,150)";
    context.font="44px Times New Roman";
    context.fillText("You Died", Renderer.getRealX(100), Renderer.getRealY(140));
};



Renderer.getPseudoX = function(realX){ //converts from the browser's pixel based coordinate system to my imaginary one
    return (realX/this.canvas.width)*Engine.xSize; // 400 real in pseudo is (400/800)*200 = 100.
};

Renderer.getRealX = function(pseudoX){ //converts back from the above
    return (pseudoX/Engine.xSize) * this.canvas.width; // 100 pseudo in real is (100/200) * 800 = 400.
};

Renderer.getPseudoY = function(realY){
    return (realY/this.canvas.height)*Engine.ySize;
};

Renderer.getRealY = function(pseudoY){
    return (pseudoY/Engine.ySize) * this.canvas.height;
};