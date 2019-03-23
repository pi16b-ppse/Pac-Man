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
    console.log(this.x, this.y, this.type);
}

Tile.prototype.draw = function(){
    switch(this.type){
        case "PACKMAN":
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
            break;
    }
}

function getTile(x, y) {
    return field[y * DIMENSIONS + x];
}
