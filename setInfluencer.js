/**
 * Created by developer on 12/12/15.
 */

var oldJSON;
var oldJsonObj;
var newJSON;
var newJsonObj;

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

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

//remove image div
function closestDiv() {
    ((event.currentTarget).closest("div")).remove();
}

//display the page with JSON object
function parseJSON(JSONObj) {
    //set sort by
    document.getElementById("sort_order_select").value = JSONObj.sort_by;

    //set hashtag
    jQuery(".tag_button").remove();
    for (var i = 0; i < JSONObj.hashtag.length; i++) {
        jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + JSONObj.hashtag[i] + "</button>");
        jQuery(".tag_button").click(function (event) {
            remove_hashtag_button(event)
        });
    }

    //set media blocks
    jQuery("#media_block").html("");
    for(var i = 0;i<JSONObj.media_blocks.length;i++)
    {
        jQuery("#media_block").append(
            "<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2 chunk_div media_div'>"+
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"icon\" src='"+JSONObj.media_blocks[i].image+"' alt=\"No file chosen\"/>" +
            "<div class=\"entry\">描述: <input type=\"text\" class=\"entry_input media_description\" value='"+JSONObj.media_blocks[i].description+"'/></div>" +
            "<div class=\"entry\">链接: <input type=\"text\" class=\"entry_input media_link\" value='"+JSONObj.media_blocks[i].link+"'/></div>" +
            "</div>"
        );
    }

    //set table
    var entrieshtml = "";
    entrieshtml += "<table class='table'>";
    //header of table
    entrieshtml += "<thead>";
    entrieshtml += "<tr>";
    entrieshtml += "<th>Profile Image 头像</th>";
    entrieshtml += "<th>Name 姓名</th>";
    entrieshtml += "<th>Operations 操作</th>";
    entrieshtml += "<th>Curation Picture 展示页图片</th>";
    entrieshtml += "</tr>";
    entrieshtml += "</thead>";

    entrieshtml += "<tbody>";
    for (var i = 0; i < JSONObj.influencers.length; i++) {
        entrieshtml += "<tr>";
        entrieshtml += "<th><img class='icon' src='" + JSONObj.influencers[i].profile_icon + "'></img></th>";
        entrieshtml += "<th class=\"name\">" + JSONObj.influencers[i].name + "</th>";
        entrieshtml += "<th class=\"function_button_wrapper\"><button class=\"btn btn-link\" id='editbutton" + JSONObj.influencers[i].id + "' data-toggle=\"modal\" data-target=\"#myModal\" onclick='viewandedit(event)'>view&edit 查看并编辑</button><br><button class=\"btn btn-link\" id='deletebutton" + JSONObj.influencers[i].id + "' onclick='deleteentry(event)'>delete 删除</button></th>";
        var isChecked = JSONObj.influencers[i].show_curation == 1 ? "checked" : "";
        var DisplayCuration = JSONObj.influencers[i].show_curation == 1 ? "block" : "none";
        entrieshtml += "<th><input type='checkbox' id='showCurationCheckbox" + JSONObj.influencers[i].id + "' onclick='checkShowCuration(event)' " + isChecked + ">Show in the curation page</input><br><div style='float:left;margin-right:20px;display:" + DisplayCuration + ";'><input type='file' class='fileUpload' onchange='UpLoadCurationImageBig(event)'></input><img class='icon' src='" + JSONObj.influencers[i].curation_image_big + "'></img><br><font>Big Image (1495*468) </font></div><div style='display:" + DisplayCuration + ";'><input type='file' class='fileUpload' onchange='UpLoadCurationImageSmall(event)'></input><img class='icon' src='" + JSONObj.influencers[i].curation_image_small + "'></img><br><font>Small Image (min-width: 970) </font></div></th>";
        entrieshtml += "</tr>";
    }
    entrieshtml += "</tbody>";
    entrieshtml += "</table>";
    jQuery("#entries").html(entrieshtml);
}

