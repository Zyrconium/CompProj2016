/**
 * Created by B00189682 on 04/03/2016.
 */

var Engine = {};
var lastFrame = 0;
var timePassed = 0;
Engine.entities = [];
var fps;

Engine.setup = function() {
    Engine.xSize = 426;
    Engine.ySize = 320;
    Engine.running = true;
    Engine.started = false;
};

Engine.update = function(time) {
    if (lastFrame == 0)
        lastFrame = time - 17;
    timePassed = time - lastFrame;

    if(Engine.running) {
        fps = 1000 / timePassed;
        for (var i = 0; i < Engine.entities.length; i++) {
            Engine.entities[i].update(timePassed);
        }

        Renderer.display(timePassed);
    }
    else
    {
        Renderer.showDead();
    }
    lastFrame = time;
    requestAnimationFrame(Engine.update);
};

Engine.switchLevel = function(levelName)
{
    var player = Engine.entities[0];
    Engine.entities.splice(1, (Engine.entities.length-1));
    var adds = [];
    Engine.level = levelName;
    if(levelName==1)
    {
        adds.push(new Enemy(10*13, 18*10, "archer"));
        adds.push(new Enemy(12*13, 18*10, "archer"));
        adds.push(new Enemy(4*13, 2*10, "archer"));
        adds.push(new Enemy(9*13, 2*10, "archer"));
        adds.push(new Enemy(14*13, 2*10, "archer"));
        adds.push(new Enemy(6*13, 5*10, "archer"));
        adds.push(new Enemy(11*13, 5*10, "archer"));
        adds.push(new Enemy(20*13, 13*10, "warrior"));
        adds.push(new Obstacle(0, 0, "rock", 33*13, 2*10));
        adds.push(new Obstacle(0, 7*10, "rock", 27*13, 20));
        adds.push(new Obstacle(0, 9*10, "rock", 9*13, 16*10));
        adds.push(new Obstacle(0, 25*10, "rock", 14*13, 8*10));
        adds.push(new Obstacle(32*13, 2*10, "rock", 13, 14*10));
        adds.push(new Obstacle(15*13, 15*10, "rock", 5*13, 6*10));
        adds.push(new Obstacle(20*13, 15*10, "rock", 13*13, 18*10));
        adds.push(new Obstacle(0, 31*10, "rock", 33*13, 10));
        adds.push(new Obstacle(0, 2*10, "portal", 13, 5*10));
        player.x=16.5*13;
        player.y=27*10;
    }
    else if(levelName==2)
    {
        adds.push(new Enemy(12*13, 19*10, "hArcher"));
        adds.push(new Enemy(14*13, 11*10, "hArcher"));
        adds.push(new Enemy(22*13, 11*10, "hArcher"));
        adds.push(new Enemy(19*13, 17*10, "hArcher"));
        adds.push(new Enemy(8*13, 14*10, "archer"));
        adds.push(new Enemy(29*13, 3*10, "archer"));
        adds.push(new Enemy(29*13, 4*10, "archer"));
        adds.push(new Enemy(15*13, 4*10, "warrior"));
        adds.push(new Enemy(23*13, 4*10, "warrior"));
        adds.push(new Obstacle(0, 0, "rock", 33*13, 2*10));
        adds.push(new Obstacle(0, 2*10, "rock", 4*13, 21*10));
        adds.push(new Obstacle(0, 23*10, "rock", 23*13, 9*10));
        adds.push(new Obstacle(23*13, 31*10, "rock", 10*13, 10));
        adds.push(new Obstacle(8*13, 6*10, "rock", 25*13, 4*10));
        adds.push(new Obstacle(30*13, 10*10, "rock", 3*13, 13*10));
        adds.push(new Obstacle(27*13, 23*10, "rock", 6*13, 3*10));
        adds.push(new Obstacle(32*13, 2*10, "portal", 13, 4*10));
        player.x=30*13;
        player.y=28*10;
    }
    else if(levelName==3) {
        adds.push(new Enemy(23*13, 9*10, "hArcher"));
        adds.push(new Enemy(30*13, 15*10, "hArcher"));
        adds.push(new Enemy(5*13, 10*10, "archer"));
        adds.push(new Enemy(9*13, 10*10, "archer"));
        adds.push(new Enemy(28*13, 3*10, "archer"));
        adds.push(new Enemy(13*13, 20*10, "warrior"));
        adds.push(new Obstacle(0, 0, "rock", 25*13, 9*10));
        adds.push(new Obstacle(0, 0, "rock", 3*13, 32*10));
        adds.push(new Obstacle(0, 31*10, "rock", 33*13, 10));
        adds.push(new Obstacle(10*13, 23*10, "rock", 23*13, 9*10));
        adds.push(new Obstacle(15*13, 14*10, "rock", 4*13, 9*10));
        adds.push(new Obstacle(18*13, 18*10, "rock", 15*13, 17*10));
        adds.push(new Obstacle(31*13, 0, "rock", 33*13, 32*10));
        adds.push(new Obstacle(25*13, 0, "portal", 6*13, 10));
        player.x= 6*13;
        player.y= 27*10;
    }
    else if(levelName==4) {
        adds.push(new Enemy(9*13, 7*10, "hArcher"));
        adds.push(new Enemy(11*13, 3*10, "hArcher"));
        adds.push(new Enemy(16*13, 4*10, "archer"));
        adds.push(new Enemy(16*13, 22*10, "archer"));
        adds.push(new Enemy(16*13, 20*10, "archer"));
        adds.push(new Enemy(16*13, 28*10, "archer"));
        adds.push(new Enemy(16*13, 26*10, "archer"));
        adds.push(new Enemy(16*13, 14*10, "archer"));
        adds.push(new Enemy(17*13, 7*10, "archer"));
        adds.push(new Enemy(21*13, 20*10, "warrior"));
        adds.push(new Enemy(23*13, 26*10, "warrior"));
        adds.push(new Enemy(25*13, 21*10, "warrior"));
        adds.push(new Obstacle(0, 0, "rock", 13, 32*10));
        adds.push(new Obstacle(0, 9*10, "rock", 13*13, 23*10));
        adds.push(new Obstacle(13*13, 9*10, "rock", 15*13, 2*10));
        adds.push(new Obstacle(5*13, 0, "rock", 28*13, 2*10));
        adds.push(new Obstacle(16*13, 2*10, "rock", 17*13, 3*10));
        adds.push(new Obstacle(31*13, 0, "rock", 2*13, 32*10));
        adds.push(new Obstacle(19*13, 14*10, "rock", 14*13, 18*10));
        adds.push(new Obstacle(13, 0, "portal", 4*13, 10));
        player.x = 16*13;
        player.y = 30*13;
    }
    else if(levelName==5) {
        adds.push(new Obstacle(15*13, 7*10, "blueRock", 3*13, 3*10));
        adds.push(new Obstacle(0, 0, "rock", 33*13, 5*10));
        adds.push(new Obstacle(0, 0, "rock", 8*13, 32*10));
        adds.push(new Obstacle(0, 19*10, "rock", 15*13, 13*10));
        adds.push(new Obstacle(18*13, 19*10, "rock", 15*13, 13*10));
        adds.push(new Obstacle(25*13, 0, "rock", 8*13, 32*10));
        player.x = 16*13;
        player.y = 30*13;
    }

    Music.play(levelName);
    Engine.entities = Engine.entities.concat(adds);
};

