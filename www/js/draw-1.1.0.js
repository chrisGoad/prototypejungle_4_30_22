//import * as core from "/js/core-1.1.0.min.js";
import * as core from "/js/core-1.1.0.js";
//import * as geom from "/js/geom-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.js";
//import * as dom from "/js/dom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.js";
/*import * as fb from "/js/firebase-1.1.0.min.js";
import * as graph from "/js/graph-1.1.0.min.js";
import * as ui from "/js/ui-1.1.0.min.js";
import * as tree from "/js/tree-1.1.0.min.js";
import * as lightbox from "/js/lightbox-1.1.0.min.js";
import * as catalog from "/js/catalog-1.1.0.min.js";*/
const {html,svg,SvgElement} = dom;

const {Point,Rectangle,Transform,LineSegment} = geom;

export const vars = core.ObjectNode.mk();

/*global svgRoot controlled controlActivity controlCenter draggedControlName
draggedCustomControlName clickedInBox protoCustomBox controlCenter: true */


/*
 mouse handling
 
 
 Principle variables:
   
   iselnd: the object that has been selected. This might be a shape (circle etc), or it might be a control box
      There are two kinds of control boxes: the resizer boxes (blue), and the custom control boxes (yellow)
   controlled: the object being controlled (dragged resized etc). If a circle is being resized, for example, controlled will be the circle
     and iselnd will be the little blue box which the user is moving around for the resize
   vars.selectedNode This global is used from other modules. controlled is often selectedNode, but might also be its prototype (causing all instances
                     to be adjusted)
   controlActivity: the kind of control being exercised when the mouse is down. Options:  undefined (when no particular activity has been engaged)
                     draggingResizeControl, draggingCustomControl, shifting (meaning dragging controlled, as when dragging a circle around)
                     and panning
    There are  two other variables which affect the mode of operation: connectMode, and replace
    These are meaningful when shifting, 
                      
properties of a node relevant to mouse control. undraggable,unselectable,resizable


There is also a mode which affects the behavior of mouseDown:   if vars.addToPointSeries is defined,
 clicks do not select objects, as usually happens. Instead, vars.addToPointSeries is called on the clicked point. Escape terminates
*/

const controlActivity = 'panning';
//let SvgRoot
const SvgRoot = dom.SvgRoot;
let cZoomFactor;

let draggedControlName = 0;

const refresh = function (doFit) {
 
  dom.fullUpdate();
}
SvgRoot.visibleBounds = function () {
  let cn = this.contents;
  let cxf = cn.transform;
  let wd = this.__container.offsetWidth;
  let ht = this.__container.offsetHeight;
  let screenBounds = Point.mk(wd,ht).toRectangle();
  let tbnds = screenBounds.applyInverse(cxf);
  return tbnds;
}


SvgRoot.setZoom = function (trns,ns) {
  let cntr = Point.mk(this.width()/2,this.height()/2);// center of the screen
  let ocntr = trns.applyInverse(cntr);
  let ntx,nty,tr;
  trns.scale = ns;
  ntx = cntr.x - (ocntr.x) * ns;
  nty = cntr.y - (ocntr.y) * ns;
  tr = trns.translation;
  tr.x = ntx;
  tr.y = nty;
 // updateBoxSize();
}
  
  
const zoomStep = function (factor) {
	//debugger;
  let trns = dom.svgMain.contents.transform;
  if (!trns) {
    return;
  }
  let s = trns.scale;
  core.log("svg","zoom scaling",s);
  //updateControlBoxes('zooming');
  dom.svgMain.setZoom(trns,s*factor);
  //adjustGrid();
  dom.svgDraw();
}
  
let nowZooming = false;
let zoomFactor = 1.1;
let zoomInterval = 150;
const zoomer = function zoomer() {
  if (nowZooming) {
    zoomStep(cZoomFactor);
    setTimeout(zoomer,zoomInterval);
  }
}


const startZooming = function () {
  core.log("svg","start zoom");
  cZoomFactor = zoomFactor;
  if (!nowZooming) {
    nowZooming = true;
    zoomer();
  }
}
  
const startUnZooming = function () {
  cZoomFactor = 1/zoomFactor;
  if (!nowZooming) {
    nowZooming = true;
    zoomer();
  }
}

const stopZooming = function() {
	//debugger;
  core.log("svg","stop zoom");
  nowZooming = false;
}
  

const selectCallbacks = [];

  
// this is the nearest ancestor of the hovered object which has a forHover method
 
 // the node currently hovered over
 




const mouseMove = function (svgroot,cp)  {
	
  let pdelta,tr,delta,dr,s,npos,drm,xf;
	if (!cp) {
		debugger;//keep
	}

  /*if (nowRecording) {
    addToHistory('move',cp,ovr);
  }*/
  xf = svgroot.contents.transform;
  
  if (!xf) {
    return;
  }
  if (controlActivity === 'panning') {
		if (!svgroot.refPoint) {
			debugger;//keep
			return;
		}
    pdelta = cp.difference(svgroot.refPoint);
    tr = svgroot.contents.getTranslation();
    s = svgroot.contents.transform.scale;
    tr.x = svgroot.refTranslation.x + pdelta.x;// / s;
    tr.y = svgroot.refTranslation.y + pdelta.y;//
    core.log("svg","drag","doPan",pdelta.x,pdelta.y,s,tr.x,tr.y);
  //  adjustGrid();
    dom.svgMain.draw();
    return;
  }
 
}



const mouseMoveListener = function (svgroot,e) {
  e.preventDefault(); 
  let cp = svgroot.cursorPoint(e);
	if (!cp) {
		debugger;//keep
	}
  //let ovr = overNode(e);
  mouseMove(svgroot,cp);
  
}




let updateOnNextMouseUp = true;

let draggingOver;
let dragOverHighlighted;

const mouseUpOrOutListener = function (svgroot,e) {
  let cp;
  cp = svgroot.cursorPoint(e);
  mouseUpOrOut(svgroot,cp,e);//e.type === 'mouseup');
}

const mouseUpOrOut = function (svgroot,cp,e) {
  let svActivity = controlActivity;
  let svControlled = controlled;
//console.log('ca',controlActivity,'c',controlled);
   let isMouseUp = e.type === 'mouseup';
   /*if (nowRecording) {
    addToHistory('up',cp);
  }*/
  let xf,clickedPoint;
  xf = svgroot.contents.transform;
  clickedPoint = xf.applyInverse(cp);// in coordinates of content
  delete svgroot.refPoint;
  delete svgroot.refPos;
  delete svgroot.dragee;
  delete svgroot.refTranslation;
  core.log('control','controlActivity set to ',controlActivity);
 // showControl();
}

let connectMode = false;

