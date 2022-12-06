function $(id){
    return document.getElementById(id);
}
function task_list_tab(id){
    for(var i of $("task_list_content").children){
        i.style.display="none";
    }
    $("task_list_content_"+id).style.display="block";
    for(var i of $("task_list_tab").getElementsByTagName('li')){
        i.firstChild.style.background="url('./img/task_tab_out_l.png') no-repeat";
        i.firstChild.firstChild.style.background="url('./img/task_tab_out_r.png') right";
    }
    $("task_list_tab_"+id).firstChild.style.background="url('./img/task_tab_on_l.png') no-repeat";
    $("task_list_tab_"+id).firstChild.firstChild.style.background="url('./img/task_tab_on_r.png') right";
}