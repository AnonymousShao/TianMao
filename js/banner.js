var banner = document.getElementById("banner");
var bannerInner = utils.getElesByClass("bannerInner",banner)[0];
var focusUl = utils.getElesByClass("focusUl",banner)[0];

var imgs = bannerInner.getElementsByTagName("img");
var lis = focusUl.getElementsByTagName("li");
var bannerMain = utils.getElesByClass("banner-main",document)[0];
var data =null;

;(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","banner.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
console.log(data);
;(function(){
    if(data && data.length){
        var str_img ="";
        var str_ul ="";
        for(var i=0;i<data.length;i++){
            str_img += "<div><img src= '' real='"+data[i].src+"'></div>";
            str_ul += i == 0 ? "<li class='cur'></li>":"<li></li>";
        }
        bannerInner.innerHTML = str_img;
        focusUl.innerHTML = str_ul;
    }
})();
;(function(){
    for(var i=0;i<imgs.length;i++){
        var canvas = document.createElement("canvas");
        var tmpImg = new Image();
        tmpImg.ctx = canvas.getContext('2d');
        tmpImg.src = imgs[i].getAttribute("real");
        tmpImg.index = i;

        tmpImg.onload = function(){
            this.ctx.drawImage(this,0,0,1130,500);
            imgs[this.index].imageData = this.ctx.getImageData(0,0,1,1);
            imgs[this.index].src = this.src;
            /*imgs[this.index].parentNode.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px";*/
           /* console.log(imgs[this.index].parentNode.style.width);*/
            imgs[this.index].parentNode.style.backgroundColor = "rgb("+imgs[this.index].imageData.data[0]+","+imgs[this.index].imageData.data[1]+","+imgs[this.index].imageData.data[2]+")";
            if(this.index == 0){
                utils.setCss(imgs[0].parentNode,"zIndex",2);
                imgs[this.index].parentNode.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px";
                imgs[0].parentNode.style.backgroundColor = "rgb("+imgs[0].imageData.data[0]+","+imgs[0].imageData.data[1]+","+imgs[0].imageData.data[2]+")";

                animate({
                    ele:imgs[0].parentNode,
                    target:{
                        opacity:1
                    },
                    duration:500
                });
            }
        };
    }
})();
var enableBtn = true;
var timer = window.setInterval(autoPlay,2000);
var index=0;
function autoPlay() {
    index ++;
    if(index == imgs.length){
        index =0 ;
    }
    setImgShow();
}
function setImgShow() {
    for(var i =0;i<imgs.length;i++){
        if(i==index){
            utils.setCss(imgs[i].parentNode,"zIndex",2);
            imgs[this.index].parentNode.style.width = (document.documentElement.clientWidth || document.body.clientWidth) + "px";
            banner.style.background = imgs[i].parentNode.style.backgroundColor;
            animate({
                ele:imgs[i].parentNode,
                target:{
                    opacity:1
                },
                duration:500,
                callback:function () {
                    var others = utils.siblings(this);
                    for(var j=0;j<others.length;j++){
                        utils.setCss(others[j],"opacity",0);
                    }
                }
            });

        }else{
            utils.setCss(imgs[i].parentNode,"zIndex",0);
        }
    }
    for(var i=0;i<lis.length;i++){
        lis[i].className = i==index?"cur":"";
    }
}

banner.onmouseover = function(){
    window.clearInterval(timer);
};
banner.onmouseout = function(){
    timer = window.setInterval(autoPlay,2000);
};
;(function(){
    for(var i=0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onclick = function () {
            if(enableBtn){
                enableBtn = false;
                index = this.index;
                setImgShow();
            }
        }
    }
})();
function animate(option){
    var time =0;
    var ele = option.ele;
    var callback = option.callback;
    var begin = {};
    var target = option.target;
    var change = {};
    var duration = option.duration || 1000;
    for(var key in target){
        begin[key] = utils.getCss(ele,key);
        change[key] = target[key] - begin[key];
    }
    window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function(){
        time += 10;
        if(time>=duration){
            window.clearInterval(ele.timer);
            for(var key in target){
                utils.setCss(ele,key,target[key]);
            }
            if(typeof callback == "function"){
                callback.call(ele);
            }
            enableBtn = true;
            return;
        }
        for(var key in change){
            var val = linear(time,begin[key],change[key],duration);
            utils.setCss(ele,key,val);
        }
        function linear(t,b,c,d){
            return b + t/d *c;
        }
    },10);

}


