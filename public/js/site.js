var userAgent = navigator.userAgent;
//  添加事件，兼容大部分浏览器
function addEvent(obj, type, fn){ // type是无 on 的事件
    if(window.addEventListener){
        // Chrome,FireFox,Opera,Safari,IE9.0及以上
        obj.addEventListener(type, fn, false);
    } else {
        // IE8.0及以下
        obj.attachEvent('on'+type, fn);
    }
}

function judge() {
    var devWidth = window.innerWidth;
    var devHeight = window.innerHeight;
    var lorp ="";
    console.log('width'+devWidth+'; height:'+devHeight);
    if(devWidth > devHeight){
        lorp = "landscape";
    } else {
        lorp = "portrait";
    }
    return lorp;
}
var lp = judge();
if(lp === "landscape") {
    console.log("land");
} else {
    console.log("port");
}

// orientation
var supportOrientationChange = "onorientationchange" in window;
var orientationEvent = supportOrientationChange ? "onorientationchange" : "resize"; 
addEvent(window, orientationEvent, function(){
    var deviceType="";  
       //  判断设备类型   
    var text =''; 
   if (userAgent.indexOf("iPad") > 0) {  
       deviceType = "isIpad";  
    } else if (userAgent.indexOf("Android") > 0) {  
       deviceType = "isAndroid";  
    } else {  
       text = text+"<p>既不是ipad，也不是安卓!</p>";  
       return;  
    }  
        // 判断横竖屏   
    if ("isIpad" == deviceType) {  
        if(Math.abs(window.orientation) == 90){
         text = text+"<p>我是ipad的横屏,</p>";  
     } else {  
        text = text+"我是ipad的竖屏,";  
     }  
        } else if ("isAndroid" == deviceType ) {  
            if (Math.abs(window.orientation) != 90) {  
            text = text+"<p>我是安卓的横屏</p>";  
        } else {  
            text = text+"我是安卓的竖屏";  
        }  
        }
    $("#opern").html(text);  
})

console.log($("html").css("font-size"));

// 判断交互方式
var interEvent = function(){
    var eventObj={};
    eventObj.isEvent = "ontouchend" in document ? "touch" : ("onmousedown" in document ? "mouse" : "keyboard");
    return eventObj.isEvent;
}
console.log(interEvent());

// 判断部分浏览器
var supportMp3 = function(){
    var isSupportMp3 = "";
    if(userAgent.indexOf('Safari') > -1 || userAgent.indexOf('UCBrowser')> -1){
        isSupportMp3 = "true";
    };
    return isSupportMp3;        
} 

// mousedown 时背景色改变
function md() {
    var me = $(this);
    if( me.hasClass("blackKey")){
        me.addClass("bkdown");
    } else {
        me.addClass("wkdown");
    }
    sdPlayer(me);
}

// mouseup
function mubgTime() {
    var me = $(this);
    if( me.hasClass("blackKey")){
        setTimeout(function(){me.removeClass("bkdown");}, 300);
    } else {
        setTimeout(function(){me.removeClass("wkdown");}, 300);
    }
}

// mousedown发声
var sdPlayer = function(that){
    var ext = '.ogg';
    var exts = '.mp3'
    var audioObj; 
    audioObj = supportMp3()?new Audio("sound/mp3/3.mp3"):new Audio("sound/ogg/" + that.attr('id') + ext);
    audioObj.play() ;
};

// ready 执行完后会销毁，将mubg,mubgTime放在里面，只将 mubgTime 函数绑定到了 mouseup 事件，但 mubg 未绑定（在mubgTime 中只以自付存在，当用时才去调用 mubg 函数）
$(document).ready(function(){
    var white = $(".whiteKey");
    var black = $(".blackKey");
    // 给每个黑色键添加变色事件
    black.each( function(){
        if( interEvent() === "mouse" ) {
            addEvent(this, "mousedown", md);
            addEvent(this, "mouseup", mubgTime);
            addEvent(this, "mouseout", mubgTime);
        } else if( interEvent() === "touch" ){
            addEvent(this, "touchstart", md);
            addEvent(this, "touchmove", md);
            addEvent(this, "touchend", mubgTime);
        }
        else {
            console.log("keyboard");
        }
    });
    white.each( function(){
        if( interEvent() === "mouse" ) {
            addEvent(this, "mousedown", md);
            addEvent(this, "mouseup", mubgTime);
            addEvent(this, "mouseout", mubgTime);
        } else if( interEvent() === "touch" ){
            addEvent(this, "touchstart", md);
            addEvent(this, "touchend", mubgTime);
        }
        else {
            console.log("keyboard");
        }
    });
})
