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
rs.setName('grid_shield');
let opacity = 0.7;
let r = 255;
let b = 255;
let fc = 0.2;
rs.globalParams  = {	
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	sizePower:3,
	genCircles:1,
	//sizeMap:{0:1.5,1:1,	2:0,3:3,4:4,5:1,6:0},
	sizeMap:{0:fc*1.5,1:fc*1,	2:fc*2,3:fc*0,4:fc*0,5:fc*1,6:0},
	//opacityMap:{0:opacity,1:opacity,2:opacity,3:opacity,4:0.8,5:1,6:1},
	opacityMap:{0:opacity,1:opacity,2:opacity,3:opacity,4:0.8,5:1,6:1},
  colorMap:{
		0: `rgba(0,${r},0,${opacity})`,
		1: `rgba(${r},0,0,${opacity})`,
		2: `rgba(255,255,255,${opacity})`,
		3: `rgba(0,${b},${b},${opacity})`,
	//	4: `rgba(0,0,${r},0.8)`,
		4: `rgba(250,0,0,0.8)`,
		5: `rgba(250,0,0,1)`,
		6: `rgba(${r},${r},0,1)`
	}
};
		
//let gp = rs.globalParams;
//Object.assign(gp,newGlobalParams);
	
let wd = 400;

let topParams = {
  width:wd,
	height:wd,
  framePadding:0.15*wd,
	ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 0,
  pointJiggle:5,	
  numRows : 66,
  numCols : 66,
  center:Point.mk(0,0),
  rotation : 0
	//backgroundColor : 'black'
}
Object.assign(rs,topParams);

	
	
rs.initProtos = function () {
   this.circleP = circlePP.instantiate().show();
	// core.assignPrototypes(this,'circleP',circlePP);

	//this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.4;
	this.circleP.fill = "red";
	this.circleP.dimension = 1;
  this.lineP = linePP.instantiate().show();
  this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 0.5;
}
 rs.outerRadius = 200;
  rs.innerRadius = 0.1 * rs.outerRadius;
  rs.angleMin = -180;
  rs.angleMax = 180;
  rs.center = Point.mk(0,0);
rs.positionFunction = rs.radialPositionFunction;

rs.shapeGenerator = function () {
  debugger;
  let shape =this.circleP.instantiate().show();
    // shapes.push(shape);
    shape.dimension = 2;
    //debugger;
    return shape;

}


rs.boundaryLineGeneratorr = function (p11,p21,rvs) {
  debugger;
  //let v = rvs.value;
  //let color = `rgb(${v},${v},0)`;
  let line = this.lineP.instantiate().show();
  line.setEnds(p11,p21);
  //line.stroke = 'white';
  return line
}

//rs.generatorsDoMoves = undefined;

rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'black';
  this.addFrame();
  this.initProtos();
	this.initializeGrid();
}

export {rs};



