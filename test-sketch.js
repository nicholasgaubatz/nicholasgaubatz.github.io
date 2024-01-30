// Grid game code
// Nicholas Gaubatz
// Based on The Coding Train's code found at https://editor.p5js.org/codingtrain/sketches/AoH40T6fV

// Center canvas in page. Source: https://github.com/processing/p5.js/wiki/Positioning-your-canvas
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

// The grid
let grid;
// How big is each square?
let w = 40;
let cols, rows;
let hueValue = 200;
// Current sizes of S and N(S)
let s_size = 0;
let ns_size = 0;

function setup() {
  cnv = createCanvas(440, 480);
  centerCanvas();
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w - 1;
  grid = make2DArray(cols, rows);
  print(cols);
  print(rows);
}

function mouseClicked() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);
  let type = (mouseCol + mouseRow) % 2 + 1;
  
  // Adjust grids and sizes
  // Add blue square and green neighbors if not already in S
  if (grid[mouseCol][mouseRow] != hueValue){
    if (grid[mouseCol][mouseRow] == 0){
      s_size += 1;
    }
    else if (grid[mouseCol][mouseRow] == hueValue/2){
      s_size += 1;
      ns_size -= 1;
    }
    grid[mouseCol][mouseRow] = hueValue;
    if (type==1){
      if (grid[mouseCol+1][mouseRow] == 0){
        grid[mouseCol+1][mouseRow] = hueValue/2;
        ns_size += 1
      }
      if (grid[mouseCol-1][mouseRow] == 0){
        grid[mouseCol-1][mouseRow] = hueValue/2;
        ns_size += 1
      }
    }
    if (type==2){
      if (grid[mouseCol][mouseRow+1] == 0){
        grid[mouseCol][mouseRow+1] = hueValue/2;
        ns_size += 1
      }
      if (grid[mouseCol][mouseRow-1] == 0){
        grid[mouseCol][mouseRow-1] = hueValue/2;
        ns_size += 1
      }
    }
  }
  // Remove square from S if already in S
  else if (grid[mouseCol][mouseRow] == hueValue){
    s_size -= 1;
    
    if (type==1){
      // If S vertex directly above or below, turn vertex green
      if (grid[mouseCol][mouseRow-1] == hueValue || 
          grid[mouseCol][mouseRow+1] == hueValue){
        grid[mouseCol][mouseRow] = hueValue/2;
        ns_size += 1;
      }
      else{ // Else turn vertex black
        grid[mouseCol][mouseRow] = 0;
      }
      // 
      if (grid[mouseCol+2][mouseRow] != hueValue &&
         grid[mouseCol+1][mouseRow] != hueValue){
        grid[mouseCol+1][mouseRow] = 0;
        ns_size -= 1
      }
      if (grid[mouseCol-2][mouseRow] != hueValue && 
         grid[mouseCol-1][mouseRow] != hueValue){
        grid[mouseCol-1][mouseRow] = 0;
        ns_size -= 1
      }
    }
    if (type==2){
      // If S vertex directly left or right, turn vertex green
      if (grid[mouseCol-1][mouseRow] == hueValue || 
          grid[mouseCol+1][mouseRow] == hueValue){
        grid[mouseCol][mouseRow] = hueValue/2;
        ns_size += 1;
      }
      else{ // Else turn vertex black
        grid[mouseCol][mouseRow] = 0;
      }
      //
      if (grid[mouseCol][mouseRow+2] != hueValue && 
         grid[mouseCol][mouseRow+1] != hueValue){
        grid[mouseCol][mouseRow+1] = 0;
        ns_size -= 1
      }
      if (grid[mouseCol][mouseRow-2] != hueValue && 
         grid[mouseCol][mouseRow-1] != hueValue){
        grid[mouseCol][mouseRow-1] = 0;
        ns_size -= 1
      }
    }
  }
  
  print("|S| =", s_size);
  print("|N(S)| =", ns_size);
  print("")
}

function draw() {
  background(0);
  
  // Draw the grid
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      stroke(200);
      fill(grid[i][j]*255);
      let x = i*w;
      let y = j*w;
      square(x, y, w);
    }
  }
  
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }
  
  // Draw a small rounded red square in the middle of the origin
  fill('red')
  square(floor(cols/2)*w+(w/4), floor(rows/2)*w+(w/4), w/2, w/8)

  fill('gold')
  textSize(32);
  text(`|S| = ${s_size}. \t |N(S)| = ${ns_size}`, 10, 470)
}
