// 加载css文件
function loadCssFile(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
// 测试
/*
loadCssFile("css/secondindex.css");
*/

// 卸载css文件
function unloadCssFile(url){
    let t = $("link[href='"+url+"']");
    if (t.length != 0){
        t.remove();
    }
}
// 测试
/*
loadCssFile("css/secondindex.css");
unloadCssFile("css/secondindex.css");
*/

// 加载css文本
function loadCssString(cssText) {
    var style = document.createElement("style");
    style.type = "text/css";
    try{
     // firefox、safari、chrome和Opera
     style.appendChild(document.createTextNode(cssText));
    }catch(ex) {
     // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
     style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}
// 测试
/*
    var css = "body{color:blue;}";
    loadCssString(css);
*/

// 加载js文件
function loadJsFile(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}// 测试  loadScript("javascript/lib/cookie.js");

// 加载js文本
function loadJsString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try{
     // firefox、safari、chrome和Opera
     script.appendChild(document.createTextNode(code));
    }catch(ex) {
     // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
     script.text = code;
    }
    document.body.appendChild(script);
}
// 测试
/*
var text = "function test(){alert('test');}";
loadJsString(text);
test();
*/