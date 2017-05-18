var navFloatLeft = document.getElementById("nav-float-left");
var searchFloat = document.getElementById("search-float");
var returnTop = document.getElementById("top");
var navFloatRight = document.getElementById("nav-float-right");
var navFloatLeftLis = navFloatLeft.getElementsByTagName("li");
var floor = document.getElementById("floor");
var floorBlocks = utils.getElesByClass("floor-fashion",floor);

    for(var i =1; i < navFloatLeftLis.length-1;i++) {
        navFloatLeftLis[i].index = i - 1;
        navFloatLeftLis[i].onclick = function () {
            var t = utils.offset(floorBlocks[this.index]).top;
            scrollChange(this, t);
        };
    }
    navFloatLeftLis[navFloatLeftLis.length-1].onclick =function () {
        scrollChange(this, 0);
    };
   var color = ["#EA5F8D","#0AA6E8","#64C333","#F15453","#19C8A9","#F7A945","red"];
    window.onscroll = function () {
        var scl =  utils.win("scrollTop");
        if(scl>1100){
            searchFloat.style.top = 0;
        }else{
            searchFloat.style.top = -50 + "px";
        }
        if(scl>900){
            navFloatLeft.style.display = "block";
        }else{
            navFloatLeft.style.display = "none";
        }
        if(!scl){
            returnTop.style.display = "none";
        }else{
            returnTop.style.display = "block";
        }
        var tmpScrollTop = utils.win("scrollTop");
        var flagColor = false;
        for(var i =1; i < navFloatLeftLis.length-1;i++) {
            var tmpTop = utils.offset(floorBlocks[i-1]).top+200;
            if(tmpScrollTop>utils.offset(floorBlocks[6]).top){
                navFloatLeftLis[7].style.background = color[6];
                break;
            }
            if(tmpTop > tmpScrollTop && !flagColor){
                navFloatLeftLis[i].style.background = color[i-1];
                flagColor = true;
            }else{
                navFloatLeftLis[i].style.background = "rgba(0,0,0,.6)";
            }
        }
    };
    returnTop.onclick = function (){
        scrollChange(this, 0);
      /*  returnTop.style.display = "none";*/
    };
    function scrollChange(ele,tScroll){
        var curScrollTop = utils.win("scrollTop");
        clearInterval(this.timer);
        ele.timer = setInterval(function () {
            if(curScrollTop>tScroll){
                curScrollTop -= 100;
                if(curScrollTop <= tScroll){
                    clearInterval(ele.timer);
                    utils.win("scrollTop", tScroll);
                }
            }else{
                curScrollTop += 50;
                if(curScrollTop >= tScroll){
                    clearInterval(ele.timer);
                    utils.win("scrollTop", tScroll);
                }
            }
            utils.win("scrollTop", curScrollTop);
        },10);
    }