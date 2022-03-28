import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addLinesMethods} from '/mlib/lines.mjs';	

let rs = basicP.instantiate();
addLinesMethods(rs);

rs.setName('lines_chaos_within_order');

rs.initializeProto = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1; 
  this.gridLineP = linePP.instantiate();
  this.gridLineP.stroke = 'white';
  this.lineP['stroke-width'] = .1; 
  this.circleP = circlePP.instantiate();
  this.circleP.stroke = 'black';
  this.circleP.fill = 'black';
}  
let ht = 200;
let wd = 1.5*ht
let topParams = {delta:10,center:Point.mk(0,0),width:wd,height:ht, frameWidth:1.17*wd,frameHeight:1.17*ht,dimension:120,numLines:1000,angleMin:-90,angleMax:90}

rs.drawGrid = function () {
  debugger;
  let {gridLines,gridLineP} = this;
  if (gridLines) {
    gridLines.length = 0;
  } else {
    gridLines = this.set('gridLines',core.ArrayNode.mk());
  }
  let {delta,width,height} = this;
  let lineP = this.gridLineP;
  let numHlines = Math.ceil(height/delta);
  let numVlines = Math.ceil(width/delta);
  let hwd = width/2;
  let hht = height/2;
  const addLine =  (e0,e1) => {
    let line = gridLineP.instantiate();
    this.grid// lines.push(line);
    line.setEnds(e0,e1);
    gridLines.push(line);
    line.update();
    line.show();
  }
  for (let i=0;i<=numHlines;i++) {
    let cy = -hht + i*delta;
    let end0 = Point.mk(-hwd,cy);
    let end1 = Point.mk(hwd,cy);
    addLine(end0,end1);
  }
   for (let i=0;i<=numVlines;i++) {
    let cx = -hwd + i*delta;
    let end0 = Point.mk(cx,-hht);
    let end1 = Point.mk(cx,hht);
    addLine(end0,end1);
  }
}

rs.initialize = function () {
  Object.assign(rs,topParams);
  this.initializeProto();
  core.root.backgroundColor = 'black';
  debugger;
  this.addFrame();
  this.drawGrid();
  let circle =  this.set('visCircle',this.circleP.instantiate().show());
  circle.dimension = this.dimension;
  circle.update();
  this.initializeLines();
}	

export {rs};
 
