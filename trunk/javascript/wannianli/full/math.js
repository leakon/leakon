//-------数学函数------//

function PI(){
  return Math.PI;
}

function sin(x){
  return Math.sin(x);
}

function cos(x){
  return Math.cos(x);
}

function abs(x){
  return Math.abs(x);
}

function floor(x){
  return Math.floor(x);
}

function round(x){
  return Math.round(x);
}

function tail(x){
  return x-floor(x);
}

function rem(x,w){  //广义求余
  return tail(x/w)*w;
}



function dw_obj(obj,a) {

	var arr = new Array();

	for(var key in obj) {

		arr.push(obj[key]);
	}

	var aa = arr.join(",\n");

	if (a) {
		alert(aa);
		return;
	}

	var s = arr.join(', <br />');

	document.write(s);
}