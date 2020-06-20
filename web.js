const fetch = require('node-fetch');

exports.getBlob = async (url) => {
	const response = await fetch(url);
	if (response.status === 200) {
		return response.blob();
	} else {
		return null;
	}
}

