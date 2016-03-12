<?php
$myfile = fopen("eventinfo.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("eventinfo.txt"));
fclose($myfile);
?>