<?php
$myfile = fopen("influencerinfo.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("influencerinfo.txt"));
fclose($myfile);
?>