

//core.require('/line/line.js','/gen0/Basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',
//function (linePP,rs,addGridMethods,addRandomMethods)	{ 


import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

 // let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
  addRandomMethods(rs);
	//rs.initProtos();
	rs.saveImage = 1;
	rs.setName('grid_metal');
  rs.loadFromPath = 0;
  
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 1;
	core.assignPrototypes(this,'bLineP',linePP);
	this.bLineP.stroke = 'rgb(100,100,0)';
	this.bLineP['stroke-width'] = 1;
}  
let nr = 41
let wd = 300;
let topParams ={numRows:nr,numCols:nr,width:wd,height:wd,framePadding:0.15*wd};
Object.assign(rs,topParams);


rs.shapeGenerator = function (rvs) {
	debugger;
	let shapes = this.shapes;
	let shape = svg.Element.mk('<g/>');
	// shapes.push(shape);
	let line0 = this.lineP.instantiate();
	let line1 = this.lineP.instantiate();
	shape.set('line0',line0);
	shape.set('line1',line1);
	line0.show();
	line1.show();
	//let rvs = randomValuesAtCell(cellx,celly);
	let dir = rvs.direction;
	let len = rvs.length;
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
	let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
	let end0 = vec0.minus();
	let end1 = vec0;
	line0.setEnds(end0,end1);
	let r = rvs.shade;
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
		debugger;
		let lines = this.lines;
		let line = this.bLineP.instantiate();
		// lines.push(line);
		line.setEnds(end0,end1);
		//line.stroke = `rgb(100,100,0})`;
		line.update();
		line.show();
		return line;
	}

rs.backgroundColor = 'black';
rs.initialize = function () {
	this.initProtos();
	core.root.backgroundColor = 'black';
  this.addFrame();
	this.setupRandomGridForShapes('shade', {step:30,min:50,max:250});
	this.setupRandomGridForShapes('direction', {step:0.05* Math.PI,min:0.95*Math.PI,max:2*Math.PI});
	this.setupRandomGridForShapes('length',  {step:0.1,min:1.5,max:2});
  this.initializeGrid();
}

export {rs};


