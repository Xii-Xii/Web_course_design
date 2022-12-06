var latest_deal_ul = $("latest_deal_ul");
var state_sec = $("latest_deal");
var latest_timer = null;
var text_move = 0;
function $(id){
    return document.getElementById(id);
}
function latest_deal_scroll(){
    if(text_move == latest_deal_ul.children.length-1){
        text_move=0;
        latest_deal_ul.style.top=0+"px";
    }
    text_move++;
    latest_deal_moving(latest_deal_ul,-text_move*26);
}
function latest_deal_pause(){
    clearInterval(latest_timer);
}
function latest_deal_restart(){
    latest_deal_scroll();
    init_latest_deal();
}
function init_latest_deal(){
    latest_timer = setInterval('latest_deal_scroll()',3000);
}
function latest_deal_moving(element,distance){
    clearInterval(element.latest_timer);
    element.latest_timer=setInterval(function (){
        var curY = element.offsetTop;
        var move = 27;
        move = curY<distance?move:-move;
        curY+=move;
        if(Math.abs(curY-distance)>Math.abs(move)){
            element.style.top=curY+"px";
        }else{
            element.style.top=distance+"px";
        }
    },500);
}