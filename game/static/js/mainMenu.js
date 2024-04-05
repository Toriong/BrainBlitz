

import { Button, Cookies } from "./dom/classes.js";
import { addCssClasses, removeElement } from "./dom/fns.js";


(() => {
    const LOADING_TXT_DIV_ID = '#loading-main-menu-pg'
    const BTNS_SEC_ID = '#btn-sec-main-menu-pg'

    function handleProfileBtnClick() {

    }

    function handleLoginBtnClick() {

    }

    function handleOnLeaderBoardBtnClick() {
        console.log('hello there!')
    }

    function handleHowToPlayBtnClick() {

    }

    function handlePlayBtnClick() {
        console.log('was clicked')
        window.location.href = '/game'
    }

    function handleOnPgDisplay() {
        const dots = Array.from($('#dot-1, #dot-2, #dot-3'))
        const loadingTxtDiv = $(LOADING_TXT_DIV_ID)
        const btnsSec = $(BTNS_SEC_ID)
        const cookies = new Cookies()
        let btnTxt = "Profile"
        let handleBtnClickFn = handleProfileBtnClick

        if (!cookies.get('userId')) {
            btnTxt = "Login"
            handleBtnClickFn = handleLoginBtnClick
        }

        const { button: userBtn } = new Button(btnTxt, handleBtnClickFn, 'fade-element-in')

        setTimeout(() => {
            addCssClasses(dots[0], 'jump-element')

            setTimeout(() => {
                addCssClasses(dots[1], 'jump-element')

                setTimeout(() => {
                    addCssClasses(dots[2], 'jump-element')
                }, 300)
            }, 300);
        })

        console.log('hey there')
        setTimeout(() => {
            addCssClasses(loadingTxtDiv, 'fade-element-out')

            setTimeout(() => {
                removeElement(LOADING_TXT_DIV_ID)

                setTimeout(() => {
                    btnsSec.append(userBtn)
                }, 200)
            }, 400)
        }, 400)
    }

    handleOnPgDisplay()
})();