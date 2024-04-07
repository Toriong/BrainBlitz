import { Element } from "./dom/classes.js";

(() => {
    const state = {
        countries: [],
        form: {
            firstName: "",
            lastName: "",
            username: "",
            country: null,
            email: "",
            password: ""
        },
        countriesToShow: []
    }
    const ACTIVE_INPUT_BOX_SHADOW = '10px 5px 5px grey';
    const INPUT_PLACEHOLER_NAME = 'input-placeholder'
    const MODAL_COUNTRIES_NAME = 'modal-countries-result'

    function handleCountryOptClick(country) {
        state.form.country = country.name;

        $(`.${MODAL_COUNTRIES_NAME}`).remove();

        $('#country-img-container').append(`<img src=${country.image} alt=${`${country.name}'s image`} />`);

        state.countriesToShow = []
    }

    function handleEventOccurrence(event, val) {
        event.target.style.boxShadow = val
    }

    let appendSearchCountriesResultTimeout = null;

    const handleCountryInputOnchange = event => {
        clearTimeout(appendSearchCountriesResultTimeout)
        state.countriesToShow = state.countries.filter(country => {
            return country.name.includes(event.target.value.toLowerCase())
        })

        appendSearchCountriesResultTimeout = setTimeout(() => {
            const modalResultsOnDom = $(`.modal-countries-result`)

            if (state.countriesToShow.length && !modalResultsOnDom.length) {
                console.log('hey there!')
                const countryInputContainerWidth = $(`#country-input-sec`).width()
                const modalWidth = countryInputContainerWidth - (countryInputContainerWidth * .05)
                const list = $(`
                    <ul id="countries-list">
                    </ul>
                `)
                const modal = $(`
                    <div class='${MODAL_COUNTRIES_NAME} position-absolute'>        
                    </div>
                `)

                const userInput = event.target.value.toLowerCase()

                for (const country of state.countriesToShow) {
                    if (country.name.includes(userInput)) {
                        const li = $(`
                            <li class='country-option'>
                                <div class='d-flex align-items-center'>
                                    <span>
                                        ${country.name}
                                    </span>
                                </div>
                                <div class='d-flex justify-content-center align-items-center'>
                                    <img src=${country.image} alt=${`${country.name}'s image`} />
                                </div>
                            </li>
                        `)

                        li.on('click', () => handleCountryOptClick(country))

                        list.append(li)
                    }
                };

                modal.css({ width: `${modalWidth}px` })
                modal.append(list)

                $('.modal-countries-container').append(modal)
            }

            // if there are results already in the modal, then delete the results, and update 
        }, 400);
    }

    function applyEventListnersToInputs() {
        const inputs = Array.from($('input')).filter(input => input.name !== INPUT_PLACEHOLER_NAME)

        inputs.forEach(input => {
            $(input).on('focus', event => handleEventOccurrence(event, ACTIVE_INPUT_BOX_SHADOW))
            $(input).on('blur', event => handleEventOccurrence(event, ""))

            console.log('input.id: ', input.id)

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
        console.log('yo there!')
        applyEventListnersToInputs()
        getAllCountries()
    }


    handleOnPgDisplay()
})()
