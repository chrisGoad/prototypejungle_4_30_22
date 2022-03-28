
const rs = function (item) {

const dSeg = function (e0,e1,p) { // displaced seg
  return LineSegment.mk(e0.plus(p),e1.plus(p));
}
item.segsFromPoints = function (pnts,p) {
  let ln = pnts.length;
  let segs = [];
  let p0,p1;
  for (let i=0;i<ln-1;i++) {
    if (i === 0) {
     p0 = p?pnts[i].plus(p):pnts[i];
    } else {
      p0 = p1;
    }
    p1 = p?pnts[i+1].plus(p):pnts[i+1];
    let sg = LineSegment.mk(p0,p1);
    segs.push(sg);
  }
  return segs;
}

item.USegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let LL = Point.mk(-hwd,hht);
  let LR = Point.mk(hwd,hht);
  let UR = Point.mk(hwd,-hht);
  let points = [UL,LL,LR,UR];
  return this.segsFromPoints(points,center);
}

item.UUSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let LL = Point.mk(-hwd,hht);
  let LR = Point.mk(hwd,hht);
  let UR = Point.mk(hwd,-hht);
  let points = [LL,UL,UR,LR];
  return this.segsFromPoints(points,center);
}
item.triangleSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let LL = Point.mk(-hwd,hht);
  let TOP = Point.mk(0,-hht);
  let LR = Point.mk(hwd,hht);
  let points = [LL,TOP,LR,LL];
  return this.segsFromPoints(points,center);
}

item.rectangleSegments = function (wd,ht,center,bottomGap) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let UR = Point.mk(hwd,-hht);
  let LR = Point.mk(hwd,hht);
  let LL = Point.mk(-hwd,hht);
	let points;
	if (bottomGap) {
		let HL = Point.mk(-0.5*bottomGap,hht);
		let HR = Point.mk(0.5*bottomGap,hht);
    points0 = [HL,LL,UL];//,UR,LR,HR];
    points1 = [UR,LR,HR];
		return this.segsFromPoints(points0,center).concat(this.segsFromPoints(points1,center));
	} else {
    points = [UL,UR,LR,LL,UL];
	}
  return this.segsFromPoints(points,center);
}

item.crossSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UC = Point.mk(0,-hht);
  let LC = Point.mk(0,hht);
  let vseg = LineSegment.mk(UC,LC);
  let LFTC = Point.mk(-hwd,0);
  let RC = Point.mk(hwd,0);
  let hseg = LineSegment.mk(LFTC,RC);
  return [vseg,hseg];
}

item.diagSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let ULC = Point.mk(-hwd,-hht);
  let LLC = Point.mk(-hwd,hht);
	let URC = Point.mk(hwd,-hht);
	let LRC = Point.mk(hwd,hht);
  let seg0 = LineSegment.mk(ULC,LRC);
  let seg1 = LineSegment.mk(URC,LLC);
  return [seg0,seg1];
}


      
item.sizedRectangleSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.rectangleSegments(wd,ht,p);
  return segs;
}

item.sizedTriangleSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
 /* let sg0 = dSeg(Point.mk(0,0),Point.mk(wd/2,-ht),p);
  let sg1 = dSeg(Point.mk(wd/2,-ht),Point.mk(wd,0),p);
  let sg2 = dSeg(Point.mk(wd,0),Point.mk(0,0),p);*/
  let segs = this.triangleSegments(wd,ht,p);
  return segs;
}


item.sizedUSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.USegments(wd,ht,p);
  return segs;
}

item.sizedUUSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.UUSegments(wd,ht,p);
  return segs;
}

item.mkCenteredSeg = function (pos,length,angle) {
	let hln =0.5*length;
	let c = Math.cos(angle);
	let s = Math.sin(angle);
	let v = Point.mk(c*hln,s*hln);
	let p0 = pos.difference(v);
	let p1 = pos.plus(v);
	return LineSegment.mk(p0,p1);
}


item.mkASeg = function (pos,ln,angle) {
	let c = Math.cos(angle);
	let s = Math.sin(angle);
	let v = Point.mk(c*ln,s*ln);
	let p1 = pos.plus(v);
	return LineSegment.mk(pos,p1);
}

item.crossedSegments = function (params) {
	debugger;
	 let {direction:dir0=0,randomness=0,length0,length1,pos,centered=1} = params;
	 let dir1 = dir0 + 0.5* Math.PI;
	 let s0 = centered?this.mkCenteredSeg(pos,length0,dir0):this.mkASeg(pos,length0,dir0);
	 let s1 = centered?this.mkCenteredSeg(pos,length1,dir1):this.mkASeg(pos,length1,dir1);
	 return [s0,s1];
}