Engine.reset = function()
{
    Engine.entities[0] = new Player();
    Engine.switchLevel(1);
    Engine.running = true;
};

//todo: look into non-axis aligned collision detection.
Engine.linePointCollide = function(point, startLine, endLine) //1d collision.... to reduce code reuse.
{
    return point >= startLine && point <= endLine;
};

Engine.rectPointCollide = function(point, obj2) //now 2d collision with a point... getting more complex.
{
    return Engine.linePointCollide(point.x, obj2.x, obj2.x + obj2.width) && Engine.linePointCollide(point.y, obj2.y, obj2.y + obj2.height);
};

Engine.rectCollide = function(obj1, obj2) { //and 2d collision with rectangles, it's not rocket science, but it's getting there.
    var obj1TopLeft = {x: obj1.x, y: obj1.y};
    var obj1TopRight = {x: obj1.x+obj1.width, y: obj1.y};
    var obj1BottomLeft = {x: obj1.x, y: obj1.y+obj1.height};
    var obj1BottomRight = {x: obj1.x+obj1.width, y: obj1.y+obj1.height};
    if (Engine.rectPointCollide(obj1TopLeft, obj2)) {
        return true;
    }
    if (Engine.rectPointCollide(obj1TopRight, obj2)) {
        return true;
    }
    if (Engine.rectPointCollide(obj1BottomLeft, obj2)) {
        return true;
    }
    if (Engine.rectPointCollide(obj1BottomRight, obj2)) {
        return true;
    }
    return false;
};