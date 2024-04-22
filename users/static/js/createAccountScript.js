console.log('hi');

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
        },
        countriesToShow: []
    }
    const ACTIVE_INPUT_BOX_SHADOW = '10px 5px 5px grey';
    const INPUT_PLACEHOLER_NAME = 'input-placeholder'
    const MODAL_COUNTRIES_NAME = 'modal-countries-result'

    const getIsEmailInvalid = email => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.match(regex))
            return true;
        else
            return false;
    };

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



    function handleUserDataUniquenessError(inputFieldName) {
        const errMsg = `*${makeFirstLettersUpperCase(inputFieldName)} has been taken.`
        $(`#error-list-${inputFieldName}`).append(`
                <li id="${inputFieldName}-taken">
                    ${errMsg}
                </li>
            `)
    }

    async function handleInputOnChange(event) {
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

        if ((name === 'username') || (name === 'email')) {
            const fieldName = (name === 'username') ? 'username' : 'email';
            checkIsUserDataUnique({ [fieldName]: value }, () => handleUserDataUniquenessError(fieldName))
        }

        const invalidEmailLi = $('#invalid-email')
        const isEmailValid = (name === 'email') ? getIsEmailInvalid(value) : false;

        if ((name === 'email') && !isEmailValid && !invalidEmailLi.length) {
            $('#error-list-email').append(`
                <li id='invalid-email'>
                    *Must have only one '.', one '@', and no protocal needed (i.e., 'www').
                </li>
            `)
        }

        if ((name === 'email') && isEmailValid) {
            console.log('remove!!!')
            $('#invalid-email').remove()
        }
    }

    function handlePasswordInputChange(event) {
        const confirmPasswordInput = Array.from($('#confirmPassword'))?.[0]
        const passwordInput = Array.from($('#password'))?.[0]


        // DELETE ALL ERROR TEXTS FOR THE FOLLOWING REASONS:
        // -if the password matches 
        // -if there are no inputs for both the password field and the confirm password field


        // WHAT IS HAPPENING:
        // when the user inputs into the confirm password input field, the following occurs
        // -the error messages gets append into the error ul of the confirm password input field

        // WHAT I WANT: 
        // when there is a mismatch betweeen confirm password and password input, when the user is typing 
        // into the input field of the confirm password field, add the error message into the confirm password 
        // input field

        // check if the password-mismatch-txt li has been appended onto the DOM
        let errorLi = $('.password-mismatch-txt')
        const shortPasswordLi = $('.short-password');

        if (shortPasswordLi.length) {
            $('.short-password').remove();
        }

        if ((state.form.password !== event.target.value) && !errorLi.length) {
            confirmPasswordInput.style.border = 'solid 1px red'
            confirmPasswordInput.style.color = 'red'
            passwordInput.style.border = 'solid 1px red'
            passwordInput.style.color = 'red'

            $('#error-list-confirmPassword').append(`
                <li class='password-mismatch-txt'>
                    *Passwords must match.
                </li>
            `);

            $('#error-list-password').append(`
                <li class='password-mismatch-txt'>
                    *Passwords must match.
                </li>
            `);
            return;
        }

        if (state.form.password !== event.target.value) {
            return;
        }


        if ((state.form.password === event.target.value) && (state.form.password.length < 8) && !shortPasswordLi.length) {
            $('#error-list-confirmPassword').empty()
            $('#error-list-password').empty()
            $('#error-list-confirmPassword').append(`
                <li class='short-password'>
                    *Must be greater than 7 characers.
                </li>
            `);

            $('#error-list-password').append(`
                <li class='short-password'>
                    *Must be greater than 7 characers.
                </li>
            `);
            return;
        }

        confirmPasswordInput.style.border = 'solid 1px grey'
        confirmPasswordInput.style.color = 'black'
        passwordInput.style.border = 'solid 1px grey'
        passwordInput.style.color = 'black'
        $('#error-list-confirmPassword').empty()
        $('#error-list-password').empty()
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

            if ((input.id === "confirmPassword")) {
                $(input).on('input', handlePasswordInputChange)
                continue
            }

            $(input).on('input', handleInputOnChange)
        }
    }

    function handleSubmitBtnClick() {
        // CASE: the password don't match
        // present the error messages for both of the passwords 

        // check for the following: 
        // if the user name is unique
        // if the first name is greater than 2 characters 
        // if the last name is greater than 2 characters 
        // if the country selection is valid 
        // if the email is valid 
        // if the email was not taken
        const confirmPassword = $('#confirmPassword')
        const { country, email, firstName, lastName, password, username } = state.form;
        let errors = [];
        const isEmailValid = getIsEmailInvalid(email);

        if (!isEmailValid) {
            errors.push({ type: 'invalidEmail', elementIdsToHighlight: ['email'], errMsg: "Must have only one '.', one '@', and no protocal needed (i.e., 'www')." })
        } else {
            checkIsUserDataUnique({ email: email }, () => handleUserDataUniquenessError(email))
        }

        if (username.length >= 2) {
            isUsernameUnique = checkIsUserDataUnique({ username: username }, () => handleUserDataUniquenessError(username))
        } else {
            checkIsUserDataUnique({ username: username }, () => handleUserDataUniquenessError(username))
        }

        if (confirmPassword !== password) {
            errors.push({ type: 'passwordMismatch', elementIdsToHighlight: ['confirmPassword', 'password'], errMsg: "Password must match." })
        } else if (password.length < 8) {
            errors.push({ type: 'shortPassword', elementIdsToHighlight: ['confirmPassword', 'password'], errMsg: "Must be greater than 7 character" })
        }

        if (!state.countries.includes(country)) {
            errors.push({ type: "invalidCountry", elementIdsToHighlight: ['country'], errMsg: 'Invalid country selection.' })
        }

        if (firstName.length < 2) {
            errors.push({ type: "invalidFirstName", elementIdsToHighlight: ["firstName"], errMsg: "Must be greater than 1 character." })
        }

        if (lastName.length < 2) {
            errors.push({ type: "invalidLastName", elementIdsToHighlight: ["lastName"], errMsg: "Must be greater than 1 character." })
        }

        if (errors.length) {
            // GOAL: display the errors onto the UI. 
            return;
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