function checkShowCuration(event) {
    var uploadDivs = event.target.parentNode.getElementsByTagName("div");
    var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("showCurationCheckbox") + 20);//get the influencer's id
    var id = parseInt(id_str);
    var i;
    for (i = 0; i < newJsonObj.influencers.length; i++) {
        if (newJsonObj.influencers[i].id == id)
            break;
    }
    if (event.target.checked) {
        jQuery(uploadDivs).css("display", "block");
        newJsonObj.influencers[i].show_curation = 1;
    }
    else {
        jQuery(uploadDivs).css("display", "none");
        newJsonObj.influencers[i].show_curation = 0;
        newJsonObj.influencers[i].curation_image_big = "";
        newJsonObj.influencers[i].curation_image_small = "";
    }
}

function UpLoadCurationImageBig(event) {
    UpLoadFile(event);
    var target = event.target;
    var parent = target.parentElement;
    var imgtag = parent.getElementsByTagName("img")[0];
    var imgSrc = jQuery(imgtag).attr("src");

    var checkboxBeside = jQuery(event.target.parentElement.parentElement).children("input")[0];
    var id_str = jQuery(checkboxBeside).attr("id").substring(jQuery(checkboxBeside).attr("id").indexOf("showCurationCheckbox") + 20);//get the influencer's id
    var id = parseInt(id_str);
    var i;
    for (i = 0; i < newJsonObj.influencers.length; i++) {
        if (newJsonObj.influencers[i].id == id)
            break;
    }
    newJsonObj.influencers[i].curation_image_big = imgSrc;
}

function UpLoadCurationImageSmall(event) {
    UpLoadFile(event);
    var target = event.target;
    var parent = target.parentElement;
    var imgtag = parent.getElementsByTagName("img")[0];
    var imgSrc = jQuery(imgtag).attr("src");

    var checkboxBeside = jQuery(event.target.parentElement.parentElement).children("input")[0];
    var id_str = jQuery(checkboxBeside).attr("id").substring(jQuery(checkboxBeside).attr("id").indexOf("showCurationCheckbox") + 20);//get the influencer's id
    var id = parseInt(id_str);
    var i;
    for (i = 0; i < newJsonObj.influencers.length; i++) {
        if (newJsonObj.influencers[i].id == id)
            break;
    }
    newJsonObj.influencers[i].curation_image_small = imgSrc;
}

//view and edit an influencer entry
function viewandedit(event) {
    //alert(jQuery(event.target).attr("id"));
    var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("editbutton") + 10);//get the influencer's id
    var id = parseInt(id_str);
    var i;
    for (i = 0; i < newJsonObj.influencers.length; i++) {
        if (newJsonObj.influencers[i].id == id)
            break;
    }
    var currentInfluencer = newJsonObj.influencers[i];
    readFromJson(currentInfluencer);
}

function createInfluencer() {
    var emptyJson = jQuery.parseJSON('{"id":0,"name":"","profile_icon":"","description":"","big_image":"","blog":[{"img":  "","description": ""}],' +
        '"style":[{"img":"","link":""}],' +
            //'"style":[{"img":"","main_title":"","subtitle":"","link":""}],'+
        '"picks":[]}');
    readFromJson(emptyJson);
}

function remove_hashtag_button(event) {
    //find the removed hashtag content in newjsonobj
    var j = 0;
    for (; j < newJsonObj.hashtag.length; j++) {
        if (newJsonObj.hashtag[j] == event.currentTarget.innerHTML)
            break;
    }
    newJsonObj.hashtag.splice(j, 1);
    event.currentTarget.remove();
}


//delete an influencer entry
function deleteentry(event) {
    //alert(jQuery(event.target).attr("id"));
    if (confirm("Are you sure to delete?") == false)
        return;
    var id_str = jQuery(event.target).attr("id").substring(jQuery(event.target).attr("id").indexOf("deletebutton") + 12);//get the influencer's id
    var id = parseInt(id_str);
    //delete the influencer with this id
    var i;
    for (i = 0; i < newJsonObj.influencers.length; i++) {
        if (newJsonObj.influencers[i].id == id)
            break;
    }
    newJsonObj.influencers.splice(i, 1);
    parseJSON(newJsonObj);
}

