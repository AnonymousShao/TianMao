var listBrand = document.getElementById("list-brand");
var cellBrands = utils.getElesByClass("cell-brand",listBrand);
var brandLast = utils.getElesByClass("cell-brand-last",listBrand)[0];
var boxBtn = utils.getElesByClass("box-btn",listBrand)[0];
brandLast.onclick = function(){
    var reg = /^rotate\((\d+)deg\)$/;
    var deg =  boxBtn.style.transform;
    if(!deg){
        boxBtn.style.transform = "rotate(720deg)";
        cellRoteY.call(this);
        return;
    }
    boxBtn.style.transform = "rotate("+(parseInt(deg.match(reg)[1])+720)+"deg)";
    cellRoteY.call(this);
};
brandLast.onmouseenter = function(){
    var reg = /^rotate\((\d+)deg\)$/;
    var deg =  boxBtn.style.transform;
    if(!deg){
        boxBtn.style.transform = "rotate(360deg)";
        return;
    }
    boxBtn.style.transform = "rotate("+(parseInt(deg.match(reg)[1])+360)+"deg)";
};
function cellRoteY(){
    clearInterval(this.timer);
    var that = this;
    this.num = 0;
    this.timer = setInterval(function(){
        for(var i = 0; i < cellBrands.length;i++){
            var sel = ((i%6 + (parseInt(i/6)%4)) == that.num);
            if(sel){
                var reg = /^rotateY\((\d+)deg\)$/;
                var deg =  cellBrands[i].style.transform;
                if(!deg){
                    cellBrands[i].style.transform = "rotateY(360deg)";
                }else{
                    cellBrands[i].style.transform = "rotateY("+(parseInt(deg.match(reg)[1])+360)+"deg)";
                }
            }
        }
        that.num++;
        if(that.num==8){
            that.num = 0;
            clearInterval(that.timer);
        }

    },100);

}

