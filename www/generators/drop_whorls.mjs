
import {rs as linePP} from '/shape/line.mjs';
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

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
	this.lineP['stroke-width'] = .6;
}  

rs.genDropStruct = function (p) {
  return this.genSegmentsFan(this.lineP,p,'white');
}


rs.genSeeds = function () {
  let {width,lineP} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  return this.gridSeeds(lineP,'white');
}
  
rs.initialize = function () {
  this.initProtos();
  this.addFrame();
  this.generateDrop();
}

export {rs};


