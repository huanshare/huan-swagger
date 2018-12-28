/**
 * Created by liuhuan on 2017/5/12.
 */
;layui.define(function (exports) {
    "use strict";

    var $ = layui.jquery;
    var g_ = {};
    var g_apidoc;
    var g_definitions;

    g_.resolve = function (_apidoc) {
        _apidoc.schemes || (_apidoc.schemes = ["http"]);
        g_apidoc = _apidoc;
        g_definitions = _apidoc['definitions'];
        //
        _parse();
    }

    /**
     * 解析API文档
     */
    function _parse() {
        // 遍历处理TAGS，初始化依赖路径列表
        $.map(g_apidoc['tags'], function (item) {
            item['paths'] = [];
        });
        // 遍历处理路径，处理路径方法
        $.each(g_apidoc['paths'], function (path, pathmeta) {
            $.each(pathmeta, function (httpmethod, methodmeta) {
                // 将该路径方法添加到对应的TAG中
                add2tags(path, httpmethod, methodmeta, g_apidoc['tags']);
                // 处理路径方法
                add2method(methodmeta);
            });
        });

        /**
         * 解析每个路径的每一个HttpMethod对应的方法
         * @param path          路径
         * @param httpmethod    HttpMethod（GET,POST,PUT,DELETE）
         * @param methodmeta    每个Method对应的方法描述
         * @param tags          总的Tags数据
         */
        function add2tags(path, httpmethod, methodmeta, tags) {
            // 遍历模块
            $.each(methodmeta['tags'], function (i, item) {
                $.each(tags, function (i, tag) {
                    if (tag["name"] == item) {
                        tag['paths'].push({
                            name: methodmeta['summary'],
                            description: methodmeta['description'],
                            path: path,
                            httpmethod: httpmethod
                        });
                    }
                })
            })
        }

        /**
         * 添加自定义参数或返回值类型
         * @param methodmeta
         */
        function add2method(methodmeta) {
            methodmeta['models'] = {};
            // 处理参数的Model
            methodmeta.hasOwnProperty('parameters') && $.each(methodmeta['parameters'], function (i, param) {
                var realtype;
                if (param.in == "body") {
                    realtype = resolveRealType(param["schema"]);
                } else {
                    realtype = resolveRealType(param);
                }
                resetPmeta(methodmeta['models'], param, realtype);
            });

            // 处理响应的Model
            $.each(methodmeta['responses'], function (status, response) {
                var realtype = resolveRealType(response["schema"]);
                resetPmeta(methodmeta['models'], response, realtype);
                if (response.hasOwnProperty("headers")) {
                    $.each(response["headers"], function (hname, hmeta) {
                        var hrealtype = resolveRealType(hmeta);
                        resetPmeta(methodmeta['models'], hmeta, hrealtype);
                    });
                }
            });

            // 处理Model的Model
            var extModels = {};
            $.each(methodmeta['models'], function (mname, mmodel) {
                resolveModelModel(mmodel, extModels, mname);
            });

            //
            $.each(extModels, function (m, mmeta) {
                methodmeta['models'][m] = mmeta;
            });
        }

        /**
         * 处理Model中的Model，递归
         * @param _mmodel       处理的Model对象
         * @param _extModels    该对象中已经引用的Model
         * @param _parent       该Model对象的父Model，循环递归check用
         */
        function resolveModelModel(_mmodel, _extModels, _parent) {
            if (_mmodel && _mmodel.hasOwnProperty("properties")) {
                $.each(_mmodel['properties'], function (_pname, _mprop) {
                    var realtype = resolveRealType(_mprop);
                    var curmodel = realtype["type"];
                    resetPmeta(_extModels, _mprop, realtype);
                    if ((_parent != curmodel) && realtype["modelflag"]) {
                        resolveModelModel(g_definitions[curmodel], _extModels, curmodel);
                    }
                });
            }
        }

        /**
         * 解析数据类型，包装成统一的类型描述
         *
         * @param pmeta
         * @returns {{type: string, modelflag: boolean, showtype: string}}
         */
        function resolveRealType(pmeta) {
            var _type = "string";
            var _showType = "string";
            var _modelflag = false;
            if (pmeta && pmeta.hasOwnProperty("$ref")) {
                _type = cutDefinition(pmeta["$ref"]);
                _showType = wrapShowType(_type);
                _modelflag = true;
                pmeta["itemtype"] = _type;
            } else if (pmeta && pmeta.hasOwnProperty("type")) {
                switch (pmeta["type"]) {
                    case "array":
                    case "object":
                        var _pmeta = pmeta[((pmeta["type"] == "array") ? "items" : "additionalProperties")];
                        var _tmparr = resolveRealType(_pmeta);
                        _type = _tmparr["type"];
                        _showType = ((pmeta["type"] == "array") ? "array" : "object") + "(" + _tmparr["showtype"] + ")";
                        _modelflag = _tmparr["modelflag"];
                        pmeta["itemtype"] = _type;
                        break;
                    default:
                        _type = pmeta["type"];
                        _showType = dataType(_type, pmeta["format"]);
                        _modelflag = false;
                        break;
                }
            }

            return {
                type: _type,
                modelflag: _modelflag,
                showtype: _showType
            };
        }

        /**
         * 截取Model定义，方便显示
         *
         * @param definition
         * @returns {*}
         */
        function cutDefinition(definition) {
            if (definition) {
                return definition.substr(14);
            }
            return "";
        }

        /**
         * 包装Model为链接
         *
         * @param type
         * @returns {string}
         */
        function wrapShowType(type) {
            return "<a href=\"javascript:gotoModel('" + type + "');\">" + type + "</a>";
        }

        /**
         * 维护父类引用，并将计算后的属性设置到对象中
         *
         * @param pModels   父类引用Model，去重
         * @param curMeta   当前处理的属性Meta
         * @param realtype  解析后的类型描述
         */
        function resetPmeta(pModels, curMeta, realtype) {
            var type = realtype["type"];
            curMeta["itemtype"] = type;
            // 写进Model缓存
            if (realtype["modelflag"] && g_definitions.hasOwnProperty(type)) {
                pModels[type] = g_definitions[type];
            }
            curMeta["showtype"] = realtype["showtype"];
        }

        /**
         *
         * @param type
         * @param format
         * @returns {*}
         */
        function dataType(type, format) {
            if (format && format != "") {
                switch (format) {
                    case "int32":
                        return "int";
                    case "int64":
                        return "long";
                    case "float":
                    case "double":
                        return format;
                    case "byte":
                    case "binary":
                    case "date":
                    case "date-time":
                    case "password":
                        return "string(" + format + ")";
                    default:
                        return "string";
                }
            } else {
                return type;
            }
        }
    }

    /**
     * 创建JSON对象的数据模板，用于生成发送请求参数
     */
    g_.jsonmock = (function () {

        var _ = {
            mock: function (model) {
                if (!g_definitions || !g_definitions[model] || !g_definitions[model]["properties"]) {
                    return "";
                }
                var mockobj = genMock(g_definitions[model]["properties"], model);
                return JSON.stringify(mockobj, null, '\t');
            }
        };

        /**
         * 创建
         * @param prop          对象的属性列表
         * @param _parent       父模块名称，循环递归check用
         */
        function genMock(prop, _parent) {
            if ((typeof prop) != "object") {
                return "";
            }
            var _mock = {};
            $.each(prop, function (name, val) {
                var _$ref = val["itemtype"];
                if (val.hasOwnProperty("$ref")) {
                    if (_parent != _$ref) {
                        _mock[name] = genMock(g_definitions[_$ref]['properties'], _$ref);
                    }
                } else if (val.hasOwnProperty("type")) {
                    switch (val["type"]) {
                        case "array":
                            _mock[name] = [];
                            var _tmparr = val["items"];
                            if (_tmparr.hasOwnProperty("$ref") && (_parent != _$ref)) {
                                _mock[name].push(genMock(g_definitions[_$ref]["properties"], _$ref));
                            } else {
                                _mock[name].push(genMockData(_tmparr.type));
                            }
                            break;
                        case "object":
                            _mock[name] = {};
                            var _tmpobj = val["additionalProperties"];
                            if (_tmpobj.hasOwnProperty("$ref") && (_parent != _$ref)) {
                                _mock[name]["key"] = genMock(g_definitions[_$ref]["properties"], _$ref);
                            } else {
                                _mock[name]["key"] = genMockData(_tmpobj.type);
                            }
                            break;
                        default:
                            _mock[name] = genMockData(val.type);
                            break;
                    }
                }
            });
            return _mock;
        }

        function genMockData(type) {
            switch (type) {
                case 'integer':
                case 'number':
                    return 0;
                case 'boolean':
                    return false;
                case 'string':
                default:
                    return ""
            }
        }

        return _;
    })();

    exports('nswagger', g_);
});