document.addEventListener("onload", localConsiderShowingFolderVideoOptions('cmn'));

function localConsiderShowingFolderVideoOptions(folder){
    if (!localGetPreferenceValue("mc2PrimaryVideoLanguage")){
            localDisplayPrimaryVideoOptions('showVideoOptions');
    }
}

function localDisplayPrimaryVideoOptions(div, video_type = "all"){ 
    var language = localGetDisplayLanguage();
    var data = localVideoData();
    // select language
    var title_text = '<div class="alert"><form onsubmit="localSavePrimaryVideoOption();">' + "\n" + '<h3>' + data.select_language[language] + '</h3>'+ "\n";
    var select_text = '<select name="local_video_options" id="local_video_options">'+ "\n";
    var options = data.languages;
    var length = data.languages.length;
    var option_text = '';
    var temp = '';
    for (var i =0; i < length; i++){
        if (video_type == 'all' || data.languages[i][video_type] ){
            option_text =  '<option value="' + data.languages[i]['english'] + '">' + data.languages[i][language] + '</option>' + "\n";
            temp = select_text.concat(option_text);
            select_text = temp;
        }
    }
    option_text = '</select>' + "\n";
    temp = select_text.concat(option_text);
    select_text = temp;
    //hidden
    var hidden_text1 =  '<input type="hidden" id="video_div" name="video_div" value="' + div + '">' + "\n";
    var hidden_text2 =  '<input type="hidden" id="video_type" name="video_type" value="' + video_type + '">' + "\n";
    // submit
    var submit_text =  '<input type="submit" value="' + data.save[language] + '">' + "\n" + '</form></div>';
    // put together
    document.getElementById(div).innerHTML = title_text + select_text + hidden_text1 + hidden_text2 + submit_text; 

};

function localSavePrimaryVideoOption(){
	var data = localVideoData();
    var videoOption = document.getElementById("local_video_options").value;
	localSetPreference("mc2PrimaryVideoLanguage", videoOption);
	var div = document.getElementById("video_div").value;
    var video_type = document.getElementById("video_type").value;
    if (video_type == 'all'){
        if( videoOption != data.default_video_language){
            mc2DisplayAlternativeVideoOption(div);
        }
        else{
            localRemovePreference("mc2AlternativeVideoLanguage");
             mc2ChangeVideosDisplayed();
        }
    }
}

//  helper functions
function localFolder(){
  return 'cmn';
}
function localGetPreferenceValue(preference, alternative = null){
    var data = localGetVideoPreferences();
    if (!data){
        return null;
    }
    var value = null;
    var folder = localFolder();
    for (var i = 0; i < data.length; i++) {
        if (data[i].folder === folder) {
            value = data[i][preference] ;
            break;
        }
    }
    if (!value){
        value = alternative;
    }
    return value;
}
function localSetPreference(preference, value){
    var data = mc2GetVideoPreferences();
    var folder = localFolder();
    var found = false;
    if (data.length > 0){
        for (var i = 0; i < data.length; i++) {
            if (data[i].folder === folder) {
              data[i][preference] = value;
              found = true;
              break;
            }
        }
        if (!found){
            var row = '{"folder": "' + folder +'", "' + preference + '": "' + value +'"}';
            var obj = JSON.parse(row);
            data.push(obj);
        }
    }
    else{
        var row = '[{"folder": "' + folder +'", "' + preference + '": "' + value +'"}]';
        data = JSON.parse(row);
    }
    localSaveVideoPreferences(data);
}
function localRemovePreference(preference){
    var data = mc2GetVideoPreferences(); 
    var folder = localFolder();
    for (var i = 0; i < data.length; i++) {
        if (data[i].folder === folder) {
           delete data[i][preference] ;
           break;
        }
    }
    localSaveVideoPreferences(data); 
}
function localGetVideoPreferences(){
    if (window.localStorage.getItem("mc2VideoPreferences")){
        return JSON.parse(window.localStorage.getItem("mc2VideoPreferences"));
    }
    return null;
}
function localSaveVideoPreferences(raw_data){
    var data = JSON.stringify(raw_data);
    window.localStorage.setItem("mc2VideoPreferences", data);
}
function localGetDisplayLanguage(){
    var data = localVideoData();
    if (data.default_display_language){
        return data.default_display_language;
    }
    return null;
}
function localVideoData(){
    var local = `
    {
        "content_folder": "M2/eng",
        "default_display_language": "english",
        "default_video_language": "English",
        "alternative_language": {
            "english": "Do you want to watch a video in English if we do not have the video in your prefered language?",
            "simplified": "如果没有您想要的语言视频，您会想看普通话的视频吗？",
            "traditional": "如果没有您想要的语言视频，您会想看普通话的视频吗？"
        },
        "save": {
            "english": "Save",
            "simplified": "保存",
            "traditional": "保存"
        },
        "select_language": {
            "english": "Prefered language for videos",
            "simplified": "视频的首选语言",
            "traditional": "視頻的首選語言"
        },
        "change_language": {
            "english": "Change language for videos",
            "simplified": "更改视频语言 ",
            "traditional": "更改視頻語言"
        },
        "yes": {
            "english": "Yes",
            "simplified": "确定",
            "traditional": "確定"
        },
        "no": {
            "english": "No",
            "simplified": "取消",
            "traditional": "取消"
        },
        
        "languages": [
		{
			{
                "jfilm": "1_529",
                "acts" : "2_529",
                "lumo": "6_529", 
                "folder": "english.html",
                "english": "English",
                "simplified": "英语",
                "traditional": "英語"
            },
			{
                "jfilm": "1_496",
                "acts" : "2_21028",
                "lumo": "6_21028", 
                "folder": "spanish-latin-american.html",
                "english": "Spanish",
				"french": "Espagnol ",
                "simplified": "西班牙语",
                "traditional": "西班牙語 "
            },
			{
                "jfilm": "1_496",
                "acts" : "2_496",
                "lumo": "6_496", 
                "folder": "french.html",
                "english": "French",
				"french": "Français",
                "simplified": "法语",
                "traditional": "法語 "
            },
            
        ]
    }`;
    var data = JSON.parse(local);
    return data;
}