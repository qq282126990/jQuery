import { class2Type } from './var/class2Type';
import { toString } from './var/toString';

export const toType = function (obj: any) {
    if (obj === null) {
        return obj + '';
    }

    // 如果是 object 输出 object 字符串类型  否则输出 对应的类型
    return typeof obj === 'object' ? class2Type[toString.call(obj)] || 'object' : typeof obj;
}
