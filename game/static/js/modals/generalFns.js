import { addCssClasses } from "../dom/fns.js";

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