const mouseDownListener = function (svgroot,e) {
	//debugger;
 if (vars.hideFilePulldown) {
    vars.hideFilePulldown();
  }
  core.log('control','MOUSEDOWN');
  //svgRoot = svgroot;

  e.preventDefault();
  let cp = svgroot.cursorPoint(e);
  //let clickedNode = overNode(e,'mousedown');
  mouseDown(svgroot,cp);//clickedNode);
}
let draggingInDiagram,draggingNoDiagram,controlled; //remove
const mouseDown = function (svgroot,cp,clickedNode) {
  //let selectionCandidate,xf,dra,rfp,clickedPoint,diagram;
  let xf,dra,rfp,clickedPoint,diagram;
  /*if (nowRecording) {
    addToHistory('down',cp,clickedNode);
  }*/
  draggingOver = undefined;
  connectMode = false;
  svgroot.refPoint = cp; // refpoint is in svg coords (ie before the viewing transformation)
  core.log('control',svgroot.refPoint);
  xf = svgroot.contents.transform;
  clickedPoint = xf.applyInverse(cp);// in coordinates of content
  svgroot.clickedPoint = clickedPoint;// in coordinates of content
	svgroot.refTranslation = svgroot.contents.getTranslation().copy();
}


SvgRoot.activateInspectorListeners = function () {
  let cel,thisHere;
  if (this.inspectorListenersActivated) {
    return;
  }
  cel = this.__element;
  thisHere = this;
  cel.addEventListener("mousedown",function (e) {mouseDownListener(thisHere,e);});     
  cel.addEventListener("mousemove",function (e) {mouseMoveListener(thisHere,e);});     
  cel.addEventListener("mouseup",function (e) {mouseUpOrOutListener(thisHere,e);});
  cel.addEventListener("mouseleave",function (e) {mouseUpOrOutListener(thisHere,e);});
  cel.addEventListener("dragover",(e) => {dragOverListener(this,e);},false);
  cel.addEventListener("drop",function (e) {dropListener(thisHere,e);});//{once:true});
  this.inspectorListenersActivated = true;
} 
   
// when inspecting dom, the canvas is a div, not really a canvas
SvgRoot.addButtons = function (navTo) {
  let plusbut,minusbut,navbut,div;
  this.navbut = navbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">'+navTo+'</div>');
  navbut.__addToDom(div);
  div = this.__container;
  this.plusbut = plusbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">+</div>');
  this.minusbut = minusbut = html.Element.mk('<div class="button" style="position:absolute;top:0px">&#8722;</div>');
  plusbut.__addToDom(div);
  minusbut.__addToDom(div);
  this.initButtons();
  }
  

SvgRoot.positionButtons = function (wd) {
  this.plusbut.$css({"left":(wd - 50)+"px"});
  this.minusbut.$css({"left":(wd - 30)+"px"});
  this.navbut.$css({"left":"0px"});
}

SvgRoot.initButtons = function () {
  this.plusbut.addEventListener("mousedown",startZooming);
  this.plusbut.addEventListener("mouseup",stopZooming);
  this.plusbut.addEventListener("mouseleave",stopZooming);
  this.minusbut.addEventListener("mousedown",startUnZooming);
  this.minusbut.addEventListener("mouseup",stopZooming);
  this.minusbut.addEventListener("mouseleave",stopZooming);
}

export {refresh,zoomStep};


/* global mpg:true */
// things used by each of the editors (editor,code_editor,catalog_editor)
 
let disableGray = "#aaaaaa";

const enableButton1 =function (bt,vl,disableColor) {
  if (bt) {
    bt.disabled = !vl;
    bt.$css({color:vl?"black":(disableColor?disableColor:disableGray)});
    
  }
}

const boxButton = function (bt,vl) {
   bt.$css({border:vl?"red solid":"none"});
}

const enableButton = function (bt) {
    enableButton1(bt,true);
}

const disableButton = function (bt) {
  enableButton1(bt,false);
}


const disableButtonRed = function (bt) {
  enableButton1(bt,false,"red");
}

const setClickFunction = function (bt,fn) {
  if (bt) {
    bt.$click(function () {
      if (!bt.disabled) {
        fn();
      }
    });
  }
}
 
const enableTreeClimbButtons = function() {
  let isc = tree.selectionHasChild();
  let isp = tree.selectionHasParent();
  upBut.$show();
  topBut.$show();
  downBut.$show();
  enableButton1(upBut,isp);
  enableButton1(downBut,isc);
}


const activateTreeClimbButtons = function () {
setClickFunction(topBut,function () {
  let top = tree.getParent(1);
  if (top) {
    top.__select('svg');
  }
  enableTreeClimbButtons();
});

setClickFunction(upBut,function () {
  let pr = tree.getParent();
  if (pr) {
    pr.__select('svg');
  }
  enableTreeClimbButtons();
});


setClickFunction(downBut,function () {
  tree.showChild();
  enableTreeClimbButtons();
});
}
const fileIsOwned = function (url) {
   if (!url) {
    return false;
  }
  //let userName= fb.currentUserName();
  if (!userName) {
    return false;
  }
  let owner = fb.uidOfUrl(url);
  return (userName===  owner);// || ((uid === 'twitter:14822695') && (owner === 'sys'));
}
// if the current item has been loaded from an item file (in which case ui.itemSource will be defined),
// this checks whether it is owned by the current user, and, if so, returns its path
const ownedFilePath = function (url) {
  if (!fileIsOwned(url)) {
    return undefined;
  }
  return fb.pathOfUrl(url);
}


let afterYes;
let yesNoText;
let infoText;

const setupInfo = function () {
  infoText  = html.Element.mk('<div/>');
  mpg.info_lightbox.setContent(infoText);  
}

const popInfo = function (text) {
  infoText.$html(text);
  mpg.info_lightbox.pop();
}
  
const setupYesNo = function (itext) {
  let yesBut,noBut;
  let text = itext?itext:'';
    let yesNoButtons = html.Element.mk('<div/>').__addChildren([
       yesNoText = html.Element.mk('<div style="margin-bottom:20px;font-size:10pt">'+text+'</div>'),
       yesBut =  html.Element.mk('<div class="button">Yes</div>'),
       noBut =  html.Element.mk('<div class="button">No</div>')
      ]);
    mpg.confirm_lightbox.setContent(yesNoButtons);
    yesBut.$click(function () {
     afterYes();
     mpg.confirm_lightbox.dismiss();
    });
    noBut.$click(function () {
      mpg.confirm_lightbox.dismiss();
    });
}

const setYesNoText = function (text) {
  yesNoText.$html(text);
}

const confirm = function (text,yesF) {
  yesNoText.$html(text);
  afterYes = yesF;
  mpg.confirm_lightbox.pop();
}
let afterOk,dialogText;

const setupDialog = function (itext) {
  let okBut,cancelBut,inputEl;
  let text = itext?itext:'';
  let dialogElement = html.Element.mk('<div/>').__addChildren([
       dialogText = html.Element.mk('<div style="margin-bottom:20px;font-size:10pt">'+text+'</div>'),
       inputEl = html.Element.mk(
              '<input type="input" style="display:block;width:90%;font:8pt arial;margin-left:5px"></input>'),           
       okBut =  html.Element.mk('<div style="margin-top:20px;margin-left:20px;" class="button">Ok</div>'),
       cancelBut =  html.Element.mk('<div class="button">Cancel</div>')
      ]);
    mpg.dialog_lightbox.setContent(dialogElement);
    okBut.$click(function () {
     afterOk(inputEl.$prop('value'));
     mpg.dialog_lightbox.dismiss();
    });
    cancelBut.$click(function () {
      mpg.dialog_lightbox.dismiss();
    });
}



