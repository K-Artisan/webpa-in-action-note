//引入js资源
import $ from 'jquery';
//引入样式资源
import './index.less';
//引入图片、字体等资源
//...

$(function () {
    $('#title').click(function () {
        $('body').css('backgroundColor', 'deeppink');
    });
})