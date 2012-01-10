require 'require.pl';

=begin comment

202.100.36.128	202.100.36.135	5	5
202.100.36.136	202.100.36.143	5	5
202.100.36.144	202.100.36.159	5	5

IP Struct = {
	ip:	202.100.36.128	# primary key
	end:	202.100.36.135
	next:	202.100.36.136	# 136 = 135 + 1
	p:	5
	c:	5
}

=end comment
=cut


# �Ż� IP ��Χ opt_range.pl

my $strRange		= 'map_range';
#$strRange		= 'map_test';

my $strFileRange	= 'ip_map/' . $strRange . '.txt';
my $strFileRangeOut	= 'ip_map/' . $strRange . '_out.txt';
my $strFileRangeOut1	= 'ip_map/' . $strRange . '_out1.txt';
my $strFileRangeOut2	= 'ip_map/' . $strRange . '_out2.txt';

open(FH_MAP, "<$strFileRange");
open(FH_MAP_OUT, ">$strFileRangeOut");

unlink($strFileRangeOut1);
unlink($strFileRangeOut2);
#open(FH_MAP_OUT1, ">$strFileRangeOut1");
#open(FH_MAP_OUT2, ">$strFileRangeOut2");

my $strKey;
my $strLine;
my $strFileContent;
my %hashIPMap;
my %hashIPStruct;

# ���� %hashIPMap �ṹ�� hash ��
while(!(eof FH_MAP)) {

	$strLine		= <FH_MAP>;
	my @arrIPStruct		= split("\t", $strLine);

	my %hashIPStruct;
	$hashIPStruct{"ip"}	= trim($arrIPStruct[0]);
	$hashIPStruct{"end"}	= trim($arrIPStruct[1]);
	$hashIPStruct{"p"}	= trim($arrIPStruct[2]);
	$hashIPStruct{"c"}	= trim($arrIPStruct[3]);

	# �õ���һ�� IP ��¼��ָ��(key)
	$hashIPStruct{"next"}	= getNextIP($hashIPStruct{"end"});

#	hash_dump(\%hashIPStruct);
	# ���������⣬����� 2 ����¼����ʼ IP ��ͬ����ôֻ�ܱ������� 1 ��
	#$hashIPMap{$arrIPStruct[0]}	= \%hashIPStruct;

	# ��� IP �Ѿ�����
	if ($hashIPMap{$arrIPStruct[0]}) {

		my $intExistedEnd	= ipStrToInt($hashIPMap{$arrIPStruct[0]}{"end"});
		my $intCurrentEnd	= ipStrToInt($hashIPStruct{"end"});

		if ($intCurrentEnd > $intExistedEnd) {
			# ��ǰ�ı��Ѿ����ڵķ�Χ������ô���и��²���
		} else {
			# �����������һ��ѭ��
			next;
		}
	}

	$hashIPMap{$arrIPStruct[0]}	= \%hashIPStruct;
}


#hash_dump($hashIPMap{"202.100.36.128"});
#exit;

# ���� IP ����
# From
# 202.100.36.128	202.100.36.135	5	5
# 202.100.36.136	202.100.36.143	5	5
# To
# 202.100.36.128	202.100.36.143	5	5

my $intFount		= 1;
my $intJoinCount	= 0;	# ���Ӽ���
my $intLoopCount	= 0;
my $strJoin;

my $stop		= 6;


my @arrDeletedIP;
$arrDeletedIP[0]	= 0;

