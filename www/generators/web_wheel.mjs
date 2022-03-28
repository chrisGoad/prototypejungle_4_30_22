//active
//core.require('/line/line.js','/gen0/min0.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,addBasis,addPointGenMethods,addWebMethods) {
//core.require('/line/line.js','/mlib/basics.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,addBasis,addPointGenMethods,addWebMethods) {
//core.require('/line/line.js','/gen0/PgenWeb.js',function (linePP,PgenWeb) {
//core.require('/line/line.js','/gen0/Basics.js','/mlib/pointGen.js','/mlib/web.js',function (linePP,rs,addPointMethods,addWebMethods) {



import {rs as linePP} from '/line/line.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
rs.setName('web_wheel');
let ht= 2000;
ht = 3000;
let nrc=20;
let toRadians = Math.PI/180;
//let  topParams = {numRings:nrc,radius:ht,numPointsPerRing:20,fromAngle:toRadians*60,toAngle:toRadians*120,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*ht,minnConnectorLength:500,maxConnectorLength:2000,maxLoops:100000}
let  topParams = {webTries:1000,numRings:nrc,radius:ht,ringSeparationn:0.01*ht,numPointsPerRingn:20,fromAngle:0*toRadians,toAngle:360*toRadians,frameWidth:1.2*ht,frameHeight:1.2*ht,frameVisible:1,minConnectorLength:0,maxConnectorLength:2000}
//let  topParams = {width:2*ht,height:2*ht,numRings:nrc,radius:ht,maxDrops:1000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*ht,minSeparation:20,maxConnectorLength:2000,maxLoops:100000}

Object.assign(rs,topParams);


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
    debugger;
	this.initProtos();
    let {lineP} = this;

	let pnts = this.genRings(this);
	this.addWeb(pnts,lineP);
	this.addSegs(lineP);
  this.addFrame();
}


export {rs};


