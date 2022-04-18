

const rs = function (rs)	{ 

//let sqd = 128;
let sqd = 48;
sqd = 16;
let ar = 2;
// in 0_8, parameters can be associated with cells 
rs.paramsByCell = null;
rs.paramsByRow = null;
rs.paramsByCol = null;

rs.getParam = function (cell,prop) {
  debugger;
	let {paramsByCell,paramsByRow,paramsByCol,globalParams,numRows} = this;
	let {x,y} = cell;
	let cellParams,rowParams,propv;
	//debugger;
	if (paramsByCell) {
		cellParams = this.paramsByCell(cell);
	}
  if (paramsByRow) {
   let ln = paramsByRow.length;
   if (y < ln) {
     rowParams = paramsByRow[y];
   }
	}
	if (cellParams) {
		propv = cellParams[prop]
	}
	if (propv !== undefined) {
		return propv;
	}
  if (rowParams) {
    propv == rowParams[prop]
  }
	return propv!==undefined?propv:globalParams[prop]
}
}

export {rs};



