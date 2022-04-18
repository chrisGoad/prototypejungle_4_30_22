



var fs = require('fs');


var boilerplate0 = 
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="Diagramming basedd on an open repository of prototype structures.">
<title>PrototypeJungle</title>
<link rel="stylesheet" type="text/css"  href="style.css"/>
<link rel="stylesheet" type="text/css"  href="spectrum.css"/>
<link rel="icon" href="/images/favicon.ico" />
</head>
<body style="background-color:white;font-size:14pt"> <!-- from 12 6/8/19 -->
`;
var boilerplate1 = 
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="Diagramming basedd on an open repository of prototype structures.">
<title>PrototypeJungle</title>
<link rel="stylesheet" type="text/css"  href="style.css"/>
<link rel="stylesheet" type="text/css"  href="spectrum.css"/>
<link rel="icon" href="/images/favicon.ico" />

<style>
	.theGrid {
		display:grid;
		padding-top:10px;
		grid-template-columns:1fr 4fr 1fr;
	}
  .indent {
		padding-left:20px;
	}
  .indent2 {
		padding-left:40px;
	}
  .codeVar {
		font-style:italic;
	}  
  
  .textVar {
		font-weight:bold;
    font-size:12pt
	}
  .plainText {
		font-weight:normal;
    font-size:12pt
	}
  .title {
		font-weight:bold;
    font-size:16pt;
    text-align:center;
	}
  .source {
    font-size:16pt;
    text-align:center;
	}
 .section {
   padding-top:30px;
		font-weight:bold;
    font-size:15pt;
	}
  .blank_row
{
    height: 10px !important; /* overwrites any other rules */
    background-color: #FFFFFF;
}
td {
  borderr: 1px solid rgb(190,190,190);
  padding-left: 20px;
}
</style>
</head>
<body style="background-color:white;font-size:14pt"> 
<div class="theGrid">
<div></div>
<div>
`;

 let mainImports =
`import * as core from "/js/core-1.1.0.js";
import * as geom from "/js/geom-1.1.0.js";
import * as dom from "/js/dom-1.1.0.js";
`;

var endplate =
`
</div>
</div>
</body>
</html>
`; 


function doSubstitution(s,what,value,withDoubleBracket) {
    var rge = withDoubleBracket?new RegExp('\{\{'+what+'\}\}','g'):new RegExp(what,'g');
    return s.replace(rge,value);
}

  
  function insertBoilerplate(s,scripts) {
 
  let irs = doSubstitution(s,'boilerplate0',boilerplate0,1);
  irs = doSubstitution(irs,'boilerplate1',boilerplate1,1);
    //var irs = doSubstitution(irs,'<precode>','<p style="padding:5px"></p><hr/><pre style="padding-left:20px;font-size:10pt;font-weight:bold" class="code">');
    irs = doSubstitution(irs,'<precode>','<pre style="padding-left:20px;font-size:10pt;font-weight:bold" class="code">');
    irs = doSubstitution(irs,'</precode>','</pre>');

   irs = doSubstitution(irs,'mainImports',mainImports,1);

 
  return doSubstitution(irs,'endplate',endplate,1);
}
const endsIn = function (string,p) {
  return string.substr(string.length-p.length) === p;
}

  var xferFile = function(dir,ffl) {
    console.log('read',ffl);
     var scripts = '';
     let spath = (dir==='')?ffl:dir+'/'+ffl;
    let ipath = '../prototypejungle_ui2/'+spath;
    var vl = fs.readFileSync(ipath).toString();
    console.log('read',ipath);
    let  ovl = endsIn(ffl,'.html')?insertBoilerplate(vl,scripts,''):vl;

    console.log('writing',ffl);
     fs.writeFileSync(spath,ovl);
  }
  
  

const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}

var fs = require('fs');

  
  var xferDir = function (dir) {
     let ipath = '../prototypejungle_ui2/'+dir;
		 console.log('Transfering dir with ipath',ipath);
     let files = fs.readdirSync(ipath);
     files.forEach( function (fln) {
       let ext = afterLastChar(fln,'.');
      // console.log('fln',fln,'ext',ext);
    //  if ((ext === fln) || (!['js','css','html','png','svg','jpg','ico','md'].includes(ext))) {
      if  (!['mjs','js','css','html','svg','ico','md','mp3','json'].includes(ext)) {
         console.log('wrong kind of file/dir',fln);
         return;
      }
      let fpath = ipath + '/' + fln;
      var scripts = '';

      var vl = fs.readFileSync(fpath).toString();
 
        let  ovl = endsIn(fln,'.html')?insertBoilerplate(vl,scripts,''):vl;

       fs.writeFileSync(dir+'/'+fln,ovl);
     });
  }

  var xferDirs = function (dirs) {
    dirs.forEach( (dir) => xferDir(dir));
  }

  var xferFiles = function (dir,files) {
    files.forEach( (file) => xferFile(dir,file));
  }

	
 
 // git add README.md arrow axes border box connector container coreExamples data  example image images kit line random shape  text timeline
