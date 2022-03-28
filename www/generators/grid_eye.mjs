
import {rs as linePP} from '/line/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
//import {rs as addRandomMethods} from '/mlib/boundedRandomGrids.mjs';
let rs = basicsP.instantiate();

addGridMethods(rs);
//addRandomMethods(rs);
rs.setName('grid_eye');

let wd = 100;
let nr = 50;
let params = {numRows:nr,numCols:nr,width:wd,height:wd,lineLength:wd/nr,frameColor:'rgb(152,45,45)',framePadding:0.1*wd,frameVisible:0};
Object.assign(rs,params);

rs.initProtos = function () {
  this.lineP = linePP.instantiate();
  this.lineP['stroke-width'] = .2;
}   	

rs.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,lineLength,width} = this;
	let line = this.lineP.instantiate();
	shapes.push(line);
	let dir = 2*Math.PI * Math.random();
  this.setLineEnds(line,lineLength,dir);
  let maxd = 0.5 * width;
  let {x,y} = cell;
  let center = this.centerPnt(x,y);
  let dist = center.length();
  if (dist > maxd) {
    line.hide();
  } else {
    let opacity = 1 - dist/maxd;
    let clr;
    if (opacity < 0.7) {
      clr = 'rgba(255,255,255,'+opacity+')';
    } else {
      clr = 'rgba(0,0,0,'+opacity+')';
    }
    line.stroke = clr;
  }
	return line;
}

rs.initialize = function () {
  core.root.backgroundColor = 'rgb(150, 43, 43)';
  this.addFrame();
  this.initProtos();
  this.initializeGrid();
}

export {rs};

