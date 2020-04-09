import { StatefulObject } from './src/stateful-object';

export default function statefulObject(config) {
	return Object.freeze(new StatefulObject(config));
};
