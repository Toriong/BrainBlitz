import { Button, Cookies } from "./dom/classes.js";
import { addCssClasses, removeElement } from "./dom/fns.js";


(() => {
    const LOADING_TXT_DIV_ID = '#loading-main-menu-pg'
    const BTNS_SEC_ID = '#btn-sec-main-menu-pg'
    function handleUserBtnClick() {

    }

    function handleOnPgDisplay() {
        const dots = Array.from($('#dot-1, #dot-2, #dot-3'))
        const loadingTxtDiv = $(LOADING_TXT_DIV_ID)
        const btnSec = $(BTNS_SEC_ID)
        const cookies = new Cookies()
        let btnTxt = "Profile"

        if (!cookies.get('userId')) {
            btnTxt = "Create Account/Login"
        }

        const userBtn = new Button(btnTxt, handleUserBtnClick)

        setTimeout(() => {
            addCssClasses(dots[0], 'jump-element')

            setTimeout(() => {
                addCssClasses(dots[1], 'jump-element')

                setTimeout(() => {
                    addCssClasses(dots[2], 'jump-element')
                }, 300)
            }, 300);
        })

        setTimeout(() => {
            addCssClasses(loadingTxtDiv, 'fade-element-out')

            setTimeout(() => {
                removeElement(LOADING_TXT_DIV_ID)

                // btnSec.append(userBtn)
            }, 400)
        }, 400)
    }

    handleOnPgDisplay()
})();