import init from './core/init';
import utils from './utils';
import Sizzle from './core/sizzle';

(function (window) {
    const version = '0.0.1';

    const jQuery = (function () {

        // jQuery.prototype.init.prototype = jQuery.prototype
        // 引用指向同一个 prototype 对象
        const jQuery = function (selector: string | object | Function, context: string) {
            return new jQuery.prototype.init(selector, context);
        }

        // jQuery.fn 实际上是 prototype 的一个引用指向 jQuery.prototype
        jQuery.fn = jQuery.prototype = {
            // 正在使用的jQuery的当前版本
            jquery: version,
            // 创建构造函数
            constructor: jQuery
        }

        // 初始化方法
        init(jQuery);

        // 对自己属性和方法进行扩张，又可以对原型属性和方法进行扩展
        // 接受一个参数对 jquery进行扩展，接受两个参数以上浅拷贝，第一个参数为true深拷贝
        jQuery.extend = jQuery.fn.extend = function (...data: any[]) {
            // 深拷贝标记
            let deep,
                // 被拷贝对象
                options,
                // 被拷贝对象的key
                name,
                // 被拷贝对象的值
                copy,
                // 目标对象的值
                src,
                // 说明被拷贝对象是数组
                copyIsArray,
                // 被拷贝对象
                clone,
                i = 1,
                length = arguments.length,
                // 目标对象
                target = arguments[0] || {}

            // 判断是否是深拷贝
            if (typeof target === 'boolean') {
                deep = target;

                // 参数后移
                target = arguments[i] || {};
                i++;
            }

            // 处理 target 是字符串或奇怪情况,isFunction(target)可以判断 target 是否为函数
            if (typeof target !== 'object' && !jQuery.isFunction(target)) {
                target = {};
            }

            // 判断是否 jQuery 扩展
            if (i === length) {
                // this 做一个标记可以指向 jquery ,也可以指向 jquery.fn
                target = this;
                i--;
            }

            for (; i < length; i++) {
                // null/undefined 判断
                if ((options = arguments[i]) !== null) {
                    // 这里已经统一了，无论前面函数的参数怎样，现在的任务就是 target 是目标对象, options 是被拷贝对象
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // 防止死循环，跳过自身情况
                        if (target === copy) {
                            continue;
                        }


                        // 深拷贝，且被拷贝对象是 object 或 array
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                            // 说明被拷贝对象是数组
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && Array.isArray(src) ? src : [];
                            }
                            // 被拷贝对象是 object
                            else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }

                            // 递归拷贝子属性
                            target[name] = jQuery.extend(deep, clone, copy);
                        }
                        // 常规遍历直接 =
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            // 返回修改后的对象
            return target;
        }

        jQuery.find = Sizzle;


        jQuery.extend({
            // 一堆静态属性和方法
            // 用 extend 绑定，而不是直接在 jQuery 上写
        });

        return jQuery;
    })();


    // 工具方法
    utils(jQuery);

    window.jQuery = window.$ = jQuery;
})(window);
