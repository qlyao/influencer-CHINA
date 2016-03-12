/**
 * Created by developer on 12/29/15.
 */

var singleEventJsonObj;
var events;
//var tags = [];

var eventJSON;
var oldJSON;

var ROWS_PER_PAGE=3;
var current_page=0;

var sortOrder = 0;//0 means asc, 1 means desc


function showPage(page_num)
{
  current_page = page_num;
  var table_body_html = "";
  for(var i =page_num*ROWS_PER_PAGE;i<eventJSON.events.length && i<page_num*ROWS_PER_PAGE+ROWS_PER_PAGE;i++)
  {
    table_body_html+="<tr>";
    table_body_html+=getEventEntry(eventJSON.events[i].id,eventJSON.events[i].name,eventJSON.events[i].time_begin,eventJSON.events[i].time_end,eventJSON.events[i].brief);
    table_body_html+="</tr>";
  }
  jQuery("#tableBody").html(table_body_html);
  if(current_page == 0)
    jQuery("#previous_button").css("display","none");
  else
    jQuery("#previous_button").css("display","inline");
  if((current_page+1)*ROWS_PER_PAGE >= eventJSON.events.length)
    jQuery("#next_button").css("display","none");
  else
    jQuery("#next_button").css("display","inline");
}

function previousPage()
{
  if(current_page == 0)
    return;
  current_page--;
  showPage(current_page);
}

function nextPage()
{
  if((current_page+1)*ROWS_PER_PAGE >= eventJSON.events.length)
    return;
  current_page++;
  showPage(current_page);
}

function sortTable(event)
{
  var keyword = jQuery(event.target).attr("id");
  eventJSON.events.sort(function(a,b){
    if(keyword == "name_head")
    {
      if(sortOrder == 0)
      {
        if(a.name<b.name)
          return -1;
        if(a.name>b.name)
          return 1;
        return 0;
      }
      else
      {
        if(a.name<b.name)
          return 1;
        if(a.name>b.name)
          return -1;
        return 0;
      }
    }
    if(keyword == "time_begin_head")
    {
      if(sortOrder == 0)
      {
        if(a.time_begin<b.time_begin)
          return -1;
        if(a.time_begin>b.time_begin)
          return 1;
        return 0;
      }
      else
      {
        if(a.time_begin<b.time_begin)
          return 1;
        if(a.time_begin>b.time_begin)
          return -1;
        return 0;
      }
    }
    if(keyword == "time_end_head")
    {
      if(sortOrder == 0)
      {
        if(a.time_end<b.time_end)
          return -1;
        if(a.time_end>b.time_end)
          return 1;
        return 0;
      }
      else
      {
        if(a.time_end<b.time_end)
          return 1;
        if(a.time_end>b.time_end)
          return -1;
        return 0;
      }
    }
    if(keyword == "brief_head")
    {
      if(sortOrder == 0)
      {
        if(a.brief<b.brief)
          return -1;
        if(a.brief>b.brief)
          return 1;
        return 0;
      }
      else
      {
        if(a.brief<b.brief)
          return 1;
        if(a.brief>b.brief)
          return -1;
        return 0;
      }
    }
  });
  if(sortOrder == 0)
    sortOrder = 1;
  else
    sortOrder = 0;
  showPage(0);
}

function UpLoadFile(event)
{
    var fd = new FormData();
    fd.append("fileToUpload", event.target.files[0]);
    jQuery.ajax({
        type:"POST",
        url:"uploadfile.php",
        processData: false,
        contentType: false,
        data:fd,
        async: false,
        success:function(result)
        {
            var target = event.target;
            var parent = target.parentElement;
            var imgtag = parent.getElementsByTagName("img")[0];
            jQuery(imgtag).attr("src",result);
        },
        error:function()
        {
            alert("error!");
        }
    });
}

