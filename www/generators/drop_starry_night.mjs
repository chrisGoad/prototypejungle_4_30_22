import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_starry_night');
let ht = 200;
let topParams = {width:1.5*ht,height:ht,dropTries:50,lineLength:2,framePadding:0.17*ht,minSeparation:0,}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .5;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
}

rs.genSegments = function (p) {
  let sizes = [2,5,10,20,40];
  let which = Math.floor(Math.random()*5);
  let sz = sizes[which];
  let wd = sz;
  let ht = sz;
  let segs = this.rectangleSegments(wd,ht,p);
  let lines = segs.map((sg) => this.genLine(sg,this.lineP));

  const genRGBval = function () {
    return 50 + Math.floor(Math.random()*202);
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
  this.addFrame();
	this.initProtos();
	this.initializeDrop();
}

export {rs};


