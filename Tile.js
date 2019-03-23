const TYPES = [
    "BARRIER",
    "BISCUIT",
    "OPEN",
    "CHERRY",
    "GHOST",
    "PACMAN"
];

const DIMENSIONS = 20;
const SIZE = 25; 
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

function Tile(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.destination = (-1, -1);
    this.moving = false;
    this.speed = 0.2;
}

Tile.prototype.draw = function(){
    switch(this.type){
        case "PACKMAN":
            ellipseMode(CORNER);
            stroke("#FFFF00");
            strokeWeight(5);
            fill("#FFFF33");
            ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
            break;
        case "BARRIER":
            strokeWeight(5);
            stroke(0);
            fill("#0000FF");
            rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
            break;
         case "BISCUIT":
            ellipseMode(CORNER);
            noStroke();
            fill(255);
            ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
            break;
        case "CHERRY":
            ellipseMode(CORNER);
            stroke(255);
            strokeWeight(2);
            fill("#FF2222");
            ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
            break;
        case "GHOST":
            stroke(0);
            strokeWeight(0);
            fill("#FF00EE");
            triangle(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE, this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3), this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
            break;
    }
};

function getTile(x, y) {
    return field[y * DIMENSIONS + x];
}

Tile.prototype.move = function(){
	var destinationX;
	var destinationY;

	if(relative){
		destinationX = this.x + x;
		destinationX = this.y + y;
	}
	else{
		destinationX = x;
		destinationY = y;
	}

    if(this.moving){
    	return;
    }

    var destinationTile = getTile(destinationX, destinationY);
    var type = destinationTile.type;

    if(type == "BARRIER" && this.type != "BARRIER"){
    	return false;
    }   

    this.moving = true;
    this.destination = createVector(destinationX, destinationY);

    return true;
}
