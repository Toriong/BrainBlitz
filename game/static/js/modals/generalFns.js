import { Element } from "../dom/classes.js";
import { addCssClasses } from "../dom/fns.js";
import { MAIN_DIV_ID } from "../dom/vars.js";

const FADE_IN_MODAL_CSS_NAME = 'fade-in-modal';
const FADE_OUT_MODAL_CSS_NAME = 'fade-out-modal';

export function animateModal(modalSelector = '', willFadeOut) {
    try {
        if (!modalSelector) {
            throw new Error('The modalSelector string cannot be empty.')
        }

        const cssClass = willFadeOut ? FADE_OUT_MODAL_CSS_NAME : FADE_IN_MODAL_CSS_NAME;
        addCssClasses(modalSelector, cssClass)
    } catch (error) {
        console.error('Failed to add fadeIn class name to target modal. Reason: ', error)
    }
}


export function renderModalParentElement(parentCssSelector = MAIN_DIV_ID) {
    const parentElement = $(parentCssSelector)
    const contentElementHeight = $('#content')[0].offsetHeight

    const { element } = new Element(
        '<div></div>',
        [['height', `${contentElementHeight}px`]],
        [['click', () => { }]],
        'position-absolute vw-100 modal-parent-container'
    );
    const { element: relativeModalContainer } = new Element(
        '<div></div>',
        [],
        [['click', () => { }]],
        'position-relative w-100 h-100 modal-relative-container'
    );

    parentElement.prepend(element)
    $('.modal-parent-container').append(relativeModalContainer)
}