while($intFount) {

	$intLoopCount++;

	# ���û���ҵ��������ӵ� IP�����趨 0 ���˳�ѭ��
	$intFount	= 0;


	$strJoin	= '';
	foreach my $strKey (sort keys %hashIPMap) {
		if (%{$hashIPMap{$strKey}}) {
#			print	"\n\n::::::\n";
#			hash_dump(\%{$hashIPMap{$strKey}});
		}
		$strJoin	.= $strKey . "\t" . $hashIPMap{$strKey}{"end"} . "\t" . $hashIPMap{$strKey}{"next"} . "\n";
	}
#	print	"\n\n---------$intLoopCount-------------\n\n";
	if ($intLoopCount == ($stop - 1)) {
#		print	FH_MAP_OUT1 $strJoin;
	}
	if ($intLoopCount == $stop) {
#		print	FH_MAP_OUT2 $strJoin;
	}


	foreach my $strKey (keys %hashIPMap) {

		if (!%{$hashIPMap{$strKey}}) {
			next;
		}

		# ��ǰ Struct
		my %hashStruct	= %{$hashIPMap{$strKey}};

		# ���� next ָ���ѯ hashtable
		my $strNextIP	= $hashStruct{"next"};
		my @arrEndIP	= split('\.', $strNextIP);

		# ������ڿ����ӵ� IP����ֱ������������ֻ�� IP �����һ��С�� 255�����б�Ҫ���������߼�
		if ($hashIPMap{$strNextIP} && $arrEndIP[3] < 255) {

			# ���� IP ��λ����Ϣ
			$strFoundAreaInfo	= $hashIPMap{$strNextIP}{"p"} . "_" . $hashIPMap{$strNextIP}{"c"};
			# ��ǰ IP ��λ����Ϣ
			$strStructAreaInfo	= $hashStruct{"p"} . "_" . $hashStruct{"c"};

			# ������Ϣ�����������ӵĽ��һ��ʱ��˵������������
			if ($arrDeletedIP[$intLoopCount-1] == $arrDeletedIP[$intLoopCount-2] && $arrDeletedIP[$intLoopCount-1]) {

				print	"\n\n----------$intLoopCount------------\n\n";
				print	"Struct: $strFoundAreaInfo \n";
				hash_dump(\%hashStruct);

				print	"\n";
				print	"Hash: $strStructAreaInfo \n";
				hash_dump(\%{$hashIPMap{$strNextIP}});
			}


			# ����ƥ��
			if ($strStructAreaInfo eq $strFoundAreaInfo) {

				# ���ص����⣬���� IP ƥ���ˣ���������ƥ�䣬��Ȼ������Ϊ�ϲ�������
				$intFount	= 1;

				dumpPrint("From\t" . $strStructAreaInfo . "\t" . $strFoundAreaInfo . "\n");
				dumpPrint("From\t" . $hashStruct{"ip"} . "\t" . $hashStruct{"end"} . "\n");
				dumpPrint("And\t" . $hashIPMap{$strNextIP}{"ip"} . "\t" . $hashIPMap{$strNextIP}{"end"} . "\n");

				# �����е� end ���� ����¼�� end
				$hashStruct{"end"}	= $hashIPMap{$strNextIP}{"end"};
				# ���� next ָ��
				$hashStruct{"next"}	= getNextIP($hashStruct{"end"});

				$hashIPMap{$strKey}	= \%hashStruct;

				# ������еļ�¼
				$hashIPMap{$strNextIP}	= 0;

				$intJoinCount++;

				dumpPrint("To\t" . $hashStruct{"ip"} . "\t" . $hashStruct{"end"} . "\t" . "\n====\t===============\t===============\n");

			}
		}

	}

	$arrDeletedIP[$intLoopCount]	= $intJoinCount;


#	if ($intLoopCount == $stop) {
#		print	"Force to breakout!\n";
#		print	$intLoopCount;
#		exit;
#	}
#	print	$intLoopCount, "\n";
	print	"[$intLoopCount]\t$intJoinCount\n";


}

print	"Finished to join IP!\n";



# ��������ļ���
$strFileContent	= '';
foreach my $strKey (sort keys %hashIPMap) {

	if (!%{$hashIPMap{$strKey}}) {
		next;
	}

	# ע��ο� map_range.txt �ļ��ĸ�ʽ
	$strFileContent	.= join "\t", $hashIPMap{$strKey}{"ip"}, $hashIPMap{$strKey}{"end"},
			$hashIPMap{$strKey}{"p"}, $hashIPMap{$strKey}{"c"} . "\n";

}
print FH_MAP_OUT $strFileContent;
print	"Finished to output New Map_Range!\n";



# �� IP ��ַ�����һλ�Ƿ�С�� 255 Ϊ���ݣ����� +1 �Ľ��
sub getNextIP {
	my $strReturn;
	my $strEndIP		= shift(@_);
	my @arrEndIP		= split('\.', $strEndIP);

	$arrEndIP[3]		+= 1;
	# ���һλҪС�� 255
	if ($arrEndIP[3] > 255) {
		$arrEndIP[3]	= 255;
	}

	$strReturn	= join(".", @arrEndIP);

	return	$strReturn;
}


sub dumpPrint {
	my $strLog	= shift(@_);
#	print		$strLog;
}
