document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    //console.log(event);
    if (event.keyCode == 119) {//"&& event.ctrlKeyuse" for using combinations like 'ctrl+_'
    paddle1y -= 5
    if (paddle1y < 0){
        paddle1y = 0
    }
    }
    if (event.keyCode == 115) {//"&& event.ctrlKeyuse" for using combinations like 'ctrl+_', "event.key === 's'" for keys
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    paddle1y += 5
    if (paddle1y > canvas.height-paddleheight){
        paddle1y = canvas.height-paddleheight
    }
    }
};

//window.addEventListener('click', function(evt) {mousepos(evt);}, false);
//window.addEventListener('mousedown', function(evt) {mousepos(evt);}, false);
window.addEventListener('mousedown mouseup', function mouseState(e) {
    if (e.type == "mousedown") {
        //code triggers on hold
        mousepos(evt);
    }
});

var bally
var ballx
var speedy = 0.5
var speedx = 2
var paddle1y = 55;
var paddle2y = 55;
var ghostx
var ghosty
const paddleheight = 40
const paddlewidth = 6
var p1score = 0
var p2score = 0

window.onload = function() {
    drawstart()
}

function drawstart() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(80,0.25, 140 , 80);
    ctx.fillStyle = "black";
    ctx.font = "30px monospace";
    ctx.fillText("PONG JS" ,90,20);
    ctx.fillText("ARCADE" ,100,50);
    ctx.font = "10px monospace ";
    ctx.fillText("Built for the Web" ,100,70);
    ctx.fillStyle = "white";
    ctx.fillRect(80,100, 140 , 5);
    ctx.fillText("CLICK PLAY TO START" ,95,100);
}
function startup() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.font = "30px monospace ";
    ctx.fillText("AV1" , 10, 20);
    setTimeout(startgame, 1000);
}
function startgame() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ballx = canvas.width / 2;
    bally = canvas.height / 2  
    var fps = 30
    setInterval(function() {
        move()
        draw()
    }, 1000/fps);
    canvas.addEventListener("mousemove", 
    function(evt) {
        mousepos(evt);
    });
}
function mousepos(evt) {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var xmouse = evt.clientX - rect.left - root.scrollLeft;
    var ymouse = evt.clientY;// - rect.top - root.scrollTop
    paddle1y = ymouse-270
    if (paddle1y > canvas.height-paddleheight){
        paddle1y = canvas.height-paddleheight
    }
    if (paddle1y < 0){
        paddle1y = 0
    }
}
function up() {
    /*paddle1y -= 4
    if (paddle1y < 0){
        paddle1y = 0
    }*/
    var simulatedEvent = new KeyboardEvent("keypress", {keyCode: 119, which: 119});
    document.dispatchEvent(simulatedEvent);
}
function down() {
    /*var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    paddle1y += 4
    if (paddle1y > canvas.height-paddleheight){
        paddle1y = canvas.height-paddleheight
    }*/
    var simulatedEvent = new KeyboardEvent("keypress", {keyCode: 115, which: 115});
    document.dispatchEvent(simulatedEvent);
}
function reset() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ballx = canvas.width / 2;
    bally = canvas.height / 2
    speedx = speedx
    speedy = speedy
    speedx = speedx * -1
}
function aimove() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    var paddle2center = paddle2y + (paddleheight/2)
    if (paddle2center < bally-15) {
        paddle2y += 0.5;
    } else if (paddle2center > bally-15){
        paddle2y -= 0.5;
    }
    if (paddle2y > canvas.height-paddleheight){
        paddle2y = canvas.height-paddleheight
    }
    if (paddle2y < 0){
        paddle2y = 0
    }
}
function move() {
    aimove()
    ghosty = bally;
    ghostx = ballx;
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    ballx += speedx
    bally += speedy
    if (ballx < 0) {
        if (bally > paddle1y && bally < paddle1y + paddleheight) {
            speedx = speedx * -1
            var deltay  = bally - (paddle1y+paddleheight/2);
            speedy = deltay * 0.10;
        }
        else {
            p2score += 1
            reset()
        }
    }
    if (ballx > canvas.width-5) {
        if (bally > paddle2y && bally < paddle2y + paddleheight) {
            speedx = -speedx;
            var deltay  = bally - (paddle2y+paddleheight/2);
            speedy = deltay * 0.10;
        }
        else {
            p1score += 1
            reset()
            playup()
        }
        
    }
    if (bally < 0) {
        speedy = speedy * -1
    }
    if (bally > canvas.height-5) {
        speedy = -speedy;
    }
    ghostiy = ghosty;
    ghostix = ghostx;
}
function draw() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    //clear screen
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //line across the center
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2, 0, 2, canvas.height);
    //ghost ball 1
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(ghostix, ghostiy, 7, 4.75);
    //ghost ball 2
    ctx.fillStyle = "#757575";
    ctx.fillRect(ghostx, ghosty, 7, 4.75);
    //ball
    ctx.fillStyle = "white";
    ctx.fillRect(ballx, bally, 7, 4.75);
    //paddle
    ctx.fillStyle = "white";
    ctx.fillRect(0, paddle1y, paddlewidth, paddleheight);//canvas.height/4
    //ai paddle
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width-paddlewidth, paddle2y, paddlewidth, paddleheight);//canvas.height/4
    //score
    ctx.font = "15px monospace";
    ctx.fillText(p1score ,30,20);
    ctx.fillText(p2score ,canvas.width-35,20);
}
function playup() {
    var up = document.getElementById("up");
    up.play();
    }
