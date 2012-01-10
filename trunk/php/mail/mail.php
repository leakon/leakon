<?php

/*
Backuped in SVN
test1
*/

/*
$from			= 'leakon@leakon.com';
$to			= 'leakon@hotmail.com';
$subject		= 'Hello';
$body			= 'Welcome!';
$attachment['filename']	= 'aaa.txt';
$attachment['content']	= 'abcdefghijklmnopqrstuvwxyz';

$ret			= kmail( $from, $to, $subject, $body, $attachment );
var_dump( $ret );
*/

/**
 * ���������ʼ����ͳ���
 *
 * @param string $from			����������
 * @param string $to			�ռ�������
 * @param string $subject		�ʼ�����
 * @param string $message		�ʼ�����
 * @param array $attachment		����	[filename]������	[content]��������
 * @param array $option			��ѡ����
 * @return bool				�Ƿ񷢳ɹ�
 */
function kmail( $from, $to, $subject, $message, $attachment = null , $option = null ) {

	$charset		= strlen( $option['charset'] ) > 0	? $option['charset']	: 'iso-8859-1';

	$boundary		= md5( uniqid( 'kmail' . rand(), true ) );

	$boundary_separator	= '--' . $boundary;

	$attach_name		= $attachment['filename'];
	$attachment_content	= $attachment['content'];

	//	�Դ�����ı����б��룬�����ַ���ǿ��ת��
	$attachment_content	= base64_encode( $attachment_content );

	//	�ʼ�����
	$mail_body		= "$boundary_separator
Content-type: text/plain; charset=$charset
Content-transfer-encoding: 8bit

$message";

	//	����
	$mail_body		.= "
$boundary_separator
Content-type: text/plain; name=$attach_name
Content-disposition: attachment; filename=$attach_name
Content-transfer-encoding: base64

$attachment_content";

	//	������־
	$mail_body		.= "
$boundary_separator--";

	//	ͷ����Ϣ
	$header			= "From: $from
Content-type: multipart/mixed; boundary=\"$boundary\"";

	$ret		= mail( $to, $subject, $mail_body, $header );
	return		$ret;
}

?>
