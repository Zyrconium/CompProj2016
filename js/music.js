/**
 * Created by B00189682 on 28/04/2016.
 */

var Music = {};

Music.list = [];
Music.last = 0;

Music.setup = function()
{
    Music.list = document.getElementById("music").childNodes;
    Music.play(0);
};

Music.play = function(num)
{
    Music.list[(Music.last*2)+1].pause();
    var sound = Music.list[(num*2)+1];
    sound.currentTime=0;
    sound.play();
    Music.last = num;
};