const dialog = function (text,okF) {
  dialogText.$html(text);
  afterOk = okF;
  mpg.dialog_lightbox.pop();
}

const uiAlert = function (msg) {
  mpg.alert_lightbox.pop();
  mpg.alert_lightbox.setHtml(msg);
}

//ui.vars.uiAlert = uiAlert;


window.addEventListener("beforeunload",function (event) {
  let msg = "There are unsaved changes. Are you sure you want to leave this page?";
  if (fileModified && fb.currentUser) {
    event.returnValue = msg;
    return msg;
  }
});


const openStructureEditor = function () {
  let url = 'draw.html';
  if (source && core.endsIn(source,'.js')) {
    url += '?source='+source;
  }
  fb.sendToShell(url);
  //top.location.href = shellDomain+url;
}



const checkSaveError = function (err,sz) {
  let msg;
  if (err) {
    if (err === 'maxSizeExceeded') {
      msg = 'File size '+sz+' exceeded limit: '+(core.vars.maxSaveLength);//+(fb.maxSaveLength);
    } else if (err === "maxAllocationExceeded") {
      msg = "This save would exceed your allocation of 5 Meg diagram storage";
    } else {
      msg = 'the save failed, for some reason';
    }
    ui.displayTemporaryError(messageElement,msg,15000);
  }
  return err;
}

//let fitContentsForJpg = false;

const saveImageMaybe = function (url,needsSave,cb) {
  let path = core.afterChar(url,')');
  let isSvg = core.endsIn(path,'.svg');
  let afterSave = function (err,sz) {
     if (ui.vars.jumpToImage === false) {
        alert('done');
        return; 
     }
     if (jpegMovieMode) {
       return;
     }
     if (checkSaveError(err,sz)) {
        return;
     }
     if (cb) {
      cb();
      return;
     }
     let loc = 'image.html?source='+url
     if (dom.vars.imageFound) {
       loc += '&image=1&aspect='+core.nDigits(dom.vars.svgAspectRatio,3);
     }
     fileModified = false;

     fb.sendToShell(loc);
  }
  if (needsSave) {
    if (isSvg) {
      ui.saveSvg(path,afterSave);
    } else {
      if (!core.vars.photoMode) {
        svg.fitContents();
      }
      convertToJpeg(path,afterSave);
    }
  } else {
    afterSave();
  }
}

export {confirm,popInfo};
let loadingItem = undefined;
let mainUrl;
let oldway = false;
const installMainItem = function (source,settings)  {
  debugger;
  if (settings) {
    settings = settings;
  }
  if (source) {
    core.setRoot(dom.SvgElement.mk('<g/>'));
    let ext = core.afterLastChar(source,'.',true);
    if (ext === 'history') {
      core.installHistory(source,afterMainInstall);
    } else {
      if (oldway) {
         core.install(source,afterMainInstall); 
      } else {
   //     debugger;
        import(source).then((module) => afterMainInstallM(module));
      }
    }
  } else  {
    finishMainInstall();
  }
}
let main,installError;
const afterMainInstall = function (e,rs) {
  if (e) {
    installError = e;
    finishMainInstall();
  } else if (rs) {
    delete rs.__sourceUrl;
    main = rs;
  } 
  finishMainInstall();
}
const afterMainInstallM = function (module) {
  //debugger;
  main = module.rs;
 // debugger;
  finishMainInstall();
}

const setBackgroundColor = function (item) {
      if (!item.backgroundColor) {
        item.backgroundColor="black";
      }
   if (!item.__nonRevertable) {
     core.root.set('__nonRevertable',core.lift({backgroundColor:1}));
   }
}

let enableTheGrid = true;
const mergeIn = function (dst,src) {
  core.forEachTreeProperty(src,(child) => {
    let nm = child.__name;
    let anm = core.autoname(dst,nm);
    dst.set(anm,child);
  }); 
}

const performInit = function () {
	
  let rmain = core.root.main;
  if (rmain) {
    if (rmain.initializePrototype) {
      rmain.initializePrototype();
    }
    if (rmain.initialize) {
      rmain.initialize();
    }
    core.propagateDimension(rmain);
  }
 // dom.fullUpdate(true);
  if (core.root.draw) {
    //core.root.draw(dom.svgMain.__element); // update might need things to be in svg
  }
	const last = () => {
		dom.fullUpdate();
		fitTheContents();
    //if (rmain && rmain.animate) {
    //   rmain.animate();
		//}
  }
  if (!core.throwOnError) {
		last();
  } else {
    try {
		  last();
    } catch (e) {
      handleError(e);
    }
  }  
}

const runAnimation = function (save) {
	debugger;
	let main = core.root.main;
	main.saveVideo = save === 'yes';
	if (main.animate) {
		main.animate(0);
	}
}



const resumeAnimation = function (save) {
	debugger;
	let main = core.root.main;
	main.saveVideo = save === 'yes';
	if (main.animate) {
		main.animate(1);
	}
}

const saveAnimation = () => runAnimation('yes');

const pauseAnimation = function () {
	let main = core.root.main;
	if (main.pauseAnimation) {
		main.pauseAnimation();
	}
}


const stepAnimation = function () {
	let main = core.root.main;
	if (main.oneStep) {
		main.oneStep(true);
	}
}

let audioCtx;

const turnOnAudio = function () {
  debugger;
 // audioCtx = new AudioContext();
 // audioCtx.resume();
   let rmain = core.root.main;
  if (rmain) {
    if (rmain.initializeSound) {
      rmain.initializeSound();
    }
  }
}
const stepNoSaveAnimation = function () {
	let main = core.root.main;
	if (main.oneStep) {
		main.oneStep(false);
	}
}


const repeatFrame = function () {
	let main = core.root.main;
	if (main.repeatFrame) {
		main.repeatFrame();
	}
}
		
const svgInstall = function () {
	//debugger;
  let fromItemFile = mainUrl && core.endsIn(mainUrl,'.item');
  if (main && fromItemFile) {
    let svProtos = core.root.prototypes; // loading main may have involved installing prototypes
    core.setRoot(main);
    if (svProtos && main.prototypes) {
      mergeIn(main.prototypes,svProtos);
    }
  } else if (!core.root) {
    core.setRoot(dom.SvgElement.mk('<g/>'));
  }
  
  setBackgroundColor(core.root);
  dom.svgMain.addBackground(core.root.backgroundColor);
  dom.svgMain.fitFactor = fitFactor;
  //ui.initControlProto();
  dom.installRoot();
  if (main && !fromItemFile) {
      core.root.set('main',main);
  }
	//performInit();
  /*let rmain = core.root.main;
  if (rmain) {
    if (rmain.initializePrototype) {
      rmain.initializePrototype();
    }
    if (rmain.initialize) {
      rmain.initialize();
    }
    core.propagateDimension(rmain);
  }
  dom.fullUpdate();
  if (core.root.draw) {
    core.root.draw(dom.svgMain.__element); // update might need things to be in svg
  }
  if (!core.throwOnError) {
		dom.fullUpdate();
  } else {
    try {
		  dom.fullUpdate();
    } catch (e) {
      handleError(e);
    }
  }*/
  
}

