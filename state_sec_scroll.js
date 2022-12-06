var state_timer = null;
var text_move1 = 0;
function $(id){
    return document.getElementById(id);
}
function state_sec_scroll(){
    if(text_move1 == $("state_sec_ul").children.length-1){
        text_move1=0;
        $("state_sec_ul").style.top=0+"px";
    }
    text_move1++;
    state_sec_moving($("state_sec_ul"),-text_move1*32);
}
function state_sec_pause(){
    clearInterval(state_timer);
}
function state_sec_restart(){
    state_sec_scroll();
    init_state_sec();
}
function init_state_sec(){
    state_timer = setInterval('state_sec_scroll()',5000);
}
function state_sec_moving(element,distance){
    clearInterval(element.state_timer);
    element.state_timer=setInterval(function (){
        var curY = element.offsetTop;
        var move1 = 4;
        move1 = curY<distance?move1:-move1;
        curY+=move1;
        if(Math.abs(curY-distance)>Math.abs(move1)){
            element.style.top=curY+"px";
        }else{
            element.style.top=distance+"px";
        }
    },100);
}