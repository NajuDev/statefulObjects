window.statefulObject = function (config) {
	function StatefulObject() {
		var master = Object.assign(Object.create(null), config),
			obj = {};

		obj.subscribe = Object.create(null);
		obj.unsubscribe = Object.create(null);

		const invokeCallbacks = function invokeCallbacks(prop) {
			for (let c in master[prop].callbacks) {
				master[prop].callbacks[c]();
			};
			master[prop].dontCallAgain = false;
		};

		for (let i in config) {
			if (config.hasOwnProperty(i)) {

				master[i] = {
					val: config[i],
					callbacks: Object.create(null),
					dontCallAgain: false
				};

				Object.defineProperty(obj, i, {
					get: function() {
						return master[i].val;
					},
					set: function(x) {
						// run callbacks
						!master[i].dontCallAgain ?
							(
								master[i].val = x,
								// console.log('call again?', true),
								master[i].dontCallAgain = true,
								invokeCallbacks(i)
							) : (
								console.warn('Recursive property assignment: a subscribed callback attempted to change a property with a callback')
							);
					}
				});

				obj.subscribe[i] = function (name, fn) {
					if (typeof name === 'string' && typeof fn === 'function') {
						master[i].callbacks[name] = fn;
					}
					else {
						console.error('unable to subscribe function');
					}
				};

				obj.unsubscribe[i] = function (name) {
					delete master[i].callbacks[name];
				};

			}
		};

		return obj;
	};

	return new StatefulObject(config);
};