function getEventEntry(id,name, timeBegin, timeEnd, briefIntro ){
    return "<td>" + name + "</td>" +
        "<td>" + timeBegin + "</td>" +
        "<td>" + timeEnd + "</td>" +
        "<td>" + briefIntro + "</td>" +
        "<td><button class=\"btn btn-link\" id=\"editbutton"+id+"\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"viewandedit(event)\">view&amp;edit </button></td>" +
        "<td>" + id + "</td>";
}

function viewandedit(event)
{
  var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("editbutton")+10);//get the influencer's id
  var id = parseInt(id_str);
  var i;
  for(i = 0;i<eventJSON.events.length;i++)
  {
    if(eventJSON.events[i].id == id)
      break;
  }
  var currentEvent = eventJSON.events[i];
  readFromJson(currentEvent);
}

function escapeDoubleQuotation(string){
    return string.replace('"', '\"', 'g');
}

function getChunk(imgSrc, mainTitle, subTitle, link){
    return "<div class=\"chunk_div\">" +
    "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
    "<img class=\"entry_picture\" src=\"" + imgSrc + "\" alt=\"No file chosen\"/>" +
    "Main Title: <input type=\"text\" class=\"entry_input\" value=\""+ mainTitle +"\">" +
    "Subtitle: <input type=\"text\" class=\"entry_input\" value=\""+ subTitle +"\">" +
    "Link: <input type=\"text\" class=\"entry_input\" value=\""+ link +"\">" +
    "<button class=\"remove_chunk_buttons\" onclick=\"closestDiv()\">Remove</button>" +
    "</div>";
}

function getPickChunk(code){
    return "<div class=\"chunk_div\">" +
    "Code Generated: <input type=\"text\" class=\"entry_input\" value=\""+escapeDoubleQuotation(code)+"\" style=\"height: 200px\">"+
    "<button class=\"remove_chunk_buttons\" onclick=\"closestDiv()\">Remove</button>" +
    "</div>";
}

var event_id;
function readFromJson(eventsJsonObj){
    event_id = eventsJsonObj.id;
    jQuery("#modal_name_input").val(eventsJsonObj.name);
    if(eventsJsonObj.enabled==1) {
        jQuery("#modal_status").text("On");
        jQuery("#status_control_button").html("Disable");
    }
    else {
        jQuery("#modal_status").text("Off")
        jQuery("#status_control_button").html("Enable");
    }
    jQuery("#modal_begin_time").val(eventsJsonObj.time_begin);
    jQuery("#modal_end_time").val(eventsJsonObj.time_end);
    jQuery("#modal_intro").val(eventsJsonObj.brief);
    jQuery("#tag_pool").html("<button id=\"add_tag_button\" class=\"btn btn-primary\" onclick=\"addTag()\">Add</button>");
    for(var i=0; i<eventsJsonObj.event_hashtag.length; i++) jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + eventsJsonObj.event_hashtag[i] + "</button>");
    jQuery(".tag_button").click(function (event) {
        event.target.remove();
    });
    jQuery("#big_img_div").html("");
    for(var i=0; i<eventsJsonObj.big_image.length; i++) {
        var bigImgJson = eventsJsonObj.big_image[i]
        jQuery("#big_img_div").append(getChunk(bigImgJson.url, bigImgJson.main_title, bigImgJson.subtitle, bigImgJson.link));
    }
    jQuery("#middle_img_div").html("");
    for(var i=0; i<eventsJsonObj.middle_image.length; i++) {
        var middleImgJson = eventsJsonObj.middle_image[i]
        jQuery("#middle_img_div").append(getChunk(middleImgJson.url, middleImgJson.main_title, middleImgJson.subtitle, middleImgJson.link));
    }
    jQuery("#picks_div").html("");
    //console.log(eventsJsonObj);
    //jQuery("#picks_div").html(eventsJsonObj.picks.length);
    for(var i=0; i<eventsJsonObj.picks.length; i++) {
        var pick = eventsJsonObj.picks[i];
        jQuery("#picks_div").append(getPickChunk(pick));
        //console.log(getPickChunk(pick));
        //jQuery("#picks_div").append("<div>lalla</div>");
    }
}

