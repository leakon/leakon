<?php

class DES_Base {

    protected $key  = '123456789012345678901234';
    
    //只有CBC模式下需要iv，其他模式下iv会被忽略 
    protected $iv   = '12345678';
    
    protected $mode = MCRYPT_MODE_ECB;
     
    public function __construct($key, $iv) {
        
        $this->key  = $key;
        
        $this->iv   = $iv;
        
    }
    
    protected function PaddingPKCS7($data) {
        
    	$padlen     = 8 - strlen($data) % 8;
    	
    	for ($i = 0; $i < $padlen; $i++) {
    	    $data   .= chr($padlen);
    	    
    	}
    	
    	return  $data;
    	
    }
     
    protected function UnPaddingPKCS7($data) {
        
    	$padlen     = ord(substr($data, (strlen($data) - 1), 1));
    	
    	if ($padlen > 8){
    	    return  $data;
    	}
     
    	for($i = -1 * ($padlen - strlen($data)); $i < strlen($data); $i++) {
    	    
    	    if (ord(substr($data, $i, 1)) != $padlen) {
    	        return  false;
    	    }
    	    
        }
     
        return  substr($data, 0, -1 * ($padlen - strlen($data)));
    }    
    
    public function encrypt($value) {
    	
    	$td     = mcrypt_module_open(MCRYPT_3DES, '', $this->mode, '');
    	
    	// 填充
    	$value  = $this->PaddingPKCS7($value);     
    	                         
    	mcrypt_generic_init($td, $this->key, $this->iv);
    	
    	$ret    = (mcrypt_generic($td, $value));
    	
    	mcrypt_generic_deinit($td);
    	
    	mcrypt_module_close($td);
     
    	return  $ret;
    	
    }
     
    public function decrypt($value) {
        
    	$td     = mcrypt_module_open(MCRYPT_3DES, '', $this->mode, '');
    	
    	mcrypt_generic_init($td, $this->key, $this->iv);
    	
    	$ret    = trim(mdecrypt_generic($td, $value));
    	
    	$ret    = $this->UnPaddingPKCS7($ret);
    	
    	mcrypt_generic_deinit($td);
    	
    	mcrypt_module_close($td);
    	
    	return  $ret;
    	
    }
    
    // 049D68E08CB994F76EE00DE97CB0E502B9BF1A5289C7DFC2 -> 24 byte binary
    public static function hexbin($strHex) {
        
        $len    = strlen($strHex);
        
        $arr    = array();
        
        for ($idx = 0; $idx < $len; $idx += 2) {
            
            $value  = $strHex{$idx} . $strHex{($idx + 1)};
            $value  = chr(hexdec($value));
            
            $arr[]  = $value;
            
        }
        
        $ret    = implode('', $arr);
        
        return  $ret;
        
    }

    
}

class DES_ECB extends DES_Base {
    
    protected $mode = MCRYPT_MODE_ECB;
     
}
 
class DES_CBC extends DES_Base {
    
    protected $mode = MCRYPT_MODE_CBC;
         
}

class Leakon_Des {
    
    public static function encryptCBC($key, $iv, $input) {
        
        $key        = DES_Base::hexbin($key);
    
        $instance   = new DES_CBC($key, $iv);
    
        $encrypted  = $instance->encrypt($input);
        
        $ret        = base64_encode($encrypted);
        
        return  $ret;
        
    }
    
    public static function decryptCBC($key, $iv, $secret) {
        
        $key        = DES_Base::hexbin($key);
    
        $instance   = new DES_CBC($key, $iv);
    
        $ret        = $instance->decrypt(base64_decode($secret));
        
        return  $ret;
        
    }
    
    public static function encryptECB($key, $iv, $input) {
        
        $key        = DES_Base::hexbin($key);
    
        $instance   = new DES_ECB($key, $iv);
    
        $encrypted  = $instance->encrypt($input);
        
        $ret        = base64_encode($encrypted);
        
        return  $ret;
        
    }
    
    public static function decryptECB($key, $iv, $secret) {
        
        $key        = DES_Base::hexbin($key);
    
        $instance   = new DES_ECB($key, $iv);
    
        $ret        = $instance->decrypt(base64_decode($secret));
        
        return  $ret;
        
    }
    
}
 
