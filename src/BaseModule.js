const EventEmitter = require("events");
const BaseDispatcher = require("./BaseDispatcher");

class BaseModule extends EventEmitter {
	constructor() {
		super();
		this.dispatcher = this.createDispatcher();
		// 注册调度，通过switch或者其他方式，执行对应的函数，这里交给了mutation的map解决
		this.dispatcher.register(action => {
			if (!this.mutations) {
				console.error(
					"the mutations does not exist in module: " +
						this.__proto__.constructor +
						"!",
				);
				return;
			}
			let mutation = this.mutations.get(action.type);
			if (mutation instanceof Function) {
				let result = mutation(this.getState(), action.payload);
				this.emit(action.type, result);
			} else {
				console.error(
					"the mutation [" +
						action.type +
						"] is not a function or null ",
				);
			}
		});
		// this.createState();
		// this.mutations = new Mutation();
		// this.action = new Action(this);
	}
	createDispatcher() {
		return new BaseDispatcher();
	}
	createState(state) {
		this.state = state;
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
		this.action = new ActionClass(this);
		return this;
	}
}

module.exports = BaseModule;
