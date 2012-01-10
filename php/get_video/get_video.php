<?php
require_once('get_video.inc.php');

define('REQUEST_URL',		trim($_POST['url']));


$cont		= file_get_contents(REQUEST_URL);

#$cont		= '';

$resOfResource	= get_video_resource($cont);


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh" xml:lang="zh">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>WebShell</title>


<style type="text/css">

body, input	{margin:2px; font-family: Lucida Console; font-size:14px;}

/*
pre		{font-family:Lucida Console; font-size:14px; font-weight:bold; background:black; color:white; padding: 4px; margin:0 0 4px;}
pre		{font-family:Lucida Console; font-size:14px; font-weight:bold; background:black; color:white; padding: 4px; margin:0 0 4px;}
*/

p		{line-height:8px; margin:0;}

p input		{vertical-align:middle; }

.inputText	{width:1200px; height:16px; padding:4px; background: #ffffa0;}

.button		{padding:6px;}

</style>

<script type="text/javascript">

</script>

<head>

<body>

<form name="myForm" id="myForm" method="post" action="">


<p>

<input type="text" name="url" value="<?php echo htmlspecialchars(REQUEST_URL) ?>" class="inputText" style="width:600px;" />
<br>
<input type="submit" value="Fetch" class="button" tabindex="200" />


<?php

pr($resOfResource);

?>

</p>


<p>

<object codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,18,0" width="460" height="390"  align="middle">
	<param name="allowScriptAccess" value="always" />
	<param name="allowFullScreen" value="true" />
	<param name="movie" value="<?php echo $resOfResource ?>" />

	<embed src="<?php echo $resOfResource ?>" width="460" height="390" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />

	</object>


</p>

</form>

<script type="text/javascript">
setTimeout(function() {focusCommand()}, 10);
</script>
</body>
</html>
