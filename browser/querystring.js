module.exports.parse = function (search) {
	const query = {};

	for (const [key, value] of new URLSearchParams(search)) {
		query[key] = value;
	}

	return query;
}
