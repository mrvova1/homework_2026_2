'use strict';

/**
 * Функция, группирующая массив объектов по значению указанного ключа
 * @param {Array<Object>} array - массив объектов
 * @param {string} key - ключ для группировки
 * @example
 * // returns { 'A': [{ id: 1, category: 'A' }], 'B': [{ id: 2, category: 'B' }] }
 * groupBy([{ id: 1, category: 'A' }, { id: 2, category: 'B' }], 'category');
 * @returns {Object}
 */

const groupBy = (array, key) => Object.groupBy(array, item => item[key]);