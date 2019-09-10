const Action = require("./src/Action");
const BaseDispatcher = require("./src/BaseDispatcher");
const Mutation = require("./src/Mutation");
const BaseModule = require("./src/BaseModule");

const MUTATION_NAME = "MUTATION_NAME";

class TestAction extends Action {
	setTest() {
		// 提交给对应映射的mutation， 这里可以改成通过mutation的名称
		this.commit(MUTATION_NAME, "value");
	}
}

class TestMutation extends Mutation {
	constructor() {
		super();
		// 建立映射
		this.set(MUTATION_NAME, this.setTest);
	}
	setTest(state, payload) {
		state.test = payload;
	}
}

class TestModule extends BaseModule {
	constructor() {
		super();
		this.createState({
			test: "origin",
		});
		// 传递Action子类实现 类名即可
		this.createActions(TestAction);
		this.createMutations(TestMutation);
	}
}

// equal 直接使用基础模块，但注意不能使用 基础Mutation和 基础Action，必须使用对应实现
// let testModule2 = new BaseModule()
// 	.createState({ test: "origin2" })
// 	.createMutations(TestMutation)
// 	.createActions(TestAction);
let testModule = new TestModule();

console.log(testModule.getState());
testModule.action.setTest();
console.log(testModule.getState());

module.exports = testModule;
