//The following is customizable, and consistent to the templates used

var a1 = {};
a1.partial = "a1.html";
a1.init = function(){
    miniSPA.render('a1');             //render related partial page
    
    //自定义js区
    var a = document.getElementById('nib')
    a.onclick=function(){
        alert("sfdsgf")
    } 
}
a1.submit = function(){
    var tt = document.getElementById('tt');
    tt.innerHTML = page;
}

var a2 = {};
a2.partial = "a2.html";
a2.init = function(){
    miniSPA.render('a2');             //render related partial page
}

var a3 = {};
a3.partial = "a3.html";
a3.init = function(){
    miniSPA.render('a3');             //render related partial page
}
a3.submit = function(){
    var tt = document.getElementById('tt');
    tt.innerHTML = page;
}



miniSPA.changeUrl();    //initialize