
//core.require('/gen1/grid0_6.js',
//core.require('/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',
//function (circlePP,rs,addGridMethods,addRandomMethods)	{ 


import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

rs.setName('grid_beacons');
addGridMethods(rs);
addRandomMethods(rs);
let nr = 30;
let wd=1000;

let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:20,framePadding:0.15*wd};
Object.assign(rs,topParams);


rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.fill = 'red';
	circleP['stroke-width'] = 0;
  circleP.dimension = 13;
}

rs.shapeGenerator = function (rvs,cell) {
  let level = 50 + 205*Math.random();
  console.log(level);
  let {shapes,circleP} = this;
  let shape = circleP.instantiate().show();
  // shapes.push(shape);
  shape.fill = `rgb(${level},0,0)`;
  return shape;
}

rs.initialize = function () {
this.addFrame();
  this.initProtos();
  this.initializeGrid();
}

export {rs};


