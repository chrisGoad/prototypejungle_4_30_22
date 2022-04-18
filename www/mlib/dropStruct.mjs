

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
// was genSegmentsFan
item.genFan = function (lineP,p,clr,params) {
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




      