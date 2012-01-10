<?php
ob_start();
?>

#LoaderTest	{border:2px dotted green; font-size:18px; font-weight:bold;}

<?php
$styleHtml	= ob_get_contents();
ob_end_clean();

$styleHtml	= str_replace("\r\n", "\n", $styleHtml);
$styleHtml	= str_replace("\n", " ", $styleHtml);
$styleHtml	= addslashes($styleHtml);

?>

var __SFStyleElement		= document.createElement('style');
//__SFStyleElement.innerHTML	= '<?php echo $styleHtml ?>';
__SFStyleElement.innerText	= '<?php echo $styleHtml ?>';
document.body.appendChild(__SFStyleElement);