let enableButtons; //defined differently for different pages
let fitFactor = 0.8;
const findInstance = function (url) {
  let proto = core.installedItems[url]; 
  if (!proto) {
    return undefined;
  }
  let rs =  core.findDescendant(core.root,function (node) {
    return proto.isPrototypeOf(node);
  });
  if (rs) {
    return rs;
  }
}

const displayError = function (msg) {
  svgMessageDiv.$show();
  svgMessageDiv.$html('<div style="padding:150px;background-color:white;text-align:center">'+msg+'</div>');
  //svgDivReady = false;
}

core.setDisplayError(displayError);

const saveTheImage = function (forMpix) {
	debugger;
	//saveTheThumb();
//	return
  
  jpgSizeFactor = forMpix?jpgMpixFactor:jpgMainFactor;
	let wts = core.vars.whereToSave;// + '.jpg';
  if (!wts) {
		alert('no destination given for image');
		return;
  }
  //dialog('Variant',setTheVariant);

	let dst = forMpix?`www/images/${wts}.mpix.jpg`:`www/images/${wts}.jpg`;
	convertToJpeg(dst,function () {
		alert((forMpix?'saved the Mpix image at ':'saved the image at ')+dst);
		if (!forMpix) {
			saveTheThumb();	
		}
	});	
	
}


const saveTheThumb = function () {
	debugger;
	jpgSizeFactor = jpgThumbFactor;
	let wts = core.vars.whereToSave;// + '.jpg';
	if (wts) {
		let dst = `www/thumbs/${wts}.jpg`;
	  convertToJpeg(dst,function () {
		  alert('saved the thumb at '+dst);
	  });	
	} else {
		alert('no destination given for image');
	}
}

const padWithZeros = function (padTo,n) {
	let s = ''+n;
	let ln = s.length;
	if (ln < padTo) {
		let nm = padTo-ln;
		for (let i=0;i<nm;i++) {
			s = '0'+s;
		}
	}
	return s;
}

const saveFrame = function (n) {
	debugger;
	let pdn = padWithZeros(3,n);
	let wts = core.vars.whereToSave;
	if (wts) {
	  let dst = `animations/${wts}_f${pdn}.jpg`;
	  convertToJpeg(dst,function () {
		  console.log('saved the frame at '+dst);
	  });	
	} else {
		alert('no destination given for image');
	}
}

const fitTheContents = function () {
	dom.svgMain.fitContents();
}

const finishMainInstall = function () {
 // debugger;
 /* if (main) {
    if (main.loadAudioAssets) {
      main.loadAudioAssets();
    }
  } */
  let e = installError;
  let emsg;
  
  if (e) {
    emsg = '<p style="font-weight:bold">'+e+'</p>';
    core.displayError(emsg);
    
  }
  if (svgDiv && !e) {
    svgMessageDiv.$hide();
    svgInstall();
  }
  layout();
  if (vars.fitMode) {
    dom.svgMain.fitContents();
  }
  //if (ui.vars.whichPage !== 'text_editor' && !core.root.transform) {
  if ( !core.root.transform) {
     core.root.set('transform',dom.vars.defaultTransform);
  }
  let next2 = function () {
    //enableButtons();
    dom.svgMain.fitContents();
   /* $(window).resize(function() {
      layout();
      if (ui.vars.fitMode) {
        dom.svgMain.fitContents();
      }
    });*/
  }
  let afterLoad = function (x,y,z) {
    let itm = insertItem(Point.mk(0,0),1);
    if (itm.afterLoad) {
      itm.afterLoad();
    }
    next2();
  }
  if (loadUrl) {
   loadProtoFromPath(loadUrl,'m',null,afterLoad);
   return;
  }

  if (0) { //(ui.vars.whichPage === 'code_editor') || (ui.vars.whichPage === 'text_editor')) {
    viewSource();
    next2();
    return;
  } else if (1) { //ui.vars.whichPage === 'structure_editor') {
     // tree.showItemAndChain(core.root,tree.vars.expandMode,true);  //cgstub7/20 true -> noSelect
      //setCustomActionPanelContents();
  }
  next2();
//  enableButtons();
// debugger;
 //performInit();
 //fitTheContents();
	//setTimeout(fitTheContents,1000);	
	performInit();
	//setTimeout(performInit,1000);	
 // saveState('initial');

}

const displayMessageInSvg = function (msg) {
  core.root.hide();
  svgMessageDiv.$show();
  svgMessageDiv.$html(msg);
}

 const clearError = function () {
   core.root.show();
   svgMessageDiv.$hide();
 }

const handleError = function (e) {
	debugger; //keep
  if (core.throwOnError) {
    displayMessageInSvg(e);
  } else {
    core.error(e.message);
  }
}

export {saveTheImage,saveFrame,fitTheContents,audioCtx};
//okok

/*global setClickFunction enableButtons enableButton enableButton1 disableButton activateTreeClimbButtons enableTreeClimbButtons
afterYes setYesNoText ownedFilePath initFsel insertOwn :true*/
/* begin section: build and layout the page */
let includeTest = false;
let treePadding = 0;
let bkColor = "white";
let saveCatalog,theConfig,theCatalogs;

let actionPanel,actionPanelMessage,actionPanelButton,actionPanelCommon,actionPanelCustom,kitRootBut;
let uiDiv,topbarDiv,deleteBut,editTextBut,addImageBut,cloneBut,openDataInTextEditorBut,redoBut,dragButtons;
let separateBut,moveToBackBut,plusDimBut,minusDimBut,plusdimBut,minusdimBut,animateBut,toggleConnectBut,showCohortBut,doneCloningBut,insertContainer,insertDiv,dragMessage,catalogState;
let moveUpBut, insertCols,insertButs,moveDownBut,saveOrderBut;
let tabContainer,insertDivCol1,insertDivCol2,includeDoc,replaceProtoMode,fromItem;
let resizable;
//let treeVars = tree.vars;
let uiWidth;
let panelMode = 'chain'; // mode of the right panel view; one of 'chain' (view the prototype chains); 'proto','insert','code'
 // the page structure
let actionDiv,cols,fileBut,undoBut,unwrapBut,insertBut,replaceBut,insertTab;
let replaceProtoBut,dataBut,gridBut,fileDisplay,noteDiv,svgDiv;//,protoContainer;
let messageElement,ctopDiv,noteSpan,saveBut,saveMpixBut,runBut,resumeBut,saveAnimationBut,pauseBut,stepBut,stepNoSaveBut,repeatFrameBut,upBut,downBut,topBut,svgMessageDiv;
let dataMessage,JSONMessage,rebuildFromDataBut,changeDataSourceBut,saveDataBut,testBut,saveDataAsBut,checkJSONBut,runningSpan,dataButtons,dataDiv,dataContainer,advancedButs;
let includeActionPanel = false;

let numCatalogHeaderLines = 2;
const closerStyle = 'position:absolute;padding:3px;cursor:pointer;background-color:red;'+
         'font-weight:bold,border:thin solid black;font-size:12pt;color:black';
         
