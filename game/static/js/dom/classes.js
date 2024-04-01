import { createObj } from "../utils/utils.js";
import { addEventListeners, addStyles } from "./fns.js"

export class Button {
    button = null

    constructor(
        txtElement,
        handleOnClick = null,
        { className, id } = {},
        styles = [],
    ) {
        try {
            if (typeof handleOnClick !== 'function') {
                throw new Error('Must be a function for the `handleOnClick` prop.')
            }

            const btn = $(`
                <button>
                    ${txtElement}
                </button>
            `);

            console.log('btn: ',)

            if (styles.length) {
                addStyles(btn, styles)
            }

            if (id) {
                btn.attr('id', id)
            }
            console.log('className: ', className)
            if (className) {
                btn.attr('class', className)
            }

            btn.on('click', handleOnClick)

            this.button = btn;
        } catch (error) {
            console.error('Failed to create a button. Reason: ', error)
        }
    }
}



export class Element {
    element = null

    constructor(newElementStr, styles = [], eventListeners = [], cssClassStr = '') {
        const element = $(newElementStr)


        if (!Array.isArray(styles)) {
            console.error('"styles" must be an array.')
            return;
        }

        if (!Array.isArray(eventListeners)) {
            console.error("'eventListeners' must be an array.")
            return;
        }

        if (cssClassStr) {
            element.addClass(cssClassStr)
        }

        if (styles?.length) {
            addStyles(element, styles)
        }

        if (eventListeners.length) {
            addEventListeners(element, eventListeners)
        }


        this.element = element;
    }
}

export class Cookies {
    get(name) {
        const cookies = document.cookie;

        if (!cookies) {
            return null;
        }

        const parsedCookies = this.getAllParsedCookies();

        return parsedCookies[name];
    }

    getAllUnparsedCookies() {
        return document.cookie;
    }

    getAllParsedCookies() {
        const cookiesKeysAndFields = document.cookie.split(';').map(keyAndVal => keyAndVal.split('='));

        return createObj(cookiesKeysAndFields);
    }

    set(name, value, expiration) {
        try {
            if (value.includes('=')) {
                throw new Error('Value must not include a "=" sign.');
            }

            document.cookie = expiration ? `${name}=${value}; expires=${expiration}` : `${name}=${value};`;
        } catch (error) {
            console.error('Failed to set cookies. Reason: ', error);
        }
    }
}
