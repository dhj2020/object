//检测用户姓名是否为汉字  /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/
jQuery.validator.addMethod("isChar", function(value, element) {
    var length = value.length;
    var regName = /[^\u4e00-\u9fa5]/g;
    var eName = /^[a-zA-Z]+$/;
    return this.optional(element) || !regName.test(value) || eName.test(value);
}, "请正确格式的姓名(暂支持汉字和英文)");
jQuery.validator.addMethod("isNickname", function(value, element) {
    var length = value.length;
    var regName = /^[0-9a-zA-Z\u4e00-\u9fa5]*$/g;
    return this.optional(element) || regName.test(value);
}, "请正确格式的昵称");
jQuery.validator.addMethod("isQQ", function(value, element) {
    var length = value.length;
    var regName = /^[1-9]\d{4,14}$/;
    return this.optional(element) || regName.test(value);
}, "请填写正确QQ");
// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    return this.optional(element) || (length === 11 && /^1[3-9]\d{9}$/.test(value));
}, "请正确填写您的手机号码。");

// 日期 不能小于当前日期   dateLimit
jQuery.validator.addMethod("dateLimit", function(value, element) {
    var dateT = new Date();
    return this.optional(element) || (new Date(value).getTime() > dateT.getTime());
}, "输入的日期不能小于当前时间");

jQuery.validator.addMethod("isUrl", function(value, element) {
    var length = value.length;
    var regName = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    return this.optional(element) || regName.test(value);
}, "请正确格式的URL");
//weibo
var $weiboLink = $("#weiboLink");
var linkPhone = $weiboLink.attr("data-link-phone");
var linkPC = $weiboLink.attr("data-link-pc");
var isMobile = util.detect.mobilecheck();
if (isMobile) {
    $weiboLink.attr("href", linkPhone);
} else {
    $weiboLink.attr("href", linkPC);
}