$(function() {
    $(".btn").click(function() {
        $(".start").hide();
        $("section").eq(0).show();
        $(".next,.page").show();
    });
    var sum = 0;
    var len = $("section").length;
    var answer = ['C', 'A', 'A', 'A'];
    $("section ul").each(function(index) {
        var _this = $(this);
        _this.find("li").click(function() {
            if($(this).text().substr(0,1) == answer[index]) {
                $(".total li").eq(index).addClass("right");
            } else {
                $(".total li").eq(index).addClass("wrong");
            };
            $(this).addClass("selected").siblings().removeClass("selected");
        });
    });
    var i = 0;
    $(".page span.t2").text(len);
    $(".next").on("click", function() {
        if(!$("section").eq(i).find("li").hasClass("selected")) i=i-1;
        i++;
        if(i == len) {
            $("section,.next").hide();
            $(".page").text("已结束!");
            $(".total").show();
            var currentLen = $("li.right").length;
            var score = 100 / len * currentLen;
            if(score > 60) {
                $(".total>h3>i").text("恭喜你！");
            } else {
                $(".total>h3>i").text("你太可怜了！");
            }
            $(".total span").text(score);
        };
        $(".page span.t1").text(i + 1);
        $("section").eq(i).show().siblings("section").hide();
    })
})