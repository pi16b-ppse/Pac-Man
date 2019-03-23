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
var packman;

function setup(){
    createCanvas(500, 500);
    field = generateField();
}

function draw(){
    background(51);
    drawField();

    pacman.update();
    pacman.draw();
}

function generateField(){
    var f = [];

    for(var i = 0; i < FIELD.length; i++){
        var row = FIELD[i].split(",");
        for(var	j = 0; j < row.length; j++){
            var type = TYPES[row[j]];
            var tile = new Tile(j, i, type);

            switch(type){
                case "PACKMAN":
                    packman = tile;
                    f.push(new Tile(j, i, "PACKMAN"));
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
	if(field[i].type != "PACMAN"){
        for(var i = 0; i < field.length; i++){
            field[i].draw();
        }
    }
}

function handleInput(){
    if(keyIsDown(UP_ARROW)){

    }
    else{
    	if(keyIsDown(DOWN_ARROW)){

    	}
    	else{
    		if(keyIsDown(LEFT_ARROW)){

    		}
    		else{
    			if(keyIsDown(RIGHT_ARROW)){

    			}
    		}
    	}
    }
}