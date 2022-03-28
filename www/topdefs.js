
let graph = {};
graph.installCirclePeripheryOps = () => {};
let ui = {};
ui.hide = () => {};
let {core,geom,dom,draw}=Window,codeRoot=core.codeRoot,root=core.root,Point=geom.Point,LineSegment=geom.LineSegment,Point3d=geom.Point3d,Affine3d=geom.Affine3d,Segment3d=geom.Segment3d,Shape3d=geom.Shape3d;Line3d=geom.Line3d;Plane=geom.Plane;Cube=geom.Cube;Rectangle=geom.Rectangle;
let svg;
if (dom) {
	svg = dom.svg;
}
core.afterLoadTop();