item.wigglySegments = function (params) {
  let {zigzag=0,direction=0,randomness=0,vertical=0,widths,heightRatio,numSegs,pos} = params;
 // debugger;
  let {width,height} = this;
  let uvec,nvec,stp;
  if (direction) {
    let cs = Math.cos(direction);
    let sn = Math.sin(direction);
    uvec = Point.mk(cs,sn);
    nvec = uvec.normal();
  }
  
  let ln = widths.length;
  let which = Math.floor(Math.random()*ln);
  let wd = widths[which];
  let hwd = 0.5*wd;
  if (direction) {
    //stp = pos.plus(uvec.times(-hwd));
    stp = uvec.times(-hwd);
  }
  let ht = heightRatio*wd;
  let hht = 0.5*ht;
  let pnts = [];
  let sgwd = wd/numSegs;
  let xp = -wd/2;
  for (let i = 0;i<numSegs+1;i++) {
		let y;
		let odd = i%2 === 1;
		let up = i%4===1;
		if (zigzag) {
		 let absy = odd?ht+randomness*(Math.random()-0.5)*ht:0;
		 y = up?absy:-absy;
		} else {
		 y = (Math.random()-0.5)*ht;
		}
    let pnt;
    if  (direction) {
      pnt = stp.plus(uvec.times(i*sgwd)).plus(nvec.times(y));
    } else {
		  pnt = vertical?Point.mk(y,xp):Point.mk(xp,y);
    }
    let mx = 1.05*(width/2);
    //console.log('pnt.x',pnt.x,'mx',mx);
    if ((pnt.x) > mx) {
      debugger;
    }
		pnts.push(pnt);
		xp+= sgwd;
  }
  let segs =this.segsFromPoints(pnts,pos);
  return segs;
}


item.genOneSegment = function (p,direction) {
  let {sepNext,lineLength:len,lineExt=0} = this;
  debugger;
	let seg = this.genSegment(p,len,direction,sepNext);
  return seg;
}
// a "unit" has the form [[segs],[lines]] Seeds are starter units
item.genSingletonUnit =  function (lineP,p,direction,clr) {
  let {lineExt=0} = this;
	let seg = this.genOneSegment(p,direction);
	//let ln = this.genLine(seg.end0,seg.end1,sepNext);
	let ln = this.genLine(seg,lineP,lineExt);
  if (clr) {
		ln.stroke = clr;//'white';//clr;
  }
	return [[seg],[ln]];
}