//xferDir(0,'www','doc');
xferDir('admin');
xferDir('server');
xferFiles('www',['draw.html','index.html','topdefs.js','style.css','spectrum.css','page.html','pageSupport.js']);
xferFiles('admin',['genGrids.js','gridSections.js','imageOrder.js']);
xferDirs(['www/generators','www/instances','www/shape','www/mlib','www/json','www/doc']);
xferDirs(['js/core','js/dom','js/geom','js/draw']);
return;
//xferDir(0,'www','');
 xferDir('top','','server');
xferFiles(0,'www',['page.html','altPage.html','byKindPage.html','draw.html','drawImage.html','essay.html','eutelic.html','zoom0.js','topdefs.js','style.css','spectrum.css','pageSupport.js']);
//xferDir(1,'www','doc');
//xferDir(0,'www','intro');
//xferDir(1,'shell','');
//xferDir(1,'www','slide_show');


//xferDirs(0,'none',['arrow','axes','border','box','connector','container','coreExamples','data',
//'example','grid','image','images','kit','line','random','sandbox','shape','text','timeline']); 
xferDirs(0,'none',['gen0','ngen1','final','mlib','line','shape','shape_modules','generators','instances','sound']); 

  //xferFiles(1,'www',['ops.html','unsupported.html','familytrees.html','coreExamples.html']);

 return;
  
  
//  index = 1
   xferFile(1,1,'initIframe.js');//ok
    xferFile(0,0,'spectrum.css');//ok
xferFile(0,0,'style.css');//ok
xferFile(0,0,'topdefs.js');//ok
// xferFile(1,1,'favicon.ico');
//  xferFile(0,0,'favicon.ico');


 // xferFile('favicon.ico');
   

   xferFiles(1,1,'','.html',['index','draw','drawd','code','coded','text','account','image','devindex','platform','password']);// to shell
   xferFiles(0,0,'','.html',
   ['index','draw','drawd','code','coded','text','account',
   'image','sign_in','register','chooser','devindex','password_register','password','familyTree','accounts']);// to main
   //xferFile(1,0,'coreExamples.html');
   //return;
   //"project","code","choosedoc","rectangle","prototypetree","advantages",
//"project","code","choosedoc","rectangle","prototypetree","advantages",
                        //    "inherit","deepPrototypes","tech","privacy","toc"]);
  xferFile(0,0,'intro/pages.js');//ok
  xferFiles(1,0,'','.html',['ops','unsupported','familytrees','coreExamples']);//ok
  //xferFiles(1,0,'coreExamples/','.js',['circle']);
  xferFiles(0,0,'intro/','.html',['mainIntro','animate','kit','files','tutorial_index','swap','swapPart','intro','tree','insert','exercise','familyTree','bracket','trees',
  'network_main','connect','cayley',"basic_ops","properties","data","prototypes","separate","variant","wrap","share",
    'textbox','copy','catalog',,'image','diagrams','diagrams_main',"network",'details','cohorts','code_intro']);
    
    
    
   // xferFiles(0,0,'doc/','.html',["code","inherit","about",'toc','privacy','tech']);
  xferFile(0,0,'style.css');
  xferFile(1,0,'style.css');
    xferFile(1,1,'spectrum.css');

  xferFile(0,0,'images/logo3.svg');
  xferFile(1,0,'images/logo3.svg');


 xferFile(1,1,'robots.txt');
    xferFile(1,1,'sitemap.xml');
xferFile(0,0,'style.css');
  xferFiles(0,0,'','.html',['devindex','transfer','diagrams','test','nomodules','unsupported','swap','sample','draw','drawd','code','coded','data',
                        'datad','text','textd','catalog','coreExamples',"stripe","accounts","familyTree",
                       'image','sign_in','register','password','password_register','account','donate','programming','chooser','beta','boxGallery']);
  xferFiles(0,0,'','.html',['index','index','sindex','index_alt1','index_alt2','ops']);
   //xferFiles(0,0,'doc/','.html',['swap','pswap','about','pidea','ui_and_api']);

//xferFiles(1,0,'doc/','.html',["code","choosedoc","prototypetree","about","persistence",
//                            "inherit","deepPrototypes","tech","privacy","toc"]);
  xferFiles(0,0,'intro/','.html',['mainIntro','animate','kit','files','tutorial_index','swap','swapPart','intro','tree','insert','exercise','familyTree',
                              'network_main','connect','cayley',"basic_ops","properties","data","prototypes","separate","variant","wrap","share",
                              'textbox','copy','catalog',,'image','diagrams','diagrams_main',"network",'details','cohorts','code_intro']);
  xferFile(0,0,'intro/pages.js');
 // xferFile('favicon.ico');
 // xferFile(1,0,'robots.txt');
 //   xferFile(1,0,'sitemap.xml');
 //   xferFile(1,1,'initIframe.js');
//xferFile(1,0,'style.css');

  xferFile(0,0,'spectrum.css');
xferFile(0,0,'style.css');
xferFile(0,0,'gallery.css');
xferFile(0,0,'topdefs.js');






  