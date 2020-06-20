const fetch = require('node-fetch');
const web = require('./web.js');
const file = require('./file.js');
const message = require('./message.js');

async function downloadBlob (url, writeTo, fileName) {
	try {
		const blob = await web.getBlob(url);
		if (blob === null) {
			return false;
		} else {
			file.writeBlob(blob, writeTo, fileName);
		}
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

exports.downloadBlob = downloadBlob;

async function download (url, writeTo, fileName) {
	if ( typeof url === 'undefined') return false;
	if ( typeof writeTo === 'undefined') writeTo = './';
	if ( typeof fileName === 'undefined') fileName = file.getFileName(url);

	return downloadBlob(url, writeTo, fileName);
}

exports.download = download;

async function downloadSerialNumberFile ( url, first, last, leadingZero, maxDigit, writeTo ) {
	let result = [];

	if ( typeof url === 'undefined' ) {
		return result.push(message.setUrl);
	}

	if ( !(typeof first === 'number' && typeof last === 'number') ) {
		return result.push(message.setNumberFirstLast);
	}

	if ( first > last ) {
		return result.push(message.firstIsBiggerThanLast);
	}

	const urlFrontPart = file.getUrlFrontPart(url);
	const fileName = file.getFileName(url);
	const extention = file.getFileExtention(fileName);
	const filePrefix = file.getFilePrefix(fileName);

	for ( let i = first; i <= last; i++) {
		let serialNumber;
		if (leadingZero) {
			serialNumber = file.setLeadingZero(maxDigit,i);
		} else {
			serialNumber = String(i);
		}

		const newUrl = urlFrontPart + filePrefix + serialNumber + extention;

		if (await download(newUrl, writeTo)) {
			result.push(message.success(newUrl));
		} else {
			result.push(message.failure(newUrl));
		}
	}
}

exports.downloadSerialNumberFile = downloadSerialNumberFile;

exports.showResults = results => {
	for (result of results) {
		console.log(result);
	}
}
