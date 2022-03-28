//active

import {rs as rectPP} from '/shape/rectangle.mjs';
//import {rs as rectPP} from '/shape/rectangle.js','/shape/textOneLine.js',function (rectPP,textPP) {
import {rs as textPP} from '/shape/textOneLine.mjs';
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;a
const rs = function (item) {

item.setName = function (name,variant,jsonName) {
  debugger;
  let nameWithV = name+(variant?'_v_'+variant:'');
  let nameWithoutV= name;
	let theName = this.name = nameWithV+(this.signIt?'_s':'');
  this.variant = variant;
	core.vars.whereToSave = theName;
	//let theName = jsonName?jsonName:name+(variant?'_v_'+variant:'');
	let pathPart = jsonName?jsonName:nameWithV;
	this.path = `json/${pathPart}.json`;
}


item.signIt = 0;

item.addSignature = function() {
	let {width,height,sigScale,vSigScale,sigColor='white',sigX=0.45,sigY,sigRectX,sigRectY,backStripeWidth:bkw,backStripeHeight:bkh,backStripePadding:bkp} = this;
	debugger;
    
  this.textP = textPP.instantiate();
	if (!bkw) {
    if (!bkp) {
      console.log("Error: either backStripeWidth of backStripePadding need to be specified for a signature");
      debugger;
      return;
    }
		bkw = width + bkp;
		bkh = height + bkp;
	}
  let square = width === height;
  let vertical = bkh > 1.4* bkw;
  if (!sigY) {
    sigY = square?(vertical?0.27:0.45):.45;
  }
  if (!sigScale) {
    sigScale = (bkw === bkh)?bkw/700:bkw/1000;
  }
  if (!vSigScale) {
    vSigScale = bkh/1000;
  }
	let sigC = this.set('sigC',svg.Element.mk('<g/>'));
/*	if (sigRectX) {
	  let sigR = sigC.set('sigR', this.sigRectP.instantiate());
	  sigR.show();
		sigR.width = 0.05*width;
	  sigR.height = 0.05*width;
	}*/
	let sig = sigC.set('sig',this.textP.instantiate())
	sig.show();
	sig.text = 'C.G.';
	sigC.moveto(Point.mk(sigX*bkw,sigY*bkh));
	sig.stroke = sigColor;
	sig['font-family'] = 'Trattatello';
	sig['font'] = 'fantasy';
	//sig['font-size'] = "30"	;
	sig.setScale(vertical?vSigScale:sigScale);
}

// add a stripe around the image, to control the size of the jpg when saved
item.addFrame = function () {
	debugger;
	let {frameStroke:frs,frameFill:frf,framePadding:frp,framePaddingX:frpx,framePaddingy:frpy, 
	frameWidth,frameHeight,frameStrokeWidth:fswd, width,height,frameVisible,framePos:pos,signIt} =  this;
  let frpd = frp!==undefined;
	if ( (!frpd) && (!frameWidth)) {
		return;
	}
  if (!frs) {
    frs = 'rgb(2,2,2)';
   // frs = 'white';
  }
  fswd = fswd?fswd:2;
  let frr = this.set('brect',rectPP.instantiate());
 
  frr.fill = frf?frf:'transparent';
	/*if (frameVisible) {
		frr['stroke-width'] = frameVisible;
		frr.stroke = 'white';
	} else {*/
	frr.stroke = frs;
  frr['stroke-width'] = fswd;

	if (frameWidth) {
		frr.width = frameWidth;
		frr.height = frameHeight;
	} else {
		let frPx = frpx?frpx:(frpd?frp:0.1*width);
		let frPy = frpy?frpy:(frpd?frp:0.1*height);
		frr.width = width + frPx;
		//frr.width = 20;
		frr.height = height + frPy;
		//frr.height = 10;
	}
	if (pos) {
    console.log('Stripe Pos',pos.x,pos.y);
		frr.moveto(pos);
	}
  frr.update();
	frr.show();
}


item.addBackground = function () {
	let {backgroundColor:bkc,width,height,backgroundPadding:bkp=0} =  this;
  debugger;
	if (!bkc) {
		return;
	}
	//core.assignPrototypes(this,'backgroundRectP',rectPP);
  this.backgroundRectP = rectPP.instantiate();

	this.backgroundRectP['stroke-width'] = 0;
	this.backgroundRectP.fill = bkc;
	//let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
  let bkr = this.set('backRect',this.backgroundRectP.instantiate());
  bkr.width = width+bkp;
	bkr.height = height+bkp;
  //bkr.width = backgroundWidth?backgroundWidth:width + backgroundPadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
	
}


item.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}



