<?php

$myfile = fopen("allInfluencer.txt", "r") or die("Unable to open file!");
$file_json = json_decode(fread($myfile,filesize("allInfluencer.txt")));
fclose($myfile);

//validation
if(!isset($_POST["firstname"]) || trim($_POST["firstname"]) == "")
{
    echo "<script>alert(\"Please write the first name.\");</script>";
    return;
}
if(!isset($_POST["lastname"]) || trim($_POST["lastname"]) == "")
{
    echo "<script>alert(\"Please write the last name.\");</script>";
    return;
}
//if(!isset($_POST["blogurl"]) || trim($_POST["blogurl"]) == "")
//{
//    echo "<script>alert(\"Please write the blog url.\");</script>";
//    return;
//}
//if(!isset($_POST["facebookaccount"]) || trim($_POST["facebookaccount"]) == "")
//{
//    echo "<script>alert(\"Please write the.\");</script>";
//    return;
//}
if(!isset($_POST["instagramaccount"]) || trim($_POST["instagramaccount"]) == "")
{
    echo "<script>alert(\"Please write the.\");</script>";
    return;
}
//if(!isset($_POST["youtubeaccount"]) || trim($_POST["youtubeaccount"]) == "")
//{
//    echo "<script>alert(\"Please write the.\");</script>";
//    return;
//}
//if(!isset($_POST["otheraccount"]) || trim($_POST["otheraccount"]) == "")
//{
//    echo "<script>alert(\"Please write the.\");</script>";
//    return;
//}
if(!isset($_POST["country"]) || trim($_POST["country"]) == "")
{
    echo "<script>alert(\"Please write the.\");</script>";
    return;
}
if(!isset($_POST["applieremail"]) || trim($_POST["applieremail"]) == "")
{
    echo "<script>alert(\"Please write the.\");</script>";
    return;
}

$global_id = $file_json->global_available_id;
$local_date = (new DateTime(now, new DateTimeZone('America/Los_Angeles')))->format('Y-m-dTH:i');
$current_json = array('id' => $global_id,
    'first_name' => $_POST["firstname"],
    'last_name' => $_POST["lastname"],
    'blog' => $_POST["blogurl"],
    'facebook' => $_POST["facebookaccount"],
    'instagram' => $_POST["instagramaccount"],
    'pinterest' => $_POST["pinterestaccount"],
    'vine' => $_POST["vineaccount"],
    'youtube' => $_POST["youtubeaccount"],
    'other_media' => $_POST["otheraccount"],
    'country' => $_POST["country"],
    'email' => $_POST["applieremail"],
    'status' => "Unprocessed",
    'apply_time' => $local_date);
$file_json->global_available_id = $global_id + 1;
array_push($file_json->influencers, $current_json);
//print_r(json_encode($file_json));

//file_put_contents($myfile, json_encode($data));
$myfile = fopen("allInfluencer.txt", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($file_json));
fclose($myfile);

header("Location: https://www.evestemptation.com/Affilant_Apply_Success?");

?>