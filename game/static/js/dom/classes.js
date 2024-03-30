import { addEventListeners, addStyles } from "./fns.js"

export class Button {
    button = null

    constructor(
        txtElement,
        handleOnClick = null,
        { className = '', id = '' },
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

            btn.attr('id', id)

            btn.attr('class', className)

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

