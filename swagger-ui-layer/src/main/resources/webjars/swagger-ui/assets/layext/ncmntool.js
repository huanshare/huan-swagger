/**
 * Created by liuhuan on 2017/5/12.
 */
;layui.define(function (exports) {
    "use strict";

    var _ = {
        checkimg: function (imgurl, successfunc) {
            var img = new Image();
            img.onload = function () {
                successfunc && successfunc(imgurl);
            };
            img.src = imgurl;
        }
    };

    exports('ncmntool', _);
});