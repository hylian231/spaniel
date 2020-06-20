exports.success = (url) => {
	return 'downloading succeeded: ' + url;
}

exports.failure = (url) => {
	return 'downloading failed: ' + url;
}

exports.setNumberFirstLast = () => {
	return 'Please set only numbers on first and last.';
}

exports.setUrl = () => {
	return 'Please set url.';
}

exports.firstIsBiggerThanLast = () => {
	return 'First is bigger than last.';
}
