function $(id){
    return document.getElementById(id);
}
function ccb_tab(id){
    for(var i of($('customer_contributions_bottom_content').children[0].children)){
        i.style.display="none";
    }
    $(id+"_content").style.display="block";
}