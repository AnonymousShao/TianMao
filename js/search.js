var search = document.getElementById("search");
var searchFloat = document.getElementById("search-top");
var form = document.getElementsByTagName("form")[0];
var formFloat = document.getElementsByTagName("form")[1];
var tips = form.getElementsByClassName("tips")[0];
var tipsFloat = formFloat.getElementsByClassName("tips")[0];
var ul = tips.getElementsByTagName("ul")[0];
var ulFloat = tipsFloat.getElementsByTagName("ul")[0];
var lis = ul.getElementsByTagName("li");
var lisFloat = ulFloat.getElementsByTagName("li");

search.oninput = function () {
    ul.style.display = "block";
    var reg = /^\s*$/;
    if(reg.test(this.value)){
        ul.style.display = "none";
    }
};
searchFloat.oninput = function () {
    ulFloat.style.display = "block";
    var reg = /^\s*$/;
    if(reg.test(this.value)){
        ulFloat.style.top = "none";
    }
};

for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
        search.value = this.firstChild.innerText;
        ul.style.display = "none";
    };
    lisFloat[i].onclick = function(){
        searchFloat.value = this.firstChild.innerText;
        ulFloat.style.display = "none";
    }
}
