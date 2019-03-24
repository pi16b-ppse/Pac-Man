const FIELD = [
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
    "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
    "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
    "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
    "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
    "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
    "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
    "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
    "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
    "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
    "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];

var field = [];
var pacman;
var score = 0;

function setup(){
    createCanvas(500, 535);
    field = generateField();

}

function draw(){
    background(51);
    drawField();

    pacman.update();
    pacman.draw();

    handleInput();
}

function generateField(){
    var f = [];

    for(var i = 0; i < FIELD.length; i++){
        var row = FIELD[i].split(",");
        for(var	j = 0; j < row.length; j++){
            var type = TYPES[row[j]];
            var tile = new Tile(j, i, type);

            switch(type){
                case "PACMAN":
                    pacman = tile;
                    f.push(new Tile(j, i, "OPEN"));
                    break;
                case "BARRIER":
                    f.push(tile);
                    break;
                case "BISCUIT":
                    f.push(tile);
                    break;
                case "CHERRY":
                    f.push(tile);
                    break;
                case "GHOST":
                    f.push(tile);
                    break;
            }
        } 
    }
    return f;
}

function drawField(){
	//if(field[i].type != "PACMAN"){
        for(var i = 0; i < field.length; i++){
            if(field[i].intact){
                field[i].draw();
            }
        }
    //}
    noStroke();
    textSize(30);
    textAlign(LEFT);
    text(score, 5, height - 5);
}

function handleInput(){
    if(keyIsDown(UP_ARROW)){
        pacman.move(0, -1, true);
    }
    else{
        if(keyIsDown(DOWN_ARROW)){
            pacman.move(0, 1, true);
        }
        else{
            if(keyIsDown(LEFT_ARROW)){
                pacman.move(-1, 0, true);
            }
            else{
                if(keyIsDown(RIGHT_ARROW)){
                    pacman.move(1, 0, true);
                }
            }
        }
    }
}

function endGame(won){
    textSize(60);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(5);
    if(won){
        text("You win!", width / 2, height / 2);
    }
    else{
        text("You lose!", width / 2, height / 2);
    }
    textSize(50);
    text("Press F5 to restart", width / 2, height / 2 + 50);
    noLoop();   
}
