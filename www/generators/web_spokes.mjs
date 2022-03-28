//active
//core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/gen0/Basics.js','/mlib/pointGen.js','/mlib/web.js',
//function (linePP,rectPP,circlePP,Basics,addPointGenMethods,addWebMethods) {


import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addPointGenMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	
let rs = basicP.instantiate();

addPointGenMethods(rs);
let WebP = basicP.instantiate();
addWebMethods(WebP);

let stripes = rs.set('stripes',svg.Element.mk('<g/>'));

rs.setName('web_spokes');

let wd= 2000;
let ht = 0.02*wd; // height  of stripes
let sep = 0.4*wd; // separation between stripes

let  webParams = {minConnectorLength:0.5*ht,maxConnectorLength:2.2*ht,maxRingConnectorLength:3.2*sep,webTries:100};
let  topParams = {width:wd,height:ht,frameWidth:1.5*wd,frameHeight:1.5*wd,frameVisible:0};
let  gridParams = {initialPos:Point.mk(-0.0*wd,0),initialDirection:0,width:ht,step:0.007*wd,delta:0.02*Math.PI,numSteps:70};


Object.assign(WebP,webParams);
Object.assign(rs,topParams);
Object.assign(rs,gridParams);
	
let numSpokes = 18;
let webs = rs.set('webs',core.ArrayNode.mk());
for (let i=0;i<numSpokes;i++) {
	webs.push(WebP.instantiate());
	
}
let grayblue = 'rgb(50,50,100)';

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 3;
	return;
  let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'blue';
	this.lineP2['stroke-width'] = 3;
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'transparent';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'transparent';
	this.circleP.dimension = 0.5*ht;
	this.circleP.fill = grayblue;
	this.circleP.fill = 'red';
	this.circleP['stroke-width'] = 0;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	this.addFrame();
	let {circleP,rectP} = this;
	let rws = [];
	for (let i=0;i<numSpokes;i++) {
		gridParams.initialDirection = 2*i*(Math.PI/numSpokes);
		rws.push(this.genRandomWalk(gridParams));
	}
	for (let i=0;i<numSpokes;i++) {
		let w = webs[i];
		w.addWeb(rws[i],this.lineP);
	}
	
}
export {rs};


