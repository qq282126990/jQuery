
interface Init {
}


export default function (jQuery: Init) {
    let rootjQuery: any;

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

        // return jQuery.makeArray(selector, this);
    }

    // 为init函数提供jQuery原型以供以后实例化
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);

    return init;
}
