
/*ore.require('/line/line.js','/shape/circle.js','/generators/basics.js','/mlib/lines.js',
function (linePP,circlePP,item,addMethods) {
debugger;

addMethods(item);
*/
import {rs as linePP} from '/line/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addLinesMethods} from '/mlib/lines.mjs';	

let rs = basicP.instantiate();
addLinesMethods(rs);
rs.setName('lines_lights');
let wd = 130;
let ht = 1.5*wd;
let topParams = {width:wd,height:ht,numLines:3000,angleMin:-90,angleMax:90,framePadding:0.1*wd,frameStroke:'white',frameStrokeWidth:2}
Object.assign(rs,topParams);

rs.shapePairs = 
[[geom.Circle.mk(Point.mk(-50,40),5),geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80))],
 [geom.Circle.mk(Point.mk(-50,-40),5),geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80))],
 [geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80)),geom.Circle.mk(Point.mk(50,0),10),]];
 
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .015; 	
}  


rs.initialize = function () {
debugger;
  core.root.backgroundColor = 'black';
  this.addFrame();
  this.initProtos();
  this.initializeLines();
}	
export {rs};

      

