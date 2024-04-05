import { Element } from '../../../game/static/js/dom/classes.js'


(() => {
    const state = {
        countries: [],
        form: {
            firstName: "",
            lastName: "",
            username: "",
            country: "",
            email: "",
            password: ""
        },
        countriesToShow: []
    }
    const ACTIVE_INPUT_BOX_SHADOW = '10px 5px 5px grey';
    const INPUT_PLACEHOLER_NAME = 'input-placeholder'
    const ModalCountriesElement = new Element(
        `<div></div>`,
        [],
        [],
        'modal-countries-result'
    )

    function handleEventOccurrence(event, val) {
        event.target.style.boxShadow = val
    }

    function handleCountryInputOnchange(event) {
        state.countriesToShow = state.countries.filter(country => {
            return country.name.includes(event.target.value.toLowerCase())
        })

        console.log('state.countriesToShow: ', state.countriesToShow)
    }

    function applyEventListnersToInputs() {
        const inputs = Array.from($('input')).filter(input => input.name !== INPUT_PLACEHOLER_NAME)

        inputs.forEach(input => {
            $(input).on('focus', event => handleEventOccurrence(event, ACTIVE_INPUT_BOX_SHADOW))
            $(input).on('blur', event => handleEventOccurrence(event, ""))

            if (input.id === "country-input") {
                console.log('hey there meng')
                $(input).on('input', handleCountryInputOnchange)
            }
        })

        // for (const input in inputs) {

        //     console.log('input, yo there: ', input)
        // }
    }

    async function getAllCountries() {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/by-code.json')
            const data = await response.json()
            state.countries = Object.values(data).filter(country => country.name !== "United Nations").map(country => ({ ...country, name: country.name.toLowerCase() }))
            state.countriesToShow = state.countries
        } catch (error) {
            console.error('Failed to get countries. Reason: ', error)
        }
    }



    function handleOnPgDisplay() {
        applyEventListnersToInputs()
        getAllCountries()
    }


    handleOnPgDisplay()
})()
