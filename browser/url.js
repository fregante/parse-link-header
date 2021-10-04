module.exports.parse = function (url) {
	return {
		query: new URL(url).search
	}
}
