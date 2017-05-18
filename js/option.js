var option = document.getElementById("option");
var optPage = utils.getElesByClass("opt-page",option)[0];
var optLis =optPage.getElementsByTagName("li");

var optContent = utils.getElesByClass("content-option",option)[0];
var optUls =optContent.getElementsByTagName("ul");

;(function(){
    for(var i =0;i < optLis.length; i++){
        optLis[i].index = i;
        optLis[i].onmouseenter = function () {
            for(var i =0;i < optLis.length; i++){
                optUls[i].parentNode.className = this.index == i ? "cur" : "";
                optLis[i].className = this.index == i ? "cur" : "";
            }
            optContent.style.display = "block";
        };
    }
    optContent.onmouseleave = function(){
        this.style.display = "none";
        for(var i =0;i < optLis.length; i++){
            optUls[i].parentNode.className = optLis[i].className = "";
        }
    }
})();