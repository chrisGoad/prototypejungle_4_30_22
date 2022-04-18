
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_ice');
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,framePadding:20,minSeparation:10}

Object.assign(rs,topParams);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'yellow';
  this.lineP['stroke-width'] = .3;
}  

rs.initialSegments = function () {
  let {width,height,lineP} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg,lineP));  
  return [segs,lines];
}

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
} 

rs.genDropStruct = function (p) {
  debugger;
  let {minSeparation:sep,lineP} = this;
  let {length,angle} = this.segParams();
  let seg = this.genSegment(p,length,angle);
  let ln = this.genLine(seg,lineP);
  let eseg = this.genSegment(p,length+sep,angle);
  return [[eseg],[ln]];
}
 
rs.initialize = function () {
  this.initProtos();
  this.generateDrop();
  this.addFrame();

}

export {rs};



