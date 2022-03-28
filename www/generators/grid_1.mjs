
//core.require('/line/line.js','/shape/circle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',

//core.require('/line/line.js','/shape/circle.js','/gen0/basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',

//function (linePP,circlePP,rs,addGridMethods,addRandomMethods) {
 // debugger;	//this.initProtos();

import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

  addGridMethods(rs);
  addRandomMethods(rs);
	//rs.initProtos();
	rs.saveImage = true;
	rs.setName('grid_1');
  rs.loadFromPath = 0;

 

let nr = 41
let wd = 100;
let awd = 1600;
let topParams ={numRows:nr,numCols:nr,width:wd,height:wd,framePadding:0.15*awd,framePos:Point.mk(0,50)};
Object.assign(rs,topParams);

 
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(00,200,200)';
//	this.circleP['stroke-width'] = 0.5;
	this.circleP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
  this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 0.5;
	
}  
//rs.rgb2color = function (r,g,b) {
//	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
//}

rs.pointJiggle = 0;

 
let trueCount = 0;
 let falseCount = 0;
rs.shapeGenerator = function (rvs) {
	debugger;
	let shapes  = this.shapes;
	let wv = rvs.which;
	let showCircle = wv > 30;
	console.log('wv',wv,showCircle,trueCount,falseCount);
  let len = rvs.length;
  let shape;
	if (showCircle) {
		trueCount++;
		shape = this.circleP.instantiate();
		shape.dimension = rvs.dimension;
		// shapes.push(shape);
		shape.update();
		shape.show();
		return shape;
	}
  falseCount++;
	shape = svg.Element.mk('<g/>');
	// shapes.push(shape);
	let line0 = this.lineP.instantiate();
	let line1 = this.lineP.instantiate();
	shape.set('line0',line0);
	shape.set('line1',line1);
	line0.show();
	line1.show();
	//let rvs = randomValuesAtCell(cellx,celly);
	let dir = rvs.direction;
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
	let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
	let end0 = vec0.minus();
	let end1 = vec0;
	line0.setEnds(end0,end1);
	let r = rvs.red;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	line0.stroke = rgb;
	line0.update();
	end0 = vec1.minus();
	end1 = vec1;
	line1.stroke = rgb;
	line1.setEnds(end0,end1);
	line1.update();
	return shape;
}
	

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let lines = this.lines;
	let line = this.boundaryLineP.instantiate();
	// lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.show();
  return line;
}

rs.initialize = function () {
	core.root.backgroundColor = 'black';
  this.addFrame();
	draw.vars.jpgPadFactor = 1.1;
	this.initProtos();
	let endA0 = Point.mk(-100,-10);
	let endA1 = Point.mk(100,-10);
	let arcA = geom.Arc.mk(endA0,endA1,200);
	let endB0 = Point.mk(-100,100);
	let endB1 = Point.mk(100,100);
	let arcB = geom.Arc.mk(endB0,endB1,-200); 
	this.sideA = (fr) => arcA.pointAlong(fr);
	this.sideB = (fr) => arcB.pointAlong(fr);
	this.positionFunction = this.sidesPositionFunction;
	this.setupRandomGridForBoundaries('red', {step:30,min:50,max:250});
	this.setupRandomGridForShapes('red', {step:30,min:50,max:250}); 
	let  dParams = {step:0.1* Math.PI,min:0.95*Math.PI,max:2*Math.PI};
	this.setupRandomGridForShapes('direction',dParams); 
	let  lenParams = {step:0.2,min:1.5,max:2};
	this.setupRandomGridForShapes('length',lenParams); 
	let  cParams = {step:30,min:50,max:250};
	this.setupRandomGridForShapes('red',cParams); 
	let  wParams = {step:80,min:0,max:100};
	this.setupRandomGridForShapes('which',wParams); 
	let  dimParams = {step:2,min:1,max:4};
	this.setupRandomGridForShapes('dimension',dimParams); 
	this.initializeGrid();
}

export {rs};


