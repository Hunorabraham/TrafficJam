can = document.querySelectorAll("canvas")[0];
draw = can.getContext("2d");


//grid
const tiles = 6;
let grid = [];
for(let i = 0; i < tiles; i++){
  grid.push(Array(tiles).fill({}));
}
console.log(grid);

function drawGrid(tilesX, tilesY, totalWidth, totalHeight, spacing){
  draw.fillStyle = "#aaaaaa";
  let spacingX = (can.width-totalWidth) / 2;
  let spacingY = (can.height-totalHeight) / 2;
  let tileWidth = (totalWidth + spacing) / tilesX - spacing;
  let tileHeight = (totalHeight + spacing) / tilesY - spacing;
  
  draw.beginPath();
  draw.roundRect(spacingX-10,spacingY-10,totalWidth+20,totalHeight+20,10);
  draw.fill();
  draw.closePath();
  
  draw.fillStyle = "#dddddd";
  draw.beginPath();
  draw.roundRect(spacingX-5,spacingY-5,totalWidth+10,totalHeight+10,5);
  draw.fill();
  draw.closePath(); 

  draw.fillStyle = "#aaaaaa";
  draw.beginPath();
  for(let i = 0; i < tilesX; i++){
    for(let j = 0; j < tilesY; j++){
      draw.roundRect(spacingX+(tileWidth+spacing)*i, spacingY+(tileHeight+spacing)*j, tileWidth, tileHeight, tileWidth/5);
    }
  }
  draw.fill();
  draw.closePath();
  return tileWidth;
}
let tileW = drawGrid(6, 6, 400, 400, 5);

//sprite loading
let spriteDict = {};
let loaded = 0;

let vectorDict = {
  car: (x, y, primary, secondary, scale, rotation)=>{
    draw.beginPath();
    draw.rotate(rotation);
    draw.roundRect(x-scale/2, y-scale, scale, scale*2, scale/5);
    draw.fillStyle = primary;
    draw.fill();
    draw.closePath();
    draw.beginPath();
    scale *= 0.8;
    draw.roundRect(x-scale/2, y-scale, scale, scale*2, scale/5);
    draw.fillStyle = secondary;
    draw.fill();
    draw.closePath();
  }
};

vectorDict.car(100,100, "blue", "lightblue", tileW, 0);

function addSprite (name, path){
  let img = new Image();
  img.src = path;
  img.onload= ()=>{
    loaded++;
    if(loaded == spriteDict.length){
      start();
    }
  }
  spriteDict[name] = img;
}


//cars
class car{
  constructor(type,rotation){
    this.type = type;
    this.rotation = rotation;
  }
}

function start(){
  draw.fillStyle = "#dddddd";
  draw.fillRect(0,0,can.width,can.height);
}

