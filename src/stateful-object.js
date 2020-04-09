export function StatefulObject(config) {
    const master = Object.assign(Object.create(null), config);

    Object.defineProperties(this, {
        subscribe: {
            value: Object.create(null)
        },
        unsubscribe: {
            value: Object.create(null)
        },
    });

    const invokeCallbacks = function invokeCallbacks(prop) {
        for (let c in master[prop].callbacks) {
            master[prop].callbacks[c]();
        };
        master[prop].dontCallAgain = false;
    };

    for (let i in config) {
        if (i === '__proto__' || i === 'prototype') {
            continue;
        }
        if (config.hasOwnProperty(i)) {

            master[i] = {
                val: config[i],
                callbacks: Object.create(null),
                dontCallAgain: false
            };

            Object.defineProperty(this, i, {
                get: function() {
                    return master[i].val;
                },
                set: function(x) {
                    !master[i].dontCallAgain ?
                        (
                            master[i].val = x,
                            master[i].dontCallAgain = true,
                            invokeCallbacks(i)
                        ) : (
                            console && console.warn('Recursive property assignment: a subscribed callback attempted to change a property with a callback')
                        );
                }
            });

            Object.defineProperty(this.subscribe, i, {
                value: function (name, fn) {
                    if (typeof name === 'string' && typeof fn === 'function') {
                        master[i].callbacks[name] = fn;
                    }
                    else {
                        console.error('unable to subscribe function');
                    }
                }
            });

            Object.defineProperty(this.unsubscribe, i, {
                value: function (name) {
                    delete master[i].callbacks[name];
                }
            });
        }
    };
};