
import {rs as basicP} from '/generators/basics.mjs';
import {rs as signalP} from '/generators/grid_signal.mjs';

let rs = basicP.instantiate();
rs.setName('grid_signals');
let grid1 = signalP.instantiate();
let grid2 = signalP.instantiate();
let grid3 = signalP.instantiate();
let grid4 = signalP.instantiate();
//let wd = 2.0*grid1.width;
let wd = 2000;
let topParams = {width:wd,height:wd,frameColor:'rgb(2,2,2)',frameWidth:1.1*wd,frameHeight:1.1*wd,frameVisible:wd/100};
grid1.globalParams.width = wd/2;
Object.assign(rs,topParams);
grid1.globalParams = Object.assign({},grid1.globalParams);
grid2.globalParams = Object.assign({},grid1.globalParams);
grid3.globalParams = Object.assign({},grid1.globalParams);
grid4.globalParams = Object.assign({},grid1.globalParams);
grid1.globalParams.randomizingFactor = 1.5;
grid2.globalParams.randomizingFactor = 1.5;
grid3.globalParams.randomizingFactor = 0;
grid4.globalParams.randomizingFactor = 2;

rs.initialize = function () {
  debugger;
  grid1.globalParams.width = this.width/2;
  grid1.width = this.width/2;
  grid2.width = this.width/2;
  grid3.width = this.width/2;
  grid4.width = this.width/2;
  grid1.globalParams = Object.assign({},grid1.globalParams);
  grid2.globalParams = Object.assign({},grid1.globalParams);
  grid3.globalParams = Object.assign({},grid1.globalParams);
  grid4.globalParams = Object.assign({},grid1.globalParams);
  grid1.globalParams.randomizingFactor = 1.5;
  grid2.globalParams.randomizingFactor = 1.5;
  grid3.globalParams.randomizingFactor = 0;
  grid4.globalParams.randomizingFactor = 2;
  let {width} = grid1;
  let {height} = grid1;
  this.addBackground();
  this.set('grid1',grid1);
  this.set('grid2',grid2);
  this.set('grid3',grid3);
  this.set('grid4',grid4);
  grid1.initialize();
  grid2.initialize();
  grid3.initialize();
  grid4.initialize();
  let mvx = 0.5*width;
  let mvy = 0.5*height;
  grid1.moveto(Point.mk(-mvx,-mvy));
  grid2.moveto(Point.mk(mvx,-mvy));
  grid3.moveto(Point.mk(-mvx,mvy));
  grid4.moveto(Point.mk(mvx,mvy));
  this.addFrame();  
}
export {rs};
