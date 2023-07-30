
export function findNumbers(str) {
    const rStr = str.toString();
    const numberPattern = /(^-)?\d+(\.\d+)?/g;
    const strNumber = rStr.match(numberPattern);
    return Number(strNumber);
}