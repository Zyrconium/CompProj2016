/**
 * Created by B0018968 on 17/03/2016.
 */
var Enemy = function(x, y, type)
{
    //todo: reconsider how to do this.
    this.hpValues = {archer: 10, hArcher: 6, warrior: 20};
    this.widthValues = {archer: 10, hArcher: 10, warrior: 25};
    this.heightValues = {archer: 19, hArcher: 40, warrior: 10};

    this.type = type||"archer";

    this.x = x;
    this.y = y;
    this.width = this.widthValues[this.type];
    this.height = this.heightValues[this.type];
    this.direction = {x:0,y:0};
    this.lookDirection = {x:0,y:0};

    this.turnCD = 0;
    this.shootCD = 5000;
    this.shootDuration = 0;

    this.shooting = false;

    this.speed = {archer: 0.4/17, hArcher: 0.8/17, warrior: 0.9/17};
    this.weapon = {archer: "arrow", hArcher: "arrow", warrior: "spear"};
    this.sprite = {archer: document.getElementById("archerSprite"), hArcher: document.getElementById("hArcherSprite"), warrior: document.getElementById("warriorSprite")};
    this.team = "enemy";
    this.hp = this.hpValues[this.type];
};


Enemy.prototype.update = function(timePassed)
{
    //randomised direction(and speed, to a lesser degree) every .5 seconds;
    var oldx = this.x, oldy = this.y;


    if(this.type=='archer' || this.type =='hArcher')
    {
        this.archerUpdate(timePassed);
    }
    else if(this.type=='warrior')
    {
        this.warriorUpdate(timePassed);
    }

    //collide with rocks.
    for(var i=0;i<Engine.entities.length;i++)
    {
        if(Engine.entities[i] instanceof Obstacle)
        {
            if(Engine.rectCollide(this, Engine.entities[i]))
            {
                this.x = oldx;
                this.y = oldy;
            }
        }

        if(this.type=='warrior' && Engine.entities[i] instanceof Player)
        {
            if(Engine.rectCollide(this, Engine.entities[i])) {
                Engine.entities[i].hit(1); //spear damage is 1.
            }
        }
    }

    //constrain to screen
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
};

Enemy.prototype.archerUpdate = function(timePassed)
{
    if (this.turnCD <= 0) {
        if (!this.shooting) {
            this.direction = {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1};
        }
        this.turnCD = 500; //0.5 seconds

    }
    this.turnCD -= timePassed;

    if (this.shootCD <= 0 && !this.shooting) {
        this.shooting = true;
        this.shootDuration = 4000;
    }
    this.shootCD -= timePassed;

    //Always watching the player.
    var player = Engine.entities[0];
    var xDiff = player.x - this.x, yDiff = player.y - this.y; //vector from enemy to player.
    var length = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)); //Root(x^2+y^2), pythagoras. length between mouse and player.
    this.lookDirection.x = xDiff / length;
    this.lookDirection.y = yDiff / length;

    if (!this.shooting) {
        this.x += this.direction.x * this.speed[this.type] * timePassed;
        this.y += this.direction.y * this.speed[this.type] * timePassed;
    }
    else {
        if (!(this.type == 'archer')) {
            this.x += this.direction.x * this.speed[this.type] * timePassed;
            this.y += this.direction.y * this.speed[this.type] * timePassed;
        }
        this.shootDuration -= timePassed;
        if (this.shootDuration <= 0) {
            console.log("yes");
            this.fire();
            this.shootDuration = 0;
            this.shooting = false;
            this.shootCD = 5000;
        }
    }
};


Enemy.prototype.warriorUpdate = function(timePassed)
{
    //Always watching the player.
    var player = Engine.entities[0];
    var xDiff = player.x - this.x, yDiff = player.y - this.y; //vector from enemy to player.
    var length = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)); //Root(x^2+y^2), pythagoras. length between mouse and player.
    this.lookDirection.x = xDiff / length;
    this.lookDirection.y = yDiff / length;
    if(length<=70)
    {
        this.x += this.lookDirection.x * this.speed[this.type] * timePassed;
        this.y += this.lookDirection.y * this.speed[this.type] * timePassed;
    }
};

Enemy.prototype.draw = function()
{
    var context = Renderer.context;

    context.save();
    context.translate(Renderer.getRealX(this.x), Renderer.getRealY(this.y));
    // could rotate things here, but it makes collision detection much more complicated.
    context.drawImage(this.sprite[this.type], 0, 0, Renderer.getRealX(this.width), Renderer.getRealY(this.height));
    context.restore();
};

Enemy.prototype.fire = function()
{
    //algo: x=(width*.5)+(width*.5*lookDirection.y)+(lookDirection.x*height), y=<some number>+lookDirection.y*height.
    var bulletX = this.x+(this.width*0.5*this.lookDirection.y)+(this.height*0.9*this.lookDirection.x);
    var bulletY = this.y+(this.width*0.5*this.lookDirection.x)+(this.height*0.9*this.lookDirection.y);
    //var Bullet = function(x, y, direction/*vector*/, speed, type)
    var bulletDirection = {x: this.lookDirection.x, y: this.lookDirection.y};

    var newBullet = new Bullet(bulletX, bulletY, bulletDirection, 0.6/17 , this.weapon[this.type], "enemy");
    Engine.entities.push(newBullet);
    var sound = document.getElementById("achShoot");
    sound.currentTime=0;
    sound.play();
};

Enemy.prototype.hit = function(damage)
{
    console.log(Engine.entities);
    this.hp -= damage;
    if(this.hp<=0)
    {
        this.die();
    }
};

Enemy.prototype.die = function()
{
    var copy = {x:this.x, y: this.y};
    Engine.entities.splice(Engine.entities.indexOf(this), 1);
    if(this.type=="hArcher")
    {
        var replacement = new Enemy(copy.x, copy.y, "archer");
        setTimeout(Array.prototype.push.bind(Engine.entities, replacement), 10); //this "solves" a problem I'd been having with archers not spawning due to what I'm going to guess is effectively the array getting confused... or I'm just confused, who even knows.
        var sound = document.getElementById("hrsDie");
        sound.currentTime=0;
        sound.play();
    }
    else
    {
        var sound = document.getElementById("achDie");
        sound.currentTime=0;
        sound.play();
    }
};