
import {rs as linePP} from '/line/line.mjs';
import {rs as generatorP} from '/generators/grid_metal.mjs';

let rs = generatorP;//.instantiate();

rs.setName('grid_metal_h');

let wd = 300;
let nc = 40;
let topParams = {saveState:0,width:wd,height:1.5*wd,numRows:1.5*nc,numCols:nc,backStripeWidth:1.2*wd,backStripeHeight:1.5*1.2*wd,backStripeVisible:wd/100,backStripePaddingg:0.1*wd,}

Object.assign(rs,topParams);

rs.horizontalize(rs,topParams,1);




export {rs};


