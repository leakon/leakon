<?php
$arrSecond	= array(
	0	=> 4,		// 8,5,6
	1	=> 5,
	2	=> 6,
	3	=> 7,
	4	=> 9,
	5	=> 3,
);
$wait			= isset($_GET['wait']) ? intval($_GET['wait']) : 0;
$intWaitSeconds		= $arrSecond[ $wait ];

?>

<?php
sleep($intWaitSeconds);
?>

WriteLog('[30] ' + <?php echo $wait ?> + ' Explain script for <?php echo $intWaitSeconds ?> seconds');

//myLoader.load(<?php echo $wait ?>);