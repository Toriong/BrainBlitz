const defaultLengthCreateArrFn = 0;

export function createArr(length = defaultLengthCreateArrFn) {
    return Array.from({ length });
}

export function getRandomNum(maxIndex = 0) {
    if (maxIndex < 0) {
        console.error('"maxIndex" must be greater than  0.')
        return;
    }

    return Math.floor(Math.random() * maxIndex)
}


export const createObj = (keysAndValsArr = []) => {
    if (!keysAndValsArr?.length) {
        console.error('The array to create the object is empty.')
        return null;
    }

    const isKeysAndValsArrValid = keysAndValsArr.every(keyAndVal => {
        if (!Array.isArray(keyAndVal)) {
            return false;
        }

        if (!['symbol', 'string'].includes(typeof keyAndVal[0])) {
            return false;
        }

        return true;
    })

    if (!isKeysAndValsArrValid) {
        console.error('Each value fo the `keysAndVals` arr must have the following format: [key: string | symbol, value: any]')
        return null;
    }

    return keysAndValsArr.reduce((obj, currentKeyAndVal) => {
        const [key, val] = currentKeyAndVal;
        obj[key.trim()] = val;

        return obj;
    }, {})
}