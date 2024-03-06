var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');  //核心套件，具有url.parse()方法，能解析url

//所有的留言放在此陣列
var comments = [
    {
        name: 'A',
        message: '早安你好嗎',
        dateTime: '06:00:00'
    }
];


http
    .createServer(function(req,res) {
        // 對於這種表單提交的請求路徑(?name=名字&message=你好)，由於其中具有用戶動態填寫的內容
        // 所以不可能透過完整的url路徑(req.url)來判斷這個請求，此時就需要url.parse().query來單獨取得?name=名字&message=你好
        //使用url.parse將路徑解析成一個操作方便的物件，第二個參數為true時會將此物件的query屬性值:"?name=名字&message=你好"字串轉為{name:名字, message:你好}
        var parseObj = url.parse(req.url, true);
        
        //.pathname單獨取得url不含查詢字串的部分 (也就是不含 ?之後的內容)
        var pathname = parseObj.pathname;

        if(pathname === '/') {
            fs.readFile('./views/index.html',function (err,data){
                if(err){
                    return res.end('404~~~');
                }
                var html = template.render(data.toString(), {
                    Comments: comments
                })
                res.end(html);
            })
        } else if (pathname === '/pinglun') {
            //表單發送的request對應此，透過 parseObj.query 取得查詢字串
            // console.log(parseObj.query); => {name:名字, message:你好}
            // 原本是下方程式，但想讓分和秒能夠在個位數時，前面加0
            // parseObj.query.dateTime = new Date().getHours() +':'+ new Date().getMinutes(); +':'+ new Date().getSeconds(); // => {name:名字, message:你好, dateTime: 6:00:00}
            const hours = new Date().getHours().toString().padStart(2, '0');
            const minutes = new Date().getMinutes().toString().padStart(2, '0');
            const seconds = new Date().getSeconds().toString().padStart(2, '0');
            parseObj.query.dateTime = hours + ':' + minutes + ':' + seconds;
            // push進comments陣列
            comments.push(parseObj.query);
            //server這時已經存好數據了，接著讓使用者跳轉回首頁
            //如何通過server讓客戶端重新導向?
            //  1.status為302 臨時重新導向
            //      statusCode
            //  2.在response中透過Location告訴客戶端往哪重新定向
            //      setHeader
            //如果客戶端發現stauts為302的話，就會自動去response header找Location，以便發出新的頁面請求
            res.statusCode = 302;
            res.setHeader('Location' , '/');  //  /等於http://127.0.0.1:3000 <-- cmd 打 node app.js 後，去的網址
            res.end(); //記得要結束響應
        } else if (pathname.indexOf('/public/') === 0) {
            // 請求的靜態檔案
            // /public/css/main.css
            // /public/js/main.js
            //...
            //統一處理:
            //  如果請求路徑是以/public/開頭的，則可以直接把請求路徑當作文件路徑來進行讀取
            fs.readFile('.'+pathname,function(err,data) {  // .不能省!!!
                if(err) {
                    return res.end('404!!!!');
                }
                res.end(data);
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html',function(err,data) {
                if(err) {
                    return res.end('404');
                }
                res.end(data);
            })
        } else {
            fs.readFile('./views/404.html',function(err,data) {
                res.end(data);
            })
        }
    })
    .listen(3000,function() {
        console.log('running...');
    });