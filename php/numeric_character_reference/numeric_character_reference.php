<?php

$str	= '造就反腐名人是亲者痛仇者快';


	function toNCR($str) {

		$charset	= 'GBK';
	//	$charset	= 'UTF-8';

		$ncrConvMap	= array(0x7F, 0xFFFF, 0x0, 0xFFFF);
		$str		= mb_encode_numericentity($str, $ncrConvMap, $charset);
		return		$str;
	}


echo	toNCR($str);

?>


<script>
	document.write(escape('<?php echo $str ?>'));
</script>