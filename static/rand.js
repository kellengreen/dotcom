/**
 * Returns a pseudo random floating point number.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a pseudo random integer.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randInt(min, max) {
  return Math.floor(randFloat(min, max));
}

/**
 * Returns a pseudo random item from an array.
 * @param {*[]} items
 * @returns {*}
 */
export function randItem(items) {
  const idx = randInt(0, items.length);
  return items[idx];
}
