
export function addStyles(element, stylesArr) {
    stylesArr.forEach(([propertyName, propertyVal]) => {
        element.css(propertyName, propertyVal)
    })
}


export function createBtn(
    txtElement,
    { className = '', id = '' },
    handleOnClick = () => { }) {
    try {

        if (typeof handleOnClick !== 'function') {
            throw new Error('Must be a function for the `handleOnClick` prop.')
        }

        const btn = $(`
            <button>
                ${txtElement}
            </button>
        `)

        btn.attr('id', id)
        btn.attr('class', className)

        btn.on('click', handleOnClick)

        return btn[0];
    } catch (error) {
        console.error('Failed to create a button. Reason: ', error)

        return null;
    }
}