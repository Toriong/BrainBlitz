import { Button } from "./dom/classes.js";
import {
    addCssClasses,
    addStyles,
    colorElement,
    displayBackdrop,
    displayModal,
    removeCssClasses,
    removeElement
} from "./dom/fns.js";
import {
    BACKDROP_CLASSNAME,
    lightColors
} from "./dom/vars.js";
import {
    FADE_IN_RESULTS_MODAL_CLASS_NAME,
    RESULT_MODAL_CLASS_NAME,
    displayResultsModal
} from "./modals/resultsModal.js";
import { createArr, getRandomNum } from "./utils/utils.js";

(() => {
    const TOTAL_CELLS = 100;
    const BORDER_PROPERTY_TUPLE_UNCOLORED_DOT = ['border', '1.6px solid grey']
    const NUM_OF_CELLS_WITH_NO_BTNS = 55
    const resultModalClassName = `.${RESULT_MODAL_CLASS_NAME}`
    const backdropClassName = `.${BACKDROP_CLASSNAME}`
    let state = {
        dots: [],
        missedDotBtnId: null
    }

    function resetState() {
        state.dots = []
        state.missedDotBtnId = null
    }

    function getUncoloredDot() {
        const dots = Array.from($('.dot-btn'));
        const uncoloredDots = dots.filter(dot => dot.style.backgroundColor === '')

        if (uncoloredDots.length === 1) {
            return uncoloredDots[0]
        }

        console.log('uncoloredDots: ', uncoloredDots)
        console.log('dots, hey there! ', dots)

        let randomIndex = getRandomNum(dots.length + 1);
        console.log('randomIndex: ', randomIndex)
        let selectedDot = dots[randomIndex]

        // bug OCCURRING HERE, WHEN CREATING THE GAME SCREEN FOR THE FIRST TIME

        if (selectedDot.style.backgroundColor !== "") {
            const { selectedDotElement, selectedDotElementIndex } = getUncoloredDot();
            randomIndex = selectedDotElementIndex;
            selectedDot = selectedDotElement
        }

        return { selectedDotElement: selectedDot, selectedDotElementIndex: randomIndex };
    }

    function randomlyColorDot() {
        const { selectedDotElement, selectedDotElementIndex } = getUncoloredDot()
        const targetDot = state.dots[selectedDotElementIndex]

        addStyles(selectedDotElement, [['border', 'none'], ['backgroundColor', targetDot.color]])

        state.dots = state.dots.map((dot, index) => {
            if (index === selectedDotElementIndex) {
                return {
                    ...dot,
                    isToClickNext: true
                }
            }

            return {
                ...dot,
                isToClickNext: false
            }
        })
    }

    function getAllDotBtns() {
        return Array.from($('.dot-btn'))
    }

    function displayResultModalWithBackdropWithDelay(dotBtn, delayMs = 200, displayBackdropFn = displayBackdrop) {
        setTimeout(() => {
            removeCssClasses(dotBtn, 'pulse-element')
            colorElement(dotBtn, '', BORDER_PROPERTY_TUPLE_UNCOLORED_DOT)

            if (displayBackdropFn) {
                displayBackdropFn()
            } else {
                addCssClasses('.backdrop', 'fade-in-backdrop')
            }
            const stateDotsCopy = structuredClone(state.dots);
            displayResultsModal(
                stateDotsCopy.filter(dot => dot.wasClickedCorrectly).length,
                stateDotsCopy,
                () => {
                    resetState();
                    createBtnCells();
                    randomlyColorDot();
                },
                handleShowMissedDotBtnClick
            );
        }, delayMs)
    }

    function handleShowMissedDotBtnClick() {
        console.log('hey there!')
        removeCssClasses(resultModalClassName, FADE_IN_RESULTS_MODAL_CLASS_NAME)
        addCssClasses(resultModalClassName, 'fade-out-results-modal')

        setTimeout(() => {
            addCssClasses(backdropClassName, 'fade-out-backdrop')
            setTimeout(() => {
                removeElement(resultModalClassName)
                removeElement(backdropClassName)
                const dotBtns = getAllDotBtns();

                setTimeout(() => {
                    const dotBtnObj = state.dots.find(dot => dot.id == state.missedDotBtnId)
                    const missedDotBtn = dotBtns.find(dotBtn => dotBtn.id == state.missedDotBtnId)
                    colorElement(missedDotBtn, dotBtnObj.color)
                    addCssClasses(missedDotBtn, 'pulse-element')
                    displayResultModalWithBackdropWithDelay(missedDotBtn, 5000)
                }, 500)
            }, 300)
        }, 300)
    }



    function handleDotBtnClick(index) {
        const wasDotClickedCorrect = !!state.dots.find(dot => ((dot.id == index) && dot.isToClickNext))
        const dotBtns = Array.from($('.dot-btn'));
        const x = dotBtns[1]

        console.log('dotBtns, yo there, x! ', x)

        if (!wasDotClickedCorrect) {
            displayBackdrop();
            displayModal(
                'wrong-modal rounded modal d-flex justify-content-center align-items-center middle-top',
                `<div>
                    <span>WRONG</span>
                </div>`
            );

            console.log('state.dots, hey there! ', state.dots)

            dotBtns.forEach(dot => {
                const dotBtnObj = state.dots.find(dotTrackerObj => dotTrackerObj.id == dot.id)
                addStyles(dot, [['backgroundColor', dotBtnObj.color], ['border', 'none']])
            })

            setTimeout(() => {
                addCssClasses('.wrong-modal', 'fade-out-modal')
                setTimeout(() => {
                    addCssClasses('.backdrop', 'fade-out-backdrop')
                    setTimeout(() => {
                        removeElement('.wrong-modal')
                        dotBtns.forEach(dot => {
                            colorElement(dot, '', BORDER_PROPERTY_TUPLE_UNCOLORED_DOT)
                        });
                        setTimeout(() => {
                            const dotToClick = state.dots.find(dot => dot.isToClickNext);
                            state.missedDotBtnId = dotToClick.id
                            const dotBtn = dotBtns.find(dotBtn => dotBtn.id == dotToClick.id)
                            colorElement(dotBtn, dotToClick.color)
                            addCssClasses(dotBtn, 'pulse-element')

                            setTimeout(() => {
                                removeCssClasses(dotBtn, 'pulse-element')
                                colorElement(dotBtn, '', BORDER_PROPERTY_TUPLE_UNCOLORED_DOT)
                                addCssClasses('.backdrop', 'fade-in-backdrop')
                                const stateDotsCopy = structuredClone(state.dots);
                                displayResultsModal(
                                    stateDotsCopy.filter(dot => dot?.wasClickedCorrectly).length,
                                    stateDotsCopy,
                                    () => {
                                        resetState();
                                        createBtnCells();
                                        randomlyColorDot();
                                    },
                                    handleShowMissedDotBtnClick
                                );
                            }, 5000);
                        }, 300)
                    }, 300)
                }, 300)
            }, 1200)
            return;
        }

        const uncoloredDots = dotBtns.filter(dot => dot.style.backgroundColor === '');


        const randomIndex = getRandomNum(uncoloredDots.length + 1);

        console.log('randomIndex: ', randomIndex)
        console.log('uncoloredDots: ', uncoloredDots);

        const nextDotToClick = uncoloredDots[getRandomNum(uncoloredDots.length + 1)];

        console.log('nextDotToClick: ', nextDotToClick)

        for (let index = 0; index < dotBtns.length; index++) {
            const dotBtn = dotBtns[index]

            if (dotBtn.style.backgroundColor) {
                continue
            }

            const { color } = state.dots.find(({ id }) => id == dotBtn.id) ?? {}

            if (!color) {
                console.error("Couldn't find the dot object for corresponding dot button.")
                continue
            }

            colorElement(dotBtn, color)
        }

        // update the state that tracks which dots were clicked and whic dot is to be clicked next
        state.dots = state.dots.map(dot => {
            if (dot.id == index) {
                return {
                    ...dot,
                    wasClickedCorrectly: true,
                    isToClickNext: false
                }
            }

            if (nextDotToClick.id == dot.id) {
                return {
                    ...dot,
                    isToClickNext: true
                }
            }

            return dot
        })
        const dotsToUncolorIds = state.dots
            .filter(dot => {
                if (!dot.wasClickedCorrectly && !dot.isToClickNext) {
                    return true;
                }

                return false;
            })
            .map(dot => dot.id.toString())

        // Uncolor all dots except for the dot to be clicked and the correctly clicked dot.
        setTimeout(() => {
            for (const dotBtn of dotBtns) {
                if (dotsToUncolorIds.includes(dotBtn.id)) {
                    colorElement(dotBtn, '', BORDER_PROPERTY_TUPLE_UNCOLORED_DOT)
                }
            }
        }, 700);
    }

    function createBtnCells() {
        const gameGridElement = $('.game-grid')
        const indicesOfCellsThatWillNotHaveBtns = createArr(NUM_OF_CELLS_WITH_NO_BTNS).map(_ => getRandomNum(TOTAL_CELLS))
        const cells = createArr(TOTAL_CELLS).map((_, index) => {
            const cell = $(`
                <div class='btn-cell'>
                </div>
            `);

            if (indicesOfCellsThatWillNotHaveBtns.includes(index)) {
                return cell;
            }

            state.dots.push({
                id: index,
                isToClickNext: false,
                color: lightColors[getRandomNum(3)],
                wasClickedCorrectly: false
            });

            const { button } = new Button(
                '',
                () => handleDotBtnClick(index),
                { className: 'no-btn-styles circle dot-btn', id: index },
                [BORDER_PROPERTY_TUPLE_UNCOLORED_DOT]

            )
            cell.append(button)

            return cell
        });

        cells.forEach(cell => {
            gameGridElement.append(cell[0])
        })
    }

    createBtnCells();
    randomlyColorDot()
})();