item.genSegmentsFan = function (lineP,p,clr,params) {
	let thisCopy;
	if (params) {
		thisCopy = {};
		//debugger;
		for (let p in this) {
			let v = this[p];
			if (typeof v !== 'function') {
			 thisCopy[p] = v;
			}
		Object.assign(thisCopy,params);
		}
	} else {
		thisCopy = this;
	}
	let {width,height,sepNext,splitChance,splitAmount,
	     lineLength:len,directionChange:dc=0,randomDirectionChange:rdc=0,lineExt=0} = thisCopy;
  let angle;
	let rn = Math.random();
  if (typeof p.direction === 'number') {
   angle = p.direction +  dc + ((rn<0.5)?rdc:-rdc);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let hsa = 0.5 * splitAmount;
  let a0 = angle+splitAmount;
  let a1 = angle-splitAmount;
 // let a0 = angle+0.02 * Math.PI;
 // let a1 = angle-0.02 * Math.PI;
	//let len = 10;//2 + Math.floor(r*4)*4;
  if (Math.random() < splitChance ) {
		//debugger;
	  let seg0 = this.genSegment(p,len,a0,sepNext);
	  let seg1 = this.genSegment(p,len,a1,sepNext);
    p.isEnd = 1;
		let ln0 = this.genLine(seg0,lineP,lineExt);
		let ln1 = this.genLine(seg1,lineP,lineExt);
	  if (clr) {
		  ln0.stroke = clr;//'white';//clr;
		  ln1.stroke = clr;//'white';//clr;
    }
		return [[seg0,seg1],[ln0,ln1]];
  } else {
	  let seg = this.genSegment(p,len,angle,sepNext);
    p.isEnd = 1;
		let ln = this.genLine(seg,lineP,lineExt);
	//	let clr = `rgb(${r},${r},${r})`;
    if (clr) {
		  ln.stroke = clr;//'white';//clr;
    }
		return [[seg],[ln]];
  }

}


 // the following methods generate segsLines, which are used as the seeds of the drop operation. 
//item.ringSeeds = function (lineP,clr,icenter,outward=1,divergence=0) {
item.ringSeeds = function (lineP,clr,icenter,divergence=0,data) {
  //let {width,height,sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
  let {sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
	let center = icenter?icenter:Point.mk(0,0);
  let segs = [];
//  let numStarts = 16;
  let cangle = 0.5* Math.PI;
  let delta = (Math.PI*2)/numSeeds;
 // let radius = 0.2* 0.5 * height;
 // let len = 5;//2 + Math.floor(r*4)*4;
  //let zp = Point.mk(0,0);
	//debugger;
  for (let j=0;j<numSeeds;j++) {
    let ip = Point.mk(Math.cos(cangle),Math.sin(cangle)).times(radius);
		let p = ip.plus(center);
	//	let dir = outward?cangle+divergence:-cangle-divergence;
		let dir = cangle+divergence;
		let seg =  this.genSegment(p,len,dir,sepNext);
		let end = seg.end;
		if (data) {
			end.data = data;
		}
		end.spoke = j;
		end.seed = end;
		segs.push(seg); 
    cangle += delta;
  }
 // let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,lineExt)); 
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}
item.sideSeeds = function (lineP,clr,data,right) {
  let {width,height,sepNext,numSeeds,ringRadius:radius,lineLength:len,lineExt=0} = this;
  let segs = [];
//  let numStarts = 16;
  let delta  = height/(numSeeds+1);
		let hw = width/2;
	let cy = delta-hw;
  for (let j=0;j<numSeeds;j++) {
    let ip = Point.mk(right?hw:-hw,cy);
	//	let dir = outward?cangle+divergence:-cangle-divergence;
		let seg =  this.genSegment(ip,len,right?Math.PI:0,sepNext);
		let end = seg.end;
		if (data) {
			send.data = data;
		}
		end.seed = end;
		segs.push(seg); 
    cy += delta;
  }
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}
item.leftSideSeeds = function (clr,data) {
	return this.sideSeeds(clr,data);
}
item.rightSideSeeds = function (clr,data) {
	return this.sideSeeds(clr,data,true);
}



item.randomSeeds = function (clr) {
  let {width,height,sepNext,numSeeds,ringRadius:radius,seedDirections,lineLength:len,lineExt=0} = this;
  let segs = [];
	let ld;
	if (seedDirections) {
	  ld = seedDirections.length;
	}
  for (let j=0;j<numSeeds;j++) {
    let ip = this.genRandomPoint();
		let angle;
		if (ld) {
			let ri = Math.floor(Math.random()*ld);
			angle = seedDirections[ri];
		} else {
			angle = 2*Math.random()*Math.PI;
		}
		let seg =  this.genSegment(ip,len,angle,sepNext);
		segs.push(seg); 
  }
  let lines = segs.map((sg) => this.genLine(sg,lineP,lineExt)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}





item.gridSeeds = function (lineP,clr) {
  let {width,height,sepNext,fanAngles,numSeedRows:numRows,numSeedCols:numCols,gridPadding:padding=0,lineExt=0} = this;
  let segs = [];//this.rectangleSegments(width,height);
	let lines = [];
 // let numCols = 4;
//  let numRows = 4;
 // let invx = width/(numCols+1);
 // let invy = height/(numRows+1);
  let iwidth = width - padding;
  let iheight = height - padding;
  let hwd = iwidth/2;
  let hht = iheight/2;
//  let ix = invx-hwd;
 // let iy = hht-invy;
//  let iy = hht;
  let angle0 = 0.5*Math.PI;
  let angle1 = -0.5*Math.PI;
  let len = 5;//2 + Math.floor(r*4)*4;
	let deltaX = this.deltaX = iwidth/numCols;
	let deltaY = this.deltaY = iheight/numRows;
	let ix = (-hwd) + 0.5*deltaX;
	let yv = (-hht) + 0.5*deltaY;
//	debugger;
  for (let j=0;j<numRows;j++) {
    let xv = ix;
		for (let i=0;i<numCols;i++) {
			let ip = Point.mk(xv,yv);
			if (this.genGridSegments) {
				let cell = {x:i,y:j};
				let SL = this.genGridSegments(cell,ip);
				if (SL) {
					segs.push(...SL[0]);
				  lines.push(...SL[1]);
				}
		  } else {
				fanAngles.forEach( (angle) => {
					let seg = this.genSegment(ip,len,angle,sepNext);
					segs.push(seg);
					lines.push(this.genLine(seg,lineP,lineExt));
				});
			}
			//ix += invx;
			xv += deltaX;

		}	 
    yv += deltaY;
    //iy -= invy;
  }
	if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  //let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
 // lines.forEach((ln) => ln.stroke = clr);//'white');
  return [segs,lines];
}

/*
item.setupColorRandomizer = function (params) {
  this.setupShapeRandomizer('r',params);
  this.setupShapeRandomizer('g',params);
  this.setupShapeRandomizer('b',params);
}
  */

}
export {rs};




      