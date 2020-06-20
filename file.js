fs = require('fs');

exports.writeBlob = (blob, writeTo, fileName) => {
	if (!fs.existsSync(writeTo)) {
		fs.mkdirSync(writeTo);
	}
	file = fs.createWriteStream(writeTo + fileName);
	file.write(blob.stream().read());
};

exports.getFileName = url => {
	return url.split('/').pop();
}

exports.getUrlFrontPart = url => {
	let urlArray = url.split('/');
	urlArray.pop();
	return urlArray.join('/') + '/';	
}

exports.setLeadingZero = (maxDigit, num) => {
	let ret = String(num);
	while (ret.length < maxDigit) {
		ret = '0' + ret;
	}
	return ret;
}

exports.getFileExtention = fileName => {
	return '.' + fileName.split('.').pop();
}

exports.getFilePrefix = fileName => {
	let fileNameArray = fileName.split('.');
	fileNameArray.pop();
	let fileNameWithoutExtention = fileNameArray.join('.');

	const checkNum = c => {
		const num = Number(c);
		if (Number.isNaN(num)) {
			return false;
		} else {
			return true;
		}
	}

	let lastIndexOfPrefix;
	for (let i = fileNameWithoutExtention.length - 1; i >= 0; i--) {
		if (!checkNum(fileNameWithoutExtention[i])) {
			lastIndexOfPrefix = i;
			break;
		}
	}

	if (typeof lastIndexOfPrefix === 'undefined') {
		return '';
	} else {
		return fileNameWithoutExtention.slice(0, lastIndexOfPrefix + 1);
	}
}
