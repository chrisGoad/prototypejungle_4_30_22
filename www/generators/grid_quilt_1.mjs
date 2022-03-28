
//core.require('/line/line.js','/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (linePP,rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {
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
	
rs.setName('grid_quilt_1');


rs.globalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	szPower:2,
	genCircles:0,
	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
};
		
let newTopParams = {
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:2,	
  numRows : 64,
  numCols : 64,
	backgroundColor : 'white'
}
Object.assign(rs,newTopParams);

	

rs.sizeFactor = function ( cell) {
	let {x,y} = cell;
	let px = this.numPowers(x,2);
	let py = this.numPowers(y,2);
	return Math.min(px,py);
}

rs.colorSetter = function (shape,fc) {
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}
	
rs.initProtos = function () {
	this.rectP = rectPP.instantiate();
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.4;
}


rs.initialize = function () {
debugger;
   this.addFrame();
  this.initProtos();
  core.root.backgroundColor = 'black';
  this.initializeGrid();
}	

export {rs};



