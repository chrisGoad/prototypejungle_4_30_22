
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/lines.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (rectPP,linePP,circlePP,rs,addGridMethods,addLineMethods,addRandomMethods,addParamsByCellMethods)	{ 
//let rs = svg.Element.mk('<g/>');

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);

//let sqd = 128;randomizingFactor = 0.5;
let sqd = 48;
sqd = 16;
let ar = 2;
let wd = 1000;

rs.globalParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:wd,height:wd,pointJiggle:3,sizePower:2,maxSizeFactor:3,genCircles:1,
	 opacity1:0.4,opacity2:0.4,opacity3:0.4,opacity4:0.4,randomizeOrder:1,widthFactor:3,heightFactor:.7,backgroundColor:'yellow',randomizingFactor:0.5,sizePower:3,
	  colorMap:{0: 'white',
		          1:'white',
		          2:'white',
		          3:'white'},
   sizeMap: {0:.1,1:.2,2:.4,3:.8,4:0,5:0,6:0},
		};

rs.ordinalMap = {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7};

rs.saveJson = 0;
rs.loadFromPath = 0;
rs.randomizeOrder = 0;
rs.orderByOrdinal = 1;
rs.widthFactor = .4;
rs.heightFactor = .4;
rs.numRows = 32;
rs.numCols = 64;
rs.width = wd;
rs.height = wd;
rs.backgroundColor = 'black';
rs.randomizingFactor = 0.5;
rs.pointJiggle =0;	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	
		core.assignPrototypes(this,'circleP',circlePP);

	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}

rs.initialize = function () {
  this.initProtos();
  this.initializeGrid();
}

export {rs};