const closer = html.Element.mk('<div style="right:0px;'+closerStyle+'">X</div>');
   
const docClose = html.Element.mk('<div style="right:0px;'+closerStyle+'">X</div>');// right:20 for scroll bar

const docIframe = html.Element.mk('<iframe width="98%" height="98%" id="doc" />');
const docDiv = html.Element.mk('<div id="docDiv" style="position:absolute;width:100%;height:100%;background-color:white;border:solid thin green;display:inline-block"/>').__addChildren([
  docClose,
  docIframe
]);

let mpg;
const buildPage = function () {
	//debugger;
saveBut = document.getElementById('saveButton');
saveMpixBut = document.getElementById('saveMpixButton');
runBut = document.getElementById('runButton');
resumeBut = document.getElementById('resumeButton');
saveAnimationBut = document.getElementById('saveAnimationButton');
pauseBut = document.getElementById('pauseButton');
stepBut = document.getElementById('stepButton');
stepNoSaveBut = document.getElementById('stepNoSaveButton');
repeatFrameBut = document.getElementById('repeatFrameButton');
//saveBut.addEventListener("click", () => {alert(23);});
saveBut.addEventListener("click", () => saveTheImage(0));
saveMpixBut.addEventListener("click", () => saveTheImage(1));
runBut.addEventListener("click", runAnimation);
resumeBut.addEventListener("click", resumeAnimation);
saveAnimationBut.addEventListener("click", saveAnimation);
pauseBut.addEventListener("click", pauseAnimation);
stepBut.addEventListener("click", stepAnimation);
stepNoSaveBut.addEventListener("click", turnOnAudio);
//stepNoSaveBut.addEventListener("click", stepNoSaveAnimation);
repeatFrameBut.addEventListener("click", repeatFrame);

mpg =  html.wrap("main",'div',{style:{position:"absolute","margin":"0px",padding:"0px",display:"none"}}).
__addChildren([
  topbarDiv = html.wrap('topbar','div',{style:{position:"absolute",height:"10px",left:"0px","background-color":bkColor,margin:"0px",padding:"0px"}}).
  __addChildren([
 /* actionDiv =  html.Element.mk('<div id="action" style="position:absolute;margin:0px;overflow:none;padding:5px;height:20px"/>').
  __addChildren([
      fileBut = html.Element.mk('<div class="ubutton">File</div>'),
      undoBut = html.Element.mk('<div  class="ubutton">Undo</div>'),
      redoBut = swapMachine?null:html.Element.mk('<div class="ubutton">Redo</div>'),
      unwrapBut = html.Element.mk('<div class="ubutton">Unwrap</div>'),
      testBut = includeTest?html.Element.mk('<div class="ubutton">Test</div>'):null, 
    //  replaceBut = html.Element.mk('<div class="ubutton">Swap</div>'),
    //  replaceProtoBut = html.Element.mk('<div class="ubutton">Swap Prototype</div>'),
      dataBut = swapMachine?null:html.Element.mk('<div style="display:nonee" class="ubutton">Data</div>'),
      gridBut = swapMachine?null:html.Element.mk('<div style="display:none" class="ubutton">Activate Grid</div>'),
      fileDisplay = html.Element.mk('<span style="font-size:11pt;padding-left:40px"></span>'),
      messageElement = html.Element.mk('<span id="messageElement" style="overflow:none;padding:5px;height:20px"></span>'),
      ui.vars.imageElement = html.Element.mk('<img style="display:none;"/>')
    ])*/
    ctopDiv = html.wrap('topbarInner','div',{style:{float:"right"}})
  ]),

  cols = html.Element.mk('<div id="columns" style="left:0px;position:relative"/>').
  __addChildren([
    
    
    
    docDiv,
    /* actionPanel = actionPanel = html.Element.mk('<div id="actionPanel"  draggable="true" style="background-color:white;border:solid thin black;position:absolute;height:400px;width:600px;display:inline-block"></div>').__addChildren([
        html.Element.mk('<div style="border:solid thin black;"></div>').__addChildren([
        actionPanelMessage = html.Element.mk('<div style="margin:10px;width:80%;padding-right:10px">Nothing is selected</div>'),
        actionPanelButton = html.Element.mk('<div class="colUbutton"></div>')
       ]),
       actionPanelCommon = html.Element.mk('<div style="margin:0;width:100%"></div>').__addChildren([
          kitRootBut = html.Element.mk('<div class="colUbutton left">Select Kit Root</div>'),
          deleteBut = html.Element.mk('<div class="colUbutton left">Delete</div>'),
          editTextBut = html.Element.mk('<div class="colUbutton left">Edit Text</div>'),
          addImageBut = html.Element.mk('<div class="colUbutton left">Add Image</div>'),
         cloneBut= html.Element.mk('<div class="colUbutton left">Copy</div>'),
          showCohortBut = html.Element.mk('<div  class="colUbutton left">Show Cohort</div>'),
          separateBut= html.Element.mk('<div class="colUbutton left">Separate</div>'),
          moveToBackBut= html.Element.mk('<div class="colUbutton left">Move to Back</div>'),
          plusDimBut= html.Element.mk('<div class="colUbutton left">+big Dim</div>'),
          minusDimBut= html.Element.mk('<div class="colUbutton left">-big Dim</div>'),
          plusdimBut= html.Element.mk('<div class="colUbutton left">+small Dim</div>'),
          minusdimBut= html.Element.mk('<div class="colUbutton left">-small Dim</div>'),
         // animateBut= html.Element.mk('<div class="colUbutton left">Animate</div>'),
       
          toggleConnectBut= html.Element.mk('<div class="colUbutton left">Disable Connections</div>'),

           ]),
       actionPanelCustom= html.Element.mk('<div style="float:left;margin:0;width:100%"></div>')
     ]),*/
   
    svgDiv = html.Element.mk('<div id="svgDiv" draggable="true" style="position:absolute;height:400px;width:600px;background-color:white;border:solid thin black;display:inline-block"/>').
    __addChildren([
      noteDiv = html.Element.mk('<div style="font:10pt arial;background-color:white;position:absolute;top:0px;left:90px;padding-left:4px;border:solid thin black"/>').__addChildren([
        //noteSpan = html.Element.mk('<span>Click on things to adjust them. Hierarchy navigation:</span>'),
        //saveBut =html.Element.mk('<div class="roundButton">Save Image</div>'), 
        upBut =html.Element.mk('<div class="roundButton">Up</div>'), 
        downBut =html.Element.mk('<div class="roundButton">Down</div>'),
        topBut =html.Element.mk('<div class="roundButton">Top</div>')
        ]),
        svgMessageDiv = html.Element.mk('<div style="display:none;margin-left:auto;padding:40px;margin-right:auto;width:50%;margin-top:20px;border:solid thin black">AAAAUUUU</div>')
     ]),
 /* treeVars.objectContainer = uiDiv = html.Element.mk('<div id="uiDiv" cgstub720 style="position:absolute;margin:0px;padding:0px"></div>').
    __addChildren([
      dragButtons = html.Element.mk('<div id="dragButtons" style="height:30px;width:100%;background-color:white;border:solid thin black;"></div>').__addChildren([
        insertBut = swapMachine?null:html.Element.mk('<div class="ubutton">Insert</div>'),
        replaceBut = html.Element.mk('<div class="ubutton">Swap</div>'),
        replaceProtoBut = html.Element.mk('<div class="ubutton">Swap Prototype</div>')
      ]),     
      treeVars.obDivRest =treeVars.obDiv = html.Element.mk('<div id="obDiv" style="position:absolute;background-color:white;border:solid thin black;overflow:auto;vertical-align:top;margin:0px;padding:'+treePadding+'px">TREE</div>'),
      insertContainer =  html.Element.mk('<div id="insertContainer" style="background-color:white;border:solid thin black;position:absolute;"></div>').
      __addChildren([
        dragMessage = html.Element.mk('<div id="dragMessage" style="font-size:10pt;padding-bottom:5px;padding-left:45px;">Drag to  insert</div>'),
        tabContainer = html.Element.mk(
          `<div id="tabContainer" style="font-size:10pt;vertical-align:top;border-bottom:thin solid black;height:${numCatalogHeaderLines*30}px;"></div>`).
        __addChildren([
            insertTab = html.Element.mk('<div id="tab" style="width:80%;vertical-align:bottom;borderr:thin solid green;display:inline-block;height:30px;"></div>')
        ]),  
        insertDiv = html.Element.mk('<div id="insertDiv" style="overflow:auto;positionn:absolute;ttop:60px;height:400px;width:600px;background-color:white;bborder:solid thin black;"/>').
        __addChildren([  
          insertButs =html.Element.mk('<div/>').__addChildren([
               moveUpBut = html.Element.mk('<div id="moveUp" class="ubutton">Up</div>'),
               moveDownBut = html.Element.mk('<div id="moveDown" class="ubutton">Down</div>'),
               saveOrderBut = html.Element.mk('<div id="saveOrder" class="ubutton">Save</div>')
          ]),
          insertCols = html.Element.mk('<div/>').__addChildren([
            insertDivCol1 = html.Element.mk('<div id="col1" style="display:inline-block;bborder:thin solid black;width:49%;"></div>'),
            insertDivCol2 = html.Element.mk('<div id="col2" style="vertical-align:top;display:inline-block;bborder:thin solid black;width:49%;"></div>')
          ])
        ]),
      
    
    ]),
    dataContainer =  html.Element.mk('<div id="dataContainer" style="background-color:white;border:solid thin green;position:absolute;margin:0px;padding:0px"></div>').
      __addChildren([
      dataMessage =html.Element.mk('<div style="margin-left:10px;margin-bottom:5px;color:red;font-size:10pt">Data</div>'),
      JSONMessage =html.Element.mk('<div style="margin-left:10px;margin-bottom:5px;color:red;font-size:10pt"></div>'),
      dataButtons = html.Element.mk('<div id="codeButtons" style="bborder:solid thin red;"></div>').__addChildren([
         rebuildFromDataBut =html.Element.mk('<div style = "font-size:9pt" class="roundButton">Rebuild from Data</div>'),
         changeDataSourceBut =html.Element.mk('<div style = "font-size:9pt" class="roundButton">Change source</div>'),
         saveDataBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Save</div>'),// @todo put back
         saveDataAsBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Save As</div>'),// @todo put back
         checkJSONBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Check JSON</div>'),// @todo put back
        openDataInTextEditorBut =html.Element.mk('<div style = "font-size:9pt;" class="roundButton">Open Data in Text Editor</div>'),// @todo put back
       runningSpan = html.Element.mk('<span style="display:none;padding-left:15px;font-size:10pt">...running...</span>')
      ]),
       dataDiv = html.Element.mk('<div id="dataDiv" style="border:solid thin green;positionn:absolute;">Code Div</div>')
    ])

 ])*/
])
]);
advancedButs =  
  [cloneBut,showCohortBut,separateBut,moveToBackBut,toggleConnectBut];
//advancedButs =  
//  [showCohortBut,separateBut,moveToBackBut,toggleConnectBut];

return mpg;
}

   // there is some mis-measurement the first time around, so this runs itself twice at fist
