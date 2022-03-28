
let kind = process.argv[2];
//let signedstr = process.argv[3]
let forKOPstr = process.argv[3];
let sortByOrderstr = "1";
if (process.argv[4]==="0") {
  sortByOrderstr = "0";
}
/*let alternateStr = process.argv[3];
let byKindstr = process.argv[4];
let byLikesstr = process.argv[5];
let aspectstr = process.argv[6];*/

const toBoolean = (v) => {
  if (typeof v === 'string') {
    return (v==='0')?false:true;
  } else {
    return false;
  }
}
let signed = 0
//let signed = toBoolean(signedstr);
let forKOP = toBoolean(forKOPstr);
let sortByOrder = toBoolean(sortByOrderstr);
let byKind = kind === 'byKind';
let alternate = kind === 'alternate';
let byLikes = kind === 'byLikes';
let byAspect = kind === 'byAspect';
let vertical = kind === 'vertical';
let horizontal = kind === 'horizontal';
let horizontalnf = kind === 'horizontalnf'; // horizontal no frame
let square = kind === 'square';
let grids = kind === 'grids';

console.log('kind','['+kind+']','sortByOrder',sortByOrder,'forKOP',forKOP,'byKind',byKind,'byAspect',byAspect,'byLikes',byLikes,'signed',signed,'horizontal',horizontal,'horizontalnf',horizontalnf);
//return;
//let alternate = 0;
let sectionsPath;
/*let pagesVar = 'gPages';
let pagesPath = 'www/gPages.js';
let titlesPath = 'www/gTitles.js';
let titlesVar = 'gTitles';*/
let imKind;
if (byLikes) {
  sectionsPath = './gridSections.js';
  imKind = 'g';
} else if (alternate) {
  sectionsPath = './altSections.js';
  sortByOrder = 0;
  imKind = 'alt';
} else if (byKind) {
  sectionsPath = './byKindSections.js';
  imKind = 'g';
} else if (byAspect) {
  sectionsPath = './byAspectSections.js'
} else if (vertical) {
  signed = 0;
  imKind = 'v';
  sectionsPath = './verticalSections.js';
  pagesPath = 'www/vPages.js';
  pagesVar = 'vPages';
  titlesPath = 'www/vTitles.js';
  titlesVar = 'vTitles';
} else if (horizontal) {

  signed = 0;
    console.log('HORIZONTAL');

  imKind = 'h';
  sectionsPath = './horizontalSections.js';
  pagesPath = 'www/hPages.js';
  pagesVar = 'hPages';
  titlesPath = 'www/hTitles.js';
  titlesVar = 'hTitles';

} else if (horizontalnf) {
  console.log('HORIZONTALNF');
  imKind = 'hnf';
  sectionsPath = './horizontalnfSections.js';
  pagesPath = 'www/hnfPages.js';
  pagesVar = 'hnfPages';
  titlesPath = 'www/hnfTitles.js';
  titlesVar = 'hnfTitles';

} else if (square) {
  signed = 0;
  imKind = 'sq';
  sectionsPath = './squareSections.js';
 /* pagesPath = 'www/sqPages.js';  
  pagesVar = 'sqPages';  
  titlesPath = 'www/sqTitles.js';
  titlesVar = 'sqTitles';*/
} else if (grids)  {
  sectionsPath = './gridSections.js';
  imKind = 'g'
} else {
  console.log("unrecognized kind ","'"+kind+"'");
  return;
}

 pagesPath = `www/${imKind}Pages.js`;
  pagesVar = `${imKind}Pages`;
  titlesPath = `www/${imKind}Titles.js`;
  titlesVar = `${imKind}Titles`;
  
 console.log('pagesPath',pagesPath)
