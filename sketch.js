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
var ghosts = [];
var score = 0;

function setup(){
    createCanvas(500, 535);
    field = generateField();

}

function draw(){
    background(51);
    drawField();
    for(var j = 0; j < ghosts.length; j++){
        ghosts[j].update();
        ghosts[j].draw();
    }

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
                    ghosts.push(new Tile(j, i, type));
                    f.push(new Tile(j, i, "OPEN"));
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