//function safe_tags(str) {
//    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
//}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
//        "&amp;": "&",
//        "&lt;": "<",
//        "&gt;": ">",
//        '&quot;': '"',
//        "&#39;": "'",
//        "&#x2F;": '/'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'")
        .replace(/&#x2F;/g, "/");
}


function writeToJson(){
    var status;
    if (jQuery("#modal_status").text()=="On") status = 1;
    else status = 0;
    var tags = [];
    for (var i=0; i<jQuery("#tag_pool button").length-1; i++) tags.push(jQuery("#tag_pool button")[i].innerHTML);
    var events = {
        "id":event_id,
        "enabled": status,
        "name":jQuery("#modal_name_input").val(),
        "time_begin":jQuery("#modal_begin_time").val(),
        "time_end":jQuery("#modal_end_time").val(),
        "brief":jQuery("#modal_intro").val(),
        "event_hashtag":tags,
        "big_image":[],
        "middle_image":[],
        "picks":[]
    };

    var bigImages = jQuery("#big_img_div .chunk_div");
    //var bigImages = jQuery("#big_img_div input[type=file]");
    for(var i=0; i<bigImages.length; i++){
        events.big_image[i] = {"url": jQuery(bigImages[i].children[1]).attr("src"),"main_title":bigImages[i].children[2].value,"subtitle":bigImages[i].children[3].value,"link":bigImages[i].children[4].value};
    }
    var middleImages = jQuery("#middle_img_div .chunk_div");
    for(var i=0; i<middleImages.length; i++){
        events.middle_image[i] = {"url": jQuery(middleImages[i].children[1]).attr("src"),"main_title":middleImages[i].children[2].value,"subtitle":middleImages[i].children[3].value,"link":middleImages[i].children[4].value};
    }
    var picks = jQuery("#picks_div .chunk_div");
    for(var i=0; i<picks.length; i++){
        events.picks[i] = escapeHtml(picks[i].children[0].value);
    }

    //read data again before write
    jQuery.ajax({
      type:"GET",
      url:"geteventinfo.php",
      async: false,
      success:function(result)
      {
        eventJSON = JSON.parse(result);
        oldJSON = JSON.parse(result);
      },
      error:function()
      {
        alert("error!");
      }
    });
  
    if(event_id == 0)
    {
      events.id = eventJSON.global_available_id;
      eventJSON.global_available_id++;
      eventJSON.events.push(events);
    }
    else
    {
      var j = 0;
      for(;j<eventJSON.events.length;j++)
      {
        if(eventJSON.events[j].id == event_id)
          break;
      }
      eventJSON.events[j] = events;
    }
    
    var jsonString = JSON.stringify(eventJSON);
    jQuery.ajax({
      type:"POST",
      data:{"data":jsonString},
      url:"saveeventinfo.php",
      success: function(result)
      {
        var resultJson = JSON.parse(result);
        if(resultJson.status == "error")
        {
          alert(resultJson.message);
          eventJSON = oldJSON;
          return;
        }
        else
        {
          alert("Update succeeded!");
          jQuery('#myModal').modal('hide');
          oldJSON = eventJSON;
          showPage(0);
        }
      },
      error:function()
      {
        alert("error!");
      }
    });
    console.log(events);
}

//remove image div
function closestDiv(){
    ((event.currentTarget).closest("div")).remove();
}

function createEvent(){
    var emptyJson = {
        "id":0,
        "enabled":0,
        "name": "",
        "time_begin":"",
        "time_end":"",
        "brief":"",
        "event_hashtag": [],
        "big_image":[],
        "middle_image":[],
        "picks":[]
    };
    readFromJson(emptyJson);
}

//tag pool

var input_open = false;
var new_tag_content = "";

