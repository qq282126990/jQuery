import { rsingleTag } from './var/rsingleTag';

export default function (jQuery: any) {
    let rootjQuery: any;


    // 检查HTML字符串的简单方法
    // 优先#id <tag>以避免XSS通过 via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    // Shortcut simple #id case for speed
    let rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

    // 对html 的字符串进行验证
    // rsingleTag匹配由单个HTML元素组成的字符串，该字符串没有属性
    // 并捕获元素的名称
    // let rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);

    const init = jQuery.fn.init = function (selector: any, context: any, root: any) {
        let match, elem;

        // 处理 (''),$(null),$(undefind),$(false)
        if (!selector) {
            return this;
        }

        // rootjQuery = jQuery( document );
        // Method init() accepts an alternate rootjQuery
        // so migrate can support jQuery.sub (gh-2101)
        // 表示 document
        root = root || rootjQuery;

        // 处理 HTML 字符串情况，包括 $('div') $('#div') $('.class')
        if (typeof selector === 'string') {
            if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
                // 假设以<>开头和结尾的字符串是HTML并跳过正则表达式检查
                // 强行构造了匹配 html 的情况的数组
                match = [null, selector, null];
            }
            else {
                match = rquickExpr.exec(selector);
            }

            // match[1] 限定了 html, !context 对 #id 处理
            if (match && (match[1] || !context)) {
                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    // 排除 context 是 jQuery 对象情况
                    context = context instanceof jQuery ? context[0] : context;

                    // jQuery.merge 对 jQuery 合并数组方法
                    // jQuery,parseHTML 对 html 字符串转换成 DOM对象
                    jQuery.merge(this, jQuery.parseHTML(
                        match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

                    // HANDLE: $(html, props)
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            // 此时的 match 非彼时的 match
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);

                                // ...and otherwise set as attributes
                            }
                            else {
                                this.attr(match, context[match])
                            }
                        }
                    }

                    return this;
                }
                // HANDLE: $(#id)
                // 处理match[1] 为 undefind 但 !context 情况
                else {
                    elem = document.getElementById(match[2]);

                    if (elem) {
                        // this[0] 返回一个标准的 jQuery对象
                        this[0] = elem;
                        this.length = 1;
                    }

                    return this;
                }
            }
            // HANDLE: $(expr, $(...))
            // jQuery.find() 为 jQuery 的选择器，性能良好
            else if (!context || context.jquery) {
                return (context || root).find(selector);
            }
            // 处理 !context 情况
            else {
                // 这里 constructor 其实是 指向 jQuery 的
                return this.constructor(context).find(selector);
            }
        }
        //  HANDLE: $(DOMElement)
        else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
        }
        // HANDLE: $(function)
        else if (jQuery.isFunction(selector)) {
            return root.ready !== undefined ? root.ready(selector) :
                // Execute immediately if ready is not present
                selector(jQuery);
        }

        return jQuery.makeArray(selector, this);
    }

    // 为init函数提供jQuery原型以供以后实例化
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);

    return init;
}
