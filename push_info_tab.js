function $(id) {
    return document.getElementById(id);
}

function push_info_tab(id) {
    for (var i of $("push_info_main").children[0].children) {
        i.style.backgroundColor = "#fff"
    }
    for (var i of $("push_info_main_body").children) {
        i.style.display = "none";
    }
    $("push_info_content_" + id).style.display = "block";
    $("push_info_tab_" + id).style.backgroundColor = "#d6eefb";
}