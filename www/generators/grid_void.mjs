//core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid0.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {
//core.require('/gen1/grid0_8.js',
//core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rs)	{ 

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_void');
let r = 225;
let iOpacity = 0.4;
let gpInner  = {
	widthFactor:3,
	heightFactor:3,
	maxSizeFactor:3,
	sizePower:2,
	sizeMap:  {0:1,1:1,2:1,3:1},
  colorMap: 
		{
			0: `rgba(${r},0,0,${iOpacity})`,
			1: `rgba(${r},0,0,${iOpacity})`,
			1:  `rgba(${r},0,0,${iOpacity})`,
			2:  `rgba(255,255,255,${iOpacity})`,
			3:  `rgba(0,150,150,${iOpacity})`,
		}
};

let gpOuter  = {
	randomizingFactor:0,
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:3,
	sizePower:2,
	sizeMap:  {0:1,1:1,2:2,3:4},
  colorMap: 
		{
			0:   `rgba(${r},0,0,0)`,
			1:   `rgba(${r},0,0,0.4)`,
			2:   `rgba(255,255,255,0.4)`,
			3:   `rgba(0,0,0,1)`,
		}
};
rs.paramsByCell = function (cell) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	let cx = numCols/2;
	let cy = numRows/2;
	let maxd = Math.sqrt(cx*cx + cy*cy);
	let xdc = x - cx;
	let ydc = y - cy;
	let cd = Math.sqrt(xdc*xdc + ydc*ydc);
	let df = cd/maxd;
	let yf = y/numRows;
	let lwf = 0;
	let hwf = 1.2;
	let wf = lwf + df * (hwf-lwf);
	gpOuter.widthFactor = wf
	gpOuter.heightFactor = wf
	return gpOuter;
	return (y < numRows/2)?gpInner:gpOuter;
}
	
rs.globalParams = {genCircles:0,genPolygons:0,randomizingFactor:0};
let wd = 100;

let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:1,	
  numRows : 96,
  numCols : 96,
  width:wd,
  height:wd,
	backgroundColor : 'red',
	framePadding:15,
	frameVisible:0
}
Object.assign(rs,newTopParams);

	
	
rs.initProtos = function () {
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}


rs.initialize = function () {
  this.initProtos();
  this.addBackground();
	this.initializeGrid();
	  let rect = this.set('rect',this.rectP.instantiate()).show();
  let rdim = 10;
	rect.width = rdim;
	rect.height = rdim;
	rect.fill = 'black';
  this.addFrame();
}

export {rs};




