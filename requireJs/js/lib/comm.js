var a = document.createElement("h1");
var b = document.createTextNode("I'm new here!");
a.appendChild(b)
document.body.appendChild(a);

function getTime(){
    var c = document.createTextNode('现在是：'+new Date().getHours()+'时');
    setTimeout(function(){
        a.appendChild(c)    
    },1000) 
}
