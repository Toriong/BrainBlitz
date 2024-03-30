const defaultLengthCreateArrFn = 0;

export function createArr(length = defaultLengthCreateArrFn) {
    return Array.from({ length });
}

export function getRandomNum(maxIndexPlus1 = 0) {
    if (maxIndexPlus1 <= 0) {
        console.error('"maxIndexPlus1" must be greater than  0.')
        return;
    }

    return Math.floor(Math.random() * maxIndexPlus1)
}
