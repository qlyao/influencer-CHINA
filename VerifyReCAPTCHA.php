<?php
if(isset($_GET["responseToken"]))
{
  $post_data = array(  
    'response' => $_GET["responseToken"],  
    'secret' => '6LfQZRQTAAAAABxo22wAk4_9ZCv0Jv-R5Hps-hiE'
  );
  //print_r($post_data);
  $postdata = http_build_query($post_data);  
  //print_r($postdata);
  $options = array(  
    'http' => array(  
      'method' => 'POST',  
      'header' => 'Content-type:application/x-www-form-urlencoded',  
      'content' => $postdata,  
      'timeout' => 15 * 60 // 超时时间（单位:s）  
    )  
  );  
  $context = stream_context_create($options);
  //print_r($context);
  $result = file_get_contents("https://www.google.com/recaptcha/api/siteverify", false, $context);  
  //print_r($result);
  echo $result;
}
?>