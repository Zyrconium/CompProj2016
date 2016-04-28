/**
 * Created by B00189682 on 08/03/2016.
 */

var Player = function(){

    this.x = 200;
    this.y = 260;

    this.speed = 1/17; //A arbitrary number divided by the estimated number of MS per tick.
    this.xspeed = 0;
    this.yspeed = 0;

    this.width = 10;
    this.height = 15;

    this.hp = 3;
    this.currWeapon = "basic";
    this.type = "basic";
    this.image = document.getElementById("basicPlayerSprite");
    this.fireCD = 0;
    this.team = "friendly";

    this.specialCD = 0;
    this.specialDuration = 0;
    this.specialOn = false;

    this.invincible = false;

    this.keyLocked = false;
};

Player.prototype.update = function(timePassed) { //This is getting kinda long, maybe split it up?
    //handling player movement(per tick and bound to the screen size)
    this.x+=(this.xspeed*this.speed)*timePassed;
    this.y+=(this.yspeed*this.speed)*timePassed;

    for(var i=0;i<Engine.entities.length;i++)
    {
        var thisEntity = Engine.entities[i];
        if(thisEntity instanceof Obstacle)
        {
            if(Engine.rectCollide(this, thisEntity))
            {
                if(thisEntity.type == "portal")
                {
                    Engine.switchLevel(thisEntity.destination);
                    var sound = document.getElementById("lvlOver");
                    sound.currentTime=0;
                    sound.play();
                }
                else {
                    this.x -= this.xspeed * this.speed * timePassed;
                    this.y -= this.yspeed * this.speed * timePassed;
                }
            }
        }
        if(thisEntity instanceof Enemy && this.specialOn) {
            if(Engine.rectCollide(this, thisEntity)) {
                thisEntity.die();
            }
        }
    }
    //constrain player to the screen
    if(this.x>Engine.xSize-this.width)
    {
        this.x=Engine.xSize-this.width;
    }
    if(this.y>Engine.ySize-this.height)
    {
        this.y=Engine.ySize-this.height;
    }
    if(this.x<0)
    {
        this.x=0;
    }
    if(this.y<0)
    {
        this.y=0;
    }

    this.fireCD-=timePassed;

    //handling unit special ability timers.
    this.specialCD-=timePassed;
    this.specialDuration-=timePassed;
    this.invincibleDuration-=timePassed;

    if(this.invincibleDuration<=0)
    {
        this.invincible=false;
    }

    if(this.specialCD<0)
        this.specialCD=0;

    if(this.specialOn==true) {
        if (this.specialDuration <= 0) {
            this.specialDuration = 0;
            this.specialUndo();
        }
    }
};

Player.prototype.draw = function(){
    var context = Renderer.context;

    context.drawImage(this.image, Renderer.getRealX(this.x), Renderer.getRealY(this.y), Renderer.getRealX(this.width), Renderer.getRealY(this.height));
};

Player.prototype.fire = function(mouseX, mouseY){
    //check list:
    // mouseX and mouseY, correct
    // length, correct.
    // normalisation, seems goodish?

    //final
    //vector normalisation... Oh the things I remember.
    if(this.fireCD<=0) {
        this.fireCD = 300;
        var bulletX = this.x + (this.width * .5), bulletY = this.y;
        var xDiff = mouseX - bulletX, yDiff = mouseY - bulletY; //vector from mouse to player.
        var length = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)); //Root(x^2+y^2), pythagoras. length between mouse and player.
        var normalX = xDiff / length, normalY = yDiff / length; //todo: consider functions for this.
        //console.log((mouseX-this.x)/length, Math.abs(mouseY-this.y)/length);
        //var Bullet = function(x, y, direction/*vector*/, speed, type)
        var newBullet = new Bullet(bulletX, bulletY, {y: normalY, x: normalX}, false, this.currWeapon, "friendly");
        Engine.entities.push(newBullet);
        var sound = document.getElementById("plrShoot");
        sound.currentTime=0;
        sound.play();
    }
};

Player.prototype.special = function(){
    if(this.specialCD<=0) {
        if(this.type=="basic") {
            this.specialCD=30000; //30 seconds
            this.speed*=2;
            this.keyLocked = true;
            this.specialDuration=2000; // 1 second
            this.specialOn = true;
            this.invincible = true;
            this.invincibleDuration = 5000;
        }
        //more types here.
    }
};

Player.prototype.specialUndo = function(){

    if(this.type=="basic") {
        this.speed/=2;
        this.keyLocked=false;
        this.specialOn=false;
        this.invincibleDuration=0;
        this.xspeed=0;
        this.yspeed=0;
    }
    //more types here
};

Player.prototype.hit = function(damage)
{
    if(!this.invincible)
        this.hp-=damage;
    this.invincible=true;
    this.invincibleDuration=1000; // 1 second
    if(this.hp<=0)
    {
        //todo: player death
        Engine.running=false;
        var sound = document.getElementById("plrDie");
        sound.currentTime=0;
        sound.play();
    }
    else
    {
        var sound = document.getElementById("plrHit");
        sound.currentTime=0;
        sound.play();
    }
};