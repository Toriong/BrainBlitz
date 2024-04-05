

(() => {
    const ACTIVE_INPUT_BOX_SHADOW = '10px 5px 5px grey';
    const INPUT_PLACEHOLER_NAME = 'input-placeholder'

    function handleEventOccurrence(event, val) {
        event.target.style.boxShadow = val
    }



    function handleOnPgDisplay() {
        const inputs = Array.from($('input')).filter(input => input.name !== INPUT_PLACEHOLER_NAME)
        inputs.forEach(input => {
            $(input).on('focus', event => handleEventOccurrence(event, ACTIVE_INPUT_BOX_SHADOW))
            $(input).on('blur', event => handleEventOccurrence(event, ""))
        })
    }


    handleOnPgDisplay()
})()
