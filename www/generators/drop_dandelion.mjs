
//core.require('/gen0/DropSeedsRandom.js','/line/line.js',function (rs,linePP) {
//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/boundedRandomGrids.js','/mlib/drop_seeds.js',function (linePP,rs,addDropMethods,addRandomMethods,addSeedMethods) {



import {rs as linePP} from '/line/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);
//addSeedMethods(rs);
addSegsetMethods(rs);
addRandomMethods(rs);

rs.setName('drop_dandelion');
let ht = 360;
let wd = 1* ht;

let topParams = {width:wd,height:ht,dropTries:10,lineLength:5,framePadding:0.15*ht,frameVisible:0,minSeparation:0,rectangleDim:0.2,gridPadding:60,fromEnds:1,sepNext:0.01,extendWhich:'first',splitChance:.40,splitAmount:0.05 * Math.PI,seedDirections:[0*Math.PI],directionChange:0.0*Math.PI,randomDirectionChange:0.025*Math.PI,lineExt:0,numSeeds:15,fromEnds:1,doNotExit:[geom.Circle.mk(Point.mk(0,0),0.5*ht)]};

Object.assign(rs,topParams);

rs.initProtos = function () {
	 core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .5;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};ho
}

rs.genSeeds = function () {
  debugger;
  let {width,lineP} = this;
  this.ringRadius = 0.15 * 0.5 * width;
  return this.ringSeeds(lineP,'transparent');
}

rs.genSegments = function (p) {
  return this.genSegmentsFan(this.lineP,p,'white',topParams);
}

/*
rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}
*/
rs.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initProtos();
	this.addFrame();
	this.initializeDrop();
}

export {rs};