//remove image div
function test() {
    ((event.currentTarget).closest("div")).remove();
}

function escapeDoubleQuotation(string) {
    return string.replace('"', '\"', 'g');
}

var influencer_id;

//write the detail page into json object
function writeToJson() {
    var modalbody = jQuery(".modal-body")[0];

    var jsonObj = {
        "id": influencer_id,
        "name": jQuery("#name")[0].value,
        "profile_icon": jQuery("#icon_img", modalbody).attr("src"),
        "description": (jQuery("#description", modalbody)[0]).value,
        "big_image": jQuery("#background_img", modalbody).attr("src"),
        "blog": [],
        "style": [],
        "picks": []
    };

    var blog_div = jQuery("#blog_div");
    var blogs = jQuery(".chunk_div", blog_div);
    for (var i = 0; i < blogs.length; i++) {
        jsonObj.blog[i] = {
            "img": jQuery("img", blogs[i]).attr("src"),
            "description": (jQuery("textarea", blogs[i])[0]).value
        }

    }

    var style_div = jQuery("#style_div");
    var styles = jQuery(".chunk_div", style_div);
    for (var i = 0; i < styles.length; i++) {
        jsonObj.style[i] = {
            "img": jQuery("img", styles[i]).attr("src"),
            "link": jQuery("input", styles[i])[1].value
        }
    }

    var picks_div = jQuery("#picks_div");
    var picks = jQuery(".chunk_div", picks_div);
    for (var i = 0; i < picks.length; i++) {
        jsonObj.picks[i] = escapeHtml(picks[i].children[1].value);
        console.log("Test0206:" + picks[i].children[0]);
        console.log("Test0206:" + picks[i].children[1].value);
    }

    console.log(jsonObj);

    //change new Json Object
    if (influencer_id == 0) {
        jsonObj.show_curation = 0;
        jsonObj.curation_image_big = "";
        jsonObj.curation_image_small = "";
        jsonObj.id = newJsonObj.global_available_id;
        newJsonObj.global_available_id++;
        jsonObj.show_curation = 0;
        jsonObj.curation_image_big = "";
        jsonObj.curation_image_small = "";
        newJsonObj.influencers.push(jsonObj);
    }
    else {
        var j = 0;
        for (; j < newJsonObj.influencers.length; j++) {
            if (newJsonObj.influencers[j].id == influencer_id)
                break;
        }
        jsonObj.show_curation = newJsonObj.influencers[j].show_curation;
        jsonObj.curation_image_big = newJsonObj.influencers[j].curation_image_big;
        jsonObj.curation_image_small = newJsonObj.influencers[j].curation_image_small;
        newJsonObj.influencers[j] = jsonObj;
    }


    parseJSON(newJsonObj);
}

jQuery("#save_button").click(function () {
    writeToJson();
});


