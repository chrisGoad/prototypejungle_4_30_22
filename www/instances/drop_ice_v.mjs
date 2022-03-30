
import {rs as linePP} from '/line/line.mjs';
import {rs as generatorP} from '/generators/drop_ice.mjs';

let rs = generatorP.instantiate();

rs.setName('drop_ice_v');
let wd  = 200;
let topParams = {width:wd,height:1.5*wd,backStripeVisible:0}

Object.assign(rs,topParams);



rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .3;
}  


export {rs};