let outPath;
if (alternate) {
  outPath = 'www/altGrids.html';
} else if (byKind) {
  outPath = 'www/byKind.html';
} else if (byAspect) {
  outPath = 'www/aspectGrids.html';
} else if (vertical) {
  outPath = 'www/vertical.html';
} else if (horizontal) {
  outPath = 'www/horizontal.html';
} else if (horizontalnf) {
  outPath = 'www/horizontalnf.html';
} else if (square) {
  outPath = 'www/square.html';
} else {
  outPath = 'www/grids.html';
}
console.log('sectionsPath', sectionsPath,'outPath',outPath);

var fs = require('fs');

let fileExt = alternate?'mjs':'mjs';
let thePages = [];
let theTitles = [];
let pageTop = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kingdom of Pattern</title>
  <style>
    .theGrid {
      display:grid;
      padding-top:10px;
      grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .indent {
      padding-left:40px;
    }
		.centered {
			text-align:center;
		  font-size:13pt;
			display: flex;
		  align-items: center;
		  justify-content: center;
		}
		p {
			padding-top:5px;
			padding-bottom:5px;
			margin-top:0px;
			margin-bottom:0px;
		}
    .topPad {
      padding-top:40px;
    }
    .emphasis {
      font-style:italic;
      font-weight:bold;
     }
    .introLineLarge {
      text-align:center;
      padding-bottom:10px;
      padding-top:10px;
      font-size:16pt;
      color:white;
    }
     .introLineSmall {
      text-align:center;
      padding-bottom:5px;
      padding-top:5px;
      font-size:10pt;
    }
      
  </style>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
</head>
<body style="color:white;font-size:16pt;font-family:arial;background-color:black" >
`;

let headLine = '<p class="introLineLarge"><a style="color:white" href="https://kingdomofpattern.com">Kingdom of Pattern</a></p>';
let pageIntro;
if (imKind === 'g') {
pageIntro = 
`
<p class="introLineLarge">Kingdom of Pattern</p>
<p class="introLineLarge">Theory (<a style="color:white;text-decoration:underline" href="essay.html">here</a>)
 and Practice (below). </p>

<p  class="introLineSmall">As you will see from <a style="color:white;text-decoration:underline" href="essay.html">theory</a>, the phrase "Kingdom of Pattern" is not a claim to grandeur.</p>
<p class="introLineSmall">Images by Chris Goad (via JavaScript)</p>

<p class="introLineSmall">Click <a style="color:white;text-decoration:underline" href="https://www.etsy.com/shop/KingdomOfPattern"> here </a> if  you'd like a print of one of these images for your wall.</p>


<p class="introLineSmall">To Expand the Images Below, Click on Them</p>
`} else if (imKind === 'h') {
pageIntro = 
`${headLine}
<p class="introLineLarge">Horizontal  Posters (3 to 2 ratio of width to height).</p>
<p class="introLineSmall">A white frame is shown when necessary to indicate the extent of the poster.</p>
`;
}  else if (imKind === 'hnf') {
pageIntro =
`${headLine} 
<p class="introLineLarge">Horizontal Prints (3 to 2 ratio of width to height).</p>
`;
} else if (imKind === 'sq') {
pageIntro = 
`${headLine} 
<p class="introLineLarge">Square Prints</p>
`;
}  else if (imKind === 'v') {
pageIntro = 
`${headLine} 
<p class="introLineLarge">Vertical Posters (3 to 2 ratio of height to width)  Posters.</p>
<p class="introLineSmall">A white frame is shown when necessary to indicate the extent of the poster.</p>
`;
}
let pageScript = 
`<script>
document.addEventListener('DOMContentLoaded', () => {
	debugger;
	let cWidth =document.documentElement.clientWidth;
	let imWid = Math.floor(0.09*cWidth);
	let images = document.querySelectorAll('img');
	images.forEach((im) => {
		im.width = ''+imWid;
	});
});
</script>	
`;
let pageNumber = 0;
let numPages = 0;
const thingString = function (order,ix,dir,useThumb,ititle,props) {
	//console.log('thingString order',order,'ix',ix,'variant',variant,'dir',dir,'useThumb',useThumb,'title',ititle,'likes',likes);
	debugger;
  let {variant,likes,posted,category} = props;
  console.log('POSTED',posted);
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	thePages.push(x);
  let title=ititle?ititle:pageNumber+'';
  theTitles.push(ititle?ititle:pageNumber+'');
  let vpath = (variant?path+'_v_'+variant:path);
  //console.log('variant',variant);
  //console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
	let imsrc = `images/${vpath}.jpg`;
	let thumbsrc = useThumb?`thumbs/${vpath}.jpg`:imsrc;
//console.log('thumbsrc',thumbsrc);
	let pageArg = 'page='+pageNumber;
  let kindArg = 'imKind='+imKind;
	let theImageArg = '';
  //imageArg?'&image='+imageArg:'';
	pageNumber++;
	let lastPageArg = (pageNumber === numPages)?'&lastPage=1':'';
	let rs;
	let astart = `<a style="color:white" href="page.html?image=${vx}&${pageArg}&${kindArg}">`;
 // let likesStr = likes?`<span style="font-size:10pt">Likes ${likes} ${category}</span><br/>`:'';
  //let propsStr = `<span style="font-size:10pt">Likes ${likes?likes:'none'} Order ${order}${posted?"":" NOT POSTED"} ${category}</span><br/>`;
  let propsStr = `<span style="font-size:10pt">${likes?'Likes '+likes:''} ${posted?"":" NOT POSTED"} ${category}</span><br/>`;
	if (forKOP) {
		let titleLink = title?`${astart}${title}</a></p>`:'';
		console.log('forKOP');
rs = `<div><p class="centered">${titleLink}
<p class="centered">${astart}<img width="200" src="${thumbsrc}" alt="Image Missing"></a></p></div>
	`; 
	} else {
		console.log('not for KOP');
rs = `<div><p style="text-align:center"><a href="http://localhost:8081/draw.html?source=/${dir}/${path}.${fileExt}${theImageArg}">${title}</a><br/>
<a href="${dir}/${path}.${fileExt}">source</a><br/>
${propsStr}
${astart}<img width="200" src="${thumbsrc}"></a></p></div>
`;
	}
	return rs;
}

let numThingsPerLine = 4;

const stripOrnt = function (str) {
    let spl = str.split('_');
    let sln = str.length;
    let ln = spl.length;
    let rs = str;
    let lst;
    if (ln > 1) {
      lst = spl[ln-1];
      if ((lst === 'v') || (lst === 'h')) {
        rs = str.substring(0,sln-2);
      } else if (lst === 'sq') {
        rs = str.substring(0,sln-3);
      }
    }
   // console.log('stripOrnt','lst',lst,str,' = ',rs);
    return rs;
  }
 const getOrder = function (thing) {
  // console.log('getOrder',thing);
    let file = stripOrnt(thing[1]);
    let order = orderDict[file];
   // console.log('getOrder',order,typeof order);
    return order?order:1000;
 }
 
    
  const compareByOrder = function (thing1,thing2) {
  //  console.log('compareByOrder',thing1,thing2);
    if ((thing1.length === 1) || (thing2.length ===1)) {
      return 0;
    }
    let file1 = stripOrnt(thing1[1]);
    let file2 = stripOrnt(thing2[1]);
    let order1 = getOrder(thing1);
    let order2 = getOrder(thing2);
    let rs;
    if (order1 === order2) {
      rs = 0;
    } else if (order1 > order2) { 
      rs = 1;
    } else {
      rs = -1;
    }
  //  console.log('file1',file1,'file2',file2,'order1',order1,'order2',order2,'rs',rs);
    return rs;

  }
      
 
let sectionString = function (things) {
	let numThingsThisLine = 0;
	let startLine =  `
<div class="theGrid">
  <div></div>
  `;
	let rs = `
<div class="theGrid">
  <div></div>
  `;
	let ln = things.length;
  const compareLikes = function (thing1,thing2) {
    let likes1 = (thing1.length >= 6)?thing1[5]:0;
    let likes2 = (thing1.length >= 6)?thing2[5]:0;
    if (likes1 === likes2) {
      return 0;
    }
    if (likes1 < likes2) { 
      return 1;
    }
    return -1;
  }
  if (byLikes) {
    things.sort(compareLikes);
  }
  /*const compareByOrder = function (thing1,thing2) {
    let order1 = thing1[0];
    let order2 = thing2[0];
    if (order1 === order2) {
      return 0;
    }
    if (order1 > order2) { 
      return 1;
    }
    return -1;
  }*/
  
  //console.log('things unordered',things);
  if (sortByOrder) {
    things.sort(compareByOrder);
  }
  // console.log('things ordered',things);
// ln = 2;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
    let tln = thing.length;
    if (tln === 1) {
   //   console.log("Section");
      let txt = thing[0];
      numThingsThisLine = numThingsPerLine;
   //  rs += `</div>${startLine}<div>${txt}</div></div>`;
      rs += `</div><br/><div style="text-align:center">${txt}</div><br/><div>`;
    } else {
      let [order,file,directory,useThumb,title,props] = thing;
      console.log('PROPS',props);
    //  console.log('Order',order,'file',file);
     // let tov = typeof variant;
    //  console.log('is variant',tov);

      let ord = getOrder(thing);
      rs += thingString(ord,file,directory,useThumb,title,props);
      //rs += thingString(file,directory,useThumb,title,image);
      numThingsThisLine++;
    }
	//	console.log('numThingsThisLine',numThingsThisLine,'i',i,'ln',ln);
		if ((numThingsThisLine === numThingsPerLine) && (i<(ln-1))) {
		//	console.log('EOL');
			rs += `</div><br/>
	`+ startLine;
			numThingsThisLine = 0;
	  }
  };
  rs += `</div><br/>
`;
 debugger;
 return rs;
}



const sectionsString = function (sections) {
	let rs = '';
	sections.forEach((section) => rs += sectionString(section));
	return rs;

}
const writeThePages = function () {
	let js = `let ${pagesVar}= ${JSON.stringify(thePages)};`;
  console.log('writeThePagess',js,pagesVar,pagesPath);
	fs.writeFileSync(pagesPath,js);
	//fs.writeFileSync(alternate?'www/altPages.js':(byKind?'www/byKindPages.js':'www/thePages.js'),js);
}
const writeTheTitles = function () {
	let js = `let ${titlesVar} = ${JSON.stringify(theTitles)};`
    console.log('writeTheTitles',js,titlesPath);

	fs.writeFileSync(titlesPath,js);
//	fs.writeFileSync(alternate?'www/altTitles.js':(byKind?'www/byKindTitles.js':'www/theTitles.js'),js);
}
		
const writePage = function (sections) {
	
	let frs = '';
	frs += pageTop;
  frs += pageIntro;
  frs += pageScript;
	frs +=sectionsString(sections);
	fs.writeFileSync(outPath,frs);
}

//let sectionsC = require(alternate?'./altSections.js':'./gridSections.js');
let sectionsC = require(sectionsPath);
let imageOrder  = require('./imageOrder.js');
//console.log('imageOrder',imageOrder);

const order2dict = function (order) {
  let rs = {};
  order.forEach( (ln) => {
    let [o,s] = ln;
    rs[s] = o;
  });
  return rs;
}

let orderDict = order2dict(imageOrder);

console.log('orderDict',orderDict);

const countPages = function (sections) {
	let rs = 0;
	sections.forEach((section) => {
		section.forEach((thing) =>  rs++);
	});
	return rs;
}
		
numPages = countPages(sectionsC.sections);

 writePage(sectionsC.sections);
 writeThePages();
 writeTheTitles();
 console.log('numPages',numPages);
 