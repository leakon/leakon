<?php

/*
	Test object and static variable.
	The Leakon class has a function which return the weight.
	The constructor of Leakon needs a param setting the age.
*/

class Leakon {

	private
		$age;

	public function __construct($age) {
		$this->age	= $age;
	}

	public function getWeight() {
		static $staticLeakonWeight = null;
		if (empty($staticLeakonWeight)) {
			echo	'.';
			$staticLeakonWeight = $this->age * 1.5 + 50;
		}

		return	$staticLeakonWeight;
	}

	public function getWeightGood() {
		static $staticLeakonWeight = null;
		if (empty($staticLeakonWeight[$this->age])) {
			echo	'.';
			$staticLeakonWeight[$this->age] = $this->age * 1.5 + 50;
		}

		return	$staticLeakonWeight[$this->age];
	}

}

// Test Begin

$arrSave	= array();

// Switch
if (1) {

	for ($i = 10; $i < 20; $i++) {
		$obj	= new Leakon($i);
		for ($j = 0; $j < 10000; $j++) {
			$obj->getWeight();
		}
		$arrSave[$i]	= $obj->getWeight();
		$obj	= null;
	}

} else {

	for ($i = 10; $i < 20; $i++) {
		$obj	= new Leakon($i);
		for ($j = 0; $j < 10000; $j++) {
			$obj->getWeightGood();
		}
		$arrSave[$i]	= $obj->getWeightGood();
		$obj	= null;
	}

}

print_r($arrSave);
