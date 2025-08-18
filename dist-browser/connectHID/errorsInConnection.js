class ConnectionError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionError';
	}
}
class ConnectionOpen extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionOpen';
	}
}

class ConnectionNotOpen extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionNotOpen';
	}
}

class ConnectionTimeOut extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionTimeOut';
	}
}

class ConnectionNotSend extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionNotSend';
	}
}

class ConnectionClose extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConnectionClose';
	}
}

export {
	ConnectionError,
	ConnectionOpen,
	ConnectionNotOpen,
	ConnectionTimeOut,
	ConnectionNotSend,
	ConnectionClose,
};
