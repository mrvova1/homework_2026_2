'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });

    QUnit.test('Бросает TypeError, если первый аргумент не массив', (assert) => {
        assert.throws(
            () => groupBy(null, 'category'),
            /Первый аргумент должен быть массивом/,
            'null вместо массива'
        );

        assert.throws(
            () => groupBy(undefined, 'category'),
            /Первый аргумент должен быть массивом/,
            'undefined вместо массива'
        );

        assert.throws(
            () => groupBy('abc', 'category'),
            /Первый аргумент должен быть массивом/,
            'Строка вместо массива'
        );

        assert.throws(
            () => groupBy(42, 'category'),
            /Первый аргумент должен быть массивом/,
            'Число вместо массива'
        );

        assert.throws(
            () => groupBy({}, 'category'),
            /Первый аргумент должен быть массивом/,
            'Объект вместо массива'
        );
    });

    QUnit.test('Бросает TypeError, если элементы массива не объекты', (assert) => {
        assert.throws(
            () => groupBy([1, 2, 3], 'category'),
            /Все элементы массива должны быть объектами/,
            'Примитивы внутри массива'
        );

        assert.throws(
            () => groupBy([null], 'category'),
            /Все элементы массива должны быть объектами/,
            'null внутри массива'
        );
    });

    QUnit.test('Бросает TypeError, если ключ не является непустой строкой', (assert) => {
        assert.throws(
            () => groupBy([], ''),
            /Второй аргумент должен быть непустой строкой/,
            'Пустая строка вместо ключа'
        );

        assert.throws(
            () => groupBy([], 42),
            /Второй аргумент должен быть непустой строкой/,
            'Число вместо ключа'
        );

        assert.throws(
            () => groupBy([], null),
            /Второй аргумент должен быть непустой строкой/,
            'null вместо ключа'
        );
    });

    QUnit.test('Работает правильно, если у некоторых объектов отсутствует ключ', (assert) => {
        const data = [
            { id: 1, category: 'fruit' },
            { id: 2 }, 
            { id: 3, category: 'fruit' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit' },
                { id: 3, category: 'fruit' }
            ],
            undefined: [
                { id: 2 }
            ]
        }, 'Объекты без указанного ключа должны попадать в группу undefined');
    });

    QUnit.test('Работает правильно с различными типами значений ключа', (assert) => {
        const data = [
            { id: 1, category: 'fruit' },
            { id: 2, category: 42 },
            { id: 3, category: 'fruit' },
            { id: 4, category: true },
            { id: 5, category: 42 }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit' },
                { id: 3, category: 'fruit' }
            ],
            42: [
                { id: 2, category: 42 },
                { id: 5, category: 42 }
            ],
            true: [
                { id: 4, category: true }
            ]
        }, 'Объекты должны быть сгруппированы по значению ключа различных типов');
    });
});
