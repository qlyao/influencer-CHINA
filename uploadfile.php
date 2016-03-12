<?php
$target_dir = "uploads/";
$target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);
while (file_exists($target_file)) {
  $target_file = substr($target_file,0,strrpos($target_file,".",-1))."0".substr($target_file,strrpos($target_file,".",-1));
}

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
{
  //echo "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],"/",-1))."/".$target_file;
  echo "/influencer/".$target_file;
  //echo $target_file;
}
else 
{
  echo "Sorry, there was an error uploading your file.";
}

?>