import { ErrorString } from '../constants/errorMagicStrings';

export const validateOutput = (value, checkIn) => {
	const valuesToCheck = Object.values(checkIn);
	const numberExist = valuesToCheck.includes(value);

	if (!numberExist) {
		throw new TypeError(ErrorString.ERROR_TYPE_ENUMF);
	}
	return;
};

export const validateArray = (array, maxLength) => {
	const isArray = Array.isArray(array);
	if (!isArray) {
		throw new TypeError(ErrorString.ERROR_TYPE_ARRAY);
	}

	const length = array.length !== maxLength;
	if (length) {
		throw new RangeError(`${ErrorString.ERROR_LENGTH} ${maxLength}.`);
	}

	const isInt = array.some(value => !Number.isInteger(value));
	if (isInt) {
		throw new TypeError(ErrorString.ERROR_TYPE_NUMBER);
	}

	const isInRange = array.some(value => value < 0 || value > 255);
	if (isInRange) {
		throw new RangeError(ErrorString.ERROR_RANGE);
	}
};
