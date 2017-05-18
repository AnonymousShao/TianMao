var live = document.getElementById("live");
var fc = utils.getElesByClass("forecast")[0];
var fcDiv = fc.getElementsByTagName("div")[1];
var rightBtn = utils.getElesByClass("right-btn")[0];
var leftBtn = utils.getElesByClass("left-btn")[0];
var bigDisplay = utils.getElesByClass("big-display")[0];
var liveDivs = bigDisplay.getElementsByTagName("div");
var liveBar = utils.getElesByClass("live-bar")[0];
var liveLis = liveBar.getElementsByTagName("li");
var dataLive = null;

;(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","live.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            dataLive = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(dataLive);
;(function(){
    if(dataLive && dataLive.length){
        var str_div ="";
        var str_ul ="";
        str_ul += "<ul>";
        for(var i=0;i<dataLive.length;i++){
            if(i< dataLive.length/2){
                if(i == 0){
                    str_div += "<div class='cur'><img src='"+dataLive[i].src+"'><a href='javascript:void 0;'></a><span></span></div><p><s></s>直播中</p>"
                }else
                str_div += "<div><img src='"+dataLive[i].src+"'><a href='javascript:void 0;'></a><span></span></div><p><s></s>直播中</p>";
            }else{
                if(i == dataLive.length/2){
                    str_ul += "<li class='cur'><img src='"+dataLive[i].src+"'><a href='javascript:void 0;'></a><span></span></li>";
                }else
                str_ul += "<li><img src='"+dataLive[i].src+"'><a href='javascript:void 0;'></a><span></span></li>";
            }
        }
        str_ul += "</ul>";
        bigDisplay.innerHTML = str_div;
        liveBar.innerHTML = str_ul;
    }
})();
;(function(){
    for(var i =0;i < liveLis.length; i++){
        liveLis[i].index = i;
        liveLis[i].onmouseenter = function () {
            for(var i =0;i < liveLis.length; i++){
                liveDivs[i].className = liveLis[i].className = (this.index == i ? "cur" : "");
            }
        };
    }
})();
;(function(){
    rightBtn.onclick = function(){
        liveBar.style.left = "-488px";
        rightBtn.style.display = "none";
        leftBtn.style.display = "block";
    };
    leftBtn.onclick = function(){
        liveBar.style.left = "0";
        rightBtn.style.display = "block";
        leftBtn.style.display = "none";
    }
})();
;(function () {
    fcDiv.num = 0;
    setInterval(function () {
        fcDiv.num ++;
        fcDiv.style.top = fcDiv.num*(-1)*40 +"px";
        if(fcDiv.num>=3){
            fcDiv.num = 0;
        }
    },1000);
})();

