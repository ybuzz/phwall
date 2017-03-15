var btn=document.getElementById("btn");
var imgs=document.querySelectorAll("img")
//btn点击事件
var endNum=0;   //判断第二步图片运动进度
var allEnd=0;   //判断图片运动是否全部完成
var on =true;   //  决定按钮是否可用
btn.onclick=function () {
    console.log(on)
    if(!on){
        return
    }
    on=false

    for(i=0;i<imgs.length;i++){
        (function (i) {                                                     //此处需让函数自执行，否则for循环太快，计时器只能读到imgs[imgs.length]
            setTimeout(function () {
                move(imgs[i],'50ms',step1,callBack1)
            },Math.random()*1000)
        })(i)
    }
}

//运动函数(运动对象，运动时间，运动属性函数，运动后回调函数)
//transition特点，写上transition之后，在写属性，自动运动
//transitionend事件，transition只要有一条属性发生就会触发此事件(属性函数内的属性超过一条需注意)
function move(obj,time,doFn,callBack) {
    var called=true                                                           //解决transitionend调用多次的问题
    obj.style.transition=time;                                                //添加过度效果，时间为time
    doFn.call(obj);//因让此函数指向obj
    obj.addEventListener('transitionend',function () {                        //事件监听，过渡效果结束
        if(called){
            //&&符号特性，左边为真则返回右边结果，左边为假则返回false，若没有回调函数依然不会报错
            callBack&&callBack.call(obj)                                      //回掉函数指向obj
            called=false                                                      //调用一次后此值为
        }
    },false)                                                                  //冒泡结束后执行
}

//第一步属性函数
function step1() {
    this.style.transform='scale(0)';

}
//第一步回调函数(为第二布要操作的动作)
function callBack1() {
    move(this,'1s',step2,callBack2)
}
//第二步属性函数(第二步在第一步结束后，为第一步的回调函数)
function step2() {
    this.style.transform='scale(1)'
    this.style.opacity=0
}
//第二步回调函数
function callBack2() {
    endNum++;
    if(endNum==imgs.length){
        final();
    }
}
//第三步条件判定后执行(perspective为css属性，为离屏幕的距离)
function final() {
    for(i=0;i<imgs.length;i++){
        //若想某元素具有css3的变化，需要给定初始值
        imgs[i].style.transition="";
        imgs[i].style.transform='rotateY(0deg)translateZ(-'+Math.random()*1000+'px)';
        (function (i) {
            setTimeout(function () {
                move(imgs[i],'2s',step3)
            },Math.random()*1000)
        })(i)
    };
    endNum=0;
}
//最终调用属性函数
function step3() {
    allEnd++;
    if(allEnd==imgs.length){
        on=true
    }
    console.log(on)
    this.style.opacity=1;
    this.style.transform='rotateY(-360deg)translateZ(0)';
}
