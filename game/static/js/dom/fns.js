import { Element } from "./classes.js"

export function addStyles(element, stylesArr) {
    stylesArr.forEach(([propertyName, propertyVal]) => {
        $(element).css(propertyName, propertyVal)
    })
}

export function removeAllChildrenElements(parentElementSelectorStr = '') {
    try {
        if (!parentElementSelectorStr) {
            throw new Error('"parentElementSelectorStr" must be a non-empty string.')
        }

        $(parentElementSelectorStr).empty();
    } catch (error) {
        console.error("Couldn't remove all children elment nodes. Reason: ", error)
    }

}

export function removeElement(selector) {
    $(selector).remove()
}

export function removeCssClasses(selector = '', classNamesStr = '') {
    $(selector).removeClass(classNamesStr)
}

export function addCssClasses(element, cssClassesStr) {
    $(element).addClass(cssClassesStr)
}

export function addEventListeners(element, eventListeners) {
    eventListeners.forEach(([eventName, eventListener]) => {
        element.on(eventName, eventListener)
    })
}

export function displayBackdrop(handleOnClick = () => { }, cssSelector = '#main') {
    if (!handleOnClick) {
        console.error('"handleOnClick" must be a function.')
        return;
    }

    const parentElement = $(cssSelector)
    const { element } = new Element(
        '<div></div>',
        [],
        [['click', handleOnClick]],
        'backdrop position-absolute'
    );

    parentElement.prepend(element)
}

export function displayModal(
    cssClassStr = '',
    htmlElementStr = '',
    cssSelector = '#main',
    eventListeners = [],
    styles = []
) {
    const parentElement = $(cssSelector)
    const { element } = new Element(
        htmlElementStr,
        styles,
        eventListeners,
        cssClassStr
    );
    parentElement.prepend(element)
}

export function colorElement(element, color = '', borderTupleProperty = ['border', 'none']) {
    addStyles(element, [borderTupleProperty, ['backgroundColor', color]])
}
