console.log("Built over 2 days from 15/5/2020 to 16/5/2020 with addition of game over + reset in 20/10/2020.")
var grid = [];
var score = 0;

function scoring(sameList){
  if(sameList.length>1){
    score = score + Math.pow(sameList.length,2); //gives the square of the length of bubbles removed
    return score;
  }
  return score;
}

function sentToSameColour(id){
  sameList = [];
  splitter = id.split(","); // handles cases when there are more digits in id
  y = parseInt(splitter[0]);
  x = parseInt(splitter[1]);
  colour = grid[y][x] // save the colour for checking purposes
  sameColour(grid,y,x);
  if(sameList.length == 1){
    grid[y][x] = colour; //if the length of sameList is still one, means that its a single unit, hence reset colour
  }
  else{
    console.log(sameList);
    sameList = sameList.sort(function(a, b)
      {
        return a[0] - b[0];
      });
    console.log(sameList);
    checkGravity(grid,sameList); //check gravity last!
  };
  document.getElementById("score").innerHTML = `Score: ${scoring(sameList)}`;
  document.getElementById("grid").innerHTML = makeTableHTML(grid);
  checkGameOver(grid)
}

function checkGameOver(grid) {
  for(var y=1; y < grid.length; y++){ //start at 1 so corner cases not affected
    for(var x=0; x< grid[y].length;x++){ //start at 1 so corner cases not affected
      if(grid[y][x] !== "e"){ //not empty
        if(x !== 0){
          if(grid[y][x] === grid[y][x-1]){
          return console.log("proceed");
        }
        }
        if(grid[y][x] === grid[y-1][x]){
          return console.log("proceed");
        }
      }
    }
  }
  return document.getElementById("gameover").innerHTML = "GAME OVER!";
}

function makeTableHTML(myArray) {
    var result = "<table border=0>";
    for(var y=0; y<myArray.length; y++) {
        result += "<tr>";
        for(var x=0; x<myArray[y].length; x++){
            result += `<td id="${y},${x}" onclick="sentToSameColour(this.id)" onmouseover="hoverIn(this)" onmouseout="hoverOut(this)" class=${myArray[y][x]}></td>`;
            //console.log(y,x);
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

function hoverIn(cell) {
  var originalClass = cell.className;
  cell.className = originalClass+"anim"; 
}

function hoverOut(cell) {
  cell.className = cell.className[0];
}

function gravity(grid,y,x){
  for(var q = y; q > 0; q--){
    //console.log("handling:",q,x);
    var store = grid[q][x];
    //console.log("storing:",grid[q][x]);
    grid[q][x] = grid[q-1][x];
    //console.log("swapping:",grid[q][x],"with",grid[q-1][x]);
    grid[q-1][x] = store;
  }
};

function checkGravity(grid,sameList){
  for(k=0;k<sameList.length;k++){
    y = sameList[k][0];
    x = sameList[k][1];
    gravity(grid,y,x);
  };
};

function randomColour(){
  colour = ['r','g','b'];
  num = Math.floor(Math.random() * 3);   // returns a random integer from 0 to 2
  return colour[num];
}

function generateGrid(rows, columns){
  for(var i=0; i<rows; i++){
    horizontal = [];
    for(var j=0; j<columns; j++){
      horizontal.push(randomColour());
    };
    grid.push(horizontal);
  };
}; 

function sameColour(grid,y,x){
  var colour = grid[y][x];
  if(sameList.length == 0){
    sameList.push([y,x]); //sameList is in sentToSameColour
  };
  grid[y][x] = 'e';
  if(y != grid.length-1){ //not at the lowest height
    if(grid[y+1][x] == colour){ 
      sameColour(grid,y+1,x); //perform the "search" for neighbouring same colours again
      sameList.push([y+1,x]);
    };
  };
  if(y != 0){ //not at the highest height
    if(grid[y-1][x] == colour){ 
      sameColour(grid,y-1,x);
      sameList.push([y-1,x]);
    };
  };
  if(x != 0){ //not at the extreme left
    if(grid[y][x-1] == colour){ 
      sameColour(grid,y,x-1);
      sameList.push([y,x-1]);
    };
  };
  if(x != grid[y].length){ //not at the extreme right
    if(grid[y][x+1] == colour){ 
      sameColour(grid,y,x+1);
      sameList.push([y,x+1]);
    };
  };
};


function reset(){
  grid = [];
  generateGrid(rows,columns);
  document.getElementById("grid").innerHTML = makeTableHTML(grid);
  score = 0;
  document.getElementById("score").innerHTML = "Score: 0";
  document.getElementById("gameover").innerHTML = "";
}


rows = 10;
columns = 10;
generateGrid(rows,columns);
document.getElementById("grid").innerHTML = makeTableHTML(grid);