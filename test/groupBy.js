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

    QUnit.test('Сохраняет объекты в исходном порядке внутри групп', (assert) => {
        const data = [
            { id: 1, category: 'fruit' },
            { id: 2, category: 'vegetable' },
            { id: 3, category: 'fruit' },
            { id: 4, category: 'vegetable' },
            { id: 5, category: 'fruit' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit' },
                { id: 3, category: 'fruit' },
                { id: 5, category: 'fruit' }
            ],
            vegetable: [
                { id: 2, category: 'vegetable' },
                { id: 4, category: 'vegetable' }
            ]
        }, 'Порядок объектов внутри каждой группы должен сохраняться');
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
