
export function addStyles(element, stylesArr) {
    stylesArr.forEach(([propertyName, propertyVal]) => {
        element.css(propertyName, propertyVal)
    })
}

export function addEventListeners(element, eventListeners) {
    eventListeners.forEach(([eventName, eventListener]) => { element.on(eventName, eventListener) })
}