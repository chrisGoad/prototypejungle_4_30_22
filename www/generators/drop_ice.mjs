//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_ice');
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,framePadding:20,frameVisible:0,minSeparation:10}

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

rs.genSegments = function (p) {
  let {minSeparation:sep,lineP} = this;
  let {length,angle} = this.segParams();
  let seg = this.genSegment(p,length,angle);
  let ln = this.genLine(seg,lineP);
  let eseg = this.genSegment(p,length+sep,angle);
  return [[eseg],[ln]];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.initializeDrop();
  	this.addFrame();

}

export {rs};



