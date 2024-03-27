const defaultLengthCreateArrFn = 0;

export function createArr(length = defaultLengthCreateArrFn) {
    console.log(this);
    return Array.from({ length });
}
