var curPic = 1;
var maxPic = 3;
var move = 0;
var main_timer = null;

function $(id) {
    return document.getElementById(id);
}

function pause() {
    clearInterval(main_timer);
}

function restart() {
    switchPic();
    init_main_slide();
}

function switchPic() {
    if (move == $("main_slide_show_pic").children.length - 1) {
        move = 0;
        $("main_slide_show_pic").style.left = 0 + "px";
    }
    move++;
    moving($("main_slide_show_pic"), -move * 652);
    if (curPic == maxPic) {
        curPic = 1;
    } else {
        curPic++;
    }
    $("main_slide_now").innerHTML = "" + curPic + "/3";
}

function init_main_slide() {
    main_timer = setInterval('switchPic()', 3000);
}

function lastPic() {
    if (move == 0) {
        move = $("main_slide_show_pic").children.length - 1;
        $("main_slide_show_pic").style.left = -move * 652 + "px";
    }
    move--;
    moving($("main_slide_show_pic"), -move * 652);
    if (curPic == 1) {
        curPic = maxPic;
    } else {
        curPic--;
    }
    $("main_slide_now").innerHTML = "" + curPic + "/3";
}

function moving(element, distance) {
    clearInterval(element.main_timer);
    element.main_timer = setInterval(function () {
        var curX = element.offsetLeft;
        var move = 10;
        move = curX < distance ? move : -move;
        curX += move;
        if (Math.abs(curX - distance) > Math.abs(move)) {
            element.style.left = curX + "px";
        } else {
            element.style.left = distance + "px";
        }
    }, 5);
}
