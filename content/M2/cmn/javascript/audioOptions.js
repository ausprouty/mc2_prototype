document.addEventListener("onload", showAudioOptions('cmn'));

var DEFAULT_INTERFACE_LANGUAGE = 'french';
var DEFAULT_AUDIO_OPTIONS = '/content/M2/cmn/javascript/audioOptions.json';

function showAudioOptions(language){
    if (!window.localStorage.getItem("InterfaceOptions")){
        getAudioOptions();
    }
	// may not need this
    if (!window.localStorage.getItem("JFilmAudio")){
        displayAudioOptions('showAudioOptions');
    }
}
async function getAudioOptions(){
    var file = DEFAULT_AUDIO_OPTIONS;
    getJSON(file,
        function(err, data) {
			if (err !== null) {
				alert('Something went wrong here looking for file: ' + err);
			} else {
				console.log (data);
				window.localStorage.setItem("mc2InterfaceLanguage", data.default_language_display);
				window.localStorage.setItem("mc2ContentFolder", data.content_folder);
				window.localStorage.setItem("mc2AudioOptions", JSON.stringify(data));
				if (!window.localStorage.getItem("mc2PrimaryAudioLanguage")){
					displayPrimaryAudioOptions('showAudioOptions');
				}
			}
		}
	);
}
function getInterfaceLanguage(){
    if (window.localStorage.mc2InterfaceLanguage){
        return window.localStorage.getItem("mc2InterfaceLanguage");
    }
    else{
        return DEFAULT_INTERFACE_LANGUAGE;
    }
}
async function displayPrimaryAudioOptions(div){
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
function savePrimaryAudioOption(){
	var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
    var audioOption = document.getElementById("audio_options").value;
	window.localStorage.setItem("mc2PrimaryAudioLanguage", audioOption);
	var div = document.getElementById("audio_div").value;

    if( audioOption != data.default_audio_language){
		displayAlternativeAudioOption(div);
	}
	else{
		 window.localStorage.removeItem("mc2AlternativeAudioLanguage");
		 changeVideosDisplayed();
	}
}
function displayAlternativeAudioOption(div){
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
function saveAlternateAudioOption(){
    if (document.getElementById("yes").checked){
		var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
        window.localStorage.setItem("mc2AlternativeAudioLanguage", data.default_audio_language);
    }
    else{
        window.localStorage.removeItem("mc2AlternativeAudioLanguage");
    }
	var div = document.getElementById("audio_div").value;
    changeVideosDisplayed();
}

 function changeVideosDisplayed(){
	 alert('I will modify videos displayed'); 
 }
 async function getLanguageTerm(term){
    language = getInterfaceLanguage();
    var data = JSON.parse(window.localStorage.getItem("mc2AudioOptions"));
	console.log (data[term][language]);
	return data[term][language];
}


// video in form of 1_ISO-jf6101-0-0
async function showVideo(video,frame, div){
    console.log ('started showVideo');
 
    var template = `<iframe src="https://api.arclight.org/videoPlayerUrl?refId=[video]" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
        <style>.arc-cont{position:relative;display:block;margin:10px auto;width:100%}.arc-cont:after{padding-top:59%;display:block;content:""}.arc-cont>iframe{position:absolute;top:0;bottom:0;right:0;left:0;width:98%;height:98%;border:0}</style>
        <p onclick="displayAudioOptions('[div]')">[change]</p>`;
    var lang = window.localStorage.getItem("JFilmAudio");
    var new_video = video;
    if (video.includes('ISO')){
        new_video = video.replace('ISO', lang);
    }
    
    var temp = template.replace('[div]', div);
    var change = await getLanguageTerm('change');
    console.log (change);
    var temp2 = temp.replace('[change]', change);
    document.getElementById(frame).innerHTML = temp2.replace('[video]', new_video);
}
function showMonoLingualVideo(){

}

async function getJSON (urlX, callback) {
	var url = '/content/M2/cmn/javascript/audioOptions.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};