//read json and display the detail page
function readFromJson(data) {
    jQuery("#blog_div").html("");
    jQuery("#style_div").html("");
    jQuery("#pick_div").html("");
    influencer_id = data["id"];
    jQuery("#name").val(data["name"]);
    jQuery("#icon_img").attr("src", data["profile_icon"]);
    jQuery("#description").val(data["description"]);
    jQuery("#background_img").attr("src", data["big_image"]);

    var blogs = data["blog"];
    for (var i = 0; i < blogs.length; i++) {
        jQuery("#blog_div").append(
            "<div class=\"chunk_div\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<input type=\"file\" class=\"fileUpload\"  onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"" +
            data["blog"][i]["img"] +
            "\" alt=\"No file chosen\"/>" +
            "<div class=\"entry\">Description: <textarea class=\"blog_description_textarea entry_textarea\">" +
            data["blog"][i]["description"] +
            "</textarea></div></div>"
        );
    }

    var styles = data["style"];
    for (var i = 0; i < styles.length; i++) {
        jQuery("#style_div").append(
            "<div class=\"chunk_div\">" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<img class=\"entry_picture\" src=\"" +
            data["style"][i]["img"] +
            "\" alt=\"No file chosen\"/>\ " +
                //"<div class=\"entry\">Main Title: <input type=\"text\" class=\"style_main_title_input entry_input\" value=\"" +
                //data["style"][i]["main_title"] +
                //"\"/></div>" +
                //"<div class=\"entry\">Subtitle: <input type=\"text\" class=\"style_subtitle_input entry_input\" value=\"" +
                //data["style"][i]["subtitle"] +
                //"\"/></div>" +
            "<div class=\"entry\">Link: <input type=\"text\" class=\"style_link_input entry_input\" value=\"" +
            data["style"][i]["link"] +
            "\"/></div>" + "</div>"
        );
    }

    jQuery("#picks_div").html("");
    //console.log(eventsJsonObj);
    //jQuery("#picks_div").html(eventsJsonObj.picks.length);
    for (var i = 0; i < data.picks.length; i++) {
        var pick = data.picks[i];
        jQuery("#picks_div").append(getPickChunk(pick));
        console.log(getPickChunk(pick));
        //console.log(getPickChunk(pick));
        //jQuery("#picks_div").append("<div>lalla</div>");
    }

    console.log(data);
    //var picks = data["picks"];
    //for(var i=0; i<picks.length; i++){
    //    jQuery("#picks_div").append(
    //        "<div class=\"chunk_div\">" +
    //        "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
    //        "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
    //        "<img class=\"entry_picture\" src=\""+
    //        data["picks"][i]["img"] +  "\" alt=\"No file chosen\"/>" +
    //        "<div class=\"entry\">Money: <input type=\"text\" class=\"pick_money_input entry_input\" value=\"" +
    //        data["picks"][i]["money"] +
    //        "\"/></div>" +
    //        "<div class=\"entry\">Link: <input type=\"text\" class=\"pick_link_input entry_input\" value=\"" +
    //        data["picks"][i]["link"] +
    //        "\"/></div>" +
    //        "<div class=\"entry\">Description: <textarea class=\"pick_description_textarea entry_textarea\">" +
    //        data["picks"][i]["description"]  +
    //        "</textarea></div></div>"
    //    );
    //}
}

function getPickChunk(code) {
    console.log(code);
    return "<div class=\"chunk_div\">" +
            //"Code Generated: <input type=\"text\" class=\"entry_input\" value=\""+escapeDoubleQuotation(code)+"\" style=\"height: 200px\">"+
        "<button class=\"remove_chunk_buttons\" onclick=\"closestDiv()\">Remove</button>" +
        "Code Generated 生成的代码: <input type=\"text\" class=\"entry_input\" value=\"" + escapeDoubleQuotation(code) + "\" style=\"height: 200px\">" +
        "</div>";
}


function UpLoadFile(event) {
    var fd = new FormData();
    fd.append("fileToUpload", event.target.files[0]);
    jQuery.ajax({
        type: "POST",
        url: "uploadfile.php",
        processData: false,
        contentType: false,
        data: fd,
        async: false,
        success: function (result) {
            //alert(result);
            var target = event.target;
            var parent = target.parentElement;
            var imgtag = parent.getElementsByTagName("img")[0];
            jQuery(imgtag).attr("src", result);
            //return result;
            //jQuery("#showimg").attr("src",result);
        },
        error: function () {
            alert("error!");
        }
    });
}

