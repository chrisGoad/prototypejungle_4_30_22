//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
//import {rs as addAnimateMethods} from '/mlib/animate.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
//import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';

let rs = basicsP.instantiate();
//addGridMethods(rs);
addRandomMethods(rs);	
//addAnimateMethods(rs);	
rs.setName('random_stripes');
let rdim = 1;
rs.initProtos = function () {
	rs.rectP  = rectPP.instantiate();
	rs.rectP.fill = 'red';
	rs.rectP.fill = 'white';
	//rs.rectP.fill = 'rgba(55,55,55,0.6)';
	//rs.rectP.fill = 'red';
	rs.rectP['stroke-width'] = 0;
	rs.rectP.width = rdim;
	rs.rectP.height = rdim;
  rs.blineP  = linePP.instantiate();
  rs.blineP['stroke-width'] = 0.4;
  rs.blineP.stroke = 'cyan';
  rs.blineP.stroke = 'white';

}  

rs.mkStripes = function (n,ornt,minWd,maxWd) {
debugger;
   let {width:wd,height:ht} = this;
  let delta = maxWd;
  let v = ornt === 'vertical';
  let rw = v?0:1;
      let no2 = n/2;

  for (let i=0;i<n;i++) {
    //let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,rw);
    let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,0);
    let rv = rvs.v;//*0.001;

    let dim0 = Math.abs(i-no2)/no2;
   // let dim = dim0*dim0*delta;
    let dim = rv*delta;
    let stripe = this.rectP.instantiate();
   /* stripe.width = v?(minWd + (i/n)  *delta):wd;
    stripe.width = v?(minWd + dim):wd;
   // stripe.width = v?(minWd + Math.random()  *delta):wd;
    stripe.height = v?ht:(minWd + (i/n)  *delta);
    stripe.height = v?ht:(minWd + dim);
   // stripe.height = v?ht:(minWd + Math.random()  *delta);
   // stripe.height = ht;*/
    let pos = v? Point.mk((i/n) * wd-0.5*wd,0):Point.mk(0,(i/n) * ht-0.5*ht)
    this.set((v?'v':'h')+'stripe'+i,stripe);
    stripe.moveto(pos);
    /*const rfv = () => 255*Math.random();
    let rfill = `rgba(${rfv()},${rfv()},${rfv()},0.6)`;
    stripe.fill = rfill;*/
    stripe.fill = 'white';
   // stripe.fill = 1?'rgba(255,0,0,0.4)':'rgba(0,0,255,0.4)';
  }
  this.updateStripes(n,ornt,minWd,maxWd);
 }
    
  

rs.updateStripes = function (n,ornt,minWd,maxWd) {
debugger;
   let {width:wd,height:ht} = this;
   console.log('maxWd',maxWd);
  let delta = maxWd;// - minWd;
  let v = ornt === 'vertical';
  let rw = v?0:1;
  let no2 = n/2;

  for (let i=0;i<n;i++) {
    let stripe = this[(v?'v':'h')+'stripe'+i];
   // let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,rw);
    let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,0);
    let rv = rvs.v;//*0.002;
    let dim = rv*delta;
    stripe.width = v?Math.max(dim,0):wd;
    stripe.height =v?ht:Math.max(dim,0);
    let pos = v? Point.mk((i/n) * wd-0.5*wd,0):Point.mk(0,(i/n) * ht-0.5*ht);
    //console.log('Pos',pos.x,pos.y);
    stripe.moveto(pos);
    stripe.update();
  }
 }
    

let nr = 64;
let nc = 100;
let wd = 200;
let topParams;

//topParams = {numRows:2,numCols:nc,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:40,backStripePadding:0.15*wd,numTimeSteps:100};
topParams = {numRows:2,numCols:nc,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:0,framePadding:0.15*wd,numTimeSteps:100};


Object.assign(rs,topParams);



rs.computeState  = function () {
   return [["randomGridsForShapes",this.randomGridsForShapes]];
}

rs.initialize = function () {
  debugger;
    this.initProtos();
         this.addFrame();

   core.root.backgroundColor = 'black';
   let {width:wd,height:ht,numCols:nc,saveState} = this;
   let fr =0.005;
   //this.setupShapeRandomizer('v',{step:10,stept:10,min:0,max:100});
   if (saveState) {
     this.setupShapeRandomizer('v',{step:fr*10,stept:fr*10,min:-fr*100,max:0.9*fr*100});
     this.saveTheState();
     this.mkStripes(nc,'vertical',0,wd/50);
     this.mkStripes(nc,'horizontal',0,ht/50);

   } else  {
    this.getTheState(() => {
      debugger;
       this.mkStripes(nc,'vertical',0,wd/50);
       this.mkStripes(nc,'horizontal',0,ht/50);
       this.addFrame();	
         dom.svgDraw();
       debugger;
    });
   }
}


export {rs};


