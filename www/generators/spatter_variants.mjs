
//core.require('/line/line.js','/shape/rectangle.js','/generators/basics.js','/mlib/spatter.js','/mlib/boundedRandomGrids.js',
//function (linePP,rectPP,basicP,addSpatterMethods,addRandomMethods) {
	
  

import {rs as linePP} from '/line/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addSpatterMethods} from '/mlib/spatter.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
  let rs = basicP.instantiate();
	
	rs.setName('spatter_variants');
	
	const mkGrid = function () {
		 let gr = basicP.instantiate();
		 addSpatterMethods(gr);
		 addRandomMethods(gr);
		 gr.initProtos = function () {
			core.assignPrototypes(this,'lineP',linePP);
			this.lineP.stroke = 'rgb(255,255,255)';
			this.lineP['stroke-width'] = 1;
			this.lineP.dimension = 4;
			core.assignPrototypes(this,'boundaryLineP',linePP);
			this.boundaryLineP.stroke = 'rgb(255,255,0)';
			this.boundaryLineP['stroke-width'] = 1;
		}  
		return gr;
	}

	let grid1 = rs.set('grid1',mkGrid());
	let grid2 = rs.set('grid2',mkGrid());
	let grid3 = rs.set('grid3',mkGrid());
	let grid4 = rs.set('grid4',mkGrid());
	
		
	let gParams = {numRows:20,numCols:20,width:400,height:400,numDrops:3000,pointJiggle:0,spatter:1};
	let wd = 1000;
  let topParams = {width:wd,height:wd,framePadding:0.1*wd,frameVisible:0};
  
  Object.assign(rs,topParams);
	
	let grids = [grid1,grid2,grid3,grid4];
	//let grids = [grid1,grid2];
	
	grids.forEach( (grid) => 
	  {	
			Object.assign(grid,gParams);
		//	grid.setName(null,'spatter_3');
			grid.initProtos();

	});
	
	
	//rs.saveImage = true;
	//rs.loadFromPath = 1;
	
	//grid1.setName('spatter0_10','spatter_3');
	//grid2.setName('spatter0_10','spatter_3');
		//grids.forEach( (grid) => {grid.initProtos()});
/*
	grid1.initProtos();
	grid2.initProtos();
	//rs.path = 'json/grid_1_1.json';
  grid1.loadFromPath = 1;
	grid2.loadFromPath = 1;
	//rs.randomCellExclude = 2;
	grid1.numRows = grid2.numRows = 20;
	grid1.numCols = grid2.numCols= 20;
	grid1.width = grid2.width =  400;
	grid1.height = grid2.height =  400;
	grid1.numDrops = grid2.numDrops =  3000;
	grid1.pointJiggle = grid2.pointJiggle =  0;
	grid1.spatter = grid2.spatter =  1;
	grid1.saveSpatterPoints = grid2.saveSpatterPoints =  1;
	
	*/
	
	/*
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}*/

const updateLine = function (line,rvs) {
	let len = rvs.length;
	let dir = rvs.direction;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/2);
  let end0 = vec.minus();
  let end1 = vec;
  line.setEnds(end0,end1);
}
const shapeGenerator = function (grid,which,rvs,cell,pnt,idx) {
//rs.shapeGenerator =  function (rvs,cell,pnt) {
//item.setLenDir = function (shape,len,dir) {
	let {shapes,lineP,yg} = grid;
  let shape = grid.lineP.instantiate();
  shape.show();
  // shapes.push(shape);
	let dir = rvs.direction;
	let {x,y} = cell;
	let {numRows,numCols} = grid;
	if (0 && (which === 2)) {
		let hr = numRows/2;
		let hc = numRows/2;
		if ((x>hr) && (y>hc)) {
	  	let frc = (x-hc)/hc;
		  let frr = (y-hr)/hr;
		  dir = dir + 0.5 *Math.min(frc,frr) * Math.PI;
			//dir = Math.random() * Math.PI;

		}
	}
	updateLine(shape,rvs);
  /*let len = rvs.length;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/2);
  let end0 = vec.minus();
  let end1 = vec;
  shape.setEnds(end0,end1);*/
	let r = rvs.shade;
 // let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
 // shape.stroke = rgb;
	if (0 && (which === 1)) {
		shape.stroke = yg[idx]==='g'?'green':'yellow';
	} else {
		shape.stroke = Math.random()<0.5?'green':'yellow';
	}
  debugger;
  shape.update();
  return shape;
}

