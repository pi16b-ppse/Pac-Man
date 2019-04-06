const TYPES = [
    "BARRIER",
    "BISCUIT",
    "OPEN",
    "CHERRY",
    "GHOST",
    "PACMAN",
    "POISON",
    "APPLE"
];

const DIMENSIONS = 20;
const SIZE = 25; 
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

function Tile(x, y, type, behavior){
    this.x = x;
    this.y = y;
    this.type = type;
    this.destination = (-1, -1);
    this.moving = false;
    this.speed = 0.3;

    this.intact = true;
    this.behavior = behavior; //ghosts only
}

Tile.prototype.draw = function(){
    switch(this.type){
        case "PACMAN":
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
        case "OPEN":
            break;
        case "POISON":
            ellipseMode(CORNER);
            noStroke();
            fill(0);
            ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
            break;
        case "APPLE":
            ellipseMode(CORNER);
            stroke(255);
            strokeWeight(2);
            fill("#00FF00");
            ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
            break;
    }
};

function getTile(x, y) {
    return field[y * DIMENSIONS + x];
}

Tile.prototype.move = function(x, y, relative){
    var destinationX;
    var destinationY;

    if(relative){
        destinationX = this.x + x;
        destinationY = this.y + y;
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

    if((type == "BARRIER" && this.type != "BARRIER") || (type == "GHOST" && this.type != "GHOST")){
        return false;
    }   

    this.moving = true;
    this.destination = createVector(destinationX, destinationY);

    return true;
}


Tile.prototype.update = function(){
    if(!this.intact){
        return;
    }

    if(this.moving){
        if(this.type == "PACMAN"){
            this.x = lerp(this.x, this.destination.x, this.speed);
            this.y = lerp(this.y, this.destination.y, this.speed);
        }
        else{
            if(this.type == "GHOST"){
                this.x = lerp(this.x, this.destination.x, this.speed-0.15);
                this.y = lerp(this.y, this.destination.y, this.speed-0.15);
            }
        }

        var distanceX = Math.abs(this.x - this.destination.x);
        var distanceY = Math.abs(this.y - this.destination.y);

        if(distanceX < 0.1 && distanceY < 0.1){
            this.x = this.destination.x;
            this.y = this.destination.y;

            this.moving = false;
        }
    }  

    if(this.moving){
        return;
    }

    if(this.type == "PACMAN"){
        var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));
        if(destinationTile.intact){
            switch(destinationTile.type){
                case "BISCUIT":
                    destinationTile.intact = false;
                    score++;
                    break;
                case "CHERRY":
                    destinationTile.intact = false;
                    score+=10;
                    break;
                case "GHOST":
                    endGame(false);
                    break;
                case "POISON":
                    destinationTile.intact = false;
                    score-=10;
                    break;
                case "APPLE":
                    destinationTile.intact = false;
                    score+=3;
                    break;
            }
        }
    }
    else{
        if(this.type == "GHOST"){
            var distance = dist(pacman.x, pacman.y, this.x, this.y);
            if (distance < 0.5){// if Pac-man has touched a GHOST
                endGame(false);
            }

            if(this.moving){
                return;
            }

            var possibleMoves = [
                getTile(this.x - 1, this.y), //left
                getTile(this.x + 1, this.y), //right
                getTile(this.x, this.y - 1), //top
                getTile(this.x, this.y + 1) // bottom
            ];

            possibleMoves.sort(function (a, b) {
                var aD = dist(a.x, a.y, pacman.x, pacman.y);
                var bD = dist(b.x, b.y, pacman.x, pacman.y);
                return aD - bD;
            });
            
            if(this.behavior === 0){
                for(var i = 0; i < possibleMoves.length; i++){
                    if(this.move(possibleMoves[i].x, possibleMoves[i].y, false)){
                        break;
                    }
                }
            }
            else{
                var ind = Math.floor(random(4));
                this.move(possibleMoves[ind].x, possibleMoves[ind].y, false);
            }
        }
    }

    if(score >= 241){
        endGame(true);
    }

}