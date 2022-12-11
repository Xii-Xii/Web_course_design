var curAd = 1;
var maxAd = 2;
var timer = null;

function nextAd() {
    if (curAd == maxAd) {
        curAd = 1;
    } else {
        curAd++;
    }
    $("ranking_list_slide_1").style.display = "none";
    $("ranking_list_slide_2").style.display = "none";
    $("ranking_list_slide_" + curAd).style.display = "block";
    $("ranking_list_bottom_slide_show").style.background = "url('./img/case_090507" + curAd + ".jpg') no-repeat";
}

function lastAd() {
    if (curAd == 1) {
        curAd = maxAd;
    } else {
        curAd--;
    }
    $("ranking_list_slide_1").style.display = "none";
    $("ranking_list_slide_2").style.display = "none";
    $("ranking_list_slide_" + curAd).style.display = "block";
    $("ranking_list_bottom_slide_show").style.background = "url('./img/case_090507" + curAd + ".jpg') no-repeat";
}