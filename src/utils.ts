import { class2Type } from './core/var/class2Type';
import { rsingleTag } from './core/var/rsingleTag';
import { toString } from './core/var/toString';
import { toType } from './core/toType';
import { isWindow } from './core/var/isWindow';
// 将 toString 函数返回的字符串转成
// const class2Type: any = {
//     '[object Boolean]': 'boolean',
//     '[object Number]': 'number',
//     '[object String]': 'string',
//     '[object Function]': 'function',
//     '[object Array]': 'array',
//     '[object Date]': 'date',
//     '[object RegExp]': 'regexp',
//     '[object Object]': 'object',
//     '[object Error]': 'error',
//     '[object Symbol]': 'symbol'
// }
// let rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);

// const toString: Function = Object.prototype.toString;
// 获取父对象
const getProto = Object.getPrototypeOf;
// 对象自身属性中是否具有指定的属性
const hasOwn = class2Type.hasOwnProperty;
const fnToString = hasOwn.toString;
// 获取对象字符串 '[object Object]'
const ObjectFunctionString = fnToString.call(Object);


// 判断是否是数组
function isArrayLike(obj: any) {
    let length = !!obj && obj.length,
        type = toType(obj);

    if (typeof obj === 'function' || isWindow(obj)) {
        return false;
    }


    // 如果类型是 array | length = 0 | length = number | lenght > 0
    return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
}

export default function (jQuery: Object) {

    // 判断是否是一个函数
    jQuery.isFunction = function (obj: object) {
        return jQuery.type(obj) === 'function';
    }

    // 类型判断
    jQuery.type = function (obj: object) {
        if (obj === null) {
            return obj + '';
        }

        return typeof obj === 'object'
            || typeof obj === 'function' ?
            class2Type[toString.call(obj)]
            || 'object' :
            typeof obj;
    }

    // 判断对象是否是一个纯粹对象
    jQuery.isPlainObject = function (obj: object) {
        let proto, Ctor;

        // 排除 underfined、null 和非 object 情况
        if (!obj || toString.call(obj) !== '[object Object]') {
            return false;
        }

        // 获取父对象
        proto = getProto(obj);

        // 没有原型的对象（例如，`Object.create（null）`）是普通的
        if (!proto) {
            return true;
        }

        // 具有原型的对象是纯粹的，如果它们是由全局Object函数构造的
        Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

        return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
    }

    // 合并
    jQuery.merge = function (first: any, second: any) {
        let len = +second.length,
            j = 0,
            i = first.length

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first.length = i;

        return first;
    }

    // 将 html 转换成 dom 对象
    // data html 字符串
    // context  document对象
    // keepScripts 删除节点里所有script tag
    jQuery.parseHTML = function (data: any, context: any, keepScripts: any) {
        if (typeof data !== 'string') {
            return [];
        }

        // 平移参数
        if (typeof context === 'boolean') {
            keepScripts = context;
            context = false;
        }

        let base: { href: string; }, parsed: any[], scripts: any[];

        if (!context) {
            // 在 context 缺失的情况下，建立一个 document 对象
            // 停止脚本或内联事件处理程序立即执行
            // 通过使用document.implementation
            // 创建并返回一个 XMLDocument对象.
            context = document.implementation.createHTMLDocument('');

            // 为创建的文档设置基本href
            // 所以任何带URL的解析元素
            // 基于文档的URL（gh-2965）
            base = context.createElement('base');
            base.href = document.location.href;
            context.head.appendChild(base);
        }

        // 用来解析 parsed，比如对 "<div></div>" 的处理结果 parsed：["<div></div>", "div"]
        // parsed[1] = 'div'
        parsed = rsingleTag.exec(parsed[1]);

        scripts = !keepScripts && [];

        // 单个标签
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        // parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            // @ts-ignore
            jQuery(scripts).remove();
        }

        // @ts-ignore
        return jQuery.merge([], parsed.childNodes);
    }


    // 把左边数组或字符串并入右边的数组或一个新数组
    jQuery.makeArray = function (arr: [] | string, results: []) {
        let ret = results || [];

        if (arr != null) {
            // if(){

            // }
        }
    }
}
