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
        merge: Function,
        makeArray: Function,
        parseHTML: Function,
        fn: Object,
    }
}
