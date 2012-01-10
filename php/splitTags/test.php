<?php

require_once( 'splitTags.php' );


$word	= 'foo" bar" "web 2.0" php+mysql"    "    "';

$res	= splitTags( $word );

print_r( $res );

?>