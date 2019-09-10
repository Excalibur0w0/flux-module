const Action = require("./src/Action");
const BaseDispatcher = require("./src/BaseDispatcher");
const Mutation = require("./src/Mutation");
const BaseModule = require("./src/BaseModule");

const TEST = "TEST";

class TestAction extends Action {
	setTest() {
		this.commit(TEST, "value");
	}
}

class TestMutation extends Mutation {
	constructor() {
		super();
		// 建立映射
		this.set(TEST, this.setTest);
	}
	setTest(state, payload) {
		state.test = payload;
		return state.test;
	}
}

class TestModule extends BaseModule {
	constructor() {
		super();
		this.state = {
			test: "origin",
		};
		this.createActions(TestAction);
		this.createActions(TestMutation);
	}
}

let testModule = new TestModule()
	.createMutations(TestMutation)
	.createActions(TestAction);
// equal
let testModule2 = new BaseModule()
	.createState({ test: "origin2" })
	.createMutations(TestMutation)
	.createActions(TestAction);

console.log(testModule.getState());
testModule.action.setTest();
console.log(testModule.getState());

module.exports = testModule;
