<?php


$inputName	= 'Group';

$intMatrix	= 15;
for($i = 0; $i < $intMatrix; $i++) {
	$inputName .= '[]';
}

echo	$inputName;

?>

<form action="" method="post">

<input type="text" name="<?php echo $inputName ?>" value="<?php echo rand(1, 999) ?>" />
<input type="submit" value="submit" />

</form>

<pre>
<?php

print_r($_POST);

?>
</pre>