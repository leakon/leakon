<?php

    require_once(dirname(__FILE__) . '/../Leakon_Des.php');

    $key        = '049D68E08CB994F76EE00DE97CB0E502B9BF1A5289C7DFC2';
    $iv         = 'mobile01';
    
    $secret     = 'P85Zvls6aQL/gXa29OjZc6k16TyQsZFC';
    $mac        = '3C:07:54:54:38:71';
    
    $result     = Leakon_Des::encryptCBC($key, $iv, $mac);
    
    var_dump($result);
    
    $result     = Leakon_Des::decryptCBC($key, $iv, $secret);
    
    var_dump($result);
    