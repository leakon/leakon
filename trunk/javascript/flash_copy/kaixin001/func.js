function copy_clip(text2copy)
{
	if (window.clipboardData)
	{
		window.clipboardData.setData("Text",text2copy);
	}
	else
	{
		var flashcopier = 'flashcopier';
		if(!document.getElementById(flashcopier))
		{
			var divholder = document.createElement('div');
			divholder.id = flashcopier;
			document.body.appendChild(divholder);
		}
		document.getElementById(flashcopier).innerHTML = '';
		var divinfo = '<embed src="/i/_clipboard.swf" FlashVars="clipboard='+escape(text2copy)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';//�����ǹؼ�
		document.getElementById(flashcopier).innerHTML = divinfo;
	}
	return true;
}