function addTag() {

    console.log("click");

    if (input_open) {
        new_tag_content = encodeURI(jQuery("#new_tag_input").val());
        console.log(new_tag_content);
        input_confirm();
    }
    else {
        jQuery("#tag_pool").append("<input type=\"text\" name=\"input\" id=\"new_tag_input\">");
        input_open = true;
        jQuery("#new_tag_input").keypress(function (event) {
            if (event.which == 13) {
                new_tag_content = encodeURI(jQuery("#new_tag_input").val());
                input_confirm();
            }
        });
    }

}

function input_confirm() {
    if (new_tag_content.length != 0) {
        jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
        jQuery("#new_tag_input").remove();
        input_open = false;
        jQuery(".tag_button").click(function (event) {
            event.target.remove();
        });
    }
}

jQuery(document).ready(function() {

  jQuery.ajax({
    type:"GET",
    url:"geteventinfo.php",
    success:function(result)
    {
      eventJSON = JSON.parse(result);
      oldJSON = JSON.parse(result);
      showPage(0);
    },
    error:function()
    {
      alert("error!");
    }
  });
  
    jQuery("#save_button").click(function(){
        if(confirm("Are you sure to save?") == false)
          return;
        writeToJson();
    });

    //// modal save button - input validation
    //jQuery("#save_button").click(function(){
    //    //if(jQuery("#modal_name_input").val().length < 1) alert("Please input name!");
    //    //if(jQuery("#modal_begin_time").val().length < 1) alert("Please select begin time!");
    //    //if(jQuery("#modal_end_time").val().length < 1) alert("Please select end time!");
    //    //if(jQuery("#modal_intro").val().length < 1) alert("Please input brief introduction!");
    //    //if(tags.length < 1) alert("Please choose some tags!");
    //    var bigImages = jQuery("#big_img_div input[type=file]");
    //    for(var i=0; i<bigImages.length; i++){
    //
    //    }
    //    console.log(jQuery("#big_img_div input[type=file]"));
    //});

    //chunk add

    jQuery("#status_control_button").click(function(event){
        if(jQuery("#modal_status").text()=="Off"){
            jQuery("#modal_status").text("On");
            jQuery("#status_control_button").html("Disable");
        }
        else{
            jQuery("#modal_status").text("Off");
            jQuery("#status_control_button").html("Enable");
        }
    });

    jQuery("#big_img_add_btn").click(function(){
        jQuery("#big_img_div").append(
            getChunk("", "", "", "")
        );
    });

    jQuery("#middle_img_add_btn").click(function(){
        jQuery("#middle_img_div").append(
            getChunk("", "", "", "")
        );
    });

    jQuery("#picks_add_btn").click(function(){
        jQuery("#picks_div").append(
            getPickChunk("")
        );
    });

    jQuery("#create_button").click(function () {
        createEvent();
    });


    ////tag pool
    //
    //var input_open = false;
    //var new_tag_content = "";
    //
    //jQuery("#add_tag_button").click(function () {
    //
    //    if (input_open) {
    //        new_tag_content = encodeURI(jQuery("#new_tag_input").val());
    //        console.log(new_tag_content);
    //        input_confirm();
    //    }
    //    else {
    //        jQuery("#tag_pool").append("<input type=\"text\" name=\"input\" id=\"new_tag_input\">");
    //        input_open = true;
    //        jQuery("#new_tag_input").keypress(function (event) {
    //            if (event.which == 13) {
    //                new_tag_content = encodeURI(jQuery("#new_tag_input").val());
    //                input_confirm();
    //            }
    //        });
    //    }
    //
    //});
    //
    //function input_confirm() {
    //    if (new_tag_content.length != 0) {
    //        jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
    //        tags.push(jQuery("#new_tag_input").val());
    //        //newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
    //        jQuery("#new_tag_input").remove();
    //        input_open = false;
    //        jQuery(".tag_button").click(function (event) {
    //            remove_hashtag_button(event);
    //        });
    //    }
    //}
});