#BEGIN {push(@INC, $ENV{'PWD'} . '/lib');}
require 'lib/lib.pl';
require 'lib/lib_expo.pl';
use Digest::MD5 qw(md5 md5_hex md5_base64);

1;