
function mc2FindVideos(){
	var coll = document.getElementsByClassName("external-movie");
	var i;
	for (i = 0; i < coll.length; i++) {
    var c = coll[i].nextElementSibling;
    var vid = c.innerHTML;
    if (mc2VideoShouldBeShown(vid)) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          this.classList.remove('revealed');
          this.classList.add('external-movie');
        } else {
          // modify content
          var video = content.innerHTML;
          if (!video.match(/<iframe/g)){
            var iframe =  mc2CreateIframeArclight(video);
            content.innerHTML = iframe;
          }
          content.style.display = "block";
          this.classList.remove('external-movie');
          this.classList.add('revealed');
        }
      });
    }
    else{
      coll[i].classList.add('hidden');
     
    }
	}
}
function mc2VideoShouldBeShown(video){
  var shown =  mc2FindLanguageCodeForVideo(video);
  return shown;

}
function mc2CreateIframeArclight(video){
  var language = window.localStorage.getItem("mc2InterfaceLanguage","english" );
  var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
  var change_language = data.change_language[language];
  var template = `<div class="arc-cont">
    <iframe src="https://api.arclight.org/videoPlayerUrl?refId=[video]" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
  <style>.arc-cont{position:relative;display:block;margin:10px auto;width:100%}.arc-cont:after{padding-top:59%;display:block;content:""}.arc-cont>iframe{position:absolute;top:0;bottom:0;right:0;left:0;width:98%;height:98%;border:0}</style>
  </div>
  <div id="Change[video]" class="changeLanguage" onClick="changeVideoLanguage('Change[video]')"> [ChangeLanguage] </div>
  `; 
  var video = mc2FindLanguageCodeForVideo(video);
  var temp = template.replaceAll("[video]", video);
  var iframe = temp.replace("[ChangeLanguage]", change_language);
  return iframe;
}
function mc2FindLanguageCodeForVideo(video){
  var yourVideo = null;
  var languageCode = null;
  if (video.match(/\[acts\]/g)){
    languageCode = mc2GetLanguageCodeForVideo('acts');
    if (languageCode){
      yourVideo = video.replace('[acts]', languageCode);
    }
    return yourVideo;
  }
  if (video.match(/\[jfilm\]/g)){
    languageCode = mc2GetLanguageCodeForVideo('jfilm');
    if (languageCode){
      yourVideo = video.replace('[jfilm]', languageCode);
    }
    return yourVideo;
  }
  if (video.match(/\[lumo\]/g)){
    languageCode = mc2GetLanguageCodeForVideo('lumo');
    if (languageCode){
      yourVideo = video.replace('[lumo]', languageCode);
    }
    return yourVideo;
    //todo: also need to replace English
  }
  if (video.match(/\[vimeo\]/g)){
    languageCode = mc2GetLanguageCodeForVideo('vimeo');
    if (languageCode){
      yourVideo = video.replace('[vimeo]', languageCode);
    }
    return yourVideo;
  }
  return yourVideo;

}
function mc2GetLanguageCodeForVideo(video_code){
  var language = window.localStorage.getItem("mc2PrimaryAudioLanguage","English" );
  var code = mc2LanguageCodeForVideo (language, video_code);
 
  if (!code){
    language = window.localStorage.getItem("mc2AlternativeAudioLanguage","English" );
    code = mc2LanguageCodeForVideo (language, video_code);
  }
  if (!code){
    language = "English";
    code = mc2LanguageCodeForVideo (language, video_code);
  }
  return code;

}
function mc2LanguageCodeForVideo (language, video_code){
  var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
  for (var i = 0; i < data.languages.length; i++){
    if (data.languages[i].english == language){
      if (data.languages[i][video_code]){
        return data.languages[i][video_code];
      }
      else{
        return null;
      }
    }
  }
  return null;
  

}
function mc2ChangeVideoLanguage(div){
  mc2DisplayPrimaryAudioOptions(div);
}

async function mc2DisplayPrimaryAudioOptions(div){
  var language = getInterfaceLanguage();
  var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
  console.log (data);
  // select language
  var title_text = '<div class="alert"><form onsubmit="savePrimaryAudioOption();">' + "\n" + '<h3>' + data.select_language[language] + '</h3>'+ "\n";
  var select_text = '<select name="audio_options" id="audio_options">'+ "\n";
  var options = data.languages;
  var length = data.languages.length;
  var option_text = '';
  var temp = '';
  for (var i =0; i < length; i++){
    option_text =  '<option value="' + data.languages[i][language] + '">' + data.languages[i][language] + '</option>' + "\n";
    temp = select_text.concat(option_text);
    select_text = temp;
  }
  option_text = '</select>' + "\n";
  temp = select_text.concat(option_text);
  select_text = temp;
  //hidden
  var hidden_text =  '<input type="hidden" id="audio_div" name="audio_div" value="' + div + '">' + "\n";
  // submit
  var submit_text =  '<input type="submit" value="' + data.save[language] + '">' + "\n" + '</form></div>';
  // put together
  document.getElementById(div).innerHTML = title_text + select_text + hidden_text + submit_text; 

};

function mc2SavePrimaryAudioOption(){
	var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
    var audioOption = document.getElementById("audio_options").value;
	window.localStorage.setItem("mc2PrimaryAudioLanguage", audioOption);
	var div = document.getElementById("audio_div").value;

    if( audioOption != data.default_audio_language){
		mc2DisplayAlternativeAudioOption(div);
	}
	else{
		 window.localStorage.removeItem("mc2AlternativeAudioLanguage");
		 mc2ChangeVideosDisplayed();
	}
}
function mc2DisplayAlternativeAudioOption(div){
	var language = getInterfaceLanguage();
  var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
	var form_text = '<div class="alert"><form onsubmit="saveAlternateAudioOption();">' + "\n";
	var alternative_text = '<h3>' + data.alternative_language[language] + '</h3>'+ "\n";
	var temp1 = '<input type="radio" id="yes" name="alternative" value="yes">' + "\n";
	var temp2 = '<label for="no">' + data.yes[language] + '</label><br>' + "\n";
	var temp3 = ' <input type="radio" id="no" name="alternative" value="no">' + "\n";
	var temp4= '<label for="yes">' + data.no[language] + '</label><br></br>' + "\n";
	var temp = alternative_text.concat(temp1, temp2, temp3, temp4);
	alternative_text = temp;
	//hidden
	var hidden_text =  '<input type="hidden" id="audio_div" name="audio_div" value="' + div + '">' + "\n";
	var submit_text =  '<input type="submit" value="' + data.save[language] + '">' + "\n" + '</form></div>';
	// put together
	var message = form_text + alternative_text + hidden_text + submit_text;
	document.getElementById(div).innerHTML =  message;
	
}
function mc2SaveAlternateAudioOption(){
    if (document.getElementById("yes").checked){
		var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
        window.localStorage.setItem("mc2AlternativeAudioLanguage", data.default_audio_language);
    }
    else{
        window.localStorage.removeItem("mc2AlternativeAudioLanguage");
    }
	var div = document.getElementById("audio_div").value;
    mc2ChangeVideosDisplayed();
}
