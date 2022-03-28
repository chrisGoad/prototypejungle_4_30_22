
//core.require('/gen1/grid0_10.js','/line/line.js',
//function (rs,linePP)	{ 
//addSetName(rs);
//core.require('/line/line.js','/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js','/mlib/sphere.js',
//function (linePP,rectPP,rs,addGridMethods,addRandomMethods,addSphereMethods) {


import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addSphereMethods} from '/mlib/sphere.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
//import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
addSphereMethods(rs);
rs.setName('grid_bump');


 let nR = 60;
let aR = 1;
let pwd = 1300; // width after projection
let topParams = {saveImage:1,saveJson:1,loadFromPath:0,numRows:nR,numCols:aR*nR,width:nR,height:nR,frameWidth:pwd,frameHeight:pwd,pointJiggle:1,
lineLength:15,sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100} ;

Object.assign(rs,topParams);



rs.initProtos = function () {
	let {lineLength} = this;
	const addProto =  (n,dir,color) => {
		let nm = 'shapeP'+n;
		this.set(nm,linePP.instantiate());
		let pr = this[nm];
		pr.stroke = color;
		pr['stroke-width'] = 1;
		pr['stroke-width'] = 4;
		this.setLineEnds(pr,lineLength,dir);
		//this.setLineEnds(pr,lineLength,0);
	}
	addProto(0,0,'red');
	addProto(1,0.25*Math.PI,'green');
	addProto(2,0.5*Math.PI,'blue');
	addProto(3,0.75*Math.PI,'magenta');
} 


rs.shapeGenerator = function (rvs,cell,cnt) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	let frx = x/numCols;
	let fry = y/numRows;
  //let {shapes,dirValues,lineLength,shapeP0} = this;
  let {shapes} = this;
	let pr0 = (frx < 0.5)?0.5:0;
	//let pr0 = 0.5*frx;
	let pr1 = 0.5 - pr0;
	let pr2 = (fry < 0.5)?0.5:0;
	//let pr2 = 0.5*fry;
	let pr3 = 1-pr2;
	let r = Math.random();
	let shape;
	if (r < pr0) {
		shape = this.shapeP0.instantiate();
	} else if (r < (pr0+pr1)) {
		shape = this.shapeP1.instantiate();
	} else if (r < (pr0+pr1+pr2)) {
		shape = this.shapeP2.instantiate();
	} else {
		shape = this.shapeP3.instantiate();
	} 
	shape.show();
	// shapes.push(shape);
	return shape;
}


rs.initialize = function (cb) {
	let {focalPoint,focalLength,cameraScaling} = this;
	let {width,height,numRows,numCols} = this;
  this.addFrame();
	this.deltaX = width/numCols;
  this.deltaY = height/numRows;
	this.initProtos();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  debugger;
	this.initializeGrid();
}
 

export {rs};


