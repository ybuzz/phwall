var app =angular.module("app", [])
app.controller("phwall",["$scope",function ($scope) {
    var vm = this;
    vm.imgs=(function () {
        var src='';
        var array=[];
        for(i=0;i<9;i++){
            src='../../img/'+(i+1)+'.jpg'
            array.push(src)
        }
        return array;
    })()



}])
app.directive("phWall",function ($timeout) {
    return{
        restrict: 'E',
        templateUrl: '../html/tpl.html',
        scope: {
            imgs:'=',
            time1:'=',
            time2:'=',
            time3:'=',
        },
        replace: 'true',
        link:function (scope,ele,attrs) {
            var imgs=ele[0].childNodes[3].children;
            var endNum=0;   //判断第二步图片运动进度
            var allEnd=0;   //判断图片运动是否全部完成
            var on =true;   //  决定按钮是否可用


            var time1=scope.time1+'ms';
            var time2=scope.time2+'ms';
            var time3=scope.time3+'ms';


            scope.click=function () {
                if(!on){
                    return
                }
                on=false

                for(i=0;i<imgs.length;i++){
                    (function (i) {                                                     //此处需让函数自执行，否则for循环太快，计时器只能读到imgs[imgs.length]
                        $timeout(function () {
                            move(imgs[i],time1,scope.step1,scope.callBack1)
                        },Math.random()*1000)
                    })(i)
                }
            }

            function move(obj,time,doFn,callBack) {
                var called=true                                                           //解决transitionend调用多次的问题
                obj.style.transition=time;                                                //添加过度效果，时间为time
                doFn.call(obj);                                                           //此处为在属性函数中使用this，用callfangfa让此函数指向obj
                obj.addEventListener('transitionend',function () {                        //事件监听，过渡效果结束
                    if(called){
                        //&&符号特性，左边为真则返回右边结果，左边为假则返回false，若没有回调函数依然不会报错
                        callBack&&callBack.call(obj)                                      //回掉函数指向obj
                        called=false                                                      //调用一次后此值为
                    }
                },false)                                                                  //冒泡结束后执行
            }

            scope.step1=function () {
                this.style.transform='scale(0)';
            }

            scope.callBack1=function () {
                move(this,time2,scope.step2,scope.callBack2)
            }


            scope.step2=function (){
                this.style.transform='scale(1)'
                this.style.opacity=0
            }

            scope.callBack2=function() {
                endNum++;
                if(endNum==imgs.length){
                    scope.final();
                }
            }

            scope.final=function() {
                for(i=0;i<imgs.length;i++){
                    imgs[i].style.transition="";
                    imgs[i].style.transform='rotateY(0deg)translateZ(-'+Math.random()*1000+'px)';
                    (function (i) {
                        $timeout(function () {
                            move(imgs[i],time3,scope.step3,scope.callBack3)
                        },Math.random()*1000)
                    })(i)
                };
            }
            scope.step3=function() {
                allEnd++;
                this.style.opacity=1;
                this.style.transform='rotateY(-360deg)translateZ(0)';
            }

            scope.callBack3=function() {
                if(allEnd==imgs.length){
                    on=true
                    endNum=0;
                    allEnd=0;
                }
            }

        }
    }
})