let firstLayout = true;
let svgwd,svght;
const layout = function(noDraw) { // in the initialization phase, it is not yet time to draw, and adjust the transform
  // aspect ratio of the UI
  let canvas = document.getElementById('imageCanvas');
  let noteWidth,noteLeft,treeHt,pageHeight,pageWidth,lrs;
  let actionLeft,actionHt,actionDivWidth,actionPanelWd,treeInnerWidth,treeOuterWidth;
  let topHt,docwd,docTop,twtp;
  let bkg = "white";
  svgwd = 500;
  svght = 500;
  let ar = 0.3;//0.48;
  let wpad = 5;
  let vpad = 5;//5;//20;//minimum sum of padding on top and bottom
  //let awinwid = $(window).width();
  //let awinht = $(window).height();
	let awinwid = window.innerWidth;
	let awinht = window.innerHeight;
  let pwinwid = awinwid - (2 * wpad);
  let pwinht = awinht - (2 * vpad);
  if (pwinht < ar * pwinwid) { // the page is bounded by height 
    pageHeight = pwinht;
    pageWidth = pageHeight/ar;
    lrs = (awinwid - pageWidth)/2;  
  } else { // the page is bounded by width
    pageWidth = pwinwid;
    pageHeight = ar * pageWidth;
  }
  pageHeight = pwinht;
  pageWidth = pwinwid;
  lrs = wpad;
  docTop = 0;
  twtp = 2*treePadding;
  actionDivWidth  = 0.4 * pageWidth;
  actionPanelWd = 0; 
  docwd = 0;
  includeActionPanel = true;
  if (includeActionPanel) {
    actionPanelWd = pageWidth/7;
  }
  if (panelMode === 'catalog') {
    uiWidth = pageWidth/6;
  } else {
    uiWidth = pageWidth/6;
    //uiWidth = 0.25 * pageWidth;
   // svgwd = core.vars.svgwd?core.vars.svgwd:0.75 * pageWidth;
  }
  let svgwdAvail = pageWidth - actionPanelWd - docwd - uiWidth;
  svgwd = core.vars.svgwd?core.vars.svgwd:svgwdAvail;
  let svgPad = svgwdAvail - svgwd;
  treeOuterWidth = uiWidth;
  treeInnerWidth = treeOuterWidth - twtp;
  Object.assign(mpg.__element.style,{left:lrs+"px",width:pageWidth+"px",height:(pageHeight-0)+"px",display:"block"});
  topHt = -15 + topbarDiv.__element.offsetHeight;
  cols.$css({left:"5px",width:pageWidth+"px",top:topHt+"px"});
  ctopDiv.$css({"padding-top":"0px","padding-bottom":"20px","padding-right":"10px",left:svgwdAvail+"px",top:"0px"});
  /*actionLeft = includeDoc?docwd +10 + "px":"210px";
  actionDiv.$css({width:(actionDivWidth + "px"),"padding-top":"10px","padding-bottom":"20px",left:actionLeft,top:"0px"});
  actionHt = actionDiv.__element.offsetHeight;*/
  topbarDiv.$css({height:actionHt,width:pageWidth+"px",left:"0px","padding-top":"10px"});
  let svghtAvail = pageHeight-70;// - actionHt;
  svght = core.vars.svght?core.vars.svght:svghtAvail;// + 20;
  treeHt = svghtAvail;
  treeHt = svghtAvail;
  // treeVars.myWidth = treeInnerWidth; cgstub7/20
  //treeVars.obDiv.$css({width:(treeInnerWidth   + "px"),height:treeHt+"px",top:"30px",left:"0px"}); cgstub7/20
  svgDiv.$css({id:"svgdiv",left:(actionPanelWd + docwd)+"px",width:svgwd +"px",height:svght + "px","background-color":bkg});
  canvas.style.width = svgwd;
  canvas.style.height = svght;
  /*treeVars.obDiv.setVisibility(panelMode=== 'chain'); cgstub7/20
  insertContainer.setVisibility(panelMode === 'catalog');
  dataContainer.setVisibility(panelMode === 'data');*/
 
   dom.svgMain.resize(svgwd,svght); 
   dom.svgMain.positionButtons(svgwd);
   noteWidth = Math.min(svgwdAvail-40,570);
   noteLeft = 0.5 * (svgwdAvail - 40 - noteWidth);
	// let bbox = svgElement.getBBox();

   //noteDiv.$css({left:noteLeft+"px",width:noteWidth +"px"});
   if (firstLayout) {
     firstLayout = false; 
     layout(noDraw);
   }
}



