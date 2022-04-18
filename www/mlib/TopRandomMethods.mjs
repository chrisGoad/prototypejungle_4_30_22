//activeMe


import {rs as addRandomMethods} from '/mlib/dim2dWalker.mjs';
const rs = function (item) {	


addRandomMethods(item);

item.initRandomizer = function () {
	let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	  addRandomMethods(rm);
	  if (!this.randomGridsForShapes) {
			this.randomGridsForShapes = {};
		}
	  if (!this.randomGridsForBoundaries) {
	    this.randomGridsForBoundaries = {};
		}
	}
	return rm;
}
item.setupRandomizer = function (tp,nm,params) {
	if (nm === 'pattern') {
		debugger;
	}
	let kind = params.kind =  (tp === 'randomGridsForBoundaries')?'boundaries':'cells';
	if (!params.numRows) {
		params.numRows = kind==='boundaries'?this.numRows+1:this.numRows;
		params.numCols = kind==='boundaries'?this.numCols+1:this.numCols;
	}
	let rm = this.initRandomizer();
	let rnds = this[tp];
  let rs  = rm.genRandomGrid(tp,{timeStep:0,params});
	rnds[nm]  = rs;
	return rs;
}
//interp should be 'From' or 'To'
item.copyRandomState = function (rnds) {
  let rs = {};
  for (let p in rnds) {
		let orig = rnds[p];
    let vls = orig.values;
    if (vls) {
			let cp = {};
			cp.timeStep = orig.timeStep;
			cp.params = orig.params;
		  cp.values = vls.slice();
		  rs[p] = cp;
    }
  }
  return rs;
}
item.saveRandomState = function (tp,interp) {
 //debugger;
	let rnds = this[tp];
  let rs = this.copyRandomState(rnds);
  rnds['interpolate'+interp] = rs;
  return rs;
}

item.interpolateRandomValues = function(s0,s1,fr) {
  if (fr > 0.9) {
  //   debugger;
  }
	let vls0 = s0.values;  
	let vls1 = s1.values;
	let ln = Math.min(vls0.length,vls1.length);
  console.log('ln',ln);
	let vrs = [];
	for (let i=0;i<ln;i++) {
	  let v0 = vls0[i];
		let v1 = vls1[i];
		let v = v0 + fr*(v1-v0);
		vrs.push(v);
  } 
  return vrs;
}




item.interpolateBetweenRandomStates = function (wrnds,nm,fr) {
  let i0 = wrnds.interpolateFrom[nm];
  let i1 = wrnds.interpolateTo[nm];
  let vls = this.interpolateRandomValues(i0,i1,fr);
	let rg = wrnds[nm];
  rg.values = vls;
}

item.stepRandomizer = function (tp,nm) {
  let {timeStep,interpolateSteps:isteps,numTimeSteps} = this;
	let wrnds = this[tp];
	let rg = wrnds[nm];
  if (wrnds.nowInterpolating) {
    //debugger;
    let its = this.interpolateFromStep;
    let fr = (timeStep - its)/(numTimeSteps-its);
    console.log('ts ',timeStep,'fr ',fr);
    this.interpolateBetweenRandomStates(wrnds,nm,fr);
  
    return;
  }
  let rm = this.randomizer;
 // debugger;
  if (isteps) {
    if (timeStep === 0) {
      debugger;
    }
    let fr = (timeStep%isteps)/isteps;
    let time0 = timeStep === 0;
    let ifromC,ifrom;
    if (!wrnds.interpolateTo) {
      wrnds.interpolateTo = {};
    }
    if (fr === 0) {
      if (time0) {
        //let rs  = rm.genRandomGrid(rg);
        ifromC = this.saveRandomState(tp,'From');
        ifrom = ifromC[nm];
      }  else {
         ifrom = wrnds.interpolateFrom[nm] = wrnds.interpolateTo[nm];
      }
      wrnds[nm] = ifrom;
	    let rs  = rm.genRandomGrid(tp,rg);
      wrnds.interpolateTo[nm] = rs;
    } else {
      this.interpolateBetweenRandomStates(wrnds,nm,fr);
    }
    return;
  }
	let rs  = rm.genRandomGrid(tp,rg);
	wrnds[nm]  = rs;
	return rs;
}
	
item.stepShapeRandomizer = function (nm) {
 // debugger;
  return this.stepRandomizer('randomGridsForShapes',nm);
}
	

  

item.stepBoundaryRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForBoundaries',nm);
}



item.setupShapeRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForShapes',nm,params);
}

item.setupRandomGridForShapes = function (nm,params) {
  return this.setupRandomizer('randomGridsForShapes',nm,params);
}



item.setupColorRandomizer = function (params) {
  this.setupShapeRandomizer('r',params);
  this.setupShapeRandomizer('g',params);
  this.setupShapeRandomizer('b',params);
}

item.setupBoundaryRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForBoundaries',nm,params);
}        		

item.setupRandomGridForBoundaries = function (nm,params) {
  return this.setupRandomizer('randomGridsForBoundaries',nm,params);
}        		

  

 
item.randomValueAtCell = function (randomGrids,prop,i,j) {
	if (!randomGrids) {
		return;
	}
	let randomValues  = randomGrids[prop];
	if (!randomValues) {
		return;
	}
  let {randomizer} = this;  
	let rs = randomizer.valueAt(randomValues,i,j);
	return rs;
}
    

item.randomValuesAtCell = function (randomGrids,i,j) {
	if (!randomGrids) {
		return;
	}
	let randomizer = this.initRandomizer();
  //let {randomizer} = this;  
	let rs = {}; 
	for (let prop in randomGrids) {
	  let randomValues = randomGrids[prop];
    if ((prop !== 'interpolateTo') && (prop !== 'interpolateFrom') && (prop !== 'nowInterpolating')) {
	    rs[prop] = randomizer.valueAt(randomValues,i,j);
    }
	}
	return rs;
}

item.rvsAtCell = function (cell) {
	return this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
}   


item.randomizerColor = function (p) {
  let {randomGridsForShapes} = this;
  let angle;
  let cell = this.cellOf(p);
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} =rvs;
  return {r,g,b}
}

item.randomColor = function () {
  const rrgb = () => {
    return 0 + Math.floor(Math.random()*154);
  }
  let r = rrgb();
  let g = rrgb();
  let b = rrgb();
  return {r,g,b}
}

}

export {rs};


