
//core.require('/gen0/drop0.js',function (addDropMethods) {
//core.require('/gen1/drop0_1.js',function (rs) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();

addRandomMethods(rs);
addDropMethods(rs);
addSegsetMethods(rs);

rs.setName('drop_whorls');
let ht  = 400;
let topParams = {width:1.5*ht,height:ht,numRows:20,numCols:30,numSeedRows:4,numSeedCols:4,maxDrops:10000,maxTries:10,lineLength:10,framePadding:0.1*ht,frameVisible:0,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'last',numSegStarts:16,splitChance:1,splitAmount:0.02 * Math.PI,fanAngles:[0.5*Math.PI,-0.5*Math.PI],randomDirectionChange:0.1*Math.PI}

Object.assign(rs,topParams);

//let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'black',/*'rgb(1,1,1)',*/backgroundPadding:40,separation:15}
//topParams = {width:600,height:400,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'last'}

Object.assign(rs,topParams);


rs.initProtos = function () {
  this.lineP = linePP.instantiate();
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  debugger;
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(this.lineP,p,clr);
}


rs.genSeeds = function () {
  debugger;
  let {width,lineP} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  return this.gridSeeds(lineP,'white');
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
  this.initProtos();
  this.addFrame();
	 this.setupColorRandomizer({step:10,min:100,max:240});
/*
 this.setupRandomGridForShapes('r',{step:10,min:50,max:240});
 this.setupRandomGridForShapes('g',{step:10,min:50,max:240});
 this.setupRandomGridForShapes('b',{step:10,min:50,max:240});
*/
	this.initializeDrop();
  this.addFrame();
}

export {rs};


