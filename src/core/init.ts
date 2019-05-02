
interface Init {
}


export default function (jQuery: Init) {

    const init = jQuery.fn.init = function (selector: string, context: string, root: boolean) {

    }

    console.log(init)

    init.prototype = jQuery.fn;

    return init;
}
