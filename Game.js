canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
var oX,oY;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    oX = canvas.width/2;
    oY = canvas.height/2;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);


dr = Math.PI / 180;

rd = 180 / Math.PI;



target = {x:0,y:0}
player = {
    x:0,
    y:0,
    w:32,
    h:50,
    speed:5,
    deg:0,
    move:true
}

sprites = {
    "I":new Image(),
    "grass": new Image(),
    "rock": new Image(),
    "stone": new Image()
}

sprites["I"].src = "I.png";
sprites["grass"].src = "grass.png";
sprites["rock"].src = "rock.png";
sprites["stone"].src = "stone.png";

function X(x) {
    return (oX+x)-player.x
}
function Y(y) {
    return (oY-y)+player.y
}


addEventListener("contextmenu",e=>{
    e.preventDefault();
})

addEventListener("mousedown",(e)=>{
    if (e.button == 2) {     
        target.x = 32*Math.round((oX - e.x + 16)/32)
        target.y = 32*Math.round((oY - e.y + 40)/32)

        degress = rd*Math.atan2(target.y , target.x);
        if(degress < 0){
          degress += 360
        }
        player.deg = degress
        player.move = true
    }
})

function Move(object,target){
    if(!object.move){return}
    length = 20;

    xpow = target.x * target.x
    ypow = target.y * target.y
    tlength = Math.sqrt(xpow+ypow)

    xpow = object.x * object.x
    ypow = object.y * object.y
    length = Math.abs(Math.sqrt(xpow+ypow) - tlength)

    console.log(length)
    speed = object.speed;
    if(tlength <= 16 && speed >= 16){
        speed = 8;
        console.log("sa");
    }
    if(tlength <= 4 && speed >= 4){
        speed = 2;
        console.log("sa");
    }
    if(tlength <= 2 && speed >= 2){
        speed = 0.5;
        console.log("sa");
    }
    if(tlength <= 2.2){
        
        object.x = 32*Math.round(object.x/32)
        object.y = 32*Math.round(object.y/32)
        return
    }
    degress = rd*Math.atan2(target.y , target.x);
    if(degress < 0){
      degress += 360
    }
    player.deg = degress
    
    dx = Math.cos(dr*object.deg);
    dy = Math.sin(dr*object.deg);
    
    object.x -= dx*speed;
    object.y += dy*speed;

    target.x -= dx*speed;
    target.y -= dy*speed;
}

setInterval(()=>{
    ctx.fillRect(0,0,canvas.width,canvas.height)
    Move(player,target);
    for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        ctx.drawImage(sprites[map[i][j]],X((i-50)*32),Y((j-50)*32),32,32)
    }
}
    ctx.beginPath()
    ctx.setLineDash([5, 7])
    ctx.lineWidth = 3;
    ctx.moveTo(oX+16,oY+42)
    ctx.lineTo(oX-target.x+16,oY-target.y+48)
    ctx.stroke()
    
    ctx.drawImage(sprites["I"],oX,oY+16,32,48);
},1000/60);