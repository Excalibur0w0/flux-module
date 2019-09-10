const EventEmitter = require("events");
const BaseDispatcher = require("./BaseDispatcher");

class BaseModule extends EventEmitter {
	constructor() {
		super();
		this.createDispatcher();
		// 注册调度，通过switch或者其他方式，执行对应的函数，这里交给了mutation的map解决
		this.dispatcher.register(action => {
			if (!this.mutations) {
				console.error(
					"\x1B[31m error: the mutations does not exist in module: " +
						this.__proto__.constructor.name +
						"!\x1B[37m",
				);
				return;
			}
			let mutation = this.mutations.get(action.type);
			if (mutation instanceof Function) {
				let result = mutation(this.getState(), action.payload);
				this.emit(action.type, result);
			} else {
				console.error(
					"\x1B[31m error: the mutation [" +
						action.type +
						"] is not a function or null! !\x1B[37m",
				);
			}
		});
	}
	createDispatcher() {
		this.dispatcher = new BaseDispatcher();
		return this;
	}
	createState(state) {
		this.state = state;
		return this;
	}
	// 关键暴露口
	getState() {
		return this.state;
	}
	createMutations(MutationClass) {
		this.mutations = new MutationClass();
		return this;
	}
	createActions(ActionClass) {
		this.actions = new ActionClass(this);
		return this;
	}
	bindMutations(mutations) {
		this.mutations = mutations;
	}
	bindActions(actions) {
		this.actions = actions;
	}
}

module.exports = BaseModule;
