//alert('Foo! Insert Success');

function GetContent(strURL) {

	var strFrameId		= 'myIframe_' + Rand();
	var myIframe		= CreateIframe(strFrameId);
	myIframe.src		= strURL;

	try {
		document.body.appendChild(myIframe);
	} catch (e) {
		alert(e);
	}


	myIframe.onload = setTimeout(function() {
					
					var objRes	= window.frames[0].document.getElementsByTagName('head');
					
					alert(objRes[0].innerHTML);
					
					var cont = '';
					
					for (var key in window.frames[0]) {
					//	cont += key + ' : ' + window.frames[0][key] + "<br />\n";
					}
					
				//	document.write(cont);
				//	alert(myIframe.contentWindow.document.body.innerHTML);
					},
					100
			);
}

function CreateIframe(strId) {
	var objIframe	= document.createElement('iframe');
	objIframe.id	= strId;
	objIframe.style.width	= '10px';
	objIframe.style.height	= '10px';
	objIframe.style.display	= 'none';
	return	objIframe;
}

setTimeout(
	function() {
		var uri	= 'http://www.foo.com/content.txt';
	//	var uri	= 'http://code.kk.com/leakon/javascript/get_content/content.txt';
		GetContent(uri);
	},
	100
);
