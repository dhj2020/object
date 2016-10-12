var imgUrl='http://bbs.crsky.com/1236983883/Mon_1209/25_187069_22e7263b1033935.jpg';
var img = document.createElement("img");
img.src=imgUrl;
img.className = 'lazy';
img.style.width="550px";
img.setAttribute("data-original",imgUrl)
document.body.appendChild(img);

var title = document.getElementsByTagName("h1");
var imgLen = document.createTextNode('图片数量为：'+$("img").length+'个')
title[0].appendChild(imgLen)  



