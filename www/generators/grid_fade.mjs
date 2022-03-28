
import {rs as linePP} from '/line/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);	
rs.setName('grid_fade');
	
rs.initProtos = function () {
	rs.rectP  = rectPP.instantiate();
	rs.rectP.fill = 'white';
	rs.rectP['stroke-width'] = 0;
	rs.rectP.width = .5;
	rs.rectP.height = .5;
  rs.blineP  = linePP.instantiate();
  rs.blineP['stroke-width'] = 0.4;
  rs.blineP.stroke = 'white';

}  

let nr = 64;
let wd = 200;
let topParams = {numRows:nr,numCols:nr,width:wd,height:wd,pointJiggle:4,framePadding:0.15*wd,frameVisible:1};
Object.assign(rs,topParams);

rs.shapeGenerator = function (rvs,cell) {
	let {rectP,shapes,numRows} = this;
  let {x,y} = cell;
  let fwd = (x)/(numRows);// fraction of the way across (i.e. to max x)
  if (Math.random()<fwd) {
   return;
  }
	let shape = rectP.instantiate().show();
	// shapes.push(shape);
  let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	return shape;
}




rs.boundaryLineGenerator= function (end0,end1,rvs,cell) {
	let {blineP,numRows,showMissing,lines,updating,lineIndex} =this;
  let {x,y} = cell;
  let fwd = x/numRows;// fraction of the way across (i.e. to max x)
  let ra = Math.random();
  if  (ra*ra*ra<fwd) {
   return;
  }
	let line = blineP.instantiate().show();
	// lines.push(line);
  line.setEnds(end0,end1);
  let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	line.stroke = rgb;
	return line;
}


rs.initialize = function () {
  debugger;
   let rparams = {step:30,min:100,max:250}
   this.setupRandomGridForBoundaries('r',rparams); 
   this.setupRandomGridForBoundaries('g',rparams); 
   this.setupRandomGridForBoundaries('b',rparams); 
   this.initProtos();
   this.addFrame();
  this.initializeGrid();
}



export {rs};


