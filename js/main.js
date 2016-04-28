/**
 * Created by B00189682 on 01/03/2016.
 */

function onReady()
{
    Renderer.setup();
    Engine.setup();
    Input.setup();
    Music.setup();

    requestAnimationFrame(Engine.update);
}

function spawnDudes()
{
    var e1 = new Enemy(20, 20, "hArcher"), e2 = new Enemy(360, 20, "hArcher");
    Engine.entities.push(e1);
    Engine.entities.push(e2);
}

window.addEventListener("load", onReady);