item.genLine = function (sg,lineP,ext=0) {
  let {end0,end1} = sg;
  if (!lineP) {
    debugger;
  }
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
	//let theLineP = lineP?lineP:this.lineP;
	let theLineP = lineP;
  let line = theLineP.instantiate();
  if (!line.setEnds) {
    debugger;
  }
  if (this.genPoint3d) {
		let e03d = this.via3d(end0);
		let e13d = this.via3d(end1);
    line.setEnds(e03d,e13d);
	} else {
    line.setEnds(end0,end1);
	}
  return line;
}


item.installLine = function (line) {
  let lines =  this.lines;
	if (!lines) {
		lines = this.lines =this.set('lines',core.ArrayNode.mk());
	}
  lines.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}

item.initBasis = function () {
	if (this.initProtos) {
	  this.initProtos();
	}
	this.addBackground();
	this.addFrame();
//  this.set('shapes',core.ArrayNode.mk());

}

// a utility
const numPowers = function(n,p) {
	if (n === 0) {
		return 0;
	}
	if (n === p) { 
	  return 1;
	}
	if (n%p === 0) {
		return 1 + numPowers(n/p,p);
	}
	return 0;
}
item.numPowers = function (n,p) {
	return numPowers(n,p);
}
//cells and coordinates, based on width,height,numRows, numCols

item.point2cell = function (p) {
    let {width,height,numRows,numCols} = this;
    let {x,y} = p;
    let hw = 0.5*width;
    let hh = 0.5*height;
    let cx = Math.floor((x -hw)/numCols);
    let cy = Math.floor((y -hh)/numRows);
    return {x:cx,y:cy};
}



item.assignValueToPath = function (path,value) {
  let spath = path.split('/');
	let ln = spath.length;
	let cvl = this;
	for (let i=0;i<ln-1;i++) {
		let pel = spath[i];
		let nvl = cvl[pel];
		if (!nvl) {
			nvl = {};
			cvl[pel] = nvl;
		}
		cvl = nvl;
	}
	let lst = spath[ln-1];
	//if (cvl[lst] === undefined) {
	  cvl[lst] = value;
	//}
}
	
item.assignValues = function (vls) {
	vls.forEach( (vl) => {
		let [path,value] = vl;
		this.assignValueToPath(path,value);
	});
}
		
item.getTheState = function (cb) {
  let {path} = this;
  debugger;
  core.httpGet(path, (error,json) => {
    debugger;
    let state = JSON.parse(json);
    this.assignValues(state);
//    this.initializeGrid();
    if (cb) {
      cb();
    }
  });
}

item.saveTheState = function (cb) {
  let {path} = this;
  debugger;
  let state = this.computeState?this.computeState():null;
  if (state) {
    let jsn = JSON.stringify(state);
    core.saveJson(path,jsn,function (err,rs) {
      if (cb) {
        cb();
      } else {
        debugger;
      }
    });
  }
}

item.horizontalize = function (p,noFrame) {
  if (p.width) {
    this.height = p.width;
    this.width = p.height;
  }
  this.backStripeWidth = p.backStripeHeight;
  this.backStripeHeight = p.backStripeWidth;
  if (noFrame) {
    this.backStripeVisible =0;
  }
  debugger;
}
item.pointsTo3dAndBack = function (pnts) {
  debugger;
	let rs = [];
	pnts.forEach((p) => {
		let p3d = this.genPoint3d(p);
		//let p3d = this.toPoint3d(p);
		if (p3d && (p3d.category !== 'notOnSurface')) {
			let ppnt = this.camera.project(p3d);
			rs.push(ppnt);
		} 
	});
	return rs;
}


}
export {rs};
 
