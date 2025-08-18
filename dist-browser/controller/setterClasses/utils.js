export const validateOutput = (value, checkIn) => {
	const valuesToCheck = Object.values(checkIn);

	const numberExist = valuesToCheck.includes(value);

	if (!numberExist) {
		throw new TypeError('Property not exist, consult constOutReport.js');
	}
	return;
};

export const validateArray = (array, maxLength) => {
	const isAArray = Array.isArray(array);
	if (!isAArray) {
		throw new TypeError('The parameter must be array');
	}

	const length = array.length !== maxLength;
	if (length) {
		throw new RangeError('The length have to be 7.');
	}

	const isInt = array.some(value => !Number.isInteger(value));
	if (isInt) {
		throw new TypeError('The parameters must be integers.');
	}

	const isInRange = array.some(value => value < 0 || value > 255);
	if (isInRange) {
		throw new RangeError('Values must be between 0 and 255.');
	}
};
