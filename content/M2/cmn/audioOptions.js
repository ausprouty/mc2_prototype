document.addEventListener("onload", showAudioOptions);

function showAudioOptions(language){
    if (!window.localStorage.getItem("JFilmAudio")){
        displayAudioOptions('showAudioOptions');
    }
}
function setInterfaceLanguage(language){
    window.localStorage.setItem("mc2InterfaceLanguage", language);

}
function getInterfaceLanguage(){
    if (window.localStorage.mc2InterfaceLanguage){
        return window.localStorage.getItem("mc2InterfaceLanguage");
    }
    else{
        return DEFAULT_INTERFACE_LANGUAGE;
    }
}

async function displayAudioOptions(div){
    language = getInterfaceLanguage();
    var file = "audioOptions.json";
    getJSON(file,
        function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            console.log (data);
            // select language
            var select = '<form onsubmit="saveAudioOptions();">' + "\n" + '<h5>' + data.select[language] + '</h5>'+ "\n";
            var options = data.languages;
            var length = data.languages.length;
            var option_text = '<select name="audio_options" id="audio_options">'+ "\n";
            var option = '';
            var temp = '';
            for (var i =0; i < length; i++){
                option =  '<option value="' + data.languages[i]['jfilm'] + '">' + data.languages[i][language] + '</option>' + "\n";
                temp = option_text.concat(option);
                option_text = temp;
            }
            option = '</select>' + "\n";
            temp = option_text.concat(option);
            option_text = temp;
            // alternative
            var alternative_text = '<h5>' + data.alternative[language] + '</h5>'+ "\n";
            var temp1 = '<input type="radio" id="yes" name="alternative" value="yes">' + "\n";
            var temp2 = '<label for="no">' + data.yes[language] + '</label><br>' + "\n";
            var temp3 = ' <input type="radio" id="no" name="alternative" value="no">' + "\n";
            var temp4= '<label for="yes">' + data.no[language] + '</label><br></br>' + "\n";
            temp = alternative_text.concat(temp1, temp2, temp3, temp4);
            alternative_text = temp;
            // submit
            var submit_text =  '<input type="submit" value="' + data.save[language] + '">' + "\n" + '</form>';
            // put together
            document.getElementById(div).innerHTML = select + option_text + alternative_text + submit_text; 
        }
    });

};
async function getLanguageTerm(term){
    return term;
    var file = "audioOptions.json";
    await getJSON(file,
        function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
            return 'null';
        } else {
            var language = getInterfaceLanguage();
            console.log (data[term][language]);
            return data[term][language];

        }
    });
}

function saveAudioOptions(){
    var audioOption = document.getElementById("audio_options").value;
    var yes = 
    window.localStorage.setItem("JFilmAudio", audioOption);
    if (document.getElementById("yes").checked){
        window.localStorage.setItem("JFilmAudioBackup", 20615);
    }
    else{
        window.localStorage.removeItem("JFilmAudioBackup");
    }
    changeAudioOptions(); 
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

async function getJSON (url, callback) {
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