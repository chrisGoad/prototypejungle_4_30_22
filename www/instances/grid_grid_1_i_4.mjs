
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as generatorP} from '/generators/grid_grid_1.mjs';
import {rs as basicsP} from '/generators/basics.mjs';


let rs = basicsP.instantiate();
rs.setName('grid_grid_1_i_4',19);
let wd = 400;
let nr = 20;
let fwd = 1.2  * wd;
let topParams = {saveState:1,width:fwd,height:fwd,numRows:nr,numCols:nr,pointJiggle:10,innerRows:5,backgroundColor:'rgb(0,0,100)',framePadding:0.75*fwd,frameStrokee:'white'};

rs.set('g00',generatorP.instantiate());
rs.set('g10',generatorP.instantiate());
rs.set('g01',generatorP.instantiate());
rs.set('g11',generatorP.instantiate());
Object.assign(rs,topParams);

rs.decider = function (rvs,cell) {
  let {numRows} = this;
  let hnr = numRows/2;
  return (cell.x+cell.y) % 2 === 0;
  return  cell.x < hnr;
}

rs.decider = function (rvs,cell) {
  return Math.random() < 0.5;
  let {numRows} = this;
  let hnr = numRows/2;
  return (cell.x+cell.y) % 2 === 0;
  return  cell.x < hnr;
}
  
  
rs.initialize = function () {
  core.root.backgroundColor = 'rgb(0,0,0)';
  
  this.addFrame();
  //this.addBackground();
  rs.g00.initialize();
  rs.g01.initialize();
  rs.g10.initialize();
  rs.g11.initialize();
  let mv = 0.5*wd;
  rs.g00.moveto(Point.mk(-mv,-mv));
  rs.g10.moveto(Point.mk(mv,-mv));
  rs.g01.moveto(Point.mk(-mv,mv));
  rs.g11.moveto(Point.mk(mv,mv));
  
}

export {rs};

 