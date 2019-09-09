class Mutation {
	constructor() {
		this.funcMap = new Map();
	}
	get(actionType) {
		return this.funcMap.get(actionType);
	}
	set(actionType, mutationFunc) {
		this.funcMap.set(actionType, mutationFunc);
	}
}

module.exports = Mutation;
