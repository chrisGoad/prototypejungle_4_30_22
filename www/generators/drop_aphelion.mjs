//active
//core.require('/line/line.js','/shape/circle.js','/gen0/DropWebSphere.js',function (linePP,circlePP,rs) {
//core.require('/line/line.js','/shape/circle.js','/gen0/Basics.js','/mlib/dropCircles.js','/mlib/web.js','/mlib/sphere.js',function (linePP,circlePP,rs,addDropMethods,addWebMethods,//addSphereMethods) {//function (linePP,circlePP,rs) {


import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/dropCircles.mjs';
import {rs as addWebMethods} from '/mlib/web.mjs';
import {rs as addSphereMethods} from '/mlib/sphere.mjs';
let rs = basicP.instantiate();
debugger;

addDropMethods(rs);
addWebMethods(rs);
addSphereMethods(rs);

debugger;
//addWebMethods(rs);
rs.setName('drop_aphelion');
let ht= 2000;
ht = 6000;
let wd = ht;
//let topParams = {width:wd,height:ht,maxDrops:60000,maxTries:100,lineLength:2,frameColor:'rgb(2,2,2)',framePadding:0.2*ht,frameVisible:0,minSeparation:20,minConnectorLength:0,maxConnectorLength:300,shortenBy:20}
//let topParams = {width:wd,height:ht,maxDrops:60000,maxTries:100,lineLength:2,frameColor:'rgb(2,2,2)',framePadding:0.16*ht,frameVisible:0,minSeparation:20,minConnectorLength:300,maxConnectorLength:600,shortenBy:20}

let topParams = {width:ht,height:ht,maxDrops:60000,dropTries:50,webTries:1000,lineLength:2,frameColor:'rgb(2,2,2)',framePadding:0.1*ht,frameVisible:0,minSeparation:0,minConnectorLength:300,maxConnectorLength:600,shortenBy:20,maxLoopss:10000}

Object.assign(rs,topParams);

//Object.assign(rs,rs.mkSphereParams());
Object.assign(rs,{sphereCenter:Point3d.mk(0,0,-0.3*wd),sphereDiameter:0.5*wd,focalPoint:Point3d.mk(0,0,wd),focalLength:10,cameraScaling:1000});
rs.sphereCenter = Point3d.mk(0,0,-0.4*ht)

rs.initProtos = function () {
	debugger;
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 8;
  let circleP = this.set('circleP',circlePP.instantiate()).hide();

}  
/*rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
}  */


 
rs.initialize = function () {
	this.initProtos();
	let {focalPoint,focalLength,cameraScaling,lineP} = this;
  core.root.backgroundColor = 'black';
  this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	var pnts = this.doDrops(30);
	
	//let pnts = this.pointsFromCircleDrops();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  let pnts3d = this.pointsTo3dAndBack(pnts);
  debugger;
	this.addWeb(pnts3d,lineP);
  this.addFrame();
}


export {rs};


