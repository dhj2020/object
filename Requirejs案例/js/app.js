require.config({
    paths: {
        jquery: 'jquery-1.11.0',
        index: 'comm',
    }
});
 
require(['jquery','comm'], function($) {
    model.autoplay()
    model.timer()
});