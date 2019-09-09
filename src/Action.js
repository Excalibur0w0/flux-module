class Action {
	constructor(store) {
		this.dispatcher = store.dispatcher;
	}

	commit(actionType, payload) {
		this.dispatcher.handleAction({
			type: actionType,
			payload: payload,
		});
	}
}

module.exports = Action;
