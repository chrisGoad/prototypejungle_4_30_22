import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';

import {rs as basicP} from '/generators/basics.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';

let rs = basicP.instantiate();

addRandomMethods(rs);
addDropMethods(rs);
addWebMethods(rs);


//addWebTreeMethods(rs);
rs.setName('web_drift');
let ht= 2000;
ht = 6000;
let nrc = 20;
let topParams = {onSphere:1,width:1.5*ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:100,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000};
topParams = {maxFringeTries:10,numRows:nrc,numCols:nrc,width:1.5*ht,height:ht,maxDrops:10000,dropTries:100,webTries:200,lineLength:2,backgroundColor:'rgb(2,2,2)',framePadding:0.1*ht,minSeparation:20,minConnectorLength:0,maxConnectorLength:200,shortenBy:10,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

rs.maxDrops = 2000;
Object.assign(rs,topParams);


rs.initProtos = function () {
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 6;
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	circleP.stroke = 'transparent';
}  

rs.genSegments = function (p) {
	//console.log('px',p.x);
	let rd = 30;
	let gcrc = geom.Circle.mk(p,rd);
	let scrc = this.circleP.instantiate();
	scrc.dimension = 2*rd;
	//scrc.moveto(p);
	return [gcrc,scrc];
}
 
const nearDiagonal = function (pi,pj,howNear) {
	return true;
	let {x:pix,y:piy} = pi;
	let {x:pjx,y:pjy} = pj;
	let dx = Math.abs(pjx - pix);
	 dx = pjx - pix;
	let dy = Math.abs(pjy - piy);
  dy = piy - pjy;
	let a = (180 * Math.atan2(dx,dy))/Math.PI;
	return (a > (45-howNear)) && (a < (45+howNear));
}
	
rs.numCalls = 0;
rs.pairFilter = function (i,j) {
//	debugger;
	//let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width,randomGridsForShapes} = this;
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
	
  let pi = cPoints[i];
  let pj = cPoints[j];
  let cell = this.cellOf(pi);
	//debugger;
	//let rvs =  this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	let rvs = this.rvsAtCell(cell);
   let cln = rvs.connectorLn;
  //console.log('celli',celli);
	let d = pi.distance(pj);
	if ((cln < d) && (d < (cln + 100))) {
	//if ((mnCln < d) && (d < mxCln)) {
		return true;// nearDiagonal(pi,pj,40);
	}
}


rs.initialize = function () {
  this.initProtos();

		let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,lineP} = this;

  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('connectorLn',{step:80,stept:0.5,min:50,max:500});

 // this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
 	debugger;
  this.addFrame();
	this.initializeDrop();
	let pnts = this.pointsFromCircleDrops();
	let p = pnts[0];
	p.onFringe = 1
	//this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initWeb(pnts);
	this.addWeb();
	this.addSegs(lineP);
	//this.loopFringeAddition(100);
  //let pnts3d = this.pointsTo3dAndBack(pnts);
	//this.addWeb(pnts);
}

export {rs};


