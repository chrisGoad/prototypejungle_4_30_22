
import {rs as linePP} from '/shape/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_horizon');
let topParams = {width:200,height:200,maxDrops:100000,dropTries:50,lineLength:2,backFill:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP.stroke = 'yellow';
  this.lineP['stroke-width'] = .3;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
}

rs.initialSegments = function () {
  let {width,height,lineP} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg,lineP)); 
  return [segs,lines];
}

rs.genRectSegments = function (p) {
  let sizes = [2,5,10,20,40];
  let which = Math.floor(Math.random()*5);
  let sz = sizes[which];
  let wd = sz;
  let ht = sz;
  let segs = this.rectangleSegments(wd,ht,p);
  return segs;
}


rs.genDropStruct = function (p) {
  let wparams = {direction:0,zigzag:1,randomness:0,vertical:0,widths:[10,20,50],heightRatio:0.05,numSegs:15,pos:p};
  let segs = (p.y < 0)?this.genRectSegments(p):this.wigglySegments(wparams);
  let lines = segs.map((sg) => this.genLine(sg,this.lineP));
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${b})`;
  lines.forEach( (line) => line.stroke = clr);
  return [segs,lines];
}
  
rs.initialize = function () {
  this.addFrame();
  this.initProtos();
  this.generateDrop();
}

export {rs};


