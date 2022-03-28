//active
//core.require('/mlib/animation.js','/mlib/basics.js','/mlib/boundeddRandomGrids.js','/shape/rectangle.js','/line/line.js',
//core.require(
//function (addAnimationMethods,addBasicMethods,addRandomMethods,rectanglePP,linePP) {
const rs = function (item) {

/* theory of operation. 
The DROP algoritm drops sets of line segments at random positions on the canvas. If a given segment set lands on top of another, it is thrown away.     The segsets method library is used to build sets of segments. Metal is a typical example.

Let rs be the generator object. Sets of line segments (and lines) are created by the method rs.genSegments. This method has the form: 

rs.genSegments = function (p) {
...
return [segs,lines];
}

where p is a Point (the "anchor point"),   segs is an array of lineSegments, and lines an array of lines.  Elements of segs are added to the set of all segs dropped so far. As mentioned above, each time there is a new attempted drop, it is checked whether any of the new segs intersect any of those already dropped. If not, the drop succeeds, and the segs are added the already dropped array, and the lines are added to the set of lines to be displayed.  The relationship between segs and lines is up to the generator, but a typical case is where the ends of the lines are taken from the ends of the segs (so that they coincide, geometrically). A value of the form [segs:array(LineSegment),lines:array(Line)] is called a "segset" (even though lines are included as well as segs).

Parameters: dropTries sets how many unsuccessful drops are tolerated before the algorithm is terminated.





In fromEnds mode, segments are dropped in such a way as to extend an already existing tree. In this mode, illustrated by the dandelion, the current state consists of a tree of segments. Each segment in the tree is either interior, meaning that its end1 has been continued by one or more segments, or terminal, meaning that there is no continuing segment emerging from its end1. The end1 of such a segment is held in the array this.ends. 
*/
//core.require(function () {
//addBasicMethods(item);
//addRandomMethods(item);
let defaults = {maxDrops:Infinity,dropTries:5,maxLoops:Infinity};//,maxTriesPerEnd:20};
//defaults = {maxDrops:1000,dropTries:5,maxLoops:1000};

Object.assign(item,defaults);
/*adjustable parameters  */
//let topParams = 	{width:100,height:100,maxDrops:10,dropTries:5,maxLoops:100000,lineLength:10,backgroundColor:undefined,minSeparation:5,endLoops:20000,fromEnds:1,	onlyFromSeeds:0}

//Object.assign(item,topParams);

/* end */

/*for shapes */

/*
      
item.collides0 = function (point1,radius1,point2,radius2) {
  let p1x = point1.x;
  let p1y = point1.y;
  let p2x = point2.x;
  let p2y = point2.y;
  let minDist =  radius1 + radius2 + this.minSeparation;
  if (Math.abs(p2x - p1x) >=  minDist) {return false;}
  if (Math.abs(p2y - p1y) >= minDist) {return false;}
  let d = point1.distance(point2);
  return minDist >= d;
}



item.collides = function (point,radius) {
 // initializer(this);
  let {points,radii} = this;
  let n = points.length;
  for (let i=0;i<n;i++) {
    if (this.collides0(point,radius,points[i],radii[i])) {
      return true;
    }
  }
  return false
}

item.collidesWithSegments = function (point,radius) {
  let segments = this.segments;
  if (!segments) {
    return false;
  }
  let circle = geom.Circle.mk(point,radius*1.5);
  let ln = segments.length;
  for (let i=0;i<ln;i++) {
    let seg = segments[i];
    if (!seg) {
      continue;
    }
    let {end0,end1} = seg;
    let vec = end1.difference(end0);
    if (circle.intersectLine(end0,vec)) {
      return true;
    }
  }
}
*/


item.extendSegment = function (seg,ln) {

  let {end0,end1} = seg;
  let cnt= end0.plus(end1).times(0.5);
  let vec = end1.difference(end0);
  let len = vec.length();
  let nlen = ln+len;
  let hnvec = vec.times(nlen/(2*len));
  let e0 = cnt.difference(hnvec);
  let e1 = cnt.plus(hnvec);
  return LineSegment.mk(e0,e1);
}
  


item.genRandomPoint = function (rect) {
	//debugger;
  if (rect) {
    let {corner,extent} = rect;
    let lx = corner.x;
    let ly = corner.y;
    let x = Math.random() * extent.x + lx;
    let y = Math.random() * extent.y + ly;
    return Point.mk(x,y);
  }
  let {width,height} = this;
  let rx = (Math.random()-0.5) * width;
   let ry= (Math.random()-0.5) * height;
  return Point.mk(rx,ry);
}

// When in fromEnds mode, the segment has an "end" which is sepNext beyond end1, this end is where the next segment can be droppe
// normally sepNext is an invisible distance which prevents the detection of an intersection with the segment which is being continued.

item.genSegment = function (p,ln,angle,sepNext=0) {
  if (!p) {
    debugger;
  }
//item.genSegment = function (p,ln,angle,sep=0,sepNext=0,centered=1) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e0,e1,end,rs;
	e0 = p;
	p.isEnd = 1;
	end  = p.plus(vec.times(ln+sepNext));
	e1  =  p.plus(vec.times(ln));
	rs = LineSegment.mk(e0,e1);
	let g = p.generation;
	if (g === undefined) {
		g = 0;
		p.generation = 0;
	}
	rs.end = end;
	if (p.seed) {
		end.seed = p.seed;
	}
	end.generation = g+1;
	end.direction = angle;		
	rs.fromEnd = p;
  return rs;
}

item.insideCanvas = function (p) {
  let {width,height} = this;
	if ((!width)  || (!height)) {
		return true;
	}
  let hw = 0.5*width;  
  let hh = 0.5*height;  
  let {x,y} = p;
  return (-hw < x) && (x < hw) && (-hh < y) && (y < hh);
}


item.segmentIntersects = function (seg) {
  let {segments,width,height,exclusionZones,doNotCross,doNotExit} = this;
  let {end0,end1} = seg;
  if ((!this.insideCanvas(end0)) || (!this.insideCanvas(end1))) {
    return true;
  }
	if (exclusionZones) {
		let eln = exclusionZones.length;
		for (let i=0;i<eln;i++) {
			let zone = exclusionZones[i];
			if (zone.contains(end0) || zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotCross) {
		let eln = doNotCross.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotCross[i];
			if (zone.contains(end0) !== zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotExit) {
		let eln = doNotExit.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotExit[i];
			if ((!zone.contains(end0)) ||  (!zone.contains(end1))) {
				return true;
			}
		}
	}
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersects(segments[i]);
    if (ip) {
      return true;
    }
  }
}

item.intersectsSomething = function (g) {
  let {segments,width,height,ignoreBefore:ibf} = this;
  if (0 && ibf) {
    debugger;
  }
  let ln = segments.length;
  let st = (ibf)?ibf:0;
  for (let i=st;i<ln;i++) {  
	  let seg = segments[i];
		if (g.intersects(seg)) {
			return true;
		}
  }
}

item.activeEnds = function () {
  let ends = this.ends;
  let rs = [];
	let cnt = 0;
  ends.forEach((end) => {
		cnt++
    if (!(end.inactive)) {
      rs.push(end);
    }
  });
  return rs;
}

item.addSegmentAtThisEnd = function (end) {
 // let {maxDrops,dropTries,segments,lineLength,ends,shapes,fromEnds,numRows,randomGridsForShapes} = this;
 // let {maxDrops,segments,lineLength,ends,shapes,numRows,randomGridsForShapes,maxTriesPerEnd} = this;
  let {maxDrops,segments,lineLength,ends,shapes,numRows,randomGridsForShapes,dropTries} = this;
  if (!this.genSegments) {
    return;
  }
  let tries = 0;
 // let numDropped = 0;
	let cell,rvs;
	if (numRows && randomGridsForShapes) {
	  cell = this.cellOf(end);
    rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	}
  while (true) {
		let segsAndLines = this.genSegments(end,rvs);
		let ifnd = 0;
		let sln = 0
		if (segsAndLines) {
			let [segs,lines] = segsAndLines;
			sln = segs.length;
			for (let i=0;i<sln;i++) {
				let seg = segs[i];
				if (this.segmentIntersects(seg)) {				
					ifnd = true;
					break;
				}
			}
		} else {
			ifnd = 1;
		}
		if (ifnd) {
			tries++;
			//if (tries === maxTriesPerEnd) {
			if (tries === dropTries) {
        console.log('inactivated - could not find continuation');
       //debugger;
        end.inactive = 1;
				return 0;
			}
		} else {
			this.installSegmentsAndLines(segsAndLines);
			return 1;  
    } 
  }
}

item.randomArrayElement = function (a) {
	let ln = a.length;
	let rni = Math.floor(ln*Math.random());
	return a[rni]
}

item.lastArrayElement = function (a) {
  let	ln = a.length;
	return a[ln-1]
}

item.randomDirection = function (n) {
	if (n) {
	  return 2*Math.PI*(Math.floor(n*Math.random())/n);
	} else {
		return 2*Math.PI*Math.random();
	}
}


item.addSegmentAtSomeEnd = function () {
  let {extendWhich} = this;
  while (true) {
    let ae = this.activeEnds();
    let end;
		let ln = ae.length;
		if (ln > 0) {
      if (extendWhich === 'last') {
			  end = this.lastArrayElement(ae);
      } else if (extendWhich === 'random') {
		  	end =  this.randomArrayElement(ae);
      } else {
        end = ae[0];
      }
			let ars = this.addSegmentAtThisEnd(end);
      if (ars) {
        return ars;
      }
		} else {
      return "noEndsLeft";
    }
	}
}

item.addSegmentsAtEnds = function () {
  let maxEndTries = 100;
  let tries = 0; 
  let loop = 0;
	let maxDrops = this.maxDrops;
  while (this.numDropped  < maxDrops) {
    loop++;
    let ars = this.addSegmentAtSomeEnd();
    if (ars === 'noEndsLeft') {
      return ars;
    }
		// new 11/8
    if (!ars) {
     // tries++;
     // if (tries >= maxEndTries) {
     return 'triesExhausted';
     // }
    }
  }
  //debugger;
  return ['loopsExceeded',this.numDropped];
}
       

item.addRandomSegment = function () {
  let p = this.genRandomPoint(); 
  //debugger;
  let segsAndLines = this.genSegments(p);
  let ifnd = 0;
  let sln=0;
  if (segsAndLines) {
    let [segs,lines] = segsAndLines;
    let rect;
    sln = segs.length;
    for (let i=0;i<sln;i++) {
      let seg = segs[i];
      if (this.intersectsSomething(seg)) {
        return undefined;
      }
    }
    this.installSegmentsAndLines(segsAndLines);
    return true;

  } else {
    return undefined;
  }
}
    
item.addNrandomSegments = function (n) {
  let {maxDrops,dropTries,maxLoops,segments,lineLength,ends,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genSegments) {
    return;
  }
  let tries = 0;
  let numAdded = 0;
  while (numAdded < n) {
    if (fromEnds) {
      let ae = this.addSegmentsAtEnds();
      if (ae[0] === 'loopsExceeded') {
         return numAdded;
      } else {
        numAdded++
      }
      continue; //added return 11/21
    }
		//let ifnd = this.addRandomSegment();
		let segsAdded = this.addRandomSegment();
		if (segsAdded) {
      tries = 0;
      numAdded++;
    } else {  
			tries++;
			if (tries >= 50) {
				debugger;
			}	
      if (tries >= dropTries) {
				debugger;
				return numAdded;
			}
    }
  }
  return numAdded;
} 

item.addRandomSegments = function () {
  let {maxDrops,dropTries,maxLoops,segments,lineLength,ends,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genSegments) {
    return;
  }
  this.numDropped = 0;
  let tries = 0;
  let endsVsNew = 1;
  let loops = 0;
	//debugger;
  while (loops < maxLoops) {
    loops++;
    if (fromEnds) {
      if (Math.random() < endsVsNew) {
        let ae = this.addSegmentsAtEnds();
        if (ae[0] === 'loopsExceeded') {
           return;
        }
      }
			return; //added return 11/21
    }
	//	let ifnd = this.addRandomSegment();
		let segsAdded = this.addRandomSegment();
		if (segsAdded) {
      tries = 0;
			if (this.numDropped >= maxDrops) {
				return this.numDropped;
			}    
    } else {  
			tries++;
			if (tries >= dropTries) {
				debugger;
				return this.numDropped;
			}
    }
  }
}


/*
item.genLine = function (lsgOrP0,p1,ext) {
  let end0,end1;
  if (p1) {
    end0 = lsgOrP0;
    end1 = p1;
  } else {
    end0= lsgOrP0.end0;
    end1= lsgOrP0.end1;
  }
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
	if (this.genPoint3d) {
		let e03d = this.via3d(end0);
		let e13d = this.via3d(end1);
    line.setEnds(e03d,e13d);
	} else {
    line.setEnds(end0,end1);
	}
  return line;
}

 
item.via3d = function (p) {
	if (this.genPoint3d) {
		let p3d = this.genPoint3d(p);
		let rs = this.camera.project(p3d);
		return rs;
	}
  return p;
  
}
*/
item.installLine = function (line) {
	if (line.period) {
	  debugger;
	}
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}

item.updateShapes = function () {
	if (!this.shapeUpdater) {
		return;
	}
	let {shapes} = this;
	let ln = shapes.length;
	for (let i=0;i<ln;i++) {
		let shp = shapes[i]
		this.shapeUpdater(shp);
	}
}
	
	
item.installSegmentsAndLines = function (seglines) {
  let {segments,ends} = this;
  let ln = segments.length;
  let [segs,lines] = seglines;
//	if (seglines.isRectangle) {
	if (!Array.isArray(segs)) {
		let rect = segs;
		let rectShape = lines;
		segments.push(rect);
		this.installLine(rectShape);
		return;
	}

  segs.forEach( (seg) => {
		seg.number = ln;
		let {end0,end1,end} = seg;
		if (!end0) {
			debugger;
		}
		end0.end0of = ln;
		end1.end1of = ln;
		if (end) {
		  end.isEndOf = ln;
		}
    segments.push(seg);
    if (end) {
      ends.push(end);
      end.isEnd = 1;
    }
		let fre = seg.fromEnd;
    if (fre) {
      fre.inactive = 1;
    }
		ln++;
  });
  lines.forEach( (line) => this.installLine(line));
}

item.removeSegmentsAndLines = function (n) {
	let {segments,shapes} = this;
	let ln = segments.length;
	let sln  = shapes.length;
	console.log('ln sln',ln,sln);
	let nln = Math.max(0,ln-n);
	segments.length = nln;
	for (let i = nln;i<ln;i++) {
		let shp = shapes[i];
		if (shp) {
		  shp.remove();
		}
	}
	shapes.length = nln;
}


item.cellOf  = function (p) {
  let {x,y} = p;
  let {width,height,numRows,numCols} = this;
  let hw = width/2;
  let hh = height/2;
  let ix = Math.floor(((x+hw)/width) * numCols);
  let iy = Math.floor(((y+hh)/height) * numRows);
  return {x:ix,y:iy};
}

item.segsToSeed = function (segs) {
  let lines = segs.map((sg) => {
	  let line = this.genLine(sg);
		//line.show();
		return line;
	});	
	return [segs,lines];
}

item.concatEachArray = function (ays) {
	let c0 = [];
	let c1 = [];
	ays.forEach( (a) => {
	 let [a0,a1]= a;
	 c0.push(...a0);
	 c1.push(...a1);
	 //c0 = c0.concat(a0);
	 //c1 = c1.concat(a1);
  });	 
	 return [c0,c1];
}
/*
item.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  
*/

item.initializeDrop = function (doDrop=1) {
  let {rectangles,initialSegments,genSeeds} = this;
 /* this.initProtos();
  this.addBackStripe();
  this.addBackground();*/
  this.segments = [];
	this.numDropped = 0;
  this.ends = [];
  this.set('shapes',core.ArrayNode.mk());
  if (initialSegments) {
    let isegs = this.initialSegments();
    this.installSegmentsAndLines(isegs);
  }
	if (genSeeds) {
    let isegs = this.genSeeds();
    this.installSegmentsAndLines(isegs);
  }
  if (doDrop) {
		this.addRandomSegments();
		//debugger;
	}
}
item.inAzone = function (zones,p) {
	if (!zones) {
		return 0;
	}
	let fnd = false;
	let eln = zones.length;
	for (let i=0;i<eln;i++) {
		let zone = zones[i];
		if (zone.contains(p)) {
			return 1;
		}
	}
	return 0;
}


item.pointsFromCircleDrops = function () {
	let {zone,exclusionZones} = this;
	let pnts = [];
	this.segments.forEach( (seg) => {
	  if (geom.Circle.isPrototypeOf(seg)) {
			let p = seg.center;
			if (zone) {
				if (!zone.contains(p)) {
					return;
				}
			}
			
			let inex = this.inAzone(exclusionZones,p);
			if (!inex) {
				pnts.push(p);
			}
	  }
	});
	return pnts;
}
}
export {rs};


      
