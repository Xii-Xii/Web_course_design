//实现新闻从本地数据库中随机排版，因为js不能调用本地json文件
function $(id) {
    return document.getElementById(id);
}

var db, tx, store;
var str = "";
var request = window.indexedDB.open("mynewslist", 1);
//捕获连接失败事件，并处理
request.onerror = function (event) {
    alert("数据库连接失败：" + event.target.errorCode);	//提示错误信息
}
request.onupgradeneeded = function (event) {
// 当此数据库创建前不存在时，进行初始化
    db = request.result;
    store = db.createObjectStore("news", {keyPath: "newsNo"});
    var Index = store.createIndex("by_newsNo", "newsNo", {unique: true});
    initDB();	// 初始化数据
}
//捕获连接成功事件，并处理
request.onsuccess = function (event) {
    db = event.target.result;
    pushNews();
    console.log("数据库连接成功");
}

function initDB() {
    var newslist = [//浏览器不让js访问本地的json文件，所以新闻写在对象数据里
        {newsNo: 1, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 2, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 3, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 4, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 5, cnt: "数字经济催生“新新职业”"},
        {newsNo: 6, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 7, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 8, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 9, cnt: "光明网报道任务中国威客网"},
        {newsNo: 10, cnt: "人民日报报道中国威客网"},
        {newsNo: 11, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 12, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 13, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 14, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 15, cnt: '数字经济催生“新新职业”'},
        {newsNo: 16, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 17, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 18, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 19, cnt: "光明网报道任务中国威客网"},
        {newsNo: 20, cnt: "人民日报报道中国威客网"},
        {newsNo: 21, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 22, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 23, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 24, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 25, cnt: '数字经济催生“新新职业”'},
        {newsNo: 26, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 27, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 28, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 29, cnt: "光明网报道任务中国威客网"},
        {newsNo: 30, cnt: "人民日报报道中国威客网"},
        {newsNo: 31, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 32, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 33, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 34, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 35, cnt: '数字经济催生“新新职业”'},
        {newsNo: 36, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 37, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 38, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 39, cnt: "光明网报道任务中国威客网"},
        {newsNo: 40, cnt: "人民日报报道中国威客网"},
        {newsNo: 41, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 42, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 43, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 44, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 45, cnt: '数字经济催生“新新职业”'},
        {newsNo: 46, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 47, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 48, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 49, cnt: "光明网报道任务中国威客网"},
        {newsNo: 50, cnt: "人民日报报道中国威客网"},
        {newsNo: 51, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 52, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 53, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 54, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 55, cnt: '数字经济催生“新新职业”'},
        {newsNo: 56, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 57, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 58, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 59, cnt: "光明网报道任务中国威客网"},
        {newsNo: 60, cnt: "人民日报报道中国威客网"},
        {newsNo: 61, cnt: "中央电视台报道任务中国威客网"},
        {newsNo: 62, cnt: "《经理人》杂志专访任务中国CEO钟聪华"},
        {newsNo: 63, cnt: "《工人日报》：威客凭智慧靠能力灵活就"},
        {newsNo: 64, cnt: "《深圳晶报》报道任务中国：凭智慧可网上淘金"},
        {newsNo: 65, cnt: '数字经济催生“新新职业”'},
        {newsNo: 66, cnt: '"绿灯"投资案例将集中推出'},
        {newsNo: 67, cnt: "推动平台经济规范健康持续发展"},
        {newsNo: 68, cnt: "阿里巴巴合作伙伴"},
        {newsNo: 69, cnt: "光明网报道任务中国威客网"},
        {newsNo: 70, cnt: "人民日报报道中国威客网"}
    ];
    for (var i = 0; i < newslist.length; i++) {
        var req = store.add(newslist[i]);
        req.onsuccess = function () {
            console.log("数据插入成功")
        }
        req.onerror = function () {
            console.log('数据插入失败')
        }
    }
}

function pushNews() {
    var cnt_1 = 0;
    tx = db.transaction("news", "readonly");
    store = tx.objectStore("news");
    var index = store.index("by_newsNo");
    var cnt = store.count();
    cnt.onsuccess = function (e) {
        cnt_1 = e.target.result
        low = parseInt(Math.floor(Math.random() * (cnt_1 - 4) + 1));
        console.log(low)
        var range = IDBKeyRange.bound(low, low + 3);
        var cursor = index.openCursor(range, 'next');
        var i = 0;
        cursor.onsuccess = function (e) {
            var result = e.target.result;
            if (result) {
                $('newslist').children[0].innerHTML += '<li><a href="#"><span></span>'
                    + result.value["cnt"] + '</a></li>';
                result.continue();
            } else {
                console.log("没有数据可以访问");
            }
        };
        cursor.onerror = function (e) {
            console.log("游标遍历出错");
        };
    }
}
