//active
//core.require('/shape/circle.js','/line/line.js','/gen0/PgenWeb.js',function (circlePP,linePP,PgenWeb) {
//core.require('/shape/circle.js','/line/line.js','/gen0/Basics.js','/mlib/pointGen.js','/mlib/web.js',function (//\circlePP,linePP,rs,addPointGenMethods,addWebMethods) {


import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicP.instantiate();
addPointMethods(rs);
addWebMethods(rs);
rs.setName('web_diamond');
let ht= 2000;
ht = 3000;
let nrc=64;
//nrc = 8;
let mcl = 1.6*(ht/nrc);
mcl = 50
//mcl =100;
let minc = 20;
//mcl = 50;
//mcl = 3.6*(ht/nrc);
//nrc = 2;
let  topParams = {sigScalee:ht/500,frameStroke:'rgb(52,52,52)',framePadding:0.1*ht,frameVisible:0	,width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+minc,webTries:100};

Object.assign(rs,topParams);

rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP['stroke-width'] = 7;
	lineP.stroke  = 'white';
	//lineP.stroke  = 'blue';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	circleP.stroke = 'transparent';
	 let circleP2 = this.set('circleP2',circlePP.instantiate()).hide();
	circleP2.dimension = 500;
	circleP2.fill = 'black';
	circleP2.fill = 'rgb(0,0,50)';
	circleP2.fill = 'rgb(0,100,250)';
	circleP2.fill = 'black';
	
	
}  

const interpolate = function (v1,v2,f) {
	return v1 + (v2-v1)*f;
}

rs.inDiamond = function (p) {
	let width = this.width;
	let bd = p.boxcarDistance(Point.mk(0,0));
  return bd < 0.5 * width;
}


const inSquare = function (p,hw) {
	return (-hw < p.x) && (p.x < hw) && (-hw < p.y) && (p.y < hw);
	
}

const inCircle = function (p,d) {
	let dist = p.distance(Point.mk(0,0));
	return dist < d;
	
}
rs.colorFromPoint = function (p) {
	let w = this.width;
//	if (inSquare(p,0.1  * w)) {
	if (inCircle(p,0.2  * w)) {
		return 'rgb(0,100,250)';
	}
	//if (this.inDiamond(p)&&inSquare(p,0.7 * 0.5 * w)) {
	if (inSquare(p,0.7 * 0.5 * w)) {
		return 'red';
	}
	if (this.inDiamond(p)) {
		return 'gray';
		return 'blue';
	} 
  //return 'rgb(0,100,250)'
  //return 'blue'
	return 'transparent';
	return 'white';
	
}
rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,height,cPoints} = this;
	//debugger;
	let pi = cPoints[i];
	let pj = cPoints[j];
	//let f = 0.35;
	//let ww = f*width;
//let hh = f*height;
	let d = pi.distance(pj);
	let bd = pi.boxcarDistance(Point.mk(0,0));
	//let fr = bd/(1.0*width);
	//mxCln = 50 + interpolate(20,50,fr);
	//let ff = 0.75;
	//if (bd < 0.5 * width) {
	mnCln = 50;
//	if (inSquare(pi,0.1*width)) {
	if (inCircle(pi,0.2*width)) {
		mxCln = mnCln+50;
	}
	else if (this.inDiamond(pi)) {
	//if ((-ww < pi.x) && (pi.x < ww) && (-hh < pi.y) && (pi.y < hh)) {
		mxCln = mnCln + 20;
	} else {
		mxCln = mnCln + 50;
	}
	
	//	console.log('bd',bd,'fr',fr,'mxCln',mxCln);

	return (mnCln < d) && (d < mxCln);
}


rs.initialize = function () {
  core.root.backgroundColor = 'black';
 // core.root.backgroundColor = 'rgb(50,50,50)';
	this.initProtos();
	this.addFrame();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
//	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs(this.lineP);
	//this.set('cc',this.circleP2.instantiate()).show();
	//this.addSignature();
}

export {rs};


