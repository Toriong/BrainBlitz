// load all of your js here
//GOAL: display the dots onto the ui
// -the dots are displayed onto the ui
// -insert  the dots for each cell
// -a table has been created, each cell is a square
// -create a table for the dots

// import { createBtn } from "./js/dom/index.js";
import { addStyles, createBtn } from "./js/dom/index.js";
import { createArr } from "./js/utils/utils.js";

// NOTES:
// there must be 100 cells


(() => {
    const TOTAL_CELLS = 100;

    function createCells() {
        const gameGridElement = $('.game-grid')
        const cells = createArr(TOTAL_CELLS).map(_ => {
            const btn = createBtn('hi', { className: 'center-absolutely' })
            const cell = $(`
                <div class='btn-cell'>
                </div>
            `);
            cell.append(btn)



            return cell;
        });

        cells.forEach(cell => {
            console.log(cell[0]);
            gameGridElement.append(cell[0])
        })
    }

    createCells()
})();



