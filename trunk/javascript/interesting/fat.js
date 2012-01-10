<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0037)http://tanglebones.com/files/fat.html -->
<HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8">

<TITLE>fat.js</TITLE>
<STYLE type="text/css">
.change { background-color: #FF3; }
</STYLE>
</HEAD><BODY>
<PRE>// @name      The Fade Anything Technique
// @namespace http://www.axentric.com/aside/fat/
// @version   1.0-RC1
// @author    Adam Michela
// @errata    Changes and updates by Jemal Cole and whoever he cribbed the first function from

<SPAN class="change">function ie_getElementsByTagName(str) {
	if(str==&quot;*&quot;) {
		return document.all;
	} else {
		return document.all.tags(str);
	}
}
if(document.all) document.getElementsByTagName = ie_getElementsByTagName;</SPAN>

var Fat = {
	make_hex : function (r,g,b) 
	{
		r = r.toString(16); if (r.length == 1) r = &#39;0&#39; + r;
		g = g.toString(16); if (g.length == 1) g = &#39;0&#39; + g;
		b = b.toString(16); if (b.length == 1) b = &#39;0&#39; + b;
		return &quot;#&quot; + r + g + b;
	},
	fade_all : function ()
	{
		var a = document.getElementsByTagName(&quot;*&quot;);
		for (var i = 0; i &lt; a.length; i++) 
		{
			var o = a[i];
			var r = /fade-?(\w{3,6})?/.exec(o.className);
			if (r)
			{
				if (!r[1]) r[1] = &quot;&quot;;
				<SPAN class="change">if (!o.id) o.id = &quot;fade&quot; + i;</SPAN>
				if (o.id) Fat.fade_element(o.id,null,null,&quot;#&quot;+r[1]);
			}
			<SPAN class="change">o.className = o.className.replace(/fade/i, &quot;&quot;);</SPAN>
		}
	},
	fade_element : function (id, fps, duration, from, to) 
	{
		if (!fps) fps = 30;
		if (!duration) duration = 3000;
		if (!from || from==&quot;#&quot;) from = &quot;#FFFF33&quot;;
		if (!to) to = this.get_bgcolor(id);
		
<!-- <span class="change">		// Added this in the hopes that it would work, but so far no luck. Ideas?
		var oldMouseOver = id.onmouseover;
		var oldMouseOut = id.onmouseout;</span> -->

		var frames = Math.round(fps * (duration / 1000));
		var interval = duration / frames;
		var delay = interval;
		var frame = 0;
		
		if (from.length &lt; 7) <SPAN class="change">from = from.replace(/#(.)(.)(.)/g, &quot;#$1$1$2$2$3$3&quot;);</SPAN>
		if (to.length &lt; 7) <SPAN class="change">to = to.replace(/#(.)(.)(.)/g, &quot;#$1$1$2$2$3$3&quot;);</SPAN>
		
		var rf = parseInt(from.substr(1,2),16);
		var gf = parseInt(from.substr(3,2),16);
		var bf = parseInt(from.substr(5,2),16);
		var rt = parseInt(to.substr(1,2),16);
		var gt = parseInt(to.substr(3,2),16);
		var bt = parseInt(to.substr(5,2),16);
		
		var r,g,b,h;
		while (frame &lt; frames)
		{
			r = Math.floor(rf * ((frames-frame)/frames) + rt * (frame/frames));
			g = Math.floor(gf * ((frames-frame)/frames) + gt * (frame/frames));
			b = Math.floor(bf * ((frames-frame)/frames) + bt * (frame/frames));
			h = this.make_hex(r,g,b);
		
			setTimeout(&quot;Fat.set_bgcolor(&#39;&quot;+id+&quot;&#39;,&#39;&quot;+h+&quot;&#39;)&quot;, delay);

			frame++;
			delay = interval * frame; 
		}
		setTimeout(&quot;Fat.set_bgcolor(&#39;&quot;+id+&quot;&#39;,&#39;&quot;+to+&quot;&#39;)&quot;, delay);
	},
	set_bgcolor : function (id, c)
	{
		var o = document.getElementById(id);
		o.style.backgroundColor = c;
	},
	get_bgcolor : function (id)
	{
		var o = document.getElementById(id);
		while(o)
		{
			var c;
			if (window.getComputedStyle) c = window.getComputedStyle(o,null).getPropertyValue(&quot;background-color&quot;);
			if (o.currentStyle) c = o.currentStyle.backgroundColor;
			if ((c != &quot;&quot; &amp;&amp; c != &quot;transparent&quot;) || <SPAN class="change">o.tagName.toLowerCase() == &quot;body&quot;</SPAN>) { break; }
			o = o.parentNode;
		}
		if (c == undefined || c == &quot;&quot; || c == &quot;transparent&quot;) c = &quot;#FFFFFF&quot;;
		var rgb = c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
		if (rgb) c = this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
		return c;
	}
<SPAN class="change">	handleEvent : function(obj, event, func) {
		try {
			obj.addEventListener(event, func, false);
		} catch(e) {
			if (typeof eval(&quot;obj.on&quot;+event) == &quot;function&quot;) {
				var existing = obj[&#39;on&#39;+event];
				obj[&#39;on&#39;+event] = function() { existing; func(); };
			} else {
				obj[&#39;on&#39;+event] = func;
			}
		}
	}
}
Fat.handleEvent(window,&quot;load&quot;,Fat.fade_all);</SPAN>


</PRE>

</BODY></HTML>