//封装弹出层  hanjun 2016/10/10

;Zepto(function() {
    showPannel = {
        customHtml: function(elementId) {
            var content = $(elementId).clone().remove().show().prop("outerHTML"); // \u83B7\u53D6\u5305\u542B\u672C\u8EAB\u7684 html
            var customObj = $('<div class="ui-dialog"><div class="ui-dialog-custom-box"><i class="ui-font icon-close" data-role="button"></i><article>' + content + '</article></div></div>');
            if($(".ui-dialog-custom-box").length != 0) {
                $(".ui-dialog-custom-box").parent().show();
            } else {
                customObj.appendTo("body").show();
            };
            $(".ui-dialog-custom-box").on('click', function(e) {
                e.stopPropagation();
            });
            $(".ui-dialog,.ui-dialog-custom-box i.icon-close").on('click', function() {
                $(".ui-dialog").hide();
                return false;
            });
            document.addEventListener('touchmove', function(e) {
                if(!customObj.is(":hidden")) {
                    e.preventDefault();
                }
            });
        },
        tipShow: function(tipTxts) {
            var tipObj = $('<div class="ui-dialog"><section class="tips">' + tipTxts + '</section></div>');
            tipObj.appendTo("body").show();
            setTimeout(function() {
                tipObj.remove()
            }, 1000)
            document.addEventListener('touchmove', function(e) {
                if(!$(obj).is(":hidden")) {
                    e.preventDefault();
                }
            });
        },
        confirm: function(options) {
            var defaultVal = {
                isHeader: true,
                herderColor: '#eee',
                title: '\u6700\u65B0\u63D0\u793A',
                isButton: true,
                content: "\u8BF7\u8F93\u5165\u5185\u5BB9",
            };
            var option = $.extend(defaultVal, options);
            if(typeof option.content == 'string') {
                var confirmObj = $('<div class="ui-dialog"><div class="ui-dialog-confirm-box"><i class="ui-font icon-close" data-role="button"></i><article>' + option.content + '</article></div></div>');
            }
            if(typeof option.content == 'object') {
                var confirmObj = $('<div class="ui-dialog"><div class="ui-dialog-confirm-box"><i class="ui-font icon-close" data-role="button"></i><article>' + option.content.clone().remove().show().prop("outerHTML") + '</article></div></div>');
            }
            if($(".ui-dialog-confirm-box").length != 0) {
                $(".ui-dialog-confirm-box").parent().show();
            } else {
                confirmObj.appendTo("body").show();
                if(option.isHeader) {
                    $('<header style="background-color:' + option.herderColor + '">' + option.title + '</header>').prependTo($(".ui-dialog-confirm-box"));
                } else {
                    confirmObj.find("header").remove();
                };
                if(option.isButton) {
                    $('<footer><button class="c">\u53D6\u6D88</button><button class="q">\u786E\u5B9A</button></footer>').appendTo($(".ui-dialog-confirm-box"));
                } else {
                    $(".ui-dialog-confirm-box").find("footer").remove();
                };
            };
            document.addEventListener('touchmove', function(e) {
                if(!confirmObj.is(":hidden")) {
                    e.preventDefault();
                }
            });
            confirmObj.find("footer button").on('click', function() {
                if($(this).hasClass('c')) {
                    $(this).parents('.ui-dialog').remove();
                    return false;
                }
            });
            confirmObj.find(".icon-close").on('click', function() {
                $(this).parents('.ui-dialog').remove();
                return false;
            });
            $(".ui-dialog-confirm-box").on('click', function(e) {
                e.stopPropagation();
            });
            $(".ui-dialog").on('click', function() {
                $(this).find(".ui-dialog-confirm-box").parent().remove();
                return false;
            });
        }
    };
});