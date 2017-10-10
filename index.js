window.statefulObject = function (config) {
	function StatefulObject() {
		var master = Object.assign(Object.create(null), config),
			obj = {};
			
		obj.subscribe = Object.create(null);
		obj.unsubscribe = Object.create(null);
		
		for (let i in config) {
			if (config.hasOwnProperty(i)) {
				
				master[i] = {
					val: config[i],
					callbacks: Object.create(null)
				};
				
				Object.defineProperty(obj, i, { 
					get: function() { 
						return master[i].val;
					},
					set: function(x) {
						master[i].val = x;
						
						// run callbacks
						for (let c in master[i].callbacks) {
							master[i].callbacks[c]();
						};
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