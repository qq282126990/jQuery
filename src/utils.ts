// 将 toString 函数返回的字符串转成
const class2Type: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object',
    '[object Error]': 'error',
    '[object Symbol]': 'symbol'
}

const toString: Function = Object.prototype.toString;
// 获取父对象
const getProto = Object.getPrototypeOf;
// 对象自身属性中是否具有指定的属性
const hasOwn = class2Type.hasOwnProperty;
const fnToString = hasOwn.toString;
// 获取对象字符串 '[object Object]'
const ObjectFunctionString = fnToString.call(Object);

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
}
