/**
 * Created by B00189682 on 08/03/2016.
 */

var Bullet = function(x, y, direction/*vector*/, speed, type, team){

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed || 4/17;
    this.type = type || "basic"; //default to "basic"
    this.team = team || "friendly";
    this.image = {basic: document.getElementById("basicBulletSprite"), arrow: document.getElementById("basicArrowSprite")};
    this.damage = {basic: 2, arrow: 1};
    this.width = 2;
    this.height = 10;

};

Bullet.prototype.draw = function(){

    var context = Renderer.context;

    context.save();

    context.translate(Renderer.getRealX(this.x), Renderer.getRealY(this.y));
    context.rotate(-Math.atan2(this.direction.x, this.direction.y));
    if(this.type=="basic"||this.type=="arrow")
    {
        context.drawImage(this.image[this.type], 0, 0, Renderer.getRealX(this.width), Renderer.getRealY(this.height));
    }
    else
    {
        context.fillStyle = "rgb(255,255,0)";
        context.fillRect(0, 0, Renderer.getRealX(this.width), Renderer.getRealY(this.height));
    }
    context.restore();
};

Bullet.prototype.update = function(timePassed) {
    this.x += this.direction.x * this.speed * timePassed;
    this.y += this.direction.y * this.speed * timePassed;

    for(var i=0;i<Engine.entities.length;i++)
    {
        if(Engine.entities[i].team!==this.team &&! ( Engine.entities[i] instanceof Bullet)) // if the projectile is on a different team and both entities are not Bullets.
        {
            if(Engine.rectCollide(this, Engine.entities[i]))
            {
                Engine.entities[i].hit(this.damage[this.type]);
                this.destroy();
            }
        }
    }


    if (this.y < 0||this.x < 0||this.y>Engine.ySize||this.x>Engine.xSize) {
        //Garbage Collection, when the bullet leaves the screen it stops existing.
        this.destroy();
    }

};

Bullet.prototype.destroy = function()
{
    Engine.entities.splice(Engine.entities.indexOf(this), 1);
};

Bullet.prototype.hit = function()
{

};
