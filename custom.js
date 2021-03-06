function transform(x,y,z,angle){
	$('#box').css('-webkit-transform','translate3d('+x+'px,'+y+'px,'+z+'px) rotateY('+angle+'deg)');
}


function rad(angle){
	return angle*Math.PI/180;
}
function  deg(angle){
	return angle*180/Math.PI;
}
function sin(angle){
	return Math.sin(rad(angle));
}
function asin(val){
	return deg(Math.asin(val));
}
function cos(angle){
	return Math.cos(rad(angle));
}


function getDist(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

var perspective=1000;
var r = perspective;
var beta = 0;
var x=0;var z=0;
var theta = 0;
function walk2d(dist, angle){
	theta = angle+beta;
	x = 0+r*sin(theta);
	z=0+perspective-r*cos(theta)+dist;	
	transform(x,0,z,-theta);
	r = getDist(x,z,0,perspective);
	beta = asin(x/r);
	console.log(" r:"+r+" beta:"+beta);
	
}
function sideWalk(step){
	if(beta==90  ){			
		if(step<0 && r<5000 ){
			//walking away			
			x=x-step;r=r-step;
			transform(x,0,z,-theta);
			console.log(" r:"+r+" beta:"+beta);	
		}else if(step>0 && r>1000){
			//walking towards center
			x=x-step;r=r-step;
			transform(x,0,z,-theta);
			console.log(" r:"+r+" beta:"+beta);		
		}		
	}else if(beta==-90)	{		
		if(step<0 && r>1000){
			//walking towards center			
			x=x-step;r=r+step;
			transform(x,0,z,-theta);
			console.log(" r:"+r+" beta:"+beta);	
		}else if(step>0 && r<5000){
			//walking away 
			x=x-step;r=r+step;
			transform(x,0,z,-theta);
			console.log(" r:"+r+" beta:"+beta);	
		}	
	}	
}
/*
walking is restricted between 1000<r<8000 and walking direction beta = 0
*/
function up(){	
	if(r>1000 && beta==0){
	walk2d(500,0)
	}
}
function down(){
	if(r<6500 && beta==0){
	walk2d(-500,0)
	}
}
function left(){
	if(beta<90){
	walk2d(0,90);
	}
}
function shiftLeft(){	
	sideWalk(-400);
}
function shiftRight(){	
	sideWalk(400);
}

function right(){
	if(beta>-90){
	walk2d(0,-90)
	}
}

 var keyUtil = {
    keyCodes:{0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57,A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z:90,enter:13, up:38, down:40, right:39, left:37, esc:27, spacebar:32, ctrl:17, alt:18, shift:16,tab:9,backspace:8},
    keyNames:{8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl", 18: "alt", 27: "esc", 32: "spacebar", 37: "left", 38: "up", 39: "right", 40: "down", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z"},
    onKeyEvent: function(eventName, impl) {
    var that = this;
      $(document).bind(eventName, function(e) {
        var keyName = that.keyNames[e.keyCode];
        if (impl[keyName]) {
          impl[keyName](e);
        }
      });
    }
  };

var shiftdown=false;

keyUtil.onKeyEvent('keydown',{	
	right:function(){
		
		if(shiftdown){
			shiftRight();
		}else{
			right();
		}
	},
	left:function(){
		if(shiftdown){
			shiftLeft();
		}else{
			left();
		}
		
	},
	up:function(){
		up();
	},
	down:function(){
		down();
	},
	shift:function(){
		shiftdown=true;		
	}

});
keyUtil.onKeyEvent('keyup',{		
	shift:function(){
		shiftdown=false;		
	}

});



$(document).ready(function(){
	
	
	
	
	
	loop(function(loopId){
		animateBases(loopId);
	},10000);
	
	
	$('.left-wall').children().each(function(i){
		var tz = (6-i)*800;
		$(this).css('-webkit-transform','translateZ('+tz+'px) translateX(-650px) rotateY(90deg)');
		var $that = $(this);
		//window.setTimeout(function(){
		//	$that.html('<div class="content"><iframe src="faces/left/face5.html"></iframe></div>');
		//},(i+1)*1000);
	});
	
	$('.right-wall').children().each(function(i){
		var tz = (6-i)*800;
		$(this).css('-webkit-transform','translateZ('+tz+'px) translateX(650px) rotateY(270deg)');
		
	});
});

function loop(fn,time){
	var loopId = window.setTimeout(function(){
		loop(fn,time);
	},time);
	fn(loopId);
}


function animateBases(loopId){
	$('.base').children().each(function(i){	
		var $that = $(this);
		var tx = (loopId+i)%2==0?250:-250;
		window.setTimeout(function(){
			$that.css( '-webkit-transform','translateZ('+(i+1)*500+'px)translateY(250px) translateX('+tx+'px)rotateX(90deg)');
		},i*500)
		
		
	});
}


document.onmousewheel = function(e){
	if(e.deltaY<0){
		up();
	}else{
		down();
	}
}



var cubeangle = 0;
function rotateCubeRight(){
	cubeangle+=90;
	$('.cube').css('transform','rotateY('+cubeangle+'deg)')
}
function rotateCubeLeft(){
	cubeangle-=90;
	$('.cube').css('transform','rotateY('+cubeangle+'deg)')
}





function login(){
	$('.login #left').css('transform','translateX(-1200px)')
		$('.login #right').css('transform','translateX(1200px)')
}


walk2d(-5000,0);




