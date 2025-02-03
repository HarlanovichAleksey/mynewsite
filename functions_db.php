<?php
$link=false;
function openDB()
{
	global $link;
	$link=mysqli_connect("localhost", "root", "", "mysite");
	mysqli_query($link, "SET NAMES UTF8");
}
function closeDB()
{
	global $link;
	mysqli_close($link);
}
function getAllinformation()
{
	global $link;
	openDB();
	$res=mysqli_query($link,"SELECT * FROM информация");
	closeDB();
	return mysqli_fetch_all($res,MYSQLI_ASSOC);
}
?>