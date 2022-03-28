//core.require('/shape/rectangle.js','/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (rectPP,circlePP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_vortex');
let opacity = 0.3;
let mxi = 255;
rs.globalParams  = {	
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	sizePower:3,
	genCircles:1,
	sizeMap:{0:1.5,1:1,	2:2,3:3,4:0,5:1,6:0},
  colorMap:{
		0: `rgba(${mxi},${mxi},${mxi},${opacity})`,
		1: `rgba(0,0,0,${opacity})`,
		2: `rgba(0,${mxi},${mxi},${opacity})`,
		3: `rgba(0,${mxi},${mxi},${opacity})`,
		4: `rgba(0,0,${mxi},0.8)`,
		5: `rgba(${mxi},0,0,1)`,
		6: `rgba(${mxi},${mxi},0,1)`
	}
};
		

let wd = 400;
let outer = 200;

let topParams = {
  width:wd,
	height:wd,
	
	frameWidth:1.1*wd,
	frameHeight:1.1*wd,
	ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 0,
  pointJiggle:0,	
  numRows : 96,
  numCols : 96,
  center:Point.mk(0,0),
  rotation : 45,
   outerRadius : outer,
  innerRadius : 0.05 * outer,
  angleMin : -180,
  angleMax : 180,
  center : Point.mk(0,0),
	//backgroundColor : 'black'
}
Object.assign(rs,topParams);

	
	
rs.initProtos = function () {
   this.circleP = circlePP.instantiate().show();
	this.circleP['stroke-width'] = 0.4;
	this.circleP.fill = "red";
	this.circleP.dimension = 1;
  this.lineP = linePP.instantiate().show();
  this.lineP.stroke = 'black';
  this.lineP.stroke = 'red';
	this.lineP['stroke-width'] = 0.5;
}

rs.positionFunction = rs.radialPositionFunction;


rs.boundaryLineGenerator = function (p11,p21,rvs) {
  let line = this.lineP.instantiate().show();
  line.setEnds(p11,p21);
  return line
}


rs.initialize = function () {
	core.root.backgroundColor = 'black';
  this.initProtos();
	this.initializeGrid();
  this.addFrame();
}

export {rs};



