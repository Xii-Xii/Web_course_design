function $(id) {
    return document.getElementById(id);
}

if (typeof (Storage) != "undefined") {
    console.log("您的浏览器支持web Storage");
} else {
    alert("您的浏览器不支持web Storage,部分功能将受到影响");
}

function insert(myname, mypassword, mysex) {
    var data = {
        name: myname,
        password: mypassword,
        sex: mysex
    };
    localStorage.setItem(Object.keys(localStorage).length + 1, JSON.stringify(data));//把要插入的数据存成json格式
}

function findUsername() {
    return Object.keys(localStorage).length + 1;
}

function select(username, password) {
    var flag = false;
    var searchpsw = JSON.parse(localStorage.getItem(Object.keys(localStorage).length))["password"];
    console.log(searchpsw)
    if (password == searchpsw) {
        flag = true;
    } else {
        flag = false;
    }
    return flag;
}
