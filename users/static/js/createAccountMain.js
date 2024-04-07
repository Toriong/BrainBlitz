

(() => {
    const state = {
        countries: [],
        form: {
            firstName: "",
            lastName: "",
            username: "",
            country: null,
            email: "",
            password: "",
            confirmPassword: ""
        },
        countriesToShow: []
    }
    const ACTIVE_INPUT_BOX_SHADOW = '10px 5px 5px grey';
    const INPUT_PLACEHOLER_NAME = 'input-placeholder'
    const MODAL_COUNTRIES_NAME = 'modal-countries-result'

    function makeFirstLettersUpperCase(sentence = '') {
        if (!sentence) {
            console.error('No sentence was given.')
            return sentence
        }

        let sentenceArr = sentence.split(" ")
        sentenceArr = sentenceArr.map(word => {
            const firstLetter = word.charAt(0).toLocaleUpperCase()
            const restOfWord = word.substring(1)
            return [firstLetter, restOfWord].join('')
        })

        return sentenceArr.join(" ")
    }

    function handleCountryOptClick(country) {
        $('#country-input').val(makeFirstLettersUpperCase(country.name))
        state.form.country = country.name;

        $(`.${MODAL_COUNTRIES_NAME}`).remove();

        state.countriesToShow = []
    }

    function handleOnFocus(event, val) {
        event.target.style.boxShadow = val

        const modal = $(`.${MODAL_COUNTRIES_NAME}`)

        if (modal.length) {
            modal.remove()
        }
    }

    function handleOnBlur(event) {
        event.target.style.boxShadow = ""
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
                const viewportWidth = $(window).width()

                console.log("viewportWidth: ", viewportWidth)
                console.log('event.target.offsetWidth: ', event.target.offsetWidth)

                const modalWidth = (viewportWidth <= 576) ? (event.target.offsetWidth + 40) : (event.target.offsetWidth - (event.target.offsetWidth * .05))
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

    function handleInputOnChange(event) {
        // the email must be unique as well
        // can't be the country, confirm password input field

        // if username, firstName, lastName === must be greater than 1 character
        const fieldsThatMustBeGreaterThan1Char = ['firstName', 'lastName', 'username']
        const { name, value } = event.target;
        const form = state.form;
        form[name] = value;

        if (fieldsThatMustBeGreaterThan1Char.includes(name) && !(value.length > 1)) {
            $(`#error-list-${name}`).append(`
                <li>
                    *Must be greater than 1 character.
                </li>
            `)
        }

        if (name === 'username') {
            // check if the username is unique
        }

    }

    function handleConfirmPasswordOnChange(event) {
        if (state.form.password !== state.form.confirmPassword) {

        }
    }

    function applyEventListnersToInputs() {
        const inputs = Array.from($('input')).filter(input => input.name !== INPUT_PLACEHOLER_NAME)

        for (const input of inputs) {
            $(input).on('focus', event => handleOnFocus(event, ACTIVE_INPUT_BOX_SHADOW))
            $(input).on('blur', event => handleOnBlur(event))

            if (input.id === "country-input") {
                $(input).on('input', handleCountryInputOnchange)
                continue
            }


            if (input.id === "confirm-password-input") {
                $(input).on('input', handleConfirmPasswordOnChange)
                continue
            }

            if (input.id === "confirm-password-input") {
                $(input).on('input', handleConfirmPasswordOnChange)
                continue
            }

            $(input).on('input', handleInputOnChange)
        }
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
