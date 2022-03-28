/* wall driftweb shelter
*/
module.exports = {
sections: [

[
//['Square'],
// [0,'grid_grid_1_i_3',4,'instances',1,'Grid 5'], 
//// [0,'grid_grid_1_i_3_v_4','instances',1,'Grid 5'], 
// [0,'grid_grid_1_i_3_g_1','instances',1,'Grid 5'], 
// [0,'grid_grid_1_i_3','instances',1,'Grid 5'], 
//   [110,'drop_whorls_v','instances',1,'Whorls',45], // was [1000,'grid0_46','final',1,'Cloudy Sky',{likes:45,posted:1,category:'grid'}],

 [0,'drop_whorls','generators',1,'Whorls',{likes:45,posted:1,category:'drop'}], 
 [0,'random_stripes','generators',1,'Stripes 3',{likes:26,posted:1,category:'grid'}], 
 [0,'grid_fade','generators',1,'Fade',{likes:532,posted:1,category:'grid'}], 
 [0,'grid_incoming','generators',1,'Incoming',{likes:0,posted:0,category:'grid'}], 
 [0,'grid_ramp','generators',1,'Ramp',{likes:14,posted:1,category:'grid'}], 
 [0,'grid_superposition','generators',1,'Superposition',{likes:103,posted:1,category:'grid'}], 
 [0,'grid_vortex','generators',1,'Vortex',{likes:10,posted:1,category:'grid'}], 
 [0,'grid_enigma','generators',1,'Enigma',{likes:10,posted:1,category:'grid'}],
 [0,'grid_cloudy_sky','generators',1,'Cloudy Sky',{likes:2,posted:1,category:'grid'}],
 [0,'web_triangles','generators',1,'Triangles',{likes:5,posted:1,category:'web'}],
 [0,'web_spokes','generators',1,'Spokes',{likes:4,posted:1,category:'web'}],
  //[0,'web_stripes_2','generators',1,'Stripes 2',posted:1,category:'grid'}],
  [0,'web_stripes_1','generators',1,'Stripes 1',{likes:10,posted:1,category:'web'}],
  [0,'web_diamond','generators',1,'Diamond',{likes:137,posted:1,category:'web'}],
   [0,'drop_iris','generators',1,'Iris',{likes:45,posted:1,category:'drop'}], //was [0,'drop0_1_27','final',1,'Iris',posted:1,category:'grid'}],
  [0,'drop_aphelion','generators',1,'Aphelion',{likes:31,posted:1,category:'drop'}],
  [0,'web_wheel','generators',1,'Wheel',{likes:30,posted:1,category:'web'}],
  [0,'web_drift','generators',1,'Drift',{likes:30,posted:1,category:'web'}],
  [0,'drop_arrows','generators',1,'Arrows',{likes:27,posted:1,category:'drop'}],  //was [0,'drop0_1_21','final',1,'Leaves']
  [0,'drop_leaves','generators',1,'Leaves',{likes:0,posted:0,category:'drop'}],  //was [0,'drop0_1_21','final',1,'Leaves']
  [0,'drop_dandelion','generators',1,'Dandelion',{likes:78,posted:1,category:'drop'}],// was [0,'drop0_1_24','final',1,'Dandelion',posted:1,category:'grid'}],
  [0,'drop_metal_2','generators',1,'Metal 2',{likes:0,posted:0,category:'drop'}], // was [0,'drop0_5','final',1,'Metal 2',posted:1,category:'grid'}],
		 [0,'grid_bubbles','generators','square','Bubbles',{likes:101,posted:1,category:'grid'}],
	[0,'spatter_variants','generators','square','Variants',{likes:74,posted:1,category:'spatter'}], // was [0,'grid0_14_0','final','square','Variants',posted:1,category:'grid'}],
	    [0,'drop_ice','generators',1,'Ice',{likes:44,posted:1,category:'drop'}], // was   [0,'drop0_0','final',1,'Ice',posted:1,category:'grid'}],
    [0,'grid_bump','generators',1,'Bump',{likes:0,posted:0,category:'grid'}],
    [0,'drop_clouds','generators',1,'Clouds',{likes:7,posted:1,category:'drop'}], // was [0,'drop0_0_1','final',1,'Clouds',posted:1,category:'grid'}],
[0,'drop_horizon','generators',1,'Horizon',{likes:0,posted:0,category:'drop'}], //was  [0,'drop0_3','final',1,'Horizon']
    [0,'drop_starry_night','generators',1,'Starry Night',{likes:47,posted:1,category:'drop'}], // was [0,'drop0__13','final',1,'Starry Night']
   [0,'grid_sphere','generators',1,'Sphere',{likes:4,posted:1,category:'grid'}],
    [0,'grid_distortion_field','generators',1,'Distortion Field',{likes:11,posted:1,category:'grid'}],  // was [0,'grid0_28','final',1,'Distortion Field',posted:1,category:'grid'}],
    [0,'grid_waves','generators',1,'Waves',{likes:24,posted:1,category:'grid'}], //was [0,'grid0_16_1','final',1,'Waves',posted:1,category:'grid'}],
    [0,'grid_code','generators',1,'Code',{likes:0,posted:0,category:'grid'}],  // was [0,'grid0_45','final',1,'Code',posted:1,category:'grid'}],
		 [0,'grid_quilt_1','generators','square','Quilt 1',{likes:23,posted:1,category:'grid'}],// was //[0,'grid0_8_15.jpg','final','square','Quilt 1',posted:1,category:'grid'}],
	 	 [0,'grid_world','generators','square','World',{likes:64,posted:1,category:'grid'}],  // was [0,'grid0_19.jpg','final','square','World',posted:1,category:'grid'}],
		 	 [0,'lines_1','generators','square','Lines 1',{likes:31,posted:1,category:'lines'}],
	 [0,'grid_shield','generators','square','Shield',{likes:0,posted:0,category:'grid'}],
			 [0,'lines_chaos_within_order','generators','wide2','Chaos Within Order',{likes:152,posted:1,category:'lines'}],
   //[0,'grid_message','generators','square','Message',{likes:6,posted:1,category:'grid'}],
	[0,'grid_mat','generators','square','Mat',{likes:17,posted:1,category:'grid'}],
		[0,'grid_smoke_1','generators','square','Smoke 1',{likes:7,posted:1,category:'grid'}],
	[0,'grid_cloth','generators','square','Cloth',{likes:54,posted:1,category:'grid'}],
	// [0,'grid_quilt_2','generators','square','Quilt 2',19,posted:1,category:'grid'}],
	 [0,'grid_two_quilts','generators','square','Two Quilts',{likes:0,posted:0,category:'grid'}],
	 [0,'grid_quilt_3','generators','square','Quilt 3',{likes:45,posted:1,category:'grid'}],
	 	[0,'grid_metal','generators','square','Metal',{likes:0,posted:0,category:'grid'}],
	//	[0,'grid_tube','generators','square','Tube',{likes:10,posted:1,category:'grid'}],
	[0,'grid_1','generators','square','Grid 1',{likes:0,posted:0,category:'grid'}],
	[0,'grid_droplets','generators','square','Droplets',{likes:130,posted:1,category:'grid'}],
	
	[0,'lines_2','generators','wide2','Lines 2',{likes:0,posted:0,category:'lines'}],
   [0,'grid_maze','generators','square','Maze',{likes:38,posted:1,category:'grid'}],  // was [0,'grid0_8','final','square','Maze',posted:1,category:'grid'}],
   [0,'lines_bugeyes','generators','square','Bug Eyes',{likes:6,posted:1,category:'lines'}],
	   [1000,'lines_lights','generators','square','Lightss',{likes:12,posted:1,category:'lines'}],  // VV 

	 [0,'grid_eye','generators',1,'Eye',{likes:34,posted:1,category:'grid'}],
	
	 [0,'grid_3','generators','square','Grid 3',{likes:0,posted:0,category:'grid'}],
	 [0,'grid_atlas','generators','wide2','Atlas',{likes:10,posted:1,category:'grid'}],
	 [0,'grid_book','generators','wide2','Book',{likes:0,posted:0,category:'grid'}],
	 [0,'grid_decos','generators','wide2','Deco',{likes:0,posted:0,category:'grid'}],

	// [0,'grid_smoke_2','generators','square','Smoke 2',posted:1,category:'grid'}],
	 [0,'grid_signals','generators','square','Signals',{likes:18,posted:1,category:'grid'}],
	 [0,'grid_beacons','generators','square','Beacons',{likes:0,posted:0,category:'grid'}],
	//	 [0,'grid_decos','generators','square','Deco',posted:1,category:'grid'}],
				[0,'grid_star_maps','generators','wide2','Star Maps',{likes:2,posted:1,category:'grid'}],
		
				 	//[0,'grid_tracks','generators',0,'Tracks',posted:1,category:'grid'}],
		   [0,'grid_4','generators','square','Grid 4',{likes:0,posted:0,category:'grid'}],// was [0,'grid_0_5','final','square','Grid 4']
//	[0,'spatter_spatter','generators','square','Spatter',posted:1,category:'grid'}],
		 	[0,'grid_void','generators','wide1','Void',{likes:100,posted:1,category:'grid'}], // was [0,'grid0_8_18','final','wide1','Void'], 
      
],
/* animations 
[
   ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],
	 ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],
	

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],

	 ['pulse0_3.mp4','gen2','wide2'],
	 ['spin0_2.mp4','gen2','wide2'],
	 ['spatter0_7.mp4','gen2','square'],
	 ['wander0_3.mp4','gen2','square'],

	 ['mlines0_5.mp4','gen2','wide2'],
	 ['broken1_2.gif','gen2','square'],
	 ['broken1_0.gif','gen2','wide2'],
	 ['broken1_4.gif','gen2','wide2'],

	 ['broken1_5.gif','gen2','square'],
	 ['broken1_6.gif','gen2','square'],
	 ['lines0_4.gif','gen2','square'],
	 ['lines0_5.gif','gen2','square'],

	 ['grid_1_5.gif','gen2','square'],
	 ['grid_1_9.gif','gen2','square'],
	 ['grid_1_13.gif','gen2','wide2'],
]
*/
]
};
	
 