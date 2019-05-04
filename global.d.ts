export interface Window { }

declare global {
    interface Window {
        jQuery: Function;
        $: Function;
    }

    interface Object {
        init: Function,
        extend: Function,
        type: Function,
        isFunction: Function,
        isPlainObject: Function,
        fn: Object,
        makeArray: Function
    }
}
