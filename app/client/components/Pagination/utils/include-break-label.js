import verifyKey from './verify-key';

const PADDING = 1;
const PROGRESS = 4;
const LESS_ARRAY = 1;

export default function includeBreakLabel(
  breakLabel, items, page, total
) {
  let arr;

  if (page < PROGRESS) {
    arr = items.slice(0, PROGRESS + LESS_ARRAY);
    arr.push(breakLabel);
    arr.push(items.pop());
    return verifyKey(arr);
  }

  if (page > (total - PROGRESS) + LESS_ARRAY) {
    arr = items.slice((total - PROGRESS) - LESS_ARRAY, total);
    arr.unshift(breakLabel);
    arr.unshift(items.shift());
    return verifyKey(arr);
  }

  arr = items.slice((page - PADDING) - LESS_ARRAY, page + PADDING);

  arr.unshift(breakLabel);
  arr.push(breakLabel);

  arr.unshift(items.shift());
  arr.push(items.pop());

  return verifyKey(arr);
}
