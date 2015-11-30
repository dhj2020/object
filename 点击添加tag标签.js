<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>点击选项添加tag标签</title>
</head>
<body>

<div class="tag"></div>
<ul>
    <li data="111">选项1</li>
    <li data="222">选项2</li>
    <li data="333">选项3</li>
    <li data="444">选项4</li>
</ul>

<script type="text/javascript" src="http://cdn.bootcss.com/jquery/1.11.3/jquery.js"></script>
<script type="text/javascript">
$(function(){
    $("ul li").click(function(){
        var data=$(this).attr("data");
        if($("div p[data="+data+"]").length!=0)  //防止有已选择项重复添加
            return;

        var item=$("<p data="+data+" title="+data+"><b>"+this.innerHTML+"</b><i>X</i></p>");
        item.appendTo("div")
        item.find("i").click(function(){
            $(this).parent().remove();
        })
    })
})

</script>
</body>
</html>
