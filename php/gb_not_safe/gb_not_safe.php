<?php

	// �� PHP ����Դ���ļ������� GBK �ַ���

	// ʹ�� GB2312��������ͬ�ĺ��֣��ᱻ mb_strpos ��Ϊ����ͬ��
	mb_internal_encoding("GB2312");
	
	// ʹ�� GBK �Ϳ�����������
#	mb_internal_encoding("GBK");
#	mb_internal_encoding("GB18030");	// Unknown encoding "GB18030"
		
	$strBadWord	= '�H';
	
//	$strSearchWord	= '�I(^��^)�J';
	$strSearchWord	= '�I';
	
//	$intPos		= mb_strpos($strSearchWord, mb_strtolower($strBadWord));
	$intPos		= mb_strpos($strSearchWord, $strBadWord);
	
	var_dump($intPos);
	
	// ��ͨ�� strpos ȴ���Է�����ȷ���
	$intNormalPos	= strpos($strSearchWord, $strBadWord);
	
	var_dump($intNormalPos);
	
#	var_dump(strlen($strBadWord), strlen($strSearchWord));
#	var_dump(urlencode($strBadWord), urlencode($strSearchWord));


