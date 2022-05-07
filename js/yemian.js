window.onload = function () {
   function $(idName) {
      return document.getElementById(idName);
   }

   var jiemianqwe = $("jiemianqwe");
   var game = $("game");
   var tuicu = $("tuicu");
   var kaishi = $("kaishi");
   var zhanting = $("zhanting");
   var tit = $("tit")


   //从难度页面获取到的值
   let strarr = localStorage.getItem('str');
   if (strarr == 7) {
      t = 1; q = 7;
   } else if (strarr == 6) {
      t = 2; q = 6;
   } else if (strarr == 5) {
      t = 3; q = 5;
   } else if (strarr == 4) {
      t = 4; q = 4;
   } else if (strarr == 3) {
      t = 5; q = 3;
   } else if (strarr == 2) {
      t = 6; q = 2;
   } else if (strarr == 1) {
      t = 7; q = 1;
   }



   //c,定时器,
   var c, letterEles,  t, q, letters = " ", score = 0, sijian = 0;
   var count = 0, startTimeStamp = null, endTimeStamp = null;





   //获取游戏界面的高度
   var gameH = getStyle(jiemianqwe, "height");
   //获取游戏界面的宽度
   var gameW = getStyle(jiemianqwe, "width");
   //进入游戏页面后的开始游戏





   //兼容getElementsByClassName
   if (document.getElementsByClassName) {
      document.getElementsByClassName = function (clsName) {
         var all = document.all;
         var arr = [];
         for (var i = 0; i < all.length; i++) {
            arr.push(all[i]);
         }
         return arr;
      }
   }



   //开始按钮
   kaishi.onclick = function () {
      if (c) {
         return;
      }
      startTimeStamp = new Date() * 1;
      c = setInterval(function () {
         endTimeStamp = new Date() * 1;
         if (endTimeStamp - startTimeStamp <= 60 * 1000) {
            tit.children[2].firstElementChild.innerHTML = score;
         } else {
            tit.children[2].firstElementChild.innerHTML = Math.ceil(score / Math.ceil((endTimeStamp - startTimeStamp) / (60) * 100));
         }
         createLetter();
         //当前页面显示字母的多少
         //getElementsByClassName是一个不兼容函数
         letterEles = document.getElementsByClassName("active");

      },t* 75);
      gameStat();
   }





   
   //暂停按钮
   zhanting.onclick = function () {
      clearInterval(c);
      c = undefined;
      clearAllLetters();
   }

   tuicu.onclick = function () {
      gameStat();
   }




   //键盘
   document.onkeyup = (evt) => { test(evt) };
   function test(evt) {
      var e = evt || window.event;
      var codeVal = e.keyCode;
      if (codeVal >= 65 && codeVal < 90) {
         count++;
      }
      //根据键值找键符
      var char = e.key;
      if (char) {
         let test = document.querySelectorAll(".game span");
         for (const iterator of test) {
            if ((iterator.innerHTML).toUpperCase() == (e.key).toUpperCase()) {
               game.removeChild(iterator);
               var exp = eval("/" + char + "/gi");
               letters = letters.replace(exp.innerHTML, "");
               //判断得分
               tit.firstElementChild.firstElementChild.innerHTML = ++score;
               endTimeStamp = new Date() * 1;
               if (endTimeStamp - startTimeStamp <= 60 * 1000) {
                  tit.children[2].firstElementChild.innerHTML = score;
               } else {
                  tit.children[2].firstElementChild.innerHTML = Math.ceil(score / Math.ceil((endTimeStamp - startTimeStamp) / (60) * 100));
               }
               return;
            }
         }
         //判断正确率
         tit.children[1].firstElementChild.innerHTML = (score / count * 100).toFixed(2) + "%";
      }

   }






   //运动函数:元素的运动，元素运动的最终值 ，元素的那个属性运动
   function starMove(ele, end, attr) {
      game = $("game");
      document.onkeyup = (evt) => { test(evt) };
      //控制下降的速度
      var speed = q;
      ele.timer = setInterval(function () {
         var moveVal = getStyle(ele, attr);
         if (moveVal >= end) {
            clearInterval(ele.timer);
            game.removeChild(ele);
            letters = letters.replace(ele.innerHTML, "");
         } else {
            ele.style[attr] = moveVal + speed + "px"
         }
      })
   }







   //创建字母
   function createLetter() {
      var span = document.createElement("span");
      span.className = "active";
      var l = ranLetter();
      span.innerHTML = l;
      letters += l;
      span.style.left = Math.floor(Math.random() * (gameW - 100)) + "px";
      //随机颜色
      span.style.backgroundColor = randBg();
      game.appendChild(span);
      starMove(span, gameH, "top")
   }


   //随机产生字母
   function ranLetter() {
      var str = "abcdefghijklmnopqrstuvwsyz";
      //字母大小写都有
      str += str.toUpperCase();
      return str.charAt(Math.floor(Math.random() * str.length));
   }




   //生成随机十六进制颜色值
   function randBg(){
      var str = "0123456789abcdefg"
      var colorVal = "#"
      for(var i=0;i<6;i++){
         colorVal += str.charAt(Math.floor(Math.random()*str.length));
      }
      return colorVal
   }




   //获取到元素使用样式最终值
   function getStyle(ele, attr) {
      var res = null;
      if (ele.currentStyle) {
         res = ele.currentStyle[attr];
      } else {
         res = window.getComputedStyle(ele, null)[attr];
      }
      return parseFloat(res);
   }



   //清楚掉所有字母所在元素的定时器
   function clearAllLetters() {
      for (var i = 0; i < letterEles.length; i++) {
         clearInterval(letterEles[i].timer);
      }
   }



   //暂停之后的游戏开始
   function gameStat() {
      //判断最开始的时候letterEles为un;返回他为真，游戏继续
      if (!letterEles) return;

      let test = document.querySelectorAll(".game span");
      for (const iterator of test) {

         starMove(iterator, gameH, "top");
      }

   }
}