for (let i=0;i<4;i++) {
	let grid = grids[i];
  grid.shapeGenerator = function (rvs,cell,pnt,idx) {
	  return shapeGenerator(this,i+1,rvs,cell,pnt,idx);
	}
}
/*
	grids.forEach( (grid) => {

grid1.shapeGenerator = function (rvs,cell,pnt,idx) {
	return shapeGenerator(this,1,rvs,cell,pnt,idx);
}
grid2.shapeGenerator = function (rvs,cell,pnt,idx) {
	return shapeGenerator(this,2,rvs,cell,pnt,idx);
}

grid1.shapeUpdater = function (shape,rvs) {
	debugger;
	let dir = rvs.direction;
	rvs.direction = dir + (this.timeStep) * 0.05 * Math.PI;
	updateLine(shape,rvs);
	shape.update();
	shape.draw();
}

grid2.shapeUpdater = function (shape,rvs) {
	debugger;
	let dir = rvs.direction;
	rvs.direction = dir + (this.timeStep) * 0.05 * Math.PI;
	updateLine(shape,rvs);
	shape.update();
	shape.draw();
}*/
/*grid2.shapeUpdater = function (shape,rvs) {
	updateLine(shape,rvs);
	shape.update();
	shape.draw();
}

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 1;
}  
*/

const initialize = function (grid,which,cb) {
  debugger;
 // grid.initProtos();
  if (which === 1) {
		debugger;
		grid.setupRandomGridForShapes('length', {step:5,min:2,max:5});
	}
	if (which === 2) {
		debugger;
		grid.setupRandomGridForShapes('length', {step:5,min:5,max:15});
	}
	if (which === 3) {
		debugger;
		grid.setupRandomGridForShapes('length', {step:5,min:15,max:25});
	}
	if (which === 4) {
		debugger;
		grid.setupRandomGridForShapes('length', {step:5,min:50,max:85});
	}
	if (!grid.loadFromPath) {
	  if (which === 1) {
			grid.setupRandomGridForShapes('length', {step:5,min:5,max:15});
		}
	  //grid.setupRandomGridForShapes('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	  grid.setupRandomGridForShapes('direction', {step:0.2* Math.PI,stept:0.1*Math.PI,min:0,max:2*Math.PI});
	  grid.setupRandomGridForShapes('shade', {step:30,min:50,max:250});
	}
  //this.initializeGrid();
  grid.addSpatter();
  //grid.outerInitialize(cb);
}	


for (let i=0;i<4;i++) {
	let grid = grids[i];
  grid.initialize = function (cb) {
	  initialize(this,i+1,cb);
	}
}

/*
grid1.initialize = function (cb) {
  initialize(this,1,cb);
	
}


grid2.initialize = function (cb) {
	return initialize(this,2,cb);
}
	
*/
	rs.addTheBox = function () {
		this.lineP = grid1.lineP;
		this.width =2.2*grid1.width;
		this.height = 2.2*grid1.height;
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	debugger;
	draw.vars.jpgPadFactor = 1.1;
	let {width} = grid1;
	core.root.backgroundColor = 'red';
	core.root.backgroundColor = 'black';
	//debugger;
	  grid1.lineP['stroke-width'] = 1.5;
	  grid2.lineP['stroke-width'] = 1.5;

    grid1.initialize();
		//debugger;
		grid2.initialize();
    grid3.initialize();
    grid4.initialize();
    let mv = 0.6*width;
    grid1.moveto(Point.mk(-mv,-mv));
    grid2.moveto(Point.mk(mv,-mv));
    grid3.moveto(Point.mk(-mv,mv));
    grid4.moveto(Point.mk(mv,mv));
    this.addFrame();
}

	
export {rs};


