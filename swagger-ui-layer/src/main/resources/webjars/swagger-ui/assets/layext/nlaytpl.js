/**
 * Created by liuhuan on 2017/5/12.
 */
;layui.define('laytpl', function (exports) {
    "use strict";

    var $ = layui.jquery, laytpl = layui.laytpl;
    var _ = {
        render: function (renderSel) {
            return function (tplSrc, tplData, completeFunc) {
                if (tplSrc.indexOf(".html") == -1) {
                    _render(renderSel, $(tplSrc).html(), tplData, completeFunc);
                } else {
                    $.get(tplSrc, function (html) {
                        _render(renderSel, html, tplData, completeFunc);
                    });
                }
            };
        }
    };

    function _render(renderSel, tplHtml, tplData, completeFunc) {
        $(renderSel).html(laytpl(tplHtml).render(tplData));
        completeFunc && completeFunc();
    }

    exports('nlaytpl', _);
});