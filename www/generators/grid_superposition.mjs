//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
/*import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';*/
import {rs as basicsP} from '/generators/basics.mjs';
/*import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';*/
import {rs as gsf} from '/generators/grid_for_superposition.mjs';
let rs = basicsP.instantiate();
let grid1 = rs.set('grid1',gsf.instantiate());
let grid2 = rs.set('grid2',gsf.instantiate());

let wd = 200;
let fc = 1.1;
grid1.width = fc*wd;
grid2.height = fc*wd;
let topParams;
if (radial) {
  topParams = {numRows:0.5*nr,numCols:nr,width:wd,height:wd,outerRadius:wd,innerRadius:0.2*wd,angleMin:-180,angleMax:180,center: Point.mk(0,0),rotation:30,pointJiggle:4,framePadding:0.15*wd};
} else {
  topParams = {width:wd,height:wd,framePadding:0.25*wd};
}

  
  

if (radial) {
  grid1.positionFunction = grid1.radialPositionFunction;
  grid2.positionFunction = grid2.radialPositionFunction;
}

rs.initialize = function () {
  debugger;
/*   let rparams = {step:30,min:0,max:250}
 	this.grid1.setupRandomGridForShapes('r', rparams);
 	this.grid1.setupRandomGridForShapes('g', rparams);
 	this.grid1.setupRandomGridForShapes('b', rparams);
 	this.grid1.setupRandomGridForBoundaries('r', rparams);
 	this.grid1.setupRandomGridForBoundaries('g', rparams);
 	this.grid1.setupRandomGridForBoundaries('b', rparams);this.grid1.setupRandomGridForShapes('r', rparams);
 	this.grid2.setupRandomGridForShapes('g', rparams);
 	this.grid2.setupRandomGridForShapes('b', rparams);
 	this.grid2.setupRandomGridForBoundaries('r', rparams);
 	this.grid2.setupRandomGridForBoundaries('g', rparams);
 	this.grid2.setupRandomGridForBoundaries('b', rparams);*/
 // core.root.backgroundColor = 'blue';
  this.grid1.initProtos();
  this.grid1.initializeGrid();
  this.grid2.initProtos();
  this.grid2.initializeGrid();  
  this.addFrame();
}
export {rs};


