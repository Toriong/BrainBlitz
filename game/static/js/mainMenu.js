import { Button } from "./dom/classes.js";
import { addCssClasses } from "./dom/fns.js";


(() => {
    function handleOnPgDisplay() {
        const dots = Array.from($('#dot-1, #dot-2, #dot-3'))
        const loadingTxtDiv = $('#loading-main-menu-pg')
        const btnSec = $('.btn-sec-main-menu-pg')
        // const userBtn = new Button()

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

        }, 400)
    }

    handleOnPgDisplay()
})();