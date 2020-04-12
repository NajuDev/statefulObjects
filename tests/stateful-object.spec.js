import { StatefulObject } from './../src/stateful-object';

describe('StatefulObject', () => {
    test('Can be called as a constructor', () => {
        expect(() => new StatefulObject({}))
            .not
            .toThrow();
    });

    test('Returns instance of StatefulObject', () => {
        const foo = new StatefulObject({});
        
        expect(foo)
            .toBeInstanceOf(StatefulObject);
    });

    test('Returned instance contains a subscribe property', () => {
        const foo = new StatefulObject({});
        
        expect(foo.subscribe)
            .toBeDefined();
    });

    test('subscribe property contains functions for each property in the config', () => {
        const configObject = {
            a: 'a value',
            b: 'b value'
        };
        const foo = new StatefulObject(configObject);

        Object.keys(configObject)
            .forEach(
                (key) => {
                    expect(foo.subscribe[key]).toBeDefined();
                    expect(foo.subscribe[key]).toBeInstanceOf(Function);
                }
            );
    });

    test('Returned instance contains a unsubscribe property', () => {
        const foo = new StatefulObject({});
        
        expect(foo.unsubscribe)
            .toBeDefined();
    });

    test('unsubscribe property contains functions for each property in the config', () => {
        const configObject = {
            a: 'a value',
            b: 'b value'
        };
        const foo = new StatefulObject(configObject);

        Object.keys(configObject)
            .forEach(
                (key) => {
                    expect(foo.unsubscribe[key]).toBeDefined();
                    expect(foo.unsubscribe[key]).toBeInstanceOf(Function);
                }
            );
    });

    test('Returned instance contains getter for each property in the config', () => {
        const a = 123;
        const b = 456;
        const configObject = {
            a,
            b,
        };
        const foo = new StatefulObject(configObject);

        Object.keys(configObject)
            .forEach(
                (key) => {
                    expect(foo[key]).toBeDefined();
                    expect(foo[key]).toEqual(configObject[key]);
                }
            );
    });

    test('Returned instance contains setter for each property in the config', () => {
        const a = 123;
        const b = 456;
        const configObject = {
            a,
            b,
        };
        const foo = new StatefulObject(configObject);

        Object.keys(configObject)
            .forEach(
                (key) => {
                    expect(foo[key]).toBeDefined();
                    expect(foo[key]).toEqual(configObject[key]);
                    const newValue = Math.random();
                    foo[key] = newValue;
                    expect(foo[key]).toEqual(newValue);
                }
            );
    });


    test('Subscribed functions are run when values are set', () => {
        const a = 123;
        const b = 456;
        const subscribeFunction = jest.fn();
        const configObject = {
            a,
            b,
        };
        const foo = new StatefulObject(configObject);

        foo.subscribe.a('bar', subscribeFunction);
        expect(subscribeFunction).not.toHaveBeenCalled();
        foo.a = 890;
        expect(subscribeFunction).toHaveBeenCalled();
    });

    test('Unubscribed functions are not run when values are set', () => {
        const a = 123;
        const b = 456;
        const subscribeFunction = jest.fn();
        const configObject = {
            a,
            b,
        };
        const foo = new StatefulObject(configObject);

        foo.subscribe.a('bar', subscribeFunction);
        expect(subscribeFunction).not.toHaveBeenCalled();
        foo.unsubscribe.a('bar');

        foo.a = 890;
        expect(subscribeFunction).not.toHaveBeenCalled();
    });
})