/**
 * Created by B00189682 on 04/03/2016.
 */

var Input = {};

Input.keys = {
    W:"up",
    S:"up",
    A:"up",
    D:"up"
};

Input.setup = function(){
    window.addEventListener("keydown", Input.onKeyDown, false );
    window.addEventListener("keyup", Input.onKeyUp, false );
    window.addEventListener("mousedown", Input.onMouseDown, false );
};


Input.onKeyDown = function(event){
    var player = Engine.entities[0];
    if (event.code == "KeyW" && Input.keys.W == "up") { //this stops windows automatic keyrepeating from causing problems.
        if(!(player.keyLocked))
            player.yspeed = -1;
        Input.keys.W = "down";
    }

    if (event.code == "KeyS" && Input.keys.S == "up") {
        if(!(player.keyLocked))
            player.yspeed = 1;
        Input.keys.S = "down";
    }

    if (event.code == "KeyA" && Input.keys.A == "up") {
        if(!(player.keyLocked))
            player.xspeed = -1;
        Input.keys.A = "down";
    }

    if (event.code == "KeyD" && Input.keys.D == "up") {
        if(!(player.keyLocked))
            player.xspeed = 1;
        Input.keys.D = "down";
    }

    if (event.code == "KeyF") {
        //used for misc debug.
    }

    if (event.code == "KeyE") {
        player.special();
    }

    if (event.code == "KeyT") {
        Engine.switchLevel(1); //for testing/demonstration.
    }

    if (event.code == "KeyF") {
        Engine.switchLevel(Engine.level+1); //for testing/demonstration.
    }

    if (event.code == "KeyR")
    {
        Engine.reset();
        Engine.switchLevel(1);
        Engine.started = true;
    }

};

Input.onKeyUp = function(event){
    var player = Engine.entities[0];
     //lockout required for basic special implementation
    if (event.code == "KeyW") { //this stops windows automatic keyrepeating from causing problems.
        if(!(player.keyLocked))
            player.yspeed = 0;
        Input.keys.W = "up";
    }

    if (event.code == "KeyS") {
        if(!(player.keyLocked))
            player.yspeed = 0;
        Input.keys.S = "up";
    }

    if (event.code == "KeyA") {
        if(!(player.keyLocked))
            player.xspeed = 0;
        Input.keys.A = "up";
    }

    if (event.code == "KeyD") {
        if(!(player.keyLocked))
            player.xspeed = 0;
        Input.keys.D = "up";
    }

};

Input.onMouseDown = function(event){
    //borrowing from here for mouse position: http://www.jacklmoore.com/notes/mouse-position/ (had a working build, but this is more compatible with browsers other than Chrome)
    var target = event.target || event.srcElement,
        rect = target.getBoundingClientRect(),
        offsetX = event.clientX - rect.left,
        offsetY = event.clientY - rect.top;
    var player = Engine.entities[0];
    if(event.button == 0)
    {
        player.fire(Renderer.getPseudoX(offsetX), Renderer.getPseudoY(offsetY));
    }
};