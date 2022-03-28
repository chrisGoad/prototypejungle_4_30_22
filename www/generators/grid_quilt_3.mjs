
//core.require('/shape/circle.js','/gen0/Basics.js','/mlib/grid0.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (circlePP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {


import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';

let rs = basicsP.instantiate();

//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rectPP,rs)	{ 
addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);

//core.require('/gen1/grid0_8.js','/gen1/layeredGrid1.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rs,layeredSetup)	{ 

	
rs.setName('grid_quilt_3');
//layeredSetup(rs);

let opa = 0.8;

rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,maxSizeFactor:4,genPolygons:0,
	// opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	  colorMap:{0: `rgba(0,255,0,${opa}`,
	            1: `rgba(255,0,0,${opa})`,
		          2:`rgba(255,255,255,${opa})`,
	            3:`rgba(0,0,255,0.5)`,
		          4:`rgba(0,0,255,1)`,
		          5:`rgba(0,0,255,${opa})`,
	            6:`rgba(255,255,255,${opa})`},
		sizeMap: {0:1,1:1,2:2,3:2,4:4,5:1,6:1},
    genCircles:1
};
let wd =300;
let topParams = {
  pointJiggle:2,	
  numRows : 96,
  numCols : 96,
	width:wd,
	height:wd,
	framePadding  : 0.15*wd,
  orderByOrdinal:1,
  ordinalMap:[0,1,2,3,4,5]
}
Object.assign(rs,topParams);

	
	
rs.initProtos = function () {
	this.circleP=circlePP.instantiate();
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 1;
}


rs.initialize = function () {
  core.root.backgroundColor = 'black';
  this.addFrame();
	this.initProtos();
	this.initializeGrid();
}

export {rs};



