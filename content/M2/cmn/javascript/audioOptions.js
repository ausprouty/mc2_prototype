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

