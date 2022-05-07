var words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
/*随机获取某一个字母的函数*/
function getRandomWord(){
    var key = getRandNumber(0,words.length-1)
    return words[key];
}
/*随机生产指定范围区间的数字函数*/
 function getRandNumber(min,max){
   var result = Math.floor(Math.random()*(max-min+1)+min);
   return result;
 }

 function selectedLiCss(){
     var word = getRandomWord();
     var li = document.getElementById(word);
     li.classList.add('selected');
 }
 selectedLiCss();

 document.addEventListener('keyup',function(e){
     var pressWord = e.key.toUpperCase();
     var pressWordEl = this.getElementById(pressWord);
     var selectWordEl = document.querySelector('.selected')
     if(pressWordEl){
     pressWordEl.classList.add('press');
     pressWordEl.addEventListener('animationend',function(){
         pressWordEl.classList.remove('press');
     })
     }
     if(selectWordEl.innerHTML === pressWord){
         selectWordEl.classList.remove('selected')
         selectedLiCss();
     }
 });