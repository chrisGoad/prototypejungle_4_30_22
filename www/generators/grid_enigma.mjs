
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as bendP} from '/generators/grid_bend.mjs';
import {rs as fanP} from '/generators/grid_fan.mjs';
//core.require('/generators/grid_bend.js','/shape/circle.js','/generators/grid_fan.js',
//function (circlePP,rectPP,basicP,addGridMethods,bendP)	{ 


debugger;
let rs = basicP.instantiate();
//let rs = svg.Element.mk('<g/>');
rs.setName('grid_enigma');

let nr = 140;
//nr = 20;
let wd = 1000;
let topWd = 2000;
let partParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:10,delta:(wd*0.8)/nr,backgroundColor:'blue',randomizeOrder:1,fromLeft:1,up:0};
let topParams = {width:topWd,height:topWd,framePadding:0.15*topWd};
Object.assign(rs,topParams);
rs.addGrid = function (nm,fromLeft,turnUp) {
  debugger;
  let g = bendP.instantiate();
    Object.assign(g,partParams);
  g.backgroundColor = 'black';
  g.fromLeft = fromLeft;
  g.turnUp = turnUp;
  this.set(nm,g);
  g.initialize();
  return g;
}

/*
const pointAlongL = function (startPnt,endPnt,x) {
  let vec = endPnt.difference(startPnt);
  let p = startPnt.plus(vec.times(x));
  console.log('p ',p.x,p.y);
  return p;
}


const fanPositionFunction = function (grid,i,j) {
  let {width,height,numRows,delta,fromLeft,up} = grid;
  if ((i===1) &&(j===1)) {
    debugger;
  }
  let ci = numRows - i - 1;
  let hw = 0.5*width;
  let hh = 0.5*height;
  let sp = (fromLeft)?(up?Point.mk(-hw,hh):Point.mk(-hw,-hh)):(up?Point.mk(hw,hh):Point.mk(hw,-hh));
  let np = (fromLeft)?(up?Point.mk(hw,hh):Point.mk(hw,-hh)):(up?Point.mk(-hw,hh):Point.mk(-hw,-hh));
  let lep = (fromLeft)?(up?Point.mk(hw,-hh):Point.mk(hw,hh)):(up?Point.mk(-hw,-hh):Point.mk(-hw,hh));
  let vec = lep.difference(np);
  let ep = np.plus(vec.times(i/(numRows-1)));
  console.log('i j',i,j);
  let p = pointAlongL(sp,ep,j/(numRows-1));
  return p;
}
*/

     
rs.initProtos = function () {	
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
  rectP['stroke-width'] = 0;
//  rectP.stroke = 'blue';
//  rectP.stroke = 'black';
  let wd = 200;
  rectP.width = wd;
  rectP.height = wd;
 // rectP.fill = 'rgba(255,255,0,1)';
  rectP.fill = 'blue';
 // rectP.fill = 'black';
 
}   

/*     
const bothInitProtos = function (grid) {	
  let circleP = grid.set('circleP',circlePP.instantiate()).hide();
  circleP['stroke-width'] = 0;
  circlePP.stroke = 'blue';
  circleP.dimension = 30;
  circleP.fill = 'rgba(255,255,0,0.4)';
 
}   
let scale = 10;


const bothShapeGenerator = function (grid,rvs,cell) {
  debugger;
  let {numRows,numCols} = grid;
  let hr = numRows/2;
  let hc = numCols/2;
  let {x,y} = cell;
  let cdx = Math.abs((x-hr)/hr);
  let cdy = Math.abs((y-hc)/hc);
  let cdist =  Math.sqrt(cdx*cdx+cdy*cdy);
  
  let level = Math.floor(rvs.level);
  let opacity = level/255;
  let {shapes,circleP} = grid;
  let shape = grid.circleP.instantiate().show();
  shape.dimension = scale*cdist;//+ 5;
  grid.// shapes.push(shape);
  return shape;
}


const bothInitialize = function (grid) {
  grid.initProtos();
  grid.addBackground();
  grid.setupRandomGridForShapes('level', {step:30,min:0,max:255});
  grid.set('llines',core.ArrayNode.mk());
  grid.initializeGrid(); 
}
 */
 
