<?php

$name	= 'Leakon';

$nameOfLeakon		= $name;
var_dump($nameOfLeakon);

$nameOfBaidu		=& $name . 'Baidu';
var_dump($nameOfBaidu);

$nameOfBaidu		=& sprintf($name . 'Baidu');
$nameOfReference	= 'Google';
var_dump($nameOfBaidu);

$nameOfReference	=& $name;
$nameOfReference	= 'Google';
var_dump($nameOfReference);
