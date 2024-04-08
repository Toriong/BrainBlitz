(() => {
    function getIsTypeValid(val, correctType) {
        return typeof val === correctType
    }

    function getIsNull(val) {
        return (typeof val === 'object') && !val
    }

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

    function constructGetReqUrl(urlStr, params = []) {
        if (!urlStr) {
            console.error("Provide url string for the get request.")
            return;
        }

        const url = new URL(urlStr)

        if (params.length && params.every(paramArr => Array.isArray(paramArr) && (typeof paramArr[0] === 'string'))) {
            params.forEach(([key, val]) => {
                url.searchParams.append(key, JSON.stringify(val))
            })
        }

        return url.toString()
    }

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
        const countryName = makeFirstLettersUpperCase(country.name)

        $('#country').val(countryName)

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

    function appendSearchCountryToDOMList(countries, ul) {
        for (const country of countries) {
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

            ul.append(li)
        };
    }

    let appendSearchCountriesResultTimeout = null;

    const handleCountryInputOnchange = event => {
        clearTimeout(appendSearchCountriesResultTimeout)

        if (event.target.value) {
            state.countriesToShow = state.countries.filter(country => {
                return country.name.includes(event.target.value.toLowerCase())
            })
            let modalResultsOnDom = $(`.modal-countries-result`)

            if (!state?.countriesToShow?.length && !modalResultsOnDom?.length) {
                modalResultsOnDom = $(`
                        <div class='${MODAL_COUNTRIES_NAME} position-absolute'>
                        </div>
                    `);
                const list = $(`
                    <ul id="countries-list">
                    </ul>
                `);
                const li = $(`
                            <li class='country-option'>
                                <div class='d-flex align-items-center'>
                                    <span>
                                        No results
                                    </span>
                                </div>
                                <div class='d-flex justify-content-center align-items-center'>
                                </div>
                            </li>
                        `)
                list.append(li)
                modalResultsOnDom.append(list)
                $('.modal-countries-container').append(modalResultsOnDom)
                return;
            }

            if (!state?.countriesToShow?.length) {
                const li = $(`
                            <li class='country-option'>
                                <div class='d-flex align-items-center'>
                                    <span>
                                        No results
                                    </span>
                                </div>
                                <div class='d-flex justify-content-center align-items-center'>
                                </div>
                            </li>
                        `)
                const countriesList = $('#countries-list');

                countriesList.empty()

                countriesList.append(li)
                return;
            }

            appendSearchCountriesResultTimeout = setTimeout(() => {
                if (state.countriesToShow.length && !modalResultsOnDom.length) {
                    const viewportWidth = $(window).width()
                    const modalWidth = (viewportWidth <= 576) ? (event.target.offsetWidth + 40) : (event.target.offsetWidth - (event.target.offsetWidth * .05))
                    const list = $(`
                    <ul id="countries-list">
                    </ul>
                `);
                    const modal = $(`
                        <div class='${MODAL_COUNTRIES_NAME} position-absolute'>
                        </div>
                    `);

                    const userInput = event.target.value.toLowerCase();

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
                    return;
                }

                if (state.countriesToShow.length) {
                    const countriesList = $('#countries-list')

                    countriesList.empty()

                    appendSearchCountryToDOMList(state.countriesToShow, countriesList);

                    return;
                }

                state.countriesToShow = []
                $(`.${MODAL_COUNTRIES_NAME}`).remove()
            }, 400);

            return;
        }

        state.countriesToShow = []
        $(`.${MODAL_COUNTRIES_NAME}`).remove()
    }

    let reqFnTimer = null;

    function checkIsUserDataUnique(queryObj, handleError) {
        try {
            clearTimeout(reqFnTimer)

            if (!getIsTypeValid(queryObj, 'object') || getIsNull(queryObj)) {
                throw Error('Wrong data type for "queryObj." Must be a object.')
            }

            const urlAndPath = `${window.location.origin}/user/check-user-data`
            const fullUrl = constructGetReqUrl(urlAndPath, [['query', queryObj]])

            reqFnTimer = setTimeout(async () => {
                try {
                    const res = await fetch(fullUrl)
                    const data = await res.json()

                    if (res.status !== 200) {
                        throw new Error(data.msg ?? 'Server error.')
                    }

                    if (data?.total_users > 0) {
                        handleError()
                        return;
                    }

                    const queryObjKeyName = Object.keys(queryObj)[0]
                    const errMsgNode = $(`#${queryObjKeyName}-taken`);

                    if (errMsgNode) {
                        errMsgNode.remove()
                    }
                } catch (error) {
                    console.error("An error has occurred in checking the uniqueness of user data: ", error)
                }
            }, 150)
        } catch (error) {
            console.error('An error has occurred in gettting')
        }
    }

    function handleUserDataUniquenessError(inputFieldName = '', idInputName = '') {
        const errMsg = `${makeFirstLettersUpperCase(inputFieldName)} has been taken.`
        $(`#error-list-${idInputName}`).append(`
                <li id="${inputFieldName}-taken">
                    ${errMsg}
                </li>
            `)

    }

    async function handleInputOnChange(event) {
        console.log('hey there yo there!')
        // the email must be unique as well
        // can't be the country, confirm password input field

        // if username, firstName, lastName === must be greater than 1 character
        const fieldsThatMustBeGreaterThan1Char = ['firstName', 'lastName', 'username']
        const { name, value } = event.target;
        const form = state.form;
        form[name] = value;
        const errMsgLi = $(`#${name}-char-max-not-met`)

        if (!errMsgLi.length && fieldsThatMustBeGreaterThan1Char.includes(name) && !(value.length > 1)) {
            $(`#error-list-${name}`).append(`
                <li id='${name}-char-max-not-met' >
                    *Must be greater than 1 character.
                </li>
            `)
        }


        if (errMsgLi.length && (value.length > 1)) {
            errMsgLi.remove()
        }

        if (name === 'username') {
            checkIsUserDataUnique({ username: value }, () => handleUserDataUniquenessError('username', 'username'))
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

            if (input.id === "country") {
                $(input).on('input', handleCountryInputOnchange)
                continue
            }

            if (input.id === "confirmPassword") {
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
        applyEventListnersToInputs()
        getAllCountries()
    }


    handleOnPgDisplay()
})()
