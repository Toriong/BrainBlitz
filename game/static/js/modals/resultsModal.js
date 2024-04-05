import {
    addCssClasses,
    addEventListeners,
    displayModal,
    removeAllChildrenElements,
    removeCssClasses,
    removeElement
} from "../dom/fns.js";
import { GAME_GRID_CLASS_NAME } from "../dom/vars.js";
import { animateModal } from "./generalFns.js";

const PLAY_AGAIN_BTN_ID = 'play-again-btn'
const MAIN_MENU_BTN_ID = 'main-menu-btn-id'
const MISSED_DOT_BTN_ID = 'missed-dot-btn'
export const FADE_IN_RESULTS_MODAL_CLASS_NAME = 'fade-in-results-modal';
export const RESULT_MODAL_CLASS_NAME = 'results-modal'

function handlePlayAgainBtnClick(dotsState, addDotBtns = () => { }) {
    return () => {
        const resultsModalClassName = `.${RESULT_MODAL_CLASS_NAME}`
        removeCssClasses(resultsModalClassName, 'fade-in-results-modal')
        addCssClasses(resultsModalClassName, 'fade-out-results-modal')

        setTimeout(() => {
            removeCssClasses('.backdrop', 'fade-in-backdrop')
            addCssClasses('.backdrop', 'fade-out-backdrop')

            setTimeout(() => {
                dotsState = []
                removeAllChildrenElements(`.${GAME_GRID_CLASS_NAME}`)
                removeElement('.backdrop')
                removeElement(resultsModalClassName)

                setTimeout(() => {
                    addDotBtns();
                }, 300)
            }, 400)
        }, 400)

    }
}

function handleMainMenuBtnClick() {

}

function pulseDot() {
    colorElement(dotBtn, dotToClick.color)
    addCssClasses(dotBtn, 'pulse-element')
}

function attachClickHandlersToBtns(dots, addDotBtns, handleViewDotToClickBtnClick) {
    addEventListeners($(`#${PLAY_AGAIN_BTN_ID}`), [['click', handlePlayAgainBtnClick(dots, addDotBtns)]])
    addEventListeners($(`#${MAIN_MENU_BTN_ID}`), [['click', handleMainMenuBtnClick]])

    const missedDotBtn = $(`#${MISSED_DOT_BTN_ID}`)

    if (missedDotBtn) {
        addEventListeners(missedDotBtn, [['click', handleViewDotToClickBtnClick]])
    }
}