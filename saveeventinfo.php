<?php
if(isset($_POST["data"]))
{
    $data = json_decode($_POST["data"]);
    for($i = 0;$i<count($data->events);$i++)
    {
        if(!isset($data->events[$i]->name) || trim($data->events[$i]->name) == "")
        {
            $result = array("status"=>"error","message"=>"Please write the name of every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->time_begin) || trim($data->events[$i]->time_begin) == "")
        {
            $result = array("status"=>"error","message"=>"Please select a beginning time for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->time_end) || trim($data->events[$i]->time_end) == "")
        {
            $result = array("status"=>"error","message"=>"Please select an end time for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->brief) || trim($data->events[$i]->brief) == "")
        {
            $result = array("status"=>"error","message"=>"Please write a brief introduction for every event.");
            echo json_encode($result);
            return;
        }
        if(!isset($data->events[$i]->event_hashtag) || count($data->events[$i]->event_hashtag) == 0)
        {
            $result = array("status"=>"error","message"=>"Please add at least one hashtag.");
            echo json_encode($result);
            return;
        }

        // check big images
        if(!isset($data->events[$i]->big_image) || count($data->events[$i]->big_image) == 0)
        {
            $result = array("status"=>"error","message"=>"Each event should have at least one big image.");
            echo json_encode($result);
            return;
        }
        for($j = 0;$j<count($data->events[$i]->big_image);$j++)
        {
            if(!isset($data->events[$i]->big_image[$j]->url) || trim($data->events[$i]->big_image[$j]->url) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have an url.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->main_title) || trim($data->events[$i]->big_image[$j]->main_title) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a main title.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->subtitle) || trim($data->events[$i]->big_image[$j]->subtitle) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a subtitle.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->big_image[$j]->link) || trim($data->events[$i]->big_image[$j]->link) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a link.");
                echo json_encode($result);
                return;
            }
        }
      
        // check middle images
        if(!isset($data->events[$i]->middle_image) || count($data->events[$i]->middle_image) == 0)
        {
            $result = array("status"=>"error","message"=>"Each event should have at least one middle image.");
            echo json_encode($result);
            return;
        }
        for($j = 0;$j<count($data->events[$i]->middle_image);$j++)
        {
            if(!isset($data->events[$i]->middle_image[$j]->url) || trim($data->events[$i]->middle_image[$j]->url) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have an url.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->middle_image[$j]->main_title) || trim($data->events[$i]->middle_image[$j]->main_title) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a main title.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->middle_image[$j]->subtitle) || trim($data->events[$i]->middle_image[$j]->subtitle) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a subtitle.");
                echo json_encode($result);
                return;
            }
            if(!isset($data->events[$i]->middle_image[$j]->link) || trim($data->events[$i]->middle_image[$j]->link) == "")
            {
                $result = array("status"=>"error","message"=>"Each image should have a link.");
                echo json_encode($result);
                return;
            }
        }

        // check category id
//        if(!isset($data->events[$i]->category_id) || $data->events[$i]->category_id == -1)
//        {
//            $result = array("status"=>"error","message"=>"Please write a category id.");
//            echo json_encode($result);
//            return;
//        }
    }

    $myfile = fopen("eventinfo.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $_POST["data"]);
    fclose($myfile);
    $result = array("status"=>"success","message"=>"OK.");
    echo json_encode($result);
}
?>