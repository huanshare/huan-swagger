/**
 * Created by liuhuan on 2017/5/11.
 */
layui.config({
    base: 'assets/layext/'
}).extend({
    nlaytpl: 'nlaytpl',
    ncmntool: 'ncmntool',
    nswagger: 'nswagger',
    nupload: 'nupload'
});
//
layui.use(['layer', 'element', 'form', 'nlaytpl', 'nswagger', 'ncmntool', 'upload'], function () {
    var $ = layui.jquery,
        layer = layui.layer,
        element = layui.element,
        form = layui.form,
        ncmntool = layui.ncmntool,
        nlaytpl = layui.nlaytpl,
        nswagger = layui.nswagger;

    $(".logo").click(function () {
        $(".nav-home").click();
        $(".layui-side-scroll").scrollTop(0);
    });

    $("#iptApiUrl, .btn-clearurl").on('mouseover', function () {
        $(".btn-clearurl").show();
    }).on('mouseout', function () {
        $(".btn-clearurl").hide();
    });
    $(".btn-clearurl").click(function () {
        $("#iptApiUrl").val('');
    });
    $(".btn-gourl").click(function () {
        // 清理数据
        $(".api-main").empty();
        // 弹出加载框
        var loader = layer.load();
        // 拉取数据
        var iptApiUrl = $("#iptApiUrl").val() || location.hash;
        if (iptApiUrl.charAt(0) == "#") {
            iptApiUrl = iptApiUrl.substr(1);
        }
        if (iptApiUrl == "") {
            iptApiUrl = location.protocol + "//" + location.host + "/v2/api-docs";
            if (location.search && location.search.indexOf("_ijt=") != -1) {
                iptApiUrl = "example.json";
            }
        }
        if (iptApiUrl != "example.json") {
            if (!/\/v2\/api-docs$/.test(iptApiUrl)) {
                iptApiUrl = iptApiUrl + "/v2/api-docs";
            }

            if (!/^http/.test(iptApiUrl)) {
                iptApiUrl = "http://" + iptApiUrl;
            }
        }
        $("#iptApiUrl").val(iptApiUrl);
        // 获取配置文档
        $.ajax({
            url: iptApiUrl,
            dataType: "json",
            type: "get",
            success: function (apidoc) {
                // 解析数据
                try {
                    nswagger.resolve(apidoc);
                } catch (e) {
                    layer.msg('解析失败，请确认文档配置是否正确', {icon: 5});
                    console.error(e);
                    return;
                }
                // 设置页面标题
                document.title = apidoc.info.title;
                // 设置页面LOGO
                ncmntool.checkimg(apidoc.schemes[0] + "://" + apidoc.host + "/logo.png", function (imgurl) {
                    $(".logo img").attr("src", imgurl);
                });
                location.hash = apidoc.host;
                // 渲染左侧菜单导航
                nlaytpl.render(".api-main")("comp/tplApiMain.html", {tags: apidoc["tags"]}, function () {
                    // 重新渲染菜单效果
                    element.init();
                    // 监听导航点击事件
                    element.on("nav(left-nav)", function (ele) {
                        if ($(ele).hasClass("nav-home")) {
                            nlaytpl.render(".main-body")("comp/tplHomeBody.html", apidoc, function () {
                                // 重新渲染组件效果
                                element.init();
                            });
                        } else {
                            $((".layui-nav-itemed")).removeClass(("layui-nav-itemed"));
                            $(ele).parents(".layui-nav-item").addClass("layui-nav-itemed");
                            var _a = $(ele).children(':first-child');
                            $(".layui-side-scroll").scrollTop($(_a).offset().top - $(".layui-side").offset().top + $(".layui-side").scrollTop());
                            var _dpath = $(_a).attr("dpath"), _dhttpmethod = $(_a).attr("dhttpmethod");
                            nlaytpl.render(".main-body")("comp/tplApiBody.html", {
                                apidoc: apidoc,
                                tagname: $(_a).attr("dtag"),
                                dpath: _dpath,
                                dhttpmethod: _dhttpmethod,
                                mmeta: apidoc["paths"][_dpath][_dhttpmethod]
                            }, function () {
                                // 重新渲染组件效果
                                element.init();
                                form.render();
                            });
                        }
                    });
                    // 监听处理导航的悬浮提示
                    $('.layui-nav-item a[dtitle]').on('mouseover', function () {
                        var that = this;
                        layer.tips($(that).attr("dtitle"), that, {
                            time: 0
                        });
                    }).on('mouseout', function () {
                        layer.closeAll('tips');
                    });
                    // 渲染主页
                    $(".nav-home a").click();
                });
                // 渲染顶部导航搜索
                nlaytpl.render(".api-quick")("comp/tplApiQuick.html", {tags: apidoc["tags"]}, function () {
                    form.on('select(api-quick)', function (data) {
                        var pm = data.value.split("::");
                        $(".left-nav a[dpath='" + pm[1] + "'][dhttpmethod='" + pm[0] + "']").click();
                    });
                    // 重新渲染表单组件效果
                    form.render("select");
                });
            },
            error: function () {
                layer.msg('加载失败，请确认API文档的地址是否正确', {icon: 5});
            },
            complete: function () {
                layer.close(loader);
            }
        });
    }).on('mouseover', function () {
        var that = this;
        layer.tips("点击加载目标地址的API文档", that, {
            time: 0,
            tips: 3
        });
    }).on('mouseout', function () {
        layer.closeAll('tips');
    });
    //
    $(".btn-gourl").click();
});