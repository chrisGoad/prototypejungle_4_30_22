// A simple drop of wiggly sets of segments. Metal_2
//core.require('/line/line.js','/generators/basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_metal_2');
let wd = 400;
let topParams = {width:wd,height:wd,dropTries:40,framePadding:0.1*wd,frameVisible:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP['stroke-width'] = .3;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
}


rs.genSegments = function (p) {
  let {width,height,lineP} = this;
  let hh = height/2;
  let fr = (p.y+hh)/height;
  let params = {direction:Math.PI/4,zigzag:1,randomness:0,vertical:1,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  let params2 = Object.assign({},params);
  params2.direction = 0;
  let segs = (Math.random() < 0.5)?this.wigglySegments(params):this.wigglySegments(params2);
  let lines = segs.map((sg) => this.genLine(sg,lineP));
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${r})`;
  lines.forEach( (line) => line.stroke = clr);
  return [segs,lines];
}

rs.initialSegments = function () {
  let {width,height,lineP} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg,lineP)); 
  return [segs,lines];
}

  
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addFrame();
	this.initializeDrop();
}

export {rs};


