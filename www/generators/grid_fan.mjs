
//core.require('/gen1/grid0_6.js',
//core.require('/line/line.js','/shape/circle.js','/generators/basics.js','/mlib/grid.js','/mlib/boundedRandomGrids.js',
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods}  from '/mlib/grid.mjs';
import {rs as addRandomMethods}  from '/mlib/boundedRandomGrids.mjs';
//function (linePP,circlePP,rs,addGridMethods,addRandomMethods)	{ 

let rs = basicsP.instantiate();
	rs.setName('grid_fan');
  addGridMethods(rs);
  addRandomMethods(rs);
 
    
let nr = 140;
//nr = 20;
let wd = 1000;
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:10,delta:(wd*0.8)/nr,backgroundColor:'black',randomizeOrder:1,fromLeft:1,up:0};//'rgb(0,150,255)'};
Object.assign(rs,topParams);

const pointAlongL = function (startPnt,endPnt,x) {
  let vec = endPnt.difference(startPnt);
  let p = startPnt.plus(vec.times(x));
  console.log('p ',p.x,p.y);
  return p;
}


rs.positionFunction = function (i,j) {
  let {width,numRows,delta,fromLeft,up} = this;
  if ((i===1) &&(j===1)) {
    debugger;
  }
  let ci = numRows - i - 1;
  let hw = 0.5*width;
  let sp = (fromLeft)?(up?Point.mk(-hw,hw):Point.mk(-hw,-hw)):(up?Point.mk(hw,hw):Point.mk(hw,-hw));
  let np = (fromLeft)?(up?Point.mk(hw,hw):Point.mk(hw,-hw)):(up?Point.mk(-hw,hw):Point.mk(-hw,-hw));
  let lep = (fromLeft)?(up?Point.mk(hw,-hw):Point.mk(hw,hw)):(up?Point.mk(-hw,-hw):Point.mk(-hw,hw));
  let vec = lep.difference(np);
  let ep = np.plus(vec.times(i/(numRows-1)));
  console.log('i j',i,j);
  let p = pointAlongL(sp,ep,j/(numRows-1));
  return p;
}
    
     
rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP['stroke-width'] = 0;
  circlePP.stroke = 'blue';
  circleP.dimension = 30;
  circleP.fill = 'rgba(255,255,0,0.4)';
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 1;
  lineP.stroke = 'blue';
}
let scale = 10;

rs.shapeGenerator = function (rvs,cell) {
 //debugger;
  let {numRows,numCols} = this;
  let hr = numRows/2;
  let hc = numCols/2;
  let {x,y} = cell;
  let cdx = Math.abs((x-hr)/hr);
  let cdy = Math.abs((y-hc)/hc);
  let cdist =  Math.sqrt(cdx*cdx+cdy*cdy);
  
  let level = Math.floor(rvs.level);
  let opacity = level/255;
  //opacity = level/255;
  let {shapes,circleP} = this;
  let shape = this.circleP.instantiate().show();
  shape.dimension = scale*cdist;//+ 5;
  // shapes.push(shape);
  //shape.fill = `rgba(${level},${level},${level},${opacity})`;
  return shape;
}

rs.initialize = function () {
debugger;
  this.initProtos();
  this.addBackground();
  this.setupRandomGridForShapes('level', {step:30,min:0,max:255});
  this.set('llines',core.ArrayNode.mk());
  this.initializeGrid(); 
}

export {rs};

