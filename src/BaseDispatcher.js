const { Dispatcher } = require("flux");

class BaseDispatcher extends Dispatcher {
	// 仅做传递
	handleAction(action) {
		this.dispatch({
			type: action.type,
			payload: action.payload,
		});
	}
}

module.exports = BaseDispatcher;
