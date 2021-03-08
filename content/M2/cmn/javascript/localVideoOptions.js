document.addEventListener("onload", mc2ShowFolderVideoOptions('cmn'));

function localVideoData(){
    var local = `
    {
        "content_folder": "M2/cmn",
        "default_language_display": "simplified",
        "default_audio_language": "Mandarin",
        "alternative_language": {
            "english": "Do you want to watch a video in Mandarin if we do not have the video in your prefered language?",
            "simplified": "如果我们没有您喜欢的语言的视频，您想看普通话的视频吗？ ",
            "traditional": "如果我們沒有您喜歡的語言的視頻，您想看普通話的視頻嗎？ "
        },
        "save": {
            "english": "Save",
            "simplified": "救  ",
            "traditional": "救"
        },
        "select_language": {
            "english": "Prefered language for videos",
            "simplified": "视频的首选语言 ",
            "traditional": "視頻的首選語言 "
        },
        "change_language": {
            "english": "Change language for videos",
            "simplified": "更改视频语言 ",
            "traditional": "更改視頻語言 "
        },
        "yes": {
            "english": "Yes",
            "simplified": "是的 ",
            "traditional": "是的 "
        },
        "no": {
            "english": "No",
            "simplified": "不  ",
            "traditional": "不 "
        },
        
        "languages": [
            {
                "jfilm": "1_20601",
                "folder": "cantonese.html",
                "english": "Cantonese",
                "simplified": "广东话",
                "traditional": "廣東話"
            },
            {
                "jfilm": "1_23033",
                "folder": "chinese-foochow.html",
                "english": "Foochow",
                "simplified": "福州",
                "traditional": "福州"
            },
            {
                "jfilm": "1_53352",
                "folder": "chinese-guiliu.html",
                "english": "Guiliu",
                "simplified": "桂柳",
                "traditional": "桂柳"
            },
            {
                "jfilm": "1_13192",
                "folder": "chinese-hainanese.html",
                "english": "Hainanese",
                "simplified": "海南人",
                "traditional": "海南人"
            },
            {
                "jfilm": "1_20611",
                "folder": "chinese-hakka.html",
                "english": "Hakka",
                "simplified": "客家话",
                "traditional": "客家話"
            },
            {
                "jfilm": "1_21211",
                "folder": "chinese-hui.html",
                "english": "Hui",
                "simplified": "惠",
                "traditional": "惠"
            },
            {
                "jfilm": "1_20615",
                "acts" : "2_20615",
                "folder": "mandarin.html",
                "english": "Mandarin",
                "simplified": "普通话",
                "traditional": "普通話"
            },
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
                "jfilm": "1_24096",
                "folder": "chinese-qinghai.html",
                "english": "Qinghai",
                "simplified": "青海",
                "traditional": "青海"
            },
            {
                "jfilm": "1_20623",
                "folder": "chinese-shanghainese.html",
                "english": "Shanghainese",
                "simplified": "上海人",
                "traditional": "上海人"
            },
            {
                "jfilm": "1_23062",
                "folder": "chinese-sichuan.html",
                "english": "Sichuan",
                "simplified": "四川省",
                "traditional": "四川省"
            },
            {
                "jfilm": "1_23221",
                "folder": " chinese-taiwanese-mandarin.html",
                "english": "Taiwanese Mandarin",
                "simplified": "台湾普通话",
                "traditional": "台灣普通話"
            },
            {
                "jfilm": "1_23075",
                "folder": "chinese-teochew.html",
                "english": "Teochew",
                "simplified": "潮州",
                "traditional": "潮州"
            },
            {
                "jfilm": "1_20627",
                "folder": "chinese-xiang.html",
                "english": "Xiang",
                "simplified": "翔",
                "traditional": "翔"
            },
            {
                "jfilm": "1_23061",
                "folder": "chinese-yunnan-kunming.html",
                "english": "Yunnan (Kunming)",
                "simplified": "云南（昆明）",
                "traditional": "雲南（昆明）"
            },
            {
                "jfilm": "1_410",
                "folder": "uyghur.html",
                "english": "Uyghur",
                "simplified": "维吾尔族",
                "traditional": "維吾爾族"
            },
            {
                "jfilm": "1_21795",
                "folder": "tibetan-lhasa.html",
                "english": "Lhasa",
                "simplified": "拉萨",
                "traditional": "拉薩"
            },
            {
                "jfilm": "1_23089",
                "folder": "tibetan-amdo.html",
                "english": "Amdo",
                "simplified": "安多 ",
                "traditional": "安多 "
            }
        ]
    }`;
    var data = JSON.parse(local);
    return data;
}