/*global setupYesNo setupDialog enableButton disableButton mpg: true */



dom.vars.ini = Transform.mk(Point.mk(),1);

let mainPage;
let svgDivReady = false;


/*
dom.SvgRoot.positionButtons = function (wd) {
  this.plusbut.$css({"left":(wd - 50)+"px"});
  this.minusbut.$css({"left":(wd - 30)+"px"});
  this.navbut.$css({"left":"0px"});
}
*/



dom.SvgRoot.positionButtons = function (wd) {
	//debugger;
  this.plusbut.__element.style.left = (wd - 50)+"px";;
 // this.plusbut.style.left = (wd - 150)+"px";;
  this.minusbut.__element.style.left = (wd - 30)+"px";
  //this.minusbut.style.left = (wd - 130)+"px";
  //this.navbut.__element.style.left = "0px";
}

const setupSvgDiv = function () {
  if (!svgDivReady) {
    dom.setSvgMain(dom.SvgRoot.mk(svgDiv.__element));
    svgDiv.__element.draggable = true;
    dom.svgMain.activateInspectorListeners();
    dom.svgMain.addButtons("View");
     // dom.svgMain.positionButtons("View");
  svgDivReady = true;
  }
}

const genMainPage = function (cb) {
  if (mainPage) {
    return;
  }
  mainPage = buildPage();//mpg
  //activateButtons();
 // initFsel();
  mpg.__addToDom();
  if (svgDiv) {
    setupSvgDiv();
    core.setRoot(SvgElement.mk('<g/>')); // to be replaced by incoming item, usually
    core.root.set('transform',dom.vars.defaultTransform);
    dom.svgMain.contents=core.root;
    if (source) {
	  core.root.__sourceUrl = source;
	}
  }
 // $('.mainTitle').click(function () {
  //  fb.sendToShell('');
 // });
 /* if (upBut) {
    disableButton(upBut);
    enableButton(topBut);
    disableButton(downBut);
  }*/
  //genButtons(ctopDiv.__element);
  if (cb) {
		cb();
	}
	return;
  //const next = function () {
  $('body').css({"background-color":"#eeeeee","overflow":"hidden"});
  let r = Rectangle.mk({corner:[0,0],extent:[500,200]});
  let insertR = Rectangle.mk({corner:[0,0],extent:[700,500]});
  mpg.set("lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("alert_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("info_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("confirm_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("dialog_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("chooser_lightbox",lightbox.newLightbox(insertR,undefined, true));
  mpg.set("data_lightbox",lightbox.newLightbox(Rectangle.mk({corner:[0,0],extent:[200,50]})));
  mpg.set("textedit_lightbox",lightbox.newLightbox(r));
  setupYesNo();
  setupDialog();
  setupInfo();
  if (docDiv) {
    if (intro) {
      docIframe.__element.src = "/intro/"+intro+".html";
    } else {
      docDiv.$hide();
    }
  }
  layout();
  if (!cb) {
    return;
  }
  if(1) { // && (ui.vars.whichPage === 'structure_editor')) {
    if (core.vars.historyEnabled) {
      disableButton(undoBut);
    } else {
      undoBut.$hide();
    } 
    setCatalogMode('insert',cb);
  } else {
    cb();
  }
}

let mainGetVars = {'source':true,'intro':true,'data':true};

let source,sourceFile,helperUrl,content,loadUrl;

const processQuery = function() {  
  //debugger;
  let q = core.parseQuerystring();
  helperUrl = '/solar/naws.js';
  //intro = q.intro;
  source = q.source;
  content = q.content;
  loadUrl = q.load; // emulates dragging this in as first action
  //saveCatalog = q.saveCatalog;
  if (source==='none') {
    source = undefined;
  } else if (source) {
   // source = fb.handleTwiddle(source);
    sourceFile = core.afterLastChar(source,'/');
  } else {
    if  (1) { //vars.whichPage === 'structure_editor') {
      source = '';
      sourceFile = '';
    } else if  (0) { //ui.vars.whichPage === 'code_editor') {
      source = '/example/sampleCode.js';
      sourceFile = 'sampleCode.js';
    } else {
      sourceFile = '';
    }
  }
 // ui.vars.source  = source;
  if (q.fit) {
    fitFactor = Number(q.fit);
  }
  let settings = {};
  for (let s in q) {
    if (!mainGetVars[s]) {
      let qs = q[s];
      let nqs = Number(qs);
      settings[s] = isNaN(nqs)?qs:nqs;
    }
  }
  settings = settings;
}  
const getConfig = function (cb) {
  core.httpGet(`(${userName})/config.json`,(err,json) => {
    if (!err) {
      try {
        theConfig = JSON.parse(json);
        if (theConfig) {
          theCatalogs = theConfig.catalogs;
        }
      } catch (e) {
        theConfig = 'JsonError';
        theCatalogs = 'JsonError';
      }
    }
    if (!theCatalogs) {
      theCatalogs = (userName === 'sys')?'./*':'(sys)/*,./*';
    }
    cb();
  });
}

let userName,directory;
let pageInitialized = false; // to prevent repeats, which firebase will sometimes invoke via onIdTokenChanged 
const initPage = function () {
 // debugger;
 // console.log('init Page');
 // graph.installRectanglePeripheryOps(dom.SvgTag.image);
  const todo = function () {  
  //   console.log('after set current user');  
    const next = function () {
      //catKit();
      pageInitialized = true;
      processQuery();
      dom.vars.fitStdExtent = !source;//(ui.vars.whichPage === 'structure_editor') && !(source);
      //  console.log('call afterPageGenerated');
      genMainPage(afterPageGenerated);
    }
		if (!pageInitialized) next();
    
  };
	todo();
}

let afterPageGeneratedBeenCalled = false;
const afterPageGenerated = function (doNotInstall) {
  if (afterPageGeneratedBeenCalled) {
    return;
  }
  afterPageGeneratedBeenCalled = true;
  if (sourceFile  && fileDisplay) {
    fileDisplay.$html(sourceFile);
  }
  if (doNotInstall) {
     return;
  }
  if (svgDiv) {
    installMainItem(source);
  } else {
    finishMainInstall();
  }
}

export {initPage,userName,directory};
    

/* from
 * https://stackoverflow.com/questions/27230293/how-to-convert-svg-to-png-using-html5-canvas-javascript-jquery-and-save-on-serve
 */
let shrinkFactor = 1;
//let jpegPadFactor = 1.2;
vars.jpgPadFactor = 1;
let jpgMpixFactor = 20;
let jpgMainFactor = 2;// 2 for animation, 6 for Mpix
let jpgThumbFactor = 1;// 2
let jpgSizeFactor = jpgMainFactor; // for animation
const drawInlineSVG = function (svgElement, bbox,xPad,yPad,ctx, callback) {
  //debugger;
  var svgURL = new XMLSerializer().serializeToString(svgElement);
  var img  = new Image();
  img.onload = function(){
    let xcenter = bbox.x + bbox.width/2;
    let lowx = xcenter - xPad*bbox.width/2;
    let ycenter = bbox.y + bbox.height/2;
    let lowy = ycenter - yPad*bbox.height/2;   
    let wd = jpgSizeFactor*xPad*bbox.width;
    let ht = jpgSizeFactor*yPad*bbox.height;
    console.log('Image drawn with wd ',wd,' ht ',ht);
    ctx.drawImage(this, lowx,lowy,xPad*bbox.width,yPad*bbox.height,0,0,wd,ht);
   // ctx.drawImage(this, lowx,lowy,xPad*bbox.width,yPad*bbox.height,0,0,jpgSizeFactor*xPad*bbox.width,jpgSizeFactor*yPad*bbox.height);
    callback();
  }
  img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
  }

//usage :
//drawInlineSVG(document.querySelector('svg'), ctxt, function(){console.log(canvas.toDataURL())})

// in movie mode (vars.jpegMovieMode === true), each image is collected into the array jpegMovie, rather than being written to a file.

let jpegMovieMode = false;


let jpegMovie = [];


const convertToJpeg = function (destPath,cb) {
	//debugger;
	//const harvestImage = function () {
    debugger;
		let canvas = document.getElementById('imageCanvas');
		let svgElement = dom.svgMain.__element
		let bbox = svgElement.getBBox();
		let f = vars.jpgPadFactor;
		let maxXpad = svgwd/bbox.width;
		let xPad = Math.min(f,maxXpad);
		let maxYpad = svght/bbox.height;
		let yPad = Math.min(f,maxYpad);
		canvas.width = jpgSizeFactor* xPad*bbox.width;
		//canvas.width = jpgSizeFactor* svgwd;//xPad*bbox.width;
		canvas.height = jpgSizeFactor * yPad*bbox.height;
		//canvas.height = jpgSizeFactor * svght;
		let ctxt = canvas.getContext('2d');
  const harvestImage = function () {
		//debugger;
    let base64 = canvas.toDataURL('image/jpeg');
    saveBase64Image(destPath,base64,cb);
  } 
  drawInlineSVG(svgElement,bbox,xPad,yPad, ctxt, harvestImage)

}

const computeSomeStuff  = function () {
	let rs = {};
	rs.canvas = document.getElementById('imageCanvas');
	rs.svgElement = dom.svgMain.__element
	rs.bbox = rs.svgElement.getBBox();
	rs.f = vars.jpgPadFactor;
	rs.maxXpad = svgwd/rs.bbox.width;
	rs.xPad = Math.min(rs.f,rs.maxXpad);
	rs.maxYpad = svght/rs.bbox.height;
	rs.yPad = Math.min(rs.f,rs.maxYpad);
	rs.ctxt = rs.canvas.getContext('2d');
	return rs;
}
/*
const convertToJpeg = function (destPath,cb) {
	debugger;
	//const harvestImage = function () {
	//debugger;
	let stuff = computeSomeStuff();
	let {canvas,svgElement,bbox,f,maxXpad,xPad,maxYpad,yPad,ctxt} = stuff;
	//canvas.width = jpgSizeFactor* xPad*bbox.width;
	canvas.width = jpgSizeFactor* svgwd;//xPad*bbox.width;
	//canvas.height = jpgSizeFactor * yPad*bbox.height;
	canvas.height = jpgSizeFactor * svght;
	const lastStep = function () {
		//debugger;
		let stuff = computeSomeStuff();
		let {canvas,svgElement,bbox,f,maxXpad,xPad,maxYpad,yPad,ctxt} = stuff;
	  canvas.width = jpgSizeFactor* xPad*bbox.width;
    canvas.height = jpgSizeFactor * yPad*bbox.height;
    let base64 = canvas.toDataURL('image/jpeg');
    saveBase64Image(destPath,base64,cb);
	}
  const harvestImage = function () {
		//debugger;
		let stuff = computeSomeStuff();
		let {canvas,svgElement,bbox,f,maxXpad,xPad,maxYpad,yPad,ctxt} = stuff;
   	canvas.width = jpgSizeFactor* xPad*bbox.width;
    canvas.height = jpgSizeFactor * yPad*bbox.height;
		drawInlineSVG(svgElement,bbox,xPad,yPad, ctxt, lastStep)
  } 
  drawInlineSVG(svgElement,bbox,xPad,yPad, ctxt, harvestImage);

}
*/
// from https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
const saveBase64Image = function (destPath,dataURL,cb) {
  let binary = atob(dataURL.split(',')[1]);
  // Create 8-bit unsigned array
  let arr = [];
  let ln = binary.length;
  for (let i =0; i < binary.length; i++) {
    arr.push(binary.charCodeAt(i));
  }
  let str = new Uint8Array(arr);
  if (jpegMovieMode) {
    jpegMovie.push(str);
    if (cb) {
      cb();
    }
  } else {
	  core.httpPost(destPath,str,function (rs) { 
		   //debugger;
			 if (cb) {
				 cb();
			 }
		});
	}
 //   fb.saveString(destPath,str,fb.jpegMetadata,undefined,cb);
  //}
}



const imageToDataUrl = function (image) {
  //debugger;
  let canvas = document.getElementById('imageCanvas');
  let element = image.__element;
  element.crossOrigin = "Anonymous";
  let bbox = element.getBBox();
  canvas.width = jpgSizeFactor * (bbox.width);
  canvas.height = jpgSizeFactor * (bbox.height);
  let ctxt = canvas.getContext('2d');
  ctxt.drawImage(element,bbox.x,bbox.y,bbox.width,bbox.height,0,0,jpgSizeFactor * bbox.width,jpgSizeFactor * bbox.height);
  let base64 = canvas.toDataURL('image/jpeg');
  image.href  = base64;
  return base64;
}

export {jpegMovieMode,jpegMovie,convertToJpeg,imageToDataUrl};
