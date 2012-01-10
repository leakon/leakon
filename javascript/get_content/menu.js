var __MENU_LOCK_PRELOADED__;
var __MENU_ID__		= 'kmenu_id';

function RemoveById(rid) {
	var o = document.getElementById(rid);
	if (o) {
		o.parentNode.removeChild(o);
	}
}

function CreateMenu() {
	var objMenu			= document.createElement('div');
	objMenu.id			= __MENU_ID__;
	objMenu.style.width		= '600px';
	objMenu.style.height		= '76px';
	objMenu.style.border		= '0px solid black';

	var intScrollTop		= document.documentElement.scrollTop;
	objMenu.style.position		= 'absolute';
	objMenu.style.top		= intScrollTop + 'px';
	objMenu.style.left		= '2px';
	objMenu.style.zIndex		= '10';
	objMenu.style.padding		= '2px';
	return	objMenu;
}

function RemoveMenu() {
	RemoveById(__MENU_ID__);
	__MENU_LOCK_PRELOADED__ = false;
}

function FillMenu(oMenu) {

	var strHTML	= '';
	strHTML		+= '<table cellspacing="1" cellpadding="0" border="0" width="100%" height="76" style="background:black;">';
	strHTML		+= '<tr><th style="background:#cccccc;" height="20">Leakon</th></tr>';
	strHTML		+= '<tr><td style="background:white" height="20"><input type="text" name="kk_content_url" id="kk_content_url" style="width:98%" value="'+window.location+'" /></td></tr>';
	strHTML		+= '<tr><td style="background:white; text-align:left;" height="20"><input type="button" value="Submit" onclick="ClickSubmit();" /> <input type="button" value="Clear" onclick="document.getElementById(\'kk_content_url\').value=\'\';" /> <input type="button" value="Close" onclick="RemoveMenu();" /></td></tr>';
	strHTML		+= '</table>';
	oMenu.innerHTML	= strHTML;

}

function ClickSubmit() {
	GetContent();
}

function CreateIframe(strId) {
	var objIframe	= document.createElement('iframe');
	objIframe.id	= strId;
	objIframe.name	= strId;
	objIframe.style.width	= '3px';
	objIframe.style.height	= '3px';
	objIframe.style.display	= 'none';
	return	objIframe;
}

function CreateForm(strId, strAction) {
	var objForm	= document.createElement('form');
	objForm.id	= strId;
	objForm.action	= strAction;
	objForm.method	= 'post';
	return	objForm;
}

function CreateInputText_content(str) {
	var objInput	= document.createElement('input');
	objInput.type	= 'text';
	objInput.name	= 'content';
	objInput.value	= str;
	return	objInput;
}

function PostByIframe(str) {

	var strFrameId		= 'myIframe_' + Math.random();
	var myIframe		= CreateIframe(strFrameId);

	var strFormId		= 'myForm_' + Math.random();
	var objMyForm		= CreateForm(strFormId, 'http://www.bar.com/get_post.php');

	objMyForm.target	= strFrameId;
	var objInput		= CreateInputText_content(str);

	objMyForm.appendChild(objInput);
	objMyForm.submit();

}

function GetContent() {

	var strFrameId		= 'myIframe_' + Math.random();
	var myIframe		= CreateIframe(strFrameId);
	var strConentUrl	= document.getElementById('kk_content_url').value;

	// Iframe can not load the parent document.
	strConentUrl		+= (strConentUrl.indexOf('?') == -1) ? '?' : '&';
	strConentUrl		+= 'ver_rand=' + Math.random();

	myIframe.src		= strConentUrl;

	try {
		document.body.appendChild(myIframe);
	} catch (e) {
		alert(e);
	}

	myIframe.onload = setTimeout(function() {

					var doc;
					if(myIframe.contentDocument) {
						// For NS6
						doc = myIframe.contentDocument;

					} else if(myIframe.contentWindow) {
						// For IE5.5 and IE6
						doc = myIframe.contentWindow.document;

					} else if(myIframe.document) {
						// For IE5
						doc = myIframe.document;

					} else {
						//other browser
						doc = myIframe.document;
					}

				//	alert(doc.body.innerHTML);

				var kk = doc.getElementsByTagName('html');
			//	alert(kk[0]);
				alert(kk[0].innerHTML);
				PostByIframe(kk[0].innerHTML);

					setTimeout(function() {RemoveById(strFrameId);}, 100);

				},
				100
			);
}


if (__MENU_LOCK_PRELOADED__) {
	// Menu Loaded!
	RemoveMenu();
} else {
	setTimeout(
		function() {
			// codes go here
			var objectMenu	= CreateMenu();
			document.body.appendChild(objectMenu);
			FillMenu(objectMenu);
		},
		100
	);
	__MENU_LOCK_PRELOADED__ = true;
}