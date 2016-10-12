requirejs.config({
    paths:{
        jquery:'http://cdn.bootcss.com/jquery/1.12.4/jquery.min',
        comm:'lib/comm',
        img:'lib/img',
        lazyload:'http://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min',
    }
});
require(['jquery'],function($){

    alert($)  //执行jq模块

    //延时加载comm模块
    setTimeout(function(){
        require(['comm'],function(){
            getTime();
        });   
    },1000)  
})

//加载img模块
setTimeout(function(){
    require(["img"]);
    require(['lazyload'],function(){
        $(function(){
            $("img.lazy").lazyload({effect: 'slideDown'})
        })
    }); 
},2000)  
