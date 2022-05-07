function my(id){
    return document.getElementById(id);
}
my("btn").onclick=function(){
    if (this.value =="游戏说明") {
        my("dv").style.display="block";
        this.value="游戏说明1";
    } else if(this.value =="游戏说明1"){
        my("dv").style.display="none";
        this.value="游戏说明";
    }
}
my("bt").onclick=function(){
    if (this.value =="打赏") {
        my("cv").style.display="block";
        this.value="谢谢";
    } else if(this.value =="谢谢"){
        my("cv").style.display="none";
        this.value="打赏";
    }
}


 