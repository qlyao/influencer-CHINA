<?php
$myfile = fopen("allInfluencer.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("allInfluencer.txt"));
fclose($myfile);
?>