rs.addFan = function (nm,fromLeft,up) {
  debugger;
  let f = fanP.instantiate();
    Object.assign(f,partParams);

  f.fromLeft = fromLeft;
  f.up = up;
   f.height = 0.78*f.width;
  f.width = 0.78*f.width;
  f . backgroundColor = 'blue';
  this.set(nm,f);
  f.initialize();
  return f;
  }
/*
rs.addFan = function (nm,fromLeft,up) {
  debugger;
  let f = basicP.instantiate();
  addGridMethods(f);;
  Object.assign(f,partParams);
  f . backgroundColor = 'blue';
  f.fromLeft = fromLeft;
  f.up = up;
  f.height = 0.78*f.width;
  f.width = 0.78*f.width;
  this.set(nm,f);
  f.positionFunction = (i,j) => fanPositionFunction(f,i,j);
  f.shapeGenerator = (rvs,cell) => bothShapeGenerator(f,rvs,cell);
  bothInitialize(f);
  return f;
}
*/

rs.initialize = function () {
  //this.addBackground();
  debugger;
  core.root.backgroundColor = 'black';
  this.initProtos();
    //this.addBackground();
  this.addFrame();
//return;
  let fwd  = partParams.width;
  let rwd = fwd*1.1;
  let rwd2 = 0.8*rwd;
  let rmv = 0.5*0.88*fwd;
  let rmv2 = 1.22*rmv;
/*
  let rect01 = this.set('rect01',this.rectP.instantiate().show());
  rect01.fill = 'rgba(0,0,255,1)';
  rect01.width = rect01.height = rwd2;
  rect01.moveto(Point.mk(-1.03*rmv2,0.95*rmv2));
  
  
  let rect10 = this.set('rect10',this.rectP.instantiate().show());
  rect10.fill = 'rgba(0,0,255,1)';
  rect10.width = rect10.height = 0.9*rwd2;
  rect10.moveto(Point.mk(1.0*rmv2,-1.0*rmv2));
  */
  /*
  let rect00 = this.set('rect00',this.rectP.instantiate().show());
  rect00.fill = 'black';
  rect00.width = rect00.height = rwd;
  rect00.moveto(Point.mk(-rmv,-rmv));
  
  

  let rect11 = this.set('rect11',this.rectP.instantiate().show());
  rect11.fill = 'black';
  rect11.width = rwd;
  rect11.height = 0.9*rwd;
  rect11.moveto(Point.mk(rmv,0.9*rmv));
  */
 //return;
  let mv = 0.4*fwd;
//  Object.assign(this,{'width':1.80*fwd,'height':1.80*fwd,frameStroke:'rgb(2,2,255)',frameVisible:0});
  Object.assign(this,{'width':2.0*fwd,'height':2.0*fwd,backgroundColor:'rgb(255,255,255)'});
  let g00 = this.addGrid('g00',0,0);
  g00.moveto(Point.mk(-mv,-mv));
  let g01 = this.addGrid('g01',1,1);
   g01.moveto(Point.mk(mv,mv));
  let f01 = this.addFan('f01',0,1);
  f01.moveto(Point.mk(1.24*mv,-1.24*mv));
  let f10 = this.addFan('f10',1,0);
  f10.moveto(Point.mk(-1.24*mv,1.24*mv));
    let rect = this.set('rect',this.rectP.instantiate().show());
    rect.fill = 'black'
   /* let rect2 = this.set('rect2',this.rectP.instantiate().show());
    rect2.fill = 'black';
    let r2wd = 100;
    rect2.width = r2wd;
    rect2.height= r2wd;*/
//  this.addFrame();



}

export {rs};


