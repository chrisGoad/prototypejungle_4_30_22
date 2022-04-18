//active

const rs = function (item) {	


//item.randomStep = function (iCorrelated,x,y,istepx,istepy,imin,imax,i,j) {
	// pv = previous value from t-1
	// walkParams allows the step, max, and min to be set by a function on grid position and time
item.randomStep = function (iCorrelated,x,y,pv,istepx,istepy,istept,imin,imax,i,j,rg) {
	let {timeStep,params} = rg;
  let oneWay = 0;
	let min,max,stepx,stepy,lb,ub,rs,correlated,stept;;
	let firstT = (pv === undefined);
	let rp = (typeof params === 'function')?params:undefined;
	//let rp = params.walkParams;
	if (rp) {
		let params = rp(i,j,timeStep);
		//correlated = !params.noCorrelation;
		let pcor = params.correlated;
	  correlated = pcor || (pcor === undefined);
		min = params.min;
		max = params.max;
		stept = params.stept;
		if (correlated) {
			stepx = params.stepx;
			if (stepx) {
				stepx = params.stepx;
				stepy = params.stepy;
			} else {
				stepx = stepy = params.step;
			}
		}
	} else {
		correlated = iCorrelated;
		stepx = istepx;
		stepy = istepy;
		stept = istept;
		min = imin;
		max = imax;
	}
	if (!correlated) {
		rs =  min + Math.random() * (max - min);
    return rs;
	}
  let sumSteps,sumVals,tlb,tub;
	if (!firstT) {
		tub = pv + stept; // temoral upper bound;
		tlb = oneWay?pv:pv - stept;
		//debugger;
	}
	if (y !==  undefined) { // 2d case	
	  if (firstT) {
			sumSteps = stepx+stepy;
			sumVals = x+y;
			ub = 0.5 * (sumVals+sumSteps);
			lb = 0.5 * (sumVals-sumSteps);
		
		} else {
		  sumSteps = stepx+stepy;
			sumVals = x+y;
      let gub,glb;
		  gub = 0.5 * (sumVals+sumSteps); // an average ; geometric upper bound
		  glb = 0.5 * (oneWay?sumVals:sumVals-sumSteps);
			ub = Math.min(gub,tub);
			lb = Math.max(glb,tlb);
		}
			
	} else {
		if (firstT) {
		  ub = x + stepx;
		  lb = x - stepx;
		} else {
			let gub = x + stepx;
			let glb = x - stepx;
			ub = Math.min(gub,tub);
			lb = Math.max(glb,tlb);
		}
	}
	if (min > ub) {  //just march towards this target
		rs = ub;
		//rs = min;
	} else if (max < lb) {
		rs = lb;
		//rs = max;
	} else {
		ub = Math.min(ub,max);
		lb = Math.max(lb,min);
		rs =  lb + Math.random() * (ub - lb);
	}
  if (oneWay && pv && (rs < pv)) {
    debugger;
   // rs = pv;
  }
	return rs;
}
	
item.scalarRandomStep = function (correlated,c,pv,step,stept,min,max,i,j,rg) {
	return this.randomStep(correlated,c,undefined,pv,step,undefined,stept,min,max,i,j,rg);
}




item.dim2randomStep = function (correlated,x, y,pv, stepx,stepy,stept,min,max,i,j,rg) { 
	return this.randomStep(correlated,x,y,pv,stepx,stepy,stept,min,max,i,j,rg);
}

   

item.indexFor = function (numRows,i,j) {
	
  let idx = (this.backwards)?numRows*(numRows - i - 1) + j:i*numRows+j;//(numRows - i -1);
  return idx;
}



 // the bias function, if any, takes as input grid,i,j  
 // and returns two numbers: {weight,value} the weight to assign to random, and the value of the bias 

// needs rework. The biasFun should be computed into the values in genRandonGrid

item.valueAt = function (grid,i,j) {
  if (!grid) {
    debugger;
  }
 // debugger;
	//let params = grid.params;
	let {numRows,numCols,values,params} = grid;
  let rv =  grid.values[this.indexFor(numRows,i,j)];
 /* if (typeof params === 'function') {
     let pv = params(i,j);
     let bias = pv.bias;
     if (pv) {
       rv = rv + pv
     }
   }
 let biasFun;
  if (biasFun) {
		//debugger;
    let bfv = biasFun(grid,i,j);
    let {weight,value} = bfv;
    return weight * rv + (1 - weight)*value;
  } else {*/
  return rv;
 
}
   
    
item.genRandomGrid = function (tp,predecessor) {
	let {timeStep:itimeStep,values:prevValues,params,numRows,numCols} = predecessor;
  if ((tp == 'randomGridsForBoundaries')&&numRows) {
    numRows++;
    numCols++;
  }
  let walkParams;
	//debugger;
   //let kind,biasUp,numCols,numRows,step,stepx,stepy,stept,min,max,biasFun,constantFirstRow,
	  //   backwards,convergenceFactor,convergenceValue,walkParams,correlated;
  //  let walkParams;
  let {kind,biasUp,numRows:inr,numCols:inc,step,stepx:istepx,stepy:istepy,stept,min,max,biasFun,constantFirstRow:cFr,
	    backwards,convergenceFactor,convergenceValue,correlated:pcor} = params;
  if (typeof params === 'function') {
    walkParams = params;
  } else if (inr) {
    numRows = inr;
    numCols = inc;
  }
	let stepx,stepy,correlated;
  let oneWay = 0;
	let timeStep = prevValues?itimeStep+1:0;
	biasUp = (biasUp === undefined)?0:biasUp;
  const computeParams = function(i,j) {
   // debugger;
    let theParams = walkParams?walkParams(i,j,timeStep):params;
    if (theParams.numRows) {
      numRows = theParams.numRows;
      numCols = theParams.numCols;
		}
	  let pcor = theParams.correlation;
		correlated = pcor || (pcor === undefined);		
		min = theParams.min;
		max = theParams.max;
		step = theParams.step;
		stepx = theParams.stepx;
		stepy = theParams.stepy;
		stept = theParams.stept;
		biasUp = theParams.biasUp;
		if (biasUp === undefined) {
			biasUp = 0;
		}
		if (typeof step === 'number') {
			stepx = stepy = step;
		}
  }
  computeParams(0,0);  
	if (walkParams) {
		/*let wparams = walkParams(0,0,timeStep);
    if (wparams.numRows) {
      numRows = wparams.numRows;
      numCols = wparams.Cols;
		}
	  let pcor = wparams.correlation;
		correlated = pcor || (pcor === undefined);		
		min = wparams.min;
		max = wparams.max;
		step = wparams.step;
		stepx = wparams.stepx;
		stepy = wparams.stepy;
		stept = wparams.stept;
		biasUp = wparams.biasUp;
		if (biasUp === undefined) {
			biasUp = 0;
		}
		if (typeof step === 'number') {
			stepx = stepy = step;
		} */
	/*} else {
		correlated = pcor || (pcor === undefined);
		if (typeof step === 'number') {
			stepx = stepy = step;
		} else {
			stepx  = istepx;
			stepy  = istepy;
		}*/
	}
  let values = [];
  //debugger;
  let rs = {timeStep,values,numRows,numCols,params};
 // let rs = {timeStep,values,params};
  let n = numCols * numRows;
  values.length = n;
  let i = 0;
  let j = 0;
	let pv;
	//debugger;
  while (i < numCols) {
    let goingUp = i%2 === 0; //means  j is going up
		j = goingUp?0:numRows-1;
		let firstJ = true;
    while (goingUp?j < numRows: j>=0) {
		  if (walkParams) {
        computeParams(i,j);
      }
			let idx = this.indexFor(numRows,i,j);
			let pv = prevValues?prevValues[idx]:undefined;
			if ((i === 0) && cFr) {
				values[idx] === cFr;
				j++;
				continue;
			}					
			if ((i === 0) && (j === 0)) {
				let lb,ub,tlb,tub;
				if (pv) {
					//let biasUp = 0;//.4;
					tlb = pv - stept;
					tub = pv + stept;
					lb = Math.max(min,oneWay?pv:pv - stept);
					ub = Math.min(max,pv + stept);
				} else {
					lb = min;
					ub = max;
				//	values[idx] = 0.5*(min+max);
				}
				let vl =  lb + biasUp +Math.random() * (ub - lb);
				console.log('BIAS',biasUp,'i',i,'j',j,'min ',min,' max ',max,' tlb ',tlb,' tub ', tub,' lb ',lb,' ub ', ub,' vl ',vl);
				values[idx] = vl;
				//debugger;
				j++;
			//	return;
				continue;
			}
			let c;
			if (i === 0) {
				c = this.scalarRandomStep(correlated,values[j-1],pv,stepx,stept,min,max,i,j,rs);
			} else if (firstJ){
				let lftidx = this.indexFor(numRows,i-1,goingUp?0:numRows-1);
				c = this.scalarRandomStep(correlated,values[lftidx],pv,stepx,stept,min,max,i,j,rs);       
			} else {
				let lftidx = this.indexFor(numRows,i-1,j)
				let upidx = this.indexFor(numRows,i,goingUp?j-1:j+1)
				c = this.dim2randomStep(correlated,values[lftidx],values[upidx],pv,stepx,stepy,stept,min,max,i,j,rs);
			}
			values[idx] = c;
			j = goingUp?j+1:j-1;
			firstJ = false;
			}
    i++;
  }
 // debugger;
  //return values;
  return rs;
}
/*

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
	//	debugger;
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


item.stepRandomizer = function (tp,nm) {
	let wrnds = this[tp];
	let rg = wrnds[nm];
	let rm = this.randomizer;
	let rs  = rm.genRandomGrid(tp,rg);
	wrnds[nm]  = rs;
	return rs;
}
	
item.stepShapeRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForShapes',nm);
}
	

item.stepBoundaryRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForBoundaries',nm);
}



item.setupShapeRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForShapes',nm,params);
}


item.setupBoundaryRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForBoundaries',nm,params);
}        		
*/

}   
export {rs};
