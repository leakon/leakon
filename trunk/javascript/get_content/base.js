
function LoadJavascript(strScriptURI, strTarget) {
	if (!strTarget) {
		strTarget	= 'head';
	}
	var objScript	= document.createElement('script');
	objScript.type	= 'text/javascript';
	objScript.src	= strScriptURI;
	var objBox	= document.getElementsByTagName(strTarget);
	objBox[0].appendChild(objScript);
	return	true;
}

function Rand() {
	return	parseInt(Math.floor(Math.random() * 10000));
}
