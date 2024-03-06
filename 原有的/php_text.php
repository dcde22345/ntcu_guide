<?php
	include 'feedback.php';
	echo "<title>php_text</title>";

	//設定時區
	date_default_timezone_set('Asia/Taipei');
	$Time = date("Y/m/d H:i:s");
	echo "你的評論：".'<br>'.$_POST["feedback"].'<br>'.$Time;
	
	//連線至資料庫
	$hostname="127.0.0.1";
	$username="root";
	$password="FQCfqc10798149@";
	$dbname="feedback";
	$usertable="test";
	
	$link = mysqli_connect($hostname,$username, $password, $dbname) or die ("html>script language='JavaScript'>alert('無法連線至資料庫！請稍後再重試一次。'),history.go(-1)/script>/html>");
?>