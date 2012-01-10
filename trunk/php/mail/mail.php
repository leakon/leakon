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
 * 带附件的邮件发送程序
 *
 * @param string $from			发件人邮箱
 * @param string $to			收件人邮箱
 * @param string $subject		邮件主题
 * @param string $message		邮件内容
 * @param array $attachment		附件	[filename]附件名	[content]附件内容
 * @param array $option			可选参数
 * @return bool				是否发成功
 */
function kmail( $from, $to, $subject, $message, $attachment = null , $option = null ) {

	$charset		= strlen( $option['charset'] ) > 0	? $option['charset']	: 'iso-8859-1';

	$boundary		= md5( uniqid( 'kmail' . rand(), true ) );

	$boundary_separator	= '--' . $boundary;

	$attach_name		= $attachment['filename'];
	$attachment_content	= $attachment['content'];

	//	对传输的文本进行编码，以免字符被强制转换
	$attachment_content	= base64_encode( $attachment_content );

	//	邮件正文
	$mail_body		= "$boundary_separator
Content-type: text/plain; charset=$charset
Content-transfer-encoding: 8bit

$message";

	//	附件
	$mail_body		.= "
$boundary_separator
Content-type: text/plain; name=$attach_name
Content-disposition: attachment; filename=$attach_name
Content-transfer-encoding: base64

$attachment_content";

	//	结束标志
	$mail_body		.= "
$boundary_separator--";

	//	头部信息
	$header			= "From: $from
Content-type: multipart/mixed; boundary=\"$boundary\"";

	$ret		= mail( $to, $subject, $mail_body, $header );
	return		$ret;
}

?>
