import { StatefulObject } from './../src/stateful-object';
import statefulObject from './../index';

describe('statefulObject', () => {
    test('Returns a StatefulObject instance', () => {
        const foo = statefulObject({});

        expect(foo)
            .toBeInstanceOf(StatefulObject);
    });
});
