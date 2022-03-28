
//core.require('/shape/circle.js','/generators/basics.js','/mlib/grid0.js','/mlib/boundedRandomGrids.js','/mlib/ParamsByCell.js',
//function (circlePP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {

import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';

let rs = basicsP.instantiate();
addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_bubbles');

  let numRows = 64;
	let ht = 1000;
	
	//let topParams = {numRows:numRows,numCols:numRows,width:1.5*ht,height:ht,randomizeOrder:1,orderByOrdinal:0,backgroundColor:'blue',backgroundPadding:0.05*ht};
	let topParams = {numRows:numRows,numCols:numRows,width:1.5*ht,height:ht,randomizeOrder:1,orderByOrdinal:0,backgroundColor:'blue',backgroundPadding:0.05*ht,framePadding:0.2*ht};
	Object.assign(rs,topParams);
	rs.paramsByRow = [];
	
const setParamsByRow = function () {
	let hr = numRows/2;
	let pbr = rs.paramsByRow;
	for (let i=0;i<numRows;i++)  {
		if	(i%8 === 4) {
			pbr[i] = {'sizePower':3};
		}
	}
}

setParamsByRow();
			
			

rs.initProtos = function () {	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'white';
  this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 2;  
}
	let oo = 0.3;
  let r = 255;
	let globalValues = {
	widthFactor:1,
	heightFactor:1,
	sizePower:2,
	maxSizeFactor:5,
	genCircles: 1,
  sizeMap:{0:1,1:2,2:4,3:8,4:0,5:0,6:0},
 // sizeMap:{0:1,1:1,2:2,3:3,4:0,5:0,6:0},
	colorMap:{0:'white',1:'white',2:'white',3:'white',4:`rgba(0,0,255,${oo})`,5:`rgba(0,0,0,${oo})`,6:`rgba(${r},${r},0,${oo})`}};
rs.globalParams = globalValues;
/*
rs.step = function ()   {
	//debugger;
	let theShapeOrder = this.theShapeOrder;
	
	this.shapes.remove();
	this.set('shapes',core.ArrayNode.mk());
	this.perturbArray(theShapeOrder,20);
  this.inverseShapeOrder = this.invertMap(theShapeOrder); 
 
	this.addShapes();
	this.draw();
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}
*/
rs.initialize = function () {
	this.initProtos();
  this.addBackground(	);
  this.addFrame();
	this.initializeGrid();
}

export {rs};

