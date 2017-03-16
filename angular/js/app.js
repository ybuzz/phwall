var app =angular.module("app", ['ui.router','ui.bootstrap','ngAnimate', 'ngSanitize'])
app.controller("phwall",["$scope",function ($scope) {
    var vm = this;



}])
app.directive("phwall",function ($timeout) {
    return{
        restrict: 'E',
        templateUrl: '../html/tpl.html',
        scope: {},
        replace: 'true',
    }
})