function updateAll() {
    if (confirm("Are you sure to update?") == false)
        return;
    var sortby = document.getElementById("sort_order_select");
    var selectedvalue = sortby.options[sortby.selectedIndex].value;
    newJsonObj.sort_by = selectedvalue;

    //media blocks
    var block_array = new Array();
    var media_blocks = jQuery(".media_div");
    for(var i = 0;i<media_blocks.length;i++)
    {
        var img = jQuery(".icon",media_blocks[i]);
        var description = jQuery(".media_description",media_blocks[i]);
        var link = jQuery(".media_link",media_blocks[i]);
        var oneblock={
            "image":img.attr("src"),
            "description":description.val(),
            "link":link.val()
        };
        block_array.push(oneblock);
    }
    newJsonObj.media_blocks = block_array;


    newJSON = JSON.stringify(newJsonObj);
    jQuery.ajax({
        type: "POST",
        data: {"data": newJSON},
        url: "saveinfluencerinfo.php",
        success: function (result) {
            var resultJson = JSON.parse(result);
            if (resultJson.status == "error") {
                alert(resultJson.message);
                return;
            }
            else {
                oldJSON = JSON.stringify(newJsonObj);
                oldJsonObj = JSON.parse(oldJSON);
                parseJSON(oldJsonObj);
                alert("Update succeeded!");
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

jQuery(document).ready(function () {

    jQuery.ajax({
        type: "GET",
        url: "getinfluencerinfo.php",
        success: function (result) {
            oldJSON = result;
            oldJsonObj = JSON.parse(result);
            newJSON = result;
            newJsonObj = JSON.parse(result);
            parseJSON(oldJsonObj);
        },
        error: function () {
            alert("error!");
        }
    });


    jQuery("#create_button").click(function () {
        createInfluencer();
    });

    jQuery("#reset_button").click(function () {
        newJSON = oldJSON;
        newJsonObj = JSON.parse(newJSON);
        parseJSON(oldJsonObj);
    });

    var input_open = false;
    var new_tag_content = "";
    var tags = [];

    jQuery("#add_tag_button").click(function () {

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

    });

    jQuery("#add_media").click(function(){
        var media_block = "";
        media_block +=
                "<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2 chunk_div media_div'>"+
                "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
                "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
                "<img class=\"icon\" src=\"\" alt=\"No file chosen\"/>" +
                "<div class=\"entry\">描述: <input type=\"text\" class=\"entry_input media_description\"/></div>" +
                "<div class=\"entry\">链接: <input type=\"text\" class=\"entry_input media_link\"/></div>" +
                "</div>";
        jQuery("#media_block").append(media_block);
    });

    function input_confirm() {
        if (new_tag_content.length != 0) {
            jQuery("#tag_pool").prepend("<button class=\"tag_button btn btn-default\">" + new_tag_content + "</button>");
            newJsonObj.hashtag.push(jQuery("#new_tag_input").val());
            jQuery("#new_tag_input").remove();
            input_open = false;
            jQuery(".tag_button").click(function (event) {
                remove_hashtag_button(event)
            });
        }
    }


    //Chunk

    jQuery("#blog_add_button").click(function () {
        jQuery("#blog_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
            "<div class=\"entry\">Description: <textarea class=\"blog_description_textarea entry_textarea\"></textarea></div></div>"
        );
    });

    jQuery("#style_add_button").click(function () {
        console.log("style_add_button clicked");
        jQuery("#style_div").append(
            "<div class=\"chunk_div\">" +
            "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
            "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
            "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
                //"<div class=\"entry\">Main Title: <input type=\"text\" class=\"style_main_title_input entry_input\"/></div>" +
                //"<div class=\"entry\">Subtitle: <input type=\"text\" class=\"style_subtitle_input entry_input\"/></div>" +
            "<div class=\"entry\">Link: <input type=\"text\" class=\"style_link_input entry_input\"/></div></div>"
        );
    });

    //jQuery("#pick_add_button").click(function(){
    //    jQuery("#pick_div").append(
    //        "<div class=\"chunk_div\">" +
    //        "<input type=\"file\" class=\"fileUpload\" onchange='UpLoadFile(event)'>" +
    //        "<button class=\"remove_chunk_buttons\" onclick=\"test()\">Remove</button>" +
    //        "<img class=\"entry_picture\" src=\"\" alt=\"No file chosen\"/>" +
    //        "<div class=\"entry\">Money: <input type=\"text\" class=\"pick_money_input entry_input\"/></div>" +
    //        "<div class=\"entry\">Link: <input type=\"text\" class=\"pick_link_input entry_input\"/></div>" +
    //        "<div class=\"entry\">Description: <textarea class=\"pick_description_textarea entry_textarea\"></textarea></div></div>"
    //    );
    //});

    jQuery("#picks_add_btn").click(function () {
        console.log(getPickChunk(""));
        jQuery("#picks_div").append(
            getPickChunk("")
        );
    });
});