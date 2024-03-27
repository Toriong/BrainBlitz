// load all of your js here
//GOAL: display the dots onto the ui
// -the dots are displayed onto the ui
// -insert  the dots for each cell
// -a table has been created, each cell is a square
// -create a table for the dots

// import { createBtn } from "./js/dom/index.js";
import { Button, Element } from "./js/dom/classes.js";
import { addStyles } from "./js/dom/fns.js";
import { lightColors } from "./js/dom/vars.js";
import { createArr, getRandomIndex } from "./js/utils/utils.js";

(() => {
    const TOTAL_CELLS = 100;
    let state = {
        dots: []
    }

    // get the colors that were chosen by the user
    // have those colors be dynamically selected

    function colorAllDots() {

    }

    function getUncoloredDot() {
        const dots = $('.dot-btn')
        const dotsArr = Array.from(dots);
        const uncoloredDots = dotsArr.filter(dot => dot.style.backgroundColor === '')

        if (uncoloredDots.length === 1) {
            return uncoloredDots[0]
        }

        let randomIndex = getRandomIndex(dots.length + 1);
        let selectedDot = dotsArr[randomIndex]

        if (selectedDot.style.backgroundColor !== "") {
            const { selectedDotElement, selectedDotElementIndex } = getUncoloredDot();
            randomIndex = selectedDotElementIndex;
            selectedDot = selectedDotElement
        }

        return { selectedDotElement: selectedDot, selectedDotElementIndex: randomIndex };
    }

    function randomlyColorDot() {
        const { selectedDotElement, selectedDotElementIndex } = getUncoloredDot()
        const randomColor = lightColors[getRandomIndex(3)]

        addStyles($(selectedDotElement), [['border', 'none'], ['backgroundColor', randomColor]])

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

    function handleBtnClick(index) {
        console.log('index: ', index)
        const wasDotClickedCorrect = !!state.dots.find(dot => ((dot.index === index) && dot.isToClickNext))

        if (!wasDotClickedCorrect) {
            // show the fail ui
            return;
        }

        // make all of the dots light up for a second
        // after a second, uncolor all of them
    }

    function createBtnCells() {
        const gameGridElement = $('.game-grid')
        const cells = createArr(TOTAL_CELLS).map((_, index) => {
            // only show 20 indexes to the user, generte 20 indexes not show to the user
            // check if the index is the index of a the button not to show on the dom

            // if the button will be displayed fo the cell, then add the index to the state.dots array field 
            state.dots.push({ index: index, isToClickNext: false })

            const { button } = new Button(
                '',
                () => handleBtnClick(index),
                { className: 'center-absolutely no-btn-styles circle dot-btn' },
                [['border', '1px solid grey']]

            )
            const cell = $(`
                <div class='btn-cell'>
                </div>
            `);
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

