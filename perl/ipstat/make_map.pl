require 'require.pl';

my $strFileRaw		= getConfig("IP_MAP_RAW");
my $strFileProvince	= getConfig("IP_MAP_PROVINCE");
my $strFileCity		= getConfig("IP_MAP_CITY");
my $strFileRange	= getConfig("IP_MAP_RANGE");

my $intProvince		= 1;
my $intCity		= 1;

my %hashRange;
my %hashProvinceCode;
my %hashCityCode;

my $countKK	= 0;
# ����ԭʼ IP ���ļ�
open (FH_RAW, "<$strFileRaw") or die "Failed to open raw file!";
while (my $line = <FH_RAW>) {

	# ԭʼ��ʽ:   125  . 031  . 000  . 000        125  . 031  . 063  . 255 	      ���� 	  ����
	$line	=~ m/(\d+)\.(\d+)\.(\d+)\.(\d+)\s\t\s(\d+)\.(\d+)\.(\d+)\.(\d+)\s\t\s([^\t]*)\t\s([^\t]*)/;


	# ת�������� 031 => 31
	my $strBeginIP	= join '.', int $1, int $2, int $3, int $4;	# 125.31.0.0
	my $strEndIP	= join '.', int $5, int $6, int $7, int $8;	# 125.31.63.255
	my $strProvince	= trim($9);					# ����
	my $strCity	= trim($10);					# ����


	# begin of [assign area code]
	# ����������䣬ÿ����һ������������һ������������

	# Ϊÿ�� Province ����һ������
	if (!$hashProvinceCode{$strProvince} && $strProvince) {
		$hashProvinceCode{$strProvince}		= $intProvince++;
	}

	# Ϊÿ�� City ����һ������
	if (!$hashCityCode{$strCity} && $strCity) {
		$hashCityCode{$strCity}			= $intCity++;
	}

	# end of [assign area code]


	# ����ļ����أ�ͬ������ʼ������ IP �ļ�¼ֻӦ����һ�Σ���ԭʼ��¼�����ظ�������
	my $strIndexIPRange		= $strBeginIP . " " . $strEndIP;


	# ����¸�ʽ
	$hashRange{$strIndexIPRange}	= join "\t", $strBeginIP, $strEndIP, $hashProvinceCode{$strProvince}, $hashCityCode{$strCity};

}

# ������ⲿ�ļ�
hash_to_file($strFileProvince, \%hashProvinceCode);	# ʡ�ݴ���
hash_to_file($strFileCity, \%hashCityCode);		# ���д���
hash_to_file($strFileRange, \%hashRange, 1);		# IP ��Χ



# �Ż� IP ��Χ opt_range.pl