/**
 * Created by developer on 1/3/16.
 */

var oldJSON;
var newJSON;

var ROWS_PER_PAGE=5;
var current_page=0;

var sortOrder = 0;//0 means asc, 1 means desc

jQuery(document).ready(function(){
  jQuery.ajax({
    type:"GET",
    url:"getallinfluencers.php",
    success:function(result)
    {
      newJSON = JSON.parse(result);
      oldJSON = JSON.parse(result);
      showPage(0);
    },
    error:function()
    {
      alert("error!");
    }
  });
});


function showPage(page_num)
{
  var table_body_html = "";
  for(var i =page_num*ROWS_PER_PAGE;i<newJSON.influencers.length && i<page_num*ROWS_PER_PAGE+ROWS_PER_PAGE;i++)
  {
    table_body_html+="<tr>";
    table_body_html+="<td>"+newJSON.influencers[i].first_name+" "+newJSON.influencers[i].last_name+"<\/td><td>"+newJSON.influencers[i].country+"<\/td><td>"+newJSON.influencers[i].apply_time+"<\/td><td>"+newJSON.influencers[i].status+"<\/td><td><button class=\"btn btn-link\" data-toggle=\"modal\" data-target=\"#myModal\" id='editbutton"+newJSON.influencers[i].id+"' onclick=\"viewandedit(event)\">More<\/button><\/td>";
    table_body_html+="</tr>";
  }
  jQuery("#tableBody").html(table_body_html);
  if(current_page == 0)
    jQuery("#previous_button").css("display","none");
  else
    jQuery("#previous_button").css("display","inline");
  if((current_page+1)*ROWS_PER_PAGE >= newJSON.influencers.length)
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
  if((current_page+1)*ROWS_PER_PAGE >= newJSON.influencers.length)
    return;
  current_page++;
  showPage(current_page);
}


function sortTable(event)
{
  var keyword = jQuery(event.target).attr("id");
  newJSON.influencers.sort(function(a,b){
    if(keyword == "name_head")
    {
      var aname = a.last_name+a.first_name;
      var bname = b.last_name+b.first_name;
      if(sortOrder == 0)
      {
        if(aname<bname)
          return -1;
        if(aname>bname)
          return 1;
        return 0;
      }
      else
      {
        if(aname<bname)
          return 1;
        if(aname>bname)
          return -1;
        return 0;
      }
    }
    if(keyword == "country_head")
    {
      if(sortOrder == 0)
      {
        if(a.country<b.country)
          return -1;
        if(a.country>b.country)
          return 1;
        return 0;
      }
      else
      {
        if(a.country<b.country)
          return 1;
        if(a.country>b.country)
          return -1;
        return 0;
      }
    }
    if(keyword == "apply_time_head")
    {
      if(sortOrder == 0)
      {
        if(a.apply_time<b.apply_time)
          return -1;
        if(a.apply_time>b.apply_time)
          return 1;
        return 0;
      }
      else
      {
        if(a.apply_time<b.apply_time)
          return 1;
        if(a.apply_time>b.apply_time)
          return -1;
        return 0;
      }
    }
    if(keyword == "status_head")
    {
      if(sortOrder == 0)
      {
        if(a.status<b.status)
          return -1;
        if(a.status>b.status)
          return 1;
        return 0;
      }
      else
      {
        if(a.status<b.status)
          return 1;
        if(a.status>b.status)
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

function viewandedit(event)
{
  var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("editbutton")+10);//get the influencer's id
  var id = parseInt(id_str);
  var i;
  for(i = 0;i<newJSON.influencers.length;i++)
  {
    if(newJSON.influencers[i].id == id)
      break;
  }
  var currentInfluencer = newJSON.influencers[i];
  readFromJson(currentInfluencer);
}

var influencer_id;
function readFromJson(currentInfluencer)
{
  influencer_id = currentInfluencer.id;
  jQuery("#modal_first_name_input").val(currentInfluencer.first_name);
  jQuery("#modal_last_name_input").val(currentInfluencer.last_name);
  jQuery("#modal_blog_input").val(currentInfluencer.blog);
  jQuery("#modal_facebook_input").val(currentInfluencer.facebook);
  jQuery("#modal_instagram_input").val(currentInfluencer.instagram);
  jQuery("#modal_pinterest_input").val(currentInfluencer.pinterest);
  jQuery("#modal_vine_input").val(currentInfluencer.vine);
  jQuery("#modal_youtube_input").val(currentInfluencer.youtube);
  jQuery("#modal_other_input").val(currentInfluencer.other_media);
  jQuery("#modal_country_input").val(currentInfluencer.country);
  jQuery("#modal_email_input").val(currentInfluencer.email);
  jQuery("#modal_status_input").val(currentInfluencer.status);
}

function writeToJson()
{
  if(confirm("Are you sure to save?") == false)
    return;
  jQuery.ajax({
    type:"GET",
    url:"getallinfluencers.php",
    async: false,
    success:function(result)
    {
      newJSON = JSON.parse(result);
      oldJSON = JSON.parse(result);
    },
    error:function()
    {
      alert("error!");
    }
  });
  var i;
  for(i = 0;i<newJSON.influencers.length;i++)
  {
    if(newJSON.influencers[i].id == influencer_id)
      break;
  }
  newJSON.influencers[i].first_name = jQuery("#modal_first_name_input").val();
  newJSON.influencers[i].last_name = jQuery("#modal_last_name_input").val();
  newJSON.influencers[i].blog = jQuery("#modal_blog_input").val();
  newJSON.influencers[i].facebook = jQuery("#modal_facebook_input").val();
  newJSON.influencers[i].instagram = jQuery("#modal_instagram_input").val();
  newJSON.influencers[i].pinterest = jQuery("#modal_pinterest_input").val();
  newJSON.influencers[i].vine = jQuery("#modal_vine_input").val();
  newJSON.influencers[i].youtube = jQuery("#modal_youtube_input").val();
  newJSON.influencers[i].other_media = jQuery("#modal_other_input").val();
  newJSON.influencers[i].country = jQuery("#modal_country_input").val();
  newJSON.influencers[i].email = jQuery("#modal_email_input").val();
  newJSON.influencers[i].status = jQuery("#modal_status_input").val();
  
  var jsonString = JSON.stringify(newJSON);
  jQuery.ajax({
    type:"POST",
    data:{"data":jsonString},
    url:"saveallinfluencers.php",
    success: function(result)
    {
      var resultJson = JSON.parse(result);
      if(resultJson.status == "error")
      {
        alert(resultJson.message);
        newJSON = oldJSON;
        return;
      }
      else
      {
        alert("Update succeeded!");
        jQuery('#myModal').modal('hide');
        oldJSON = newJSON;
        showPage(0);
      }
    },
    error:function()
    {
      alert("error